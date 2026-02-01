import { MetadataRoute } from 'next';
import { db } from '@/db';
import { blogPosts, projects } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hassanport.com';

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/projects',
        '/services',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Blog Posts
    const posts = await db.select().from(blogPosts);
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 3. Projects
    const projectItems = await db.select().from(projects);
    const projectRoutes = projectItems.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt || project.createdAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
