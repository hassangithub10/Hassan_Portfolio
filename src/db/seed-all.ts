import "dotenv/config";
import { db } from "./index";
import {
    personalInfo,
    education,
    projects,
    experience,
    skills,
    services,
    blogPosts,
    siteSettings,
    seoDefaults,
} from "./schema";
import { sql } from "drizzle-orm";

async function seed() {
    console.log("🌱 Starting Seeding Process...");

    try {
        // Clear existing data
        console.log("Emptying existing tables...");
        await db.delete(personalInfo);
        await db.delete(education);
        await db.delete(experience);
        await db.delete(skills);
        await db.delete(projects);
        await db.delete(services);
        await db.delete(blogPosts);
        await db.delete(siteSettings);
        await db.delete(seoDefaults);

        // 1. Personal Info
        console.log("Inserting Personal Info...");
        await db.insert(personalInfo).values({
            fullName: "Hassan Sarfraz",
            title: "Frontend Developer & AI Enthusiast",
            bio: "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence. With over 3 years of experience in the digital realm, I bridge the gap between complex backend logic and pixel-perfect frontend interfaces.",
            email: "hassandigital94.com",
            phone: "+92 311 7371750",
            location: "Lahore, Pakistan",
        }).onDuplicateKeyUpdate({ set: { fullName: "Hassan Sarfraz" } });

        // 2. Education
        console.log("Inserting Education...");
        await db.insert(education).values([
            {
                institution: "COMSATS University Islamabad",
                degree: "Bachelor of Science",
                fieldOfStudy: "Computer Science",
                startDate: "2016-09-01",
                endDate: "2020-07-01",
                description: "Focused on Software Engineering, Web Technologies, and Human-Computer Interaction.",
                sortOrder: 1,
            },
            {
                institution: "Google Certification",
                degree: "UX Design Professional Certificate",
                fieldOfStudy: "UI/UX Design",
                startDate: "2021-01-01",
                endDate: "2021-06-01",
                description: "Advanced course on user-centric design, wireframing, and prototyping.",
                sortOrder: 2,
            }
        ] as any);

        // 3. Experience
        console.log("Inserting Experience...");
        await db.insert(experience).values([
            {
                company: "TechFlow Solutions",
                position: "Frontend Developer & AI Enthusiast",
                location: "Remote",
                startDate: "2022-01-01",
                endDate: null,
                responsibilities: "Leading the frontend team in developing scalable Next.js applications. Implementing complex animations using Framer Motion and ensuring WCAG compliance.",
                sortOrder: 1,
            },
            {
                company: "Creative Digital Agency",
                position: "Full Stack Developer",
                location: "Lahore",
                startDate: "2020-08-01",
                endDate: "2021-12-31",
                responsibilities: "Developed multiple high-traffic e-commerce sites using React and Node.js. Optimized site speed by 40%.",
                sortOrder: 2,
            }
        ] as any);

        // 4. Skills
        console.log("Inserting Skills...");
        await db.insert(skills).values([
            { name: "Next.js", category: "Frontend", proficiencyLevel: 95, isFeatured: true, sortOrder: 1 },
            { name: "React", category: "Frontend", proficiencyLevel: 90, isFeatured: true, sortOrder: 2 },
            { name: "TypeScript", category: "Frontend", proficiencyLevel: 85, isFeatured: true, sortOrder: 3 },
            { name: "Tailwind CSS", category: "Frontend", proficiencyLevel: 95, isFeatured: true, sortOrder: 4 },
            { name: "Node.js", category: "Backend", proficiencyLevel: 80, isFeatured: true, sortOrder: 5 },
            { name: "MySQL / Drizzle", category: "Backend", proficiencyLevel: 75, isFeatured: true, sortOrder: 6 },
            { name: "Framer Motion", category: "Design", proficiencyLevel: 90, isFeatured: true, sortOrder: 7 },
            { name: "Figma", category: "Design", proficiencyLevel: 85, isFeatured: true, sortOrder: 8 },
        ] as any);

        // 5. Projects
        console.log("Inserting Projects...");
        await db.insert(projects).values([
            {
                title: "Lumina Dashboard",
                slug: "lumina-dashboard",
                shortDescription: "A high-performance analytics dashboard for SaaS platforms.",
                longDescription: "Built with Next.js and Chart.js, Lumina provides real-time data visualization with a breathtaking glassmorphic UI. It features multi-tenant support and deep integration with Stripe for subscription management.",
                techStack: ["Next.js", "Tailwind CSS", "Recharts", "Prisma"],
                liveUrl: "https://lumina-demo.com",
                githubUrl: "https://github.com/hassan/lumina",
                imageUrl: "https://images.unsplash.com/photo-1551288049-bbda3065d83e?auto=format&fit=crop&q=80&w=800",
                category: "Web Development",
                featured: true,
                sortOrder: 1,
            },
            {
                title: "Aura E-Commerce",
                slug: "aura-ecommerce",
                shortDescription: "A premium headless commerce store with cinematic transitions.",
                longDescription: "Aura uses Shopify as a backend and Next.js for the frontend. Every interaction is designed to feel fluid and premium, using Framer Motion for page-level transitions and product reveal effects.",
                techStack: ["React", "Shopify API", "Framer Motion", "Tailwind"],
                liveUrl: "https://aura-store.com",
                imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
                category: "Apps",
                featured: true,
                sortOrder: 2,
            },
            {
                title: "Nexus SEO Engine",
                slug: "nexus-seo",
                shortDescription: "Internal automation tool for technical SEO audits.",
                longDescription: "A specialized tool that crawls websites and generates automated technical SEO reports, including metadata analysis, core web vitals, and link health checks.",
                techStack: ["Node.js", "Puppeteer", "PostgreSQL", "React"],
                imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                category: "Tools",
                featured: false,
                sortOrder: 3,
            }
        ] as any);

        // 6. Services
        console.log("Inserting Services...");
        await db.insert(services).values([
            {
                serviceType: "web_development",
                title: "Custom Web Application",
                description: "End-to-end development of scalable, high-performance web applications tailored to your business logic.",
                features: ["Next.js 15 App Router", "Responsive Cinematic UI", "Database Integration", "SEO Optimization"],
                priceText: "Starting at $1,500",
                isRecommended: true,
                techFocus: ["React", "TypeScript", "Tailwind", "Drizzle"],
            },
            {
                serviceType: "seo",
                title: "Technical SEO Audit",
                description: "A deep dive into your website's technical health to improve search rankings and user experience.",
                features: ["Core Web Vitals Check", "Schema Markup Implementation", "Competitor Analysis", "Monthly Performance Reports"],
                priceText: "Starting at $500",
                isRecommended: false,
                techFocus: ["Google Search Console", "Screaming Frog", "Ahrefs"],
            }
        ] as any);

        // 7. Blog Posts
        console.log("Inserting Blog Posts...");
        await db.insert(blogPosts).values([
            {
                title: "The Rise of Cinematic UI in 2026",
                slug: "rise-of-cinematic-ui-2026",
                excerpt: "Why modern web design is moving towards immersive, film-like experiences.",
                content: "# The Cinematic Web\n\nDesign is no longer just about information; it's about story. Cinematic UI combines motion, depth, and atmosphere to create truly memorable digital products. In this article, we explore how to implement glassmorphism and advanced gradients without sacrificing performance.",
                author: "Hassan Sarfraz",
                tags: ["Design", "UI", "Trends"],
                readTime: "5 min read",
                metaTitle: "Cinematic UI Design Trends 2026 | Hassan Sarfraz",
            },
            {
                title: "Mastering Next.js 15 Server Actions",
                slug: "mastering-nextjs-15-server-actions",
                excerpt: "A deep dive into the latest patterns for handling data mutations in Next.js.",
                content: "# Server Actions Simplified\n\nServer Actions have revolutionized how we handle form submissions and data updates. By eliminating the need for boilerplate API routes, we can build faster and more secure applications. We'll look at the best practices for error handling and optimistic UI updates.",
                author: "Hassan Sarfraz",
                tags: ["Development", "Next.js", "React"],
                readTime: "8 min read",
                metaTitle: "Mastering Next.js 15 Server Actions Guide",
            }
        ] as any);

        // 8. Site Settings
        console.log("Inserting Site Settings...");
        await db.insert(siteSettings).values([
            { settingKey: "site_name", settingValue: "Hassan Sarfraz Portfolio" },
            { settingKey: "contact_email", settingValue: "hello@hassansarfraz.com" },
            { settingKey: "linkedin_url", settingValue: "https://linkedin.com/in/hassansarfraz" },
            { settingKey: "github_url", settingValue: "https://github.com/hassan" },
            { settingKey: "twitter_url", settingValue: "https://twitter.com/hassan" },
        ] as any);

        // 9. SEO Defaults
        console.log("Inserting SEO Defaults...");
        await db.insert(seoDefaults).values([
            { route: "/", title: "Hassan Sarfraz | Frontend Developer & AI Enthusiast", description: "Portfolio of Hassan Sarfraz, specializing in cinematic web experiences.", keywords: "frontend, react, nextjs, developer, uiux, pakistan" },
            { route: "/blog", title: "Blog | Insights on Code & Design", description: "Read the latest articles on web development and SEO by Hassan Sarfraz.", keywords: "blog, nextjs, seo, tutorials" },
            { route: "/projects", title: "Projects | Digital Showcase", description: "Explore the latest work and creative solutions by Hassan Sarfraz.", keywords: "portfolio, projects, showcase" },
            { route: "/contact", title: "Contact | Let's Collaborate", description: "Get in touch for custom web development or SEO services.", keywords: "hire, contact, developer" },
        ] as any);

        console.log("✅ Seeding Completed Successfully!");
    } catch (error) {
        console.error("❌ Seeding Failed:", error);
    } finally {
        process.exit();
    }
}

seed();
