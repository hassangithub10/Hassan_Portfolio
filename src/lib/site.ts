/**
 * Single source of truth for all portfolio copy and contact details.
 * Edit text here; components and SEO schema both read from this file.
 */
export const SITE = {
    name: "Hassan Sarfraz",
    url: "https://hassansarfraz.online",
    email: "digitalwork.990@gmail.com",
    /** International format, digits only (e.g. "923001234567"). Leave empty to hide the WhatsApp button. */
    whatsapp: "",
    location: "Lahore, Pakistan",
    github: "https://github.com/hassangithub10",
    linkedin: "https://linkedin.com/in/hassan-sarfraz-6047ba269",
    replyTime: "within one working day",
    /** Formspree-style endpoint. Set NEXT_PUBLIC_FORM_ENDPOINT to send enquiries to your inbox without a mail app. */
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};

export const NAV = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
];

export const PROJECT_TYPES = [
    "Business website",
    "Web app or portal",
    "Redesign",
    "SEO and analytics",
    "Not sure yet",
];

export const BUDGETS = ["Under $500", "$500 to $1,500", "$1,500 to $5,000", "$5,000+", "Let's discuss"];

export const OUTCOMES = [
    {
        title: "People find you",
        text: "Search-ready structure, fast load times, and Google Analytics and Search Console set up from day one.",
    },
    {
        title: "They trust you",
        text: "Clean, confident design that makes a small business look established on every phone and screen.",
    },
    {
        title: "They get in touch",
        text: "Clear calls to action, simple forms and booking paths, so a visit turns into a message.",
    },
];

export const SERVICES = [
    {
        id: "website",
        icon: "browser",
        title: "Business websites",
        text: "A clear, fast site that explains what you do and makes it easy to call, book or buy. Built on WordPress or Next.js, whichever suits your team.",
        tags: ["WordPress", "Elementor", "Next.js"],
        projectType: "Business website",
    },
    {
        id: "apps",
        icon: "layers",
        title: "Web apps and portals",
        text: "Booking tools, donation or member portals, dashboards: anything that needs logins, forms and a database behind it.",
        tags: ["React", "Node.js", "MySQL"],
        projectType: "Web app or portal",
    },
    {
        id: "redesign",
        icon: "gauge",
        title: "Redesign and speed",
        text: "Slow or dated site? I rebuild it mobile-first and fast, while protecting the content and search rankings you already have.",
        tags: ["Figma", "Next.js", "Performance"],
        projectType: "Redesign",
    },
    {
        id: "seo",
        icon: "search",
        title: "SEO and analytics",
        text: "Technical SEO, Search Console and Analytics setup, and page structure that both Google and AI search tools can read.",
        tags: ["SEO", "AEO", "GA4"],
        projectType: "SEO and analytics",
    },
];

export const PROCESS = [
    {
        title: "Intro call",
        text: "We talk about your business, your customers and what a good result looks like for you.",
    },
    {
        title: "Plan and design",
        text: "You get a sitemap and a Figma design to approve before any code is written.",
    },
    {
        title: "Build and review",
        text: "I build it, you review a live preview link, and we refine until you are happy.",
    },
    {
        title: "Launch and grow",
        text: "I handle domain, hosting and Search Console, then stay available for updates.",
    },
];

export const STATS = [
    { value: 4, suffix: "+", label: "years building for the web" },
    { value: 25, suffix: "+", label: "projects delivered" },
    { value: 2, suffix: "", label: "countries served: the US and Pakistan" },
    { value: 100, suffix: "%", label: "client satisfaction" },
];

export const TOOLS = [
    { name: "WordPress", src: "/uploads/2026/02/wordpress.webp" },
    { name: "Elementor", src: "/uploads/2026/02/elementor.webp" },
    { name: "Next.js", src: "/uploads/2026/02/nextjs.webp" },
    { name: "React", src: "/uploads/2026/02/reactjs.webp" },
    { name: "TypeScript", src: "/uploads/2026/02/typescript.webp" },
    { name: "Tailwind CSS", src: "/uploads/2026/02/tailwind_css.webp" },
    { name: "Figma", src: "/uploads/2026/02/figma.webp" },
    { name: "Node.js", src: "/uploads/2026/02/nodejs.webp" },
    { name: "MySQL", src: "/uploads/2026/02/mysql.webp" },
    { name: "Vercel", src: "/uploads/2026/02/vercel.webp" },
    { name: "Google Analytics", src: "/uploads/2026/02/google_analytics.webp" },
    { name: "Search Console", src: "/uploads/2026/02/google_search_console.webp" },
];

export const FAQS = [
    {
        q: "How much does a website cost?",
        a: "It depends on the number of pages, features and content. After a short call I send a fixed quote, so you know the total before any work starts.",
    },
    {
        q: "How long does it take?",
        a: "A typical business site takes two to four weeks from kickoff to launch. Larger apps take longer, and I give you a timeline up front.",
    },
    {
        q: "Can I update the site myself?",
        a: "Yes. WordPress sites come with an editor you can use without code, and I walk you through it on a short call after launch.",
    },
    {
        q: "Will my site show up on Google?",
        a: "I set up the technical SEO, speed and Search Console properly. Rankings take time and nobody can honestly promise page one, but a well-built site gives you the strongest start.",
    },
    {
        q: "Do you work with clients outside Pakistan?",
        a: "Yes. I have built sites for businesses in the US and Pakistan, and I work over email, chat and calls across time zones.",
    },
    {
        q: "What happens after launch?",
        a: "I stay available for fixes, updates and new pages. If something breaks, you message me, not a ticket queue.",
    },
];

export interface WorkItem {
    name: string;
    industry: string;
    summary: string;
    image: string;
    url: string;
    stack: string[];
}

export const WORK: WorkItem[] = [
    {
        name: "Digital Konnecter Systems",
        industry: "IT and software",
        summary: "A confident corporate site for a Pakistani IT integrator, built to win enterprise trust and generate service enquiries.",
        image: "/uploads/2026/03/dks.webp",
        url: "https://www.dks.com.pk",
        stack: ["Next.js", "Drizzle", "Framer Motion"],
    },
    {
        name: "Oris Dental",
        industry: "Cosmetic dentistry",
        summary: "A calm, high-end site for a cosmetic dental practice, designed to turn searches into booked consultations.",
        image: "/uploads/2026/03/oriscare.webp",
        url: "https://www.oriscare.com",
        stack: ["WordPress", "Elementor", "WP Forms"],
    },
    {
        name: "Khudii Welfare",
        industry: "Non-profit",
        summary: "A donor and volunteer platform for Pakistan's largest digital welfare community.",
        image: "/uploads/2026/03/khudii.webp",
        url: "https://www.khudii.com",
        stack: ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
        name: "Cheo's Auto Service",
        industry: "Auto repair, Arizona",
        summary: "A trust-first site for a family auto shop, with services and contact details one tap away on mobile.",
        image: "/uploads/2026/03/cheosautosservice.webp",
        url: "https://www.cheosautoservice.com",
        stack: ["WordPress", "Elementor", "WP Forms"],
    },
    {
        name: "Mindzbay",
        industry: "Communication platform",
        summary: "A product site that explains an AI-driven call centre and omni-chat platform to business buyers.",
        image: "/uploads/2026/03/mindzbay.webp",
        url: "https://www.mindzbay.com",
        stack: ["WordPress", "Elementor", "WP Forms"],
    },
    {
        name: "Al Makki Al Madni Dialysis Center",
        industry: "Healthcare charity",
        summary: "A clear, compassionate site that helps patients find care and donors find a cause worth backing.",
        image: "/uploads/2026/03/mmdc.webp",
        url: "https://www.mmdcpak.com",
        stack: ["WordPress", "Elementor", "Photoshop"],
    },
    {
        name: "D&D Autoworks",
        industry: "Auto repair, Minneapolis",
        summary: "A straightforward site for a family shop that has served Minneapolis drivers since 1997.",
        image: "/uploads/2026/03/dnd.webp",
        url: "https://www.danddautoworks.com",
        stack: ["WordPress", "Elementor", "WP Forms"],
    },
    {
        name: "Engr. Ali Zaman",
        industry: "Personal brand",
        summary: "A personal site that positions a supply chain expert for senior opportunities.",
        image: "/uploads/2026/03/alizaman.webp",
        url: "https://www.alizaman.site",
        stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    },
];
