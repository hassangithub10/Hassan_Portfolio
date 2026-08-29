import Hero from "@/components/sections/Hero";
import StructuredData from "@/components/seo/StructuredData";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import SkillsCarousel from "@/components/sections/SkillsCarousel";
import Contact from "@/components/sections/Contact";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";
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
                "name": "Hassan Sarfraz Portfolio",
                "description": "Portfolio of Hassan Sarfraz - Frontend Developer & AI Specialist crafting high-performance, cinematic web experiences.",
                "publisher": {
                    "@id": "https://hassansarfraz.online/#person",
                },
                "inLanguage": "en-US",
            },
            {
                "@type": "Person",
                "@id": "https://hassansarfraz.online/#person",
                "name": "Hassan Sarfraz",
                "url": "https://hassansarfraz.online",
                "jobTitle": "Frontend Developer & AI Specialist",
                "description": "Frontend Developer with over 4 years of experience specializing in React, Next.js, TypeScript, and AI-driven development workflows.",
                "image": "https://hassansarfraz.online/logo.svg",
                "sameAs": [
                    "https://www.linkedin.com/in/hassan-s-101a8978",
                    "https://github.com/hassangithub10",
                ],
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Faisalabad",
                    "addressCountry": "PK",
                },
                "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Government College University Faisalabad",
                },
                "knowsAbout": [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Tailwind CSS",
                    "Node.js",
                    "Frontend Web Development",
                    "UI/UX Implementation",
                    "Performance Optimization",
                    "Search Engine Optimization (SEO)",
                ],
            },
            {
                "@type": "ProfilePage",
                "@id": "https://hassansarfraz.online/#profilepage",
                "url": "https://hassansarfraz.online",
                "name": "Hassan Sarfraz | Frontend Developer & AI Specialist",
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

    const TOTAL = 7;


    return (
        <>
            <StructuredData data={jsonLd} />
            <ScrollStack>

                {/* ── 0: HERO — full viewport base layer ── */}
                <ScrollStackItem index={0} total={TOTAL}>
                    <Hero />
                </ScrollStackItem>

                {/* ── 1: ABOUT — slides over Hero ── */}
                <ScrollStackItem
                    index={1}
                    total={TOTAL}
                    className="stack-bg-1 shadow-[0_-30px_80px_rgba(59,0,117,0.08)]"
                >
                    <About />
                </ScrollStackItem>

                {/* ── 2: EDUCATION — slides over About ── */}
                <ScrollStackItem
                    index={2}
                    total={TOTAL}
                    className="stack-bg-2 shadow-[0_-30px_80px_rgba(59,0,117,0.09)]"
                >
                    <Education />
                </ScrollStackItem>

                {/* ── 3: EXPERIENCE — slides over Education ── */}
                <ScrollStackItem
                    index={3}
                    total={TOTAL}
                    className="stack-bg-3 shadow-[0_-30px_80px_rgba(59,0,117,0.10)]"
                >
                    <Experience />
                </ScrollStackItem>

                {/* ── 4: PROJECTS — slides over Experience ── */}
                <ScrollStackItem
                    index={4}
                    total={TOTAL}
                    className="stack-bg-4 shadow-[0_-30px_80px_rgba(59,0,117,0.09)]"
                >
                    <Projects />
                </ScrollStackItem>

                {/* ── 5: SKILLS — slides over Projects ── */}
                <ScrollStackItem
                    index={5}
                    total={TOTAL}
                    className="stack-bg-5 shadow-[0_-30px_80px_rgba(59,0,117,0.08)]"
                >
                    <SkillsCarousel />
                </ScrollStackItem>

                {/* ── 6: CONTACT — final card, no scale-down ── */}
                <ScrollStackItem
                    index={6}
                    total={TOTAL}
                    className="stack-bg-6 shadow-[0_-30px_80px_rgba(59,0,117,0.12)]"
                >
                    <Contact />
                </ScrollStackItem>

            </ScrollStack>
        </>
    );
}
