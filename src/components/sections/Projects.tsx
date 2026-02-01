"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { clsx } from "clsx";
import type { Project } from "@/db/schema";
import { RocketLaunchIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ProjectsProps {
    projects: Project[];
    content: any;
}

const categories = ["All", "Web Development", "Apps", "Tools"] as const;

export default function Projects({ projects = [], content }: ProjectsProps) {
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");

    const filteredProjects = useMemo(() => {
        if (selectedCategory === "All") return projects;
        return projects.filter(p => p.category === selectedCategory);
    }, [projects, selectedCategory]);

    if (projects.length === 0) return null;

    // Dynamic Content Defaults
    const title = content?.title || "Featured";
    const subtitle = content?.subtitle || "Projects";
    const description = content?.description || "A showcase of my recent work including commercial projects and open source contributions.";
    const badgeText = content?.badgeText || "Portfolio";

    return (
        <section id="projects" className="section bg-black relative">
            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 mx-auto"
                >
                    <span className="badge-premium mb-6">
                        <RocketLaunchIcon className="w-4 h-4 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                    {description && (
                        <p className="body-lg text-white/60 max-w-2xl mx-auto mt-6">{description}</p>
                    )}
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={clsx(
                                "px-8 py-3 rounded-full font-bold font-heading uppercase text-xs tracking-widest transition-all duration-500 border",
                                selectedCategory === category
                                    ? "bg-primary-500 border-primary-400 text-black shadow-lg shadow-primary-500/30"
                                    : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border-white/10"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <p className="text-center text-white/40 py-20 font-heading uppercase tracking-widest">No projects found in this category.</p>
                )}
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative"
        >
            <Link href={`/projects/${project.slug}`}>
                <div className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-500 group-hover:border-primary-500/50 group-hover:bg-white/[0.08]">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                        {project.imageUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-900 to-black" />
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />

                        {/* Status/Badge if featured */}
                        {project.featured && (
                            <div className="absolute top-4 left-4">
                                <span className="badge-premium scale-75 origin-top-left bg-primary-500 text-black border-none">
                                    Featured
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-black text-white font-heading tracking-tight group-hover:text-primary-400 transition-colors">
                                {project.title}
                            </h3>
                            <div className="p-2 rounded-xl bg-white/5 text-primary-400 opacity-0 group-hover:opacity-100 transition-all">
                                <RocketLaunchIcon className="w-5 h-5" />
                            </div>
                        </div>

                        <p className="text-white/60 text-base leading-relaxed mb-8 line-clamp-2">
                            {project.shortDescription}
                        </p>

                        {/* Tech Stack */}
                        {project.techStack && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack.slice(0, 3).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-bold text-white/40 uppercase tracking-widest"
                                    >
                                        #{tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="pt-4 border-t border-white/5">
                            {project.collaboratorName ? (
                                <div className="space-y-3">
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        Collaborator
                                    </div>
                                    <a
                                        href={project.collaboratorLinkedIn || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold hover:bg-primary-500/20 transition-all group/badge"
                                    >
                                        <span>{project.collaboratorName}</span>
                                        <ArrowTopRightOnSquareIcon className="w-3 h-3 transition-transform group-hover/badge:-translate-y-0.5 group-hover/badge:translate-x-0.5" />
                                    </a>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 text-primary-400 text-sm font-bold uppercase tracking-widest group-hover:text-primary-300 transition-colors">
                                    <span>Explore Details</span>
                                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
