import Hero from "@/components/sections/Hero";
import StructuredData from "@/components/seo/StructuredData";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import SkillsCarousel from "@/components/sections/SkillsCarousel";
import Contact from "@/components/sections/Contact";
import { getDynamicSEO } from "@/lib/seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
    return getDynamicSEO(
        "/",
        "Hassan Sarfraz | Frontend Developer & AI Specialist",
        "Portfolio of Hassan Sarfraz, a passionate Frontend Developer and AI Enthusiast crafting high-performance, cinematic web experiences with React, Next.js, and modern technologies."
    );
}

export default function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://hassansarfraz.online/#website",
                "url": "https://hassansarfraz.online",
                "name": "Hassan Sarfraz - Portfolio",
                "description": "Portfolio of Hassan Sarfraz - Frontend Developer & AI Enthusiast",
                "inLanguage": "en-US",
            },
            {
                "@type": "Person",
                "@id": "https://hassansarfraz.online/#person",
                "name": "Hassan Sarfraz",
                "url": "https://hassansarfraz.online",
                "jobTitle": "Frontend Developer & AI Enthusiast",
                "description": "Frontend Developer and AI Enthusiast specializing in React, Next.js, and high-performance digital experiences.",
                "sameAs": [
                    "https://github.com/hassangithub10",
                    "https://linkedin.com/in/hassan-sarfraz-6047ba269",
                ],
                "knowsAbout": [
                    "Frontend Development",
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Artificial Intelligence",
                    "Web Performance",
                    "SEO Optimization",
                ],
                "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "Government College University Faisalabad",
                },
                "email": "mailto:digitalwork.990@gmail.com",
            },
            {
                "@type": "ProfilePage",
                "@id": "https://hassansarfraz.online/#webpage",
                "url": "https://hassansarfraz.online",
                "name": "Hassan Sarfraz | Frontend Developer & AI Specialist",
                "description": "Portfolio of Hassan Sarfraz - Frontend Developer & AI Enthusiast",
                "isPartOf": {
                    "@id": "https://hassansarfraz.online/#website",
                },
                "about": {
                    "@id": "https://hassansarfraz.online/#person",
                },
                "mainEntity": {
                    "@id": "https://hassansarfraz.online/#person",
                },
                "inLanguage": "en-US",
            },
        ],
    };

    return (
        <>
            <StructuredData data={jsonLd} />
            <div className="relative w-full flex flex-col gap-0">
                {/* ── 0: HERO ── */}
                <Hero />

                {/* ── 1: ABOUT ── */}
                <About />

                {/* ── 2: EDUCATION ── */}
                <Education />

                {/* ── 3: EXPERIENCE ── */}
                <Experience />

                {/* ── 4: PROJECTS ── */}
                <Projects />

                {/* ── 5: SKILLS ── */}
                <SkillsCarousel />

                {/* ── 6: CONTACT ── */}
                <Contact />
            </div>
        </>
    );
}
