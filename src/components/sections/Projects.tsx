"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import type { Project } from "@/db/schema";
import { RocketLaunchIcon, ArrowTopRightOnSquareIcon, UsersIcon } from "@heroicons/react/24/outline";

interface ProjectsProps {
    projects: Project[];
    content: any;
}

export default function Projects({ projects = [], content }: ProjectsProps) {
    const allCategories = useMemo(() => ["All", ...Array.from(new Set(projects.map(p => p.category)))], [projects]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredProjects = useMemo(() => {
        if (selectedCategory === "All") return projects;
        return projects.filter(p => p.category === selectedCategory);
    }, [projects, selectedCategory]);

    if (projects.length === 0) return null;

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
                    {allCategories.map((category) => (
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
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
    const collaborators = (project.collaborators as { name: string; url?: string }[] | null) ?? [];
    const techStack = (project.techStack as string[] | null) ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative"
        >
            <a
                href={project.liveUrl || "#"}
                target={project.liveUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={clsx("block", !project.liveUrl && "cursor-default pointer-events-none")}
                onClick={!project.liveUrl ? (e) => e.preventDefault() : undefined}
            >
                <div className="relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-500 group-hover:border-primary-500/50 group-hover:bg-white/[0.07] group-hover:shadow-[0_0_40px_rgba(0,240,255,0.06)]">

                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden">
                        {project.imageUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-900/60 to-black flex items-center justify-center">
                                <RocketLaunchIcon className="w-12 h-12 text-white/10" />
                            </div>
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />

                        {/* Category + Featured badge */}
                        <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                            <span className="badge-premium scale-90 bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-xl">
                                {project.category}
                            </span>
                            {project.featured && (
                                <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest bg-primary-500/10 px-2 py-1 rounded border border-primary-500/20">
                                    Featured
                                </span>
                            )}
                        </div>

                        {/* External link icon (top-right, show on hover) */}
                        {project.liveUrl && (
                            <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-primary-400" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Title */}
                        <h3 className="text-xl font-black text-white font-heading tracking-tight group-hover:text-primary-400 transition-colors mb-4">
                            {project.title}
                        </h3>

                        {/* Tech Stack */}
                        {techStack.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {techStack.slice(0, 5).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/8"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {techStack.length > 5 && (
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 border border-white/5">
                                        +{techStack.length - 5}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Collaborators */}
                        {collaborators.length > 0 ? (
                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <UsersIcon className="w-3 h-3 text-white/30" />
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Collaborators</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {collaborators.map((collab, i) => (
                                        collab.url ? (
                                            <a
                                                key={i}
                                                href={collab.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs hover:bg-white/10 hover:text-white transition-all"
                                            >
                                                {collab.name}
                                                <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs">
                                                {collab.name}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-white/5 text-white/20 text-xs italic">
                                Solo Project
                            </div>
                        )}
                    </div>
                </div>
            </a>
        </motion.div>
    );
}
