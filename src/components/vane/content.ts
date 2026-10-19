/**
 * Copy for the one-pager. Business data (projects, services, stats, contact)
 * is read from @/lib/site so there is a single source of truth.
 */
import { OUTCOMES, SERVICES, SITE, STATS, WORK } from "@/lib/site";

export const BRAND = {
    first: "Hassan",
    last: "Sarfraz",
    full: SITE.name,
    monogram: "HS",
    portrait: "/portrait/hero.webp",
};

export const NAV_LINKS = [
    { label: "Story", href: "#story" },
    { label: "Work", href: "#work" },
    { label: "Impact", href: "#impact" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
];

export const HERO = {
    roles: ["Designer", "Developer", "Optimizer", "Partner"],
    description:
        "I design and build business websites that bring in customers. Fast, search-ready, and made to turn visitors into messages.",
    cue: "Scroll to enter",
};

export const MARQUEE_WORDS = ["Design Clean", "Build Fast", "Rank Higher", "Convert Visitors", "Launch Confidently"];

export const STORY = {
    eyebrow: "The Story",
    heading: "Websites should earn their keep.",
    body: "I'm a web designer and developer in Lahore. For over four years I've built sites for businesses in the US and Pakistan, from family auto shops and dental practices to a welfare platform and an IT integrator. The through-line never changed: make the business easy to find, easy to trust and easy to contact.",
    principles: [
        ...OUTCOMES,
        {
            title: "Launch is the start",
            text: "I stay available for fixes, updates and new pages. If something breaks, you message me, not a ticket queue.",
        },
    ],
};

export const WORK_SECTION = {
    eyebrow: "Selected Work",
    heading: "Sites that bring in customers.",
    items: WORK.slice(0, 6),
};

export const IMPACT = {
    eyebrow: "By The Numbers",
    heading: "Four years, measured.",
    stats: STATS.map((s) => ({ value: `${s.value}${s.suffix}`, label: s.label })),
};

/** Image shown beside each service (existing project screenshots). */
const SERVICE_IMAGES: Record<string, string> = {
    website: "/uploads/2026/03/oriscare.webp",
    apps: "/uploads/2026/03/khudii.webp",
    redesign: "/uploads/2026/03/dks.webp",
    seo: "/uploads/2026/03/mindzbay.webp",
};

export const SERVICES_SECTION = {
    eyebrow: "Services",
    heading: "What I do.",
    items: SERVICES.map((s) => ({
        id: s.id,
        title: s.title,
        text: s.text,
        tags: s.tags,
        image: SERVICE_IMAGES[s.id] ?? "/uploads/2026/03/dks.webp",
    })),
};

export const CONTACT = {
    eyebrow: "Let's Build",
    heading: "Need a website that brings in customers?",
    body: `Tell me about your business. I reply ${SITE.replyTime}.`,
    email: SITE.email,
    tagline: "Designed & built with care.",
    socials: [
        { label: "GitHub", href: SITE.github },
        { label: "LinkedIn", href: SITE.linkedin },
        ...(SITE.whatsapp ? [{ label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}` }] : []),
    ],
};
