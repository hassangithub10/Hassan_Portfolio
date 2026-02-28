import Hero from "@/components/sections/Hero";
import StructuredData from "@/components/seo/StructuredData";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import SkillsCarousel from "@/components/sections/SkillsCarousel";
import Contact from "@/components/sections/Contact";
import { getDynamicSEO } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return await getDynamicSEO(
        "/",
        "Home",
        "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies."
    );
}

export default async function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Hassan Sarfraz",
        "url": "https://hassansarfraz.online",
        "jobTitle": "Frontend Developer & AI Enthusiast",
        "description": "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence.",
        "sameAs": [
            "https://github.com/hassan",
            "https://linkedin.com/in/hassansarfraz"
        ]
    };

    return (
        <>
            <StructuredData data={jsonLd} />
            <Hero />
            <About />
            <Education />
            <Experience />
            <Projects />
            <SkillsCarousel />
            <Services />
            <Contact />
        </>
    );
}
