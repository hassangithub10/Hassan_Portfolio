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
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return await getDynamicSEO(
        "/",
        "Home",
        "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies.",
        {
            url: "/",
        }
    );
}

export default async function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://hassansarfraz.online/#website",
                "url": "https://hassansarfraz.online/",
                "name": "Hassan Sarfraz Portfolio",
                "description": "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence.",
                "publisher": {
                    "@id": "https://hassansarfraz.online/#person"
                }
            },
            {
                "@type": "Person",
                "@id": "https://hassansarfraz.online/#person",
                "name": "Hassan Sarfraz",
                "url": "https://hassansarfraz.online",
                "jobTitle": "Frontend Developer & AI Enthusiast",
                "description": "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence.",
                "image": "https://hassansarfraz.online/logo.svg",
                "sameAs": [
                    "https://www.linkedin.com/in/hassan-s-101a8978",
                    "https://github.com/hassangithub10"
                ],
                "knowsAbout": ["React", "Next.js", "Web Development", "TypeScript", "Frontend Engineering"]
            }
        ]
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
