import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { blogPosts } from "./schema";

async function seed() {
    const { db } = await import("./index");
    console.log("Seeding blog posts...");

    await db.insert(blogPosts).values([
        {
            title: "The Future of Web Development: Glassmorphism & Neon",
            slug: "future-web-development-glassmorphism",
            excerpt: "Explore how 2026 design trends are shaping the web with immersive 3D elements, glass effects, and vibrant neon aesthetics.",
            content: `The web is evolving. Gone are the days of flat, material design dominance. We are entering an era of depth, light, and motion. 
            
            Glassmorphism has returned, but refined. It's no longer just about blur; it's about interactions, dynamic reflections, and integration with 3D environments.
            
            In this post, we dive deep into how to implement these effects using Tailwind CSS and Framer Motion, creating interfaces that feel alive and responsive.
            
            Key takeaways:
            1. Using backdrop-filter effectively.
            2. Layering gradients for depth.
            3. Performance considerations for 3D web elements.`,
            coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            publishedAt: new Date(),
            author: "Hassan Sarfraz",
            tags: ["Design", "CSS", "3D"],
            readTime: "5 min read"
        },
        {
            title: "Mastering Next.js 15 Server Actions",
            slug: "mastering-nextjs-15-server-actions",
            excerpt: "A comprehensive guide to building type-safe, efficient, and scalable backend logic directly within your Next.js components.",
            content: `Next.js 15 has revolutionized how we think about data mutation. Server Actions allow us to write backend logic alongside our UI, without the boilerplate of API routes.
            
            But with great power comes great responsibility. How do we Handle authentication? Validation? Error states? 
            
            We'll explore Zod integration, optimistic UI updates, and how to structure your actions associated with database operations using Drizzle ORM.`,
            coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop",
            publishedAt: new Date(Date.now() - 86400000), // Yesterday
            author: "Hassan Sarfraz",
            tags: ["Next.js", "React", "Backend"],
            readTime: "8 min read"
        },
        {
            title: "SEO Strategies for Single Page Applications",
            slug: "seo-strategies-spa-2026",
            excerpt: "How to ensure your React and Next.js applications rank high on Google with the latest search engine algorithm updates.",
            content: `SEO is often an afterthought for SPAs, but it shouldn't be. With Next.js App Router, we have powerful tools at our disposal.
            
            Dynamic metadata generation, sitemaps, structured data (JSON-LD), and semantic HTML are crucial.
            
            We also look at Core Web Vitals and how interaction to next paint (INP) has become a critical ranking factor in 2026.`,
            coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop",
            publishedAt: new Date(Date.now() - 172800000), // 2 days ago
            author: "Hassan Sarfraz",
            tags: ["SEO", "Marketing", "Growth"],
            readTime: "6 min read"
        }
    ]);

    console.log("Seeding complete!");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
