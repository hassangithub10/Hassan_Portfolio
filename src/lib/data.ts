import {
    PersonalInfo,
    Education,
    Project,
    Experience,
    Skill,
    Service,
    BlogPost,
    SiteSetting,
    SectionContent,
    NavigationItem
} from "./types";

export const personalInfoData: PersonalInfo = {
    id: 1,
    fullName: "Hassan Sarfraz",
    title: "Frontend Developer & AI Enthusiast",
    bio: "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence. With over 3 years of experience in the digital realm, I bridge the gap between complex backend logic and pixel-perfect frontend interfaces.",
    email: "hassandigital94.com",
    phone: "+92 311 7371750",
    location: "Lahore, Pakistan",
    currentFocus: "Building fast Next.js applications",
    availabilityStatus: "available",
    updatedAt: new Date(),
};

export const educationData: Education[] = [
    {
        id: 1,
        institution: "COMSATS University Islamabad",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2016-09-01",
        endDate: "2020-07-01",
        description: "Focused on Software Engineering, Web Technologies, and Human-Computer Interaction.",
        sortOrder: 1,
        isVisible: true,
    },
    {
        id: 2,
        institution: "Google Certification",
        degree: "UX Design Professional Certificate",
        fieldOfStudy: "UI/UX Design",
        startDate: "2021-01-01",
        endDate: "2021-06-01",
        description: "Advanced course on user-centric design, wireframing, and prototyping.",
        sortOrder: 2,
        isVisible: true,
    }
];

export const experienceData: Experience[] = [
    {
        id: 1,
        company: "TechFlow Solutions",
        position: "Frontend Developer & AI Enthusiast",
        location: "Remote",
        startDate: "2022-01-01",
        endDate: null,
        responsibilities: "Leading the frontend team in developing scalable Next.js applications. Implementing complex animations using Framer Motion and ensuring WCAG compliance.",
        sortOrder: 1,
        isVisible: true,
    },
    {
        id: 2,
        company: "Creative Digital Agency",
        position: "Full Stack Developer",
        location: "Lahore",
        startDate: "2020-08-01",
        endDate: "2021-12-31",
        responsibilities: "Developed multiple high-traffic e-commerce sites using React and Node.js. Optimized site speed by 40%.",
        sortOrder: 2,
        isVisible: true,
    }
];

export const skillsData: Skill[] = [
    { id: 1, name: "Next.js", category: "Frontend", logoSvgOrUrl: null, proficiencyLevel: 95, isFeatured: true, sortOrder: 1, isVisible: true },
    { id: 2, name: "React", category: "Frontend", logoSvgOrUrl: null, proficiencyLevel: 90, isFeatured: true, sortOrder: 2, isVisible: true },
    { id: 3, name: "TypeScript", category: "Frontend", logoSvgOrUrl: null, proficiencyLevel: 85, isFeatured: true, sortOrder: 3, isVisible: true },
    { id: 4, name: "Tailwind CSS", category: "Frontend", logoSvgOrUrl: null, proficiencyLevel: 95, isFeatured: true, sortOrder: 4, isVisible: true },
    { id: 5, name: "Node.js", category: "Backend", logoSvgOrUrl: null, proficiencyLevel: 80, isFeatured: true, sortOrder: 5, isVisible: true },
    { id: 6, name: "MySQL / Drizzle", category: "Backend", logoSvgOrUrl: null, proficiencyLevel: 75, isFeatured: true, sortOrder: 6, isVisible: true },
    { id: 7, name: "Framer Motion", category: "Design", logoSvgOrUrl: null, proficiencyLevel: 90, isFeatured: true, sortOrder: 7, isVisible: true },
    { id: 8, name: "Figma", category: "Design", logoSvgOrUrl: null, proficiencyLevel: 85, isFeatured: true, sortOrder: 8, isVisible: true },
];

export const projectsData: Project[] = [
    {
        id: 1,
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
        isVisible: true,
        createdAt: new Date(),
        metaTitle: null,
        metaDescription: null,
        keywords: null,
        gallery: null,
        collaborators: [],
    },
    {
        id: 2,
        title: "Aura E-Commerce",
        slug: "aura-ecommerce",
        shortDescription: "A premium headless commerce store with cinematic transitions.",
        longDescription: "Aura uses Shopify as a backend and Next.js for the frontend. Every interaction is designed to feel fluid and premium, using Framer Motion for page-level transitions and product reveal effects.",
        techStack: ["React", "Shopify API", "Framer Motion", "Tailwind"],
        liveUrl: "https://aura-store.com",
        githubUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
        category: "Apps",
        featured: true,
        sortOrder: 2,
        isVisible: true,
        createdAt: new Date(),
        metaTitle: null,
        metaDescription: null,
        keywords: null,
        gallery: null,
        collaborators: [],
    },
    {
        id: 3,
        title: "Aura E-Commerce",
        slug: "aura-ecommerce",
        shortDescription: "A premium headless commerce store with cinematic transitions.",
        longDescription: "Aura uses Shopify as a backend and Next.js for the frontend. Every interaction is designed to feel fluid and premium, using Framer Motion for page-level transitions and product reveal effects.",
        techStack: ["React", "Shopify API", "Framer Motion", "Tailwind"],
        liveUrl: "https://aura-store.com",
        githubUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
        category: "Apps",
        featured: true,
        sortOrder: 3,
        isVisible: true,
        createdAt: new Date(),
        metaTitle: null,
        metaDescription: null,
        keywords: null,
        gallery: null,
        collaborators: [],
    }
];

export const servicesData: Service[] = [
    {
        id: 1,
        serviceType: "web_development",
        title: "Custom Web Application",
        description: "End-to-end development of scalable, high-performance web applications tailored to your business logic.",
        features: ["Next.js 15 App Router", "Responsive Cinematic UI", "Database Integration", "SEO Optimization"],
        priceText: "Starting at $1,500",
        isRecommended: true,
        techFocus: ["React", "TypeScript", "Tailwind", "Drizzle"],
        isVisible: true,
        createdAt: new Date(),
        metaTitle: null,
        metaDescription: null,
        keywords: null,
    },
    {
        id: 2,
        serviceType: "seo",
        title: "Technical SEO Audit",
        description: "A deep dive into your website's technical health to improve search rankings and user experience.",
        features: ["Core Web Vitals Check", "Schema Markup Implementation", "Competitor Analysis", "Monthly Performance Reports"],
        priceText: "Starting at $500",
        isRecommended: false,
        techFocus: ["Google Search Console", "Screaming Frog", "Ahrefs"],
        isVisible: true,
        createdAt: new Date(),
        metaTitle: null,
        metaDescription: null,
        keywords: null,
    }
];

export const blogPostsData: BlogPost[] = [
    {
        id: 1,
        title: "The Rise of Cinematic UI in 2026",
        slug: "rise-of-cinematic-ui-2026",
        excerpt: "Why modern web design is moving towards immersive, film-like experiences.",
        content: "# The Cinematic Web\n\nDesign is no longer just about information; it's about story. Cinematic UI combines motion, depth, and atmosphere to create truly memorable digital products. In this article, we explore how to implement glassmorphism and advanced gradients without sacrificing performance.",
        author: "Hassan Sarfraz",
        tags: ["Design", "UI", "Trends"],
        readTime: "5 min read",
        metaTitle: "Cinematic UI Design Trends 2026 | Hassan Sarfraz",
        coverImage: null,
        publishedAt: new Date(),
        isVisible: true,
        metaDescription: null,
        keywords: null,
        gallery: null,
    }
];

export const siteSettingsData: SiteSetting[] = [
    { settingKey: "site_name", settingValue: "Hassan Sarfraz Portfolio" },
    { settingKey: "contact_email", settingValue: "hello@hassansarfraz.com" },
    { settingKey: "linkedin_url", settingValue: "https://linkedin.com/in/hassansarfraz" },
    { settingKey: "github_url", settingValue: "https://github.com/hassan" },
    { settingKey: "twitter_url", settingValue: "https://twitter.com/hassan" },
    { settingKey: "site_favicon", settingValue: "/logo.svg" },
    { settingKey: "social_github", settingValue: "https://github.com/hassan" },
    { settingKey: "social_linkedin", settingValue: "https://linkedin.com/in/hassansarfraz" },
];

export const sectionContentData: SectionContent[] = [];

export const navigationItemsData: NavigationItem[] = [
    { id: 1, label: "About", path: "#about", location: "header", sortOrder: 0, isVisible: true, parentId: null },
    { id: 2, label: "Projects", path: "#projects", location: "header", sortOrder: 1, isVisible: true, parentId: null },
    { id: 3, label: "Contact", path: "#contact", location: "header", sortOrder: 2, isVisible: true, parentId: null },
];
