import Hero from "@/components/sections/Hero";
import StructuredData from "@/components/seo/StructuredData";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import BlogCarousel from "@/components/sections/BlogCarousel";
import SkillsCarousel from "@/components/sections/SkillsCarousel";
import Contact from "@/components/sections/Contact";
import {
    getPersonalInfo,
    getVisibleEducation,
    getVisibleExperience,
    getVisibleProjects,
    getFeaturedSkills,
    getVisibleSkills,
    getVisibleServices,
    getVisibleBlogPosts,
    getSiteSettings,
    getAllSectionContent, // Import new action
} from "@/lib/actions";

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
    // Fetch all data in parallel
    const [
        personalInfo,
        education,
        experience,
        projects,
        skills,
        services,
        blogPosts,
        settings,
        allVisibleSkills,
        sectionContent
    ] = await Promise.all([
        getPersonalInfo(),
        getVisibleEducation(),
        getVisibleExperience(),
        getVisibleProjects(),
        getFeaturedSkills(),
        getVisibleServices(),
        getVisibleBlogPosts(),
        getSiteSettings(),
        getVisibleSkills(),
        getAllSectionContent(),
    ]);

    // Helper to get content for a specific section
    const getContent = (key: string) => sectionContent.find((s: any) => s.sectionKey === key);

    const stats = {
        yearsExperience: settings.find(s => s.settingKey === "about_experience_years")?.settingValue || "3+",
        projectsCompleted: settings.find(s => s.settingKey === "about_projects_completed")?.settingValue || "20+",
        happyClients: settings.find(s => s.settingKey === "about_happy_clients")?.settingValue || "8+",
        technologiesCount: settings.find(s => s.settingKey === "about_technologies_count")?.settingValue || "20+",
    };

    const isVisible = (section: string) => {
        const setting = settings.find(s => s.settingKey === `section_${section}_visible`);
        return setting ? setting.settingValue === "true" : true; // Default to visible
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Hassan Sarfraz",
        "url": "https://hassansarfraz.online", // Should be dynamic from settings but hardcoded safety
        "jobTitle": personalInfo?.title || "Frontend Developer",
        "description": personalInfo?.bio,
        "sameAs": [
            // Add social links from settings if available
            settings.find(s => s.settingKey === "social_github")?.settingValue,
            settings.find(s => s.settingKey === "social_linkedin")?.settingValue,
        ].filter(Boolean)
    };

    return (
        <>
            <StructuredData data={jsonLd} />
            {isVisible('hero') && <Hero info={personalInfo} content={getContent('hero')} settings={settings} />}
            {isVisible('about') && <About skills={skills} stats={stats} content={getContent('about')} />}
            {isVisible('education') && <Education education={education} content={getContent('education')} />}
            {isVisible('experience') && <Experience experience={experience} content={getContent('experience')} />}
            {isVisible('projects') && <Projects projects={projects} content={getContent('projects')} />}
            {isVisible('skills') && <SkillsCarousel skills={allVisibleSkills} content={getContent('technologies')} />}
            {isVisible('services') && <Services services={services} content={getContent('services')} />}
            {isVisible('blog') && <BlogCarousel posts={blogPosts} content={getContent('blog')} />}
            {isVisible('contact') && <Contact info={personalInfo} content={getContent('contact')} />}
        </>
    );
}
