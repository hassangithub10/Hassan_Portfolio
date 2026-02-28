import { MetadataRoute } from 'next';
import { blogPostsData, projectsData } from '@/lib/data';

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
    const postRoutes = blogPostsData.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 3. Projects
    const projectRoutes = projectsData.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.createdAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
