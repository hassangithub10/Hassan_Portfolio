"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import type { Project } from "@/lib/types";
import { RocketLaunchIcon, ArrowTopRightOnSquareIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function Projects() {
    // Static Content
    const projects: Project[] = [
        {
            id: 1,
            title: "D&D Autoworks",
            slug: null,
            shortDescription: "Family-owned automotive repair shop in Minneapolis serving all vehicle makes and models since 1997.",
            longDescription: "D&D Autoworks is a trusted auto repair destination in Minneapolis, MN. Since 1997, they have provided professional maintenance and repair services for all makes and models, emphasizing high-quality care, long-term reliability, and customer trust.",
            techStack: ["Wordpress", "Elementor", "WP Forms"],
            liveUrl: "https://www.danddautoworks.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/dnd.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "D&D Autoworks - Family Owned Auto Repair Since 1997",
            metaDescription: "D&D Autoworks is a family-owned automotive repair shop in Minneapolis serving all makes and models of vehicles since 1997.",
            keywords: "Automotive Repair, Family-owned, Minneapolis, Auto maintenance, Engine repair, Since 1997, All makes and models.",
            gallery: null,
            collaborators: "Faisal Zafar, Bilal", // Solo Project
        },
        {
            id: 2,
            title: "Cheo's Auto Service",
            slug: null,
            shortDescription: "Trusted auto shop in Apache Junction offering honest repairs and family-oriented care for all vehicle needs.",
            longDescription: "Cheo's Auto Service is a Raise a Hood Certified shop in Apache Junction, AZ, providing high-quality, honest auto repairs. They specialize in engine and transmission repair, diagnostics, and brakes, ensuring every customer is treated like family.",
            techStack: ["Wordpress", "Elementor", "WP Forms"],
            liveUrl: "https://www.cheosautoservice.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/cheosautosservice.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Cheo's Auto Service – Where Every Customer Feels Like Family.",
            metaDescription: "Trusted auto shop in Apache Junction offering honest repairs and family-oriented care for all your vehicle needs.",
            keywords: "Auto Service, Apache Junction, Engine Repair, Transmission Repair, Electrical, Diagnostics, Brakes, Suspension, Tires, Honest Repairs.",
            gallery: null,
            collaborators: "Faisal Zafar, Bilal", // Solo Project
        },
        {
            id: 3,
            title: "Oriscare",
            slug: null,
            shortDescription: "Premium dental care by expert Smile Artists focusing on the harmony of oral health and aesthetic beauty.",
            longDescription: "Led by Dr. Lorna Flamer-Caldera and Dr. Thema Hepburn, Oris provides a full range of restorative and preventive dental therapies. They focus on building beautiful smiles on a foundation of optimal health through personalized, high-end care.",
            techStack: ["Wordpress", "Elementor", "WP Forms"],
            liveUrl: "https://www.oriscare.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/oriscare.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Oris Enhanced Oral Health & Beauty",
            metaDescription: "Smile Artist cosmetic dentists trusted by celebrities create natural, confident smiles. Read reviews and discover your perfect smile today.",
            keywords: "Smile Artists, Oral Health, Beauty, Restorative therapies, Preventive therapies, Fillings, Root canals, Extractions, Cosmetic Dentist.",
            gallery: null,
            collaborators: "Faisal Zafar, Bilal", // Solo Project
        },
        {
            id: 4,
            title: "Digital Konnecter Systems",
            slug: null,
            shortDescription: "Leading I.T integrator in Pakistan providing innovative software solutions to transform and scale your business.",
            longDescription: "Digital Konnecter Systems specializes in structured software development and innovative business solutions. They focus on streamlining complex systems to enhance productivity and drive growth through cutting-edge technology and in-depth research.",
            techStack: ["Nextjs", "Drizzle", "Framer Motion", "UI/UX"],
            liveUrl: "https://www.dks.com.pk",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/dks.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Digital Konnector Systems - Digital Konnecter Systems",
            metaDescription: "Digital Konnector Systems follows a structured approach to software development, ensuring quality and efficiency at every stage.",
            keywords: "I.T Integrator, Software Development, Innovative IT solutions, System streamlining, Business growth, Software Research.",
            gallery: null,
            collaborators: "Faisal Zafar", // Solo Project
        },
        {
            id: 5,
            title: "Al Makki Al Madni Dialysis Center",
            slug: null,
            shortDescription: "Non-profit dialysis center in Pakistan providing free and subsidized care for chronic kidney disease patients.",
            longDescription: "Founded by Dr. M. Jamil, MMDC combines expert dialysis care with a mission to help underprivileged CKD patients. Since 2022, they've completed over 10,000 sessions, offering high-quality treatment and hope to those in urgent need.",
            techStack: ["Wordpress", "Elementor", "Adobe Photoshop", "UI/UX"],
            liveUrl: "https://www.mmdcpak.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/mmdc.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Al Makki Al Madni Dialysis Center - MMDC",
            metaDescription: "Non-profit dialysis center in Pakistan providing free and subsidized care for chronic kidney disease (CKD) patients.",
            keywords: "Dialysis Center, Chronic Kidney Disease, CKD, Free dialysis, Subsidized dialysis, Dr. M. Jamil, Pakistan, Health Charity.",
            gallery: null,
            collaborators: "Faisal Zafar, Bilal", // Solo Project
        },
        {
            id: 6,
            title: "Khudii Welfare Organization",
            slug: null,
            shortDescription: "Pakistan's largest digital welfare platform connecting donors and volunteers to create lasting social impact.",
            longDescription: "Khudii is a pioneering e-community in Pakistan that fosters social welfare by connecting storytellers, donors, and volunteers. It supports diverse programs including health and education, empowering individuals to contribute to a better, more purposeful society.",
            techStack: ["Reactjs", "Tailwind CSS", "Framer Motion", "UI/UX"],
            liveUrl: "https://www.khudii.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/khudii.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Khudii - Pakistan's Largest Digital Welfare Platform | Community Support",
            metaDescription: "Khudii is Pakistan's premier digital welfare platform connecting donors, volunteers, and organizations across health, education, and community development.",
            keywords: "khudii pakistan, digital welfare platform, charity donors, volunteer opportunities, health programs, autism care, social welfare.",
            gallery: null,
            collaborators: "Faisal Zafar, Abu Huraira", // Solo Project
        },
        {
            id: 7,
            title: "Mindzbay",
            slug: null,
            shortDescription: "Mindzbay offers an intelligent, Unified Communication Platform (CPaaS) for call centers, omni-chat, and AI solutions.",
            longDescription: "Mindzbay provides a unified communication platform (CPaaS) designed to drive revenue and reputation. Their AI-driven suite features call centers, omni-chat, video, and voice channels, helping businesses transition into the future of unified communication and excellence.",
            techStack: ["Wordpress", "Elementor", "WP Forms"],
            liveUrl: "https://www.mindzbay.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/mindzbay.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Home - Mindzbay",
            metaDescription: "Mindzbay - Driven by creativity and innovation, we merge state-of-the-art design with powerful AI technology to help businesses thrive.",
            keywords: "Unified CRM, CPaaS, AI Communication Platform, Call Center Software, Omni-Chat, Video, Voice.",
            gallery: null,
            collaborators: "Faisal Zafar, Usman", // Solo Project
        },
        {
            id: 8,
            title: "Taryaq Welfare Organization",
            slug: null,
            shortDescription: "A premium domain name platform offering a secure and straightforward process for buying or leasing domains.",
            longDescription: "Taryaq.com is currently a specialized domain listing providing a safe and simple way for businesses or individuals to acquire premium domain names. The platform focuses on ensuring a smooth and secure transfer process for all types of domain acquisitions.",
            techStack: ["Wordpress", "Elementor", "WP Forms"],
            liveUrl: "https://www.taryaq.com",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/taryaq.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "taryaq.com",
            metaDescription: "The simple, and safe way to buy domain names. No matter what kind of domain you want to buy or lease, we make the transfer simple and safe.",
            keywords: "buy domain, lease domain, domain transfer, taryaq.com",
            gallery: null,
            collaborators: "Faisal Zafar", // Solo Project
        },
        {
            id: 9,
            title: "Tanzeem e Islami",
            slug: null,
            shortDescription: "Tanzeem-e-Islami focuses on re-establishing Khilafah through prophetic methodology and Quranic teachings.",
            longDescription: "Founded by Dr. Israr Ahmed, Tanzeem-e-Islami is a Pakistan-based organization dedicated to the revival of Khilafah. It emphasizes Islamic education and social transformation based on the Sunnah to establish a just society according to the methodology of Prophet Muhammad (SAWS).",
            techStack: ["Wordpress", "Elementor", "WP Forms"],
            liveUrl: "https://www.tanzeemeislami.org",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/tanzeem.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "TANZEEM-E-ISLAMI, Pakistan - Working To Re-establish / Re-instate Khilafah By Following The Methodology Of Prophet Muhammad (SAWS)",
            metaDescription: "TANZEEM-E-ISLAMI, Pakistan is working to re-establish / re-instate Khilafah by following the methodology of prophet Muhammad (SAWS).",
            keywords: "Tanzeem-e-Islami, Khilafah, Dr. Israr Ahmed, Islamic Methodology, Quranic Teachings, Pakistan Islamic Movement.",
            gallery: null,
            collaborators: "Faisal Zafar, Bilal", // Solo Project
        },
        {
            id: 10,
            title: "Ali Zaman Portfolio",
            slug: null,
            shortDescription: "Engr. Ali Zaman is an expert in Strategic Planning and Supply Chain with over 12 years of operational excellence.",
            longDescription: "Engr. Ali Zaman is a seasoned professional specializing in Strategic Planning, Supply Chain, and Operational Excellence. With international exposure in Singapore and Thailand, he excels in change management, production planning, and business optimization, driving growth and efficiency across industries.",
            techStack: ["Nextjs", "Tailwind CSS", "Framer Motion", "UI/UX"],
            liveUrl: "https://www.alizaman.site",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/alizaman.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Engr. Ali Zaman | Strategic Planning & Supply Chain Expert",
            metaDescription: "Portfolio of Engr. Ali Zaman, a specialist in Strategic Planning, Supply Chain, and Operational Excellence with 12+ years of experience.",
            keywords: "Ali Zaman, Strategic Planning, Supply Chain, Operations, Production Planning, Change Management, Business Optimization",
            gallery: null,
            collaborators: "Solo Project", // Solo Project
        },
        {
            id: 11,
            title: "Ahmed Zaman Portfolio",
            slug: null,
            shortDescription: "A result-oriented PPC Officer and Operations Manager specializing in unlocking growth and brand awareness.",
            longDescription: "Ahmed Zaman is a professional PPC Officer and Operations Manager with expertise in production planning and financial accounting. Holding a Master in Commerce and having worked at Stylers International, he focuses on optimizing workflows and driving operational efficiency for small businesses.",
            techStack: ["Nextjs", "Tailwind CSS", "Framer Motion", "UI/UX"],
            liveUrl: "https://ahmed-zaman-portfolio.vercel.app",
            githubUrl: null,
            imageUrl: "/uploads/2026/03/ahmedzaman.webp",
            category: "Web Development",
            featured: true,
            isVisible: true,
            createdAt: new Date(),
            sortOrder: 1,
            metaTitle: "Ahmed Zaman - PPC Officer & Operations Manager",
            metaDescription: "Ahmed Zaman is a passionate PPC Officer and Operations Manager with a proven track record in production planning and business growth.",
            keywords: "Ahmed Zaman, PPC Officer, Operations Manager, Production Planning, Financial Accounting, Business Growth, Faisalabad",
            gallery: null,
            collaborators: "Solo Project", // Solo Project
        }
    ];


    const allCategories = useMemo(() => Array.from(new Set(projects.map(p => p.category))), [projects]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Web Development");

    const filteredProjects = useMemo(() => {
        return projects.filter(p => p.category === selectedCategory);
    }, [selectedCategory, projects]);


    const title = "Featured";
    const subtitle = "Projects";
    const description = "A showcase of my recent work including commercial projects and open source contributions.";
    const badgeText = "Portfolio";

    return (
        <section id="projects" className="section relative overflow-hidden" aria-labelledby="projects-heading">
            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 mx-auto"
                >
                    <span className="badge-premium mb-3 mt-6">
                        <RocketLaunchIcon className="w-6 h-6 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 id="projects-heading" className="heading-lg text-gray-900">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                    {description && (
                        <p className="body-lg text-gray-600 max-w-2xl mx-auto mt-6">{description}</p>
                    )}
                </motion.div>

                {/* Filter Tabs Removed */}

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <p className="text-center text-gray-900/40 py-20 font-heading uppercase tracking-widest">No projects found in this category.</p>
                )}
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const techStack = (project.techStack as string[] | null) ?? [];

    // Process collaborators: handle string (comma separated) or array
    const collaboratorsList = useMemo(() => {
        if (!project.collaborators) return [];
        if (typeof project.collaborators === "string") {
            const trimmed = project.collaborators.trim();
            if (!trimmed) return [];
            return trimmed.split(",").map(name => ({ name: name.trim() }));
        }
        return project.collaborators;
    }, [project.collaborators]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative h-full"
        >
            <a
                href={project.liveUrl || "#"}
                target={project.liveUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={clsx("block h-full", !project.liveUrl && "cursor-default pointer-events-none")}
                onClick={!project.liveUrl ? (e) => e.preventDefault() : undefined}
                aria-label={project.liveUrl ? `View live project: ${project.title}` : `Project details: ${project.title}`}
            >
                <article className="relative overflow-hidden rounded-[2.5rem] bg-white border border-primary-500/5 transition-all duration-500 group-hover:border-primary-500/30 group-hover:shadow-2xl group-hover:shadow-primary-500/10 flex flex-col h-full">

                    {/* Project Image Area */}
                    <div className="relative w-full aspect-[16/10] p-2">
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-gray-100 shadow-inner">
                            {project.imageUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={project.imageUrl}
                                    alt={`Screenshot of the ${project.title} project`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center">
                                    <RocketLaunchIcon className="w-12 h-12 text-primary-500/20" />
                                </div>
                            )}

                            {/* Overlay Badges */}
                            <div className="absolute top-4 left-4 flex flex-col items-start gap-4">
                                <span className="px-6 py-2.5 bg-white/40 backdrop-blur-xl border border-white/40 text-primary-900 font-heading text-sm font-black uppercase tracking-widest rounded-full shadow-lg">
                                    {project.category}
                                </span>
                                {project.featured === true && (
                                    <span className="px-4 py-1.5 border-2 border-primary-500/40 text-primary-500 font-heading text-xs font-black uppercase tracking-tighter rounded-md backdrop-blur-md bg-white/5">
                                        FEATURED
                                    </span>
                                )}
                            </div>

                            {/* External link icon (top-right, show on hover) */}
                            {project.liveUrl && (
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md border border-primary-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-xl">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-primary-600" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 pt-4 flex-1 flex flex-col">
                        {/* Title */}
                        <h3 className="text-3xl font-black text-[#3a0076] font-heading tracking-tight">
                            {project.title}
                        </h3>

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 mt-4 mb-4" />

                        {/* Tech Stack Tags */}
                        {techStack.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-auto">
                                {techStack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-black text-gray-900/50 uppercase tracking-widest px-5 py-2.5 rounded-2xl bg-primary-500/5 border border-primary-500/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 mt-4 mb-4" />

                        {/* Collaborators Section */}
                        <div className="flex items-center justify-between min-h-[2.5rem]">
                            {collaboratorsList.length > 0 ? (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {collaboratorsList.map((collab, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] font-black text-[#3a0076] uppercase tracking-widest px-3 py-1.5 rounded-xl bg-gray-50 border border-[#3a0076]/50"
                                        >
                                            {collab.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-[#3a0076] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border border-[#3a0076]/20 bg-[#3a0076]/5">
                                    Self
                                </span>
                            )}
                        </div>
                    </div>
                </article>
            </a>
        </motion.div>
    );
}
