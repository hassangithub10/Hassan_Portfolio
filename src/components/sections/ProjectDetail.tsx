"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, GlobeAltIcon, CodeBracketIcon, TagIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import type { Project } from "@/db/schema";
import { useRef } from "react";
import GlassCard from "@/components/ui/GlassCard";

interface ProjectDetailProps {
    project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    if (!project) return null;

    return (
        <article ref={containerRef} className="min-h-screen relative bg-charcoal">
            {/* Cinematic Hero Header */}
            <div className="relative h-[80vh] w-full overflow-hidden flex items-end pb-20">
                <motion.div
                    style={{ opacity, scale }}
                    className="absolute inset-0 z-0"
                >
                    {project.imageUrl ? (
                        <>
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-charcoal to-blue-900/40" />
                    )}
                </motion.div>

                <div className="container relative z-10">
                    <motion.div style={{ y: textY }} className="max-w-4xl">
                        <Link
                            href="/#projects"
                            className="inline-flex items-center gap-2 text-lime hover:gap-4 transition-all mb-8 group"
                        >
                            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-heading uppercase tracking-widest text-sm font-bold">Back to Projects</span>
                        </Link>

                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full bg-lime/10 border border-lime/20 text-lime text-xs font-bold uppercase tracking-wider">
                                {project.category}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-[1.1] mb-8 lg:leading-tight">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 mb-12">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-lime text-charcoal rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                                >
                                    <GlobeAltIcon className="w-5 h-5" />
                                    Live Demo
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all"
                                >
                                    <CodeBracketIcon className="w-5 h-5" />
                                    View Repository
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container py-20 relative z-20 -mt-20">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-xl shadow-2xl">
                            <h3 className="text-3xl font-heading font-bold text-white mb-8">About the Project</h3>
                            <div className="prose prose-invert prose-lime max-w-none prose-lg md:prose-xl font-light leading-relaxed text-white/80">
                                <div className="whitespace-pre-wrap">
                                    {project.longDescription || project.shortDescription}
                                </div>
                            </div>

                            {/* Gallery Section */}
                            {(project as any).gallery && (project as any).gallery.length > 0 && (
                                <div className="mt-20 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-white/10" />
                                        <h3 className="font-heading text-white text-xl uppercase tracking-widest">Project Showcase</h3>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {(project as any).gallery.map((img: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.02 }}
                                                className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-lg group"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Gallery image ${i + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <GlassCard className="p-8">
                            <h4 className="font-heading text-white text-lg mb-6 flex items-center gap-2">
                                <RocketLaunchIcon className="w-5 h-5 text-lime" />
                                Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(project.techStack as string[] || []).map(tech => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard className="p-8 bg-gradient-to-br from-lime/5 to-transparent border-lime/20">
                            <h4 className="font-heading text-white text-lg mb-4 italic">Collaborate?</h4>
                            <p className="text-white/60 text-sm mb-6">
                                Think this project is cool? Let's talk about how we can build something similar for you.
                            </p>
                            <Link
                                href="/#contact"
                                className="block text-center py-3 bg-lime text-charcoal rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95"
                            >
                                Let's Build Something
                            </Link>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </article>
    );
}
