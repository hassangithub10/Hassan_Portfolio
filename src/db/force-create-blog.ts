import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function run() {
    const { db } = await import("./index");
    const { sql } = await import("drizzle-orm");

    console.log("Creating blog_posts table...");
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
            id int AUTO_INCREMENT NOT NULL,
            title varchar(255) NOT NULL,
            slug varchar(255) NOT NULL,
            excerpt text,
            content text NOT NULL,
            cover_image varchar(255),
            published_at timestamp DEFAULT (now()),
            author varchar(100) DEFAULT 'Hassan Sarfraz',
            tags json,
            read_time varchar(50),
            CONSTRAINT blog_posts_id PRIMARY KEY(id),
            CONSTRAINT blog_posts_slug_unique UNIQUE(slug)
        );
    `);
    console.log("Table created.");

    // Seed
    const { blogPosts } = await import("./schema");

    console.log("Seeding...");
    await db.insert(blogPosts).values([
        {
            title: "The Future of Web Development: Glassmorphism & Neon",
            slug: "future-web-development-glassmorphism",
            excerpt: "Explore how 2026 design trends are shaping the web with immersive 3D elements, glass effects, and vibrant neon aesthetics.",
            content: "Content...",
            coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            tags: ["Design", "CSS"],
            readTime: "5 min read"
        }
    ]);
    console.log("Seeded.");
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
