"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/db/schema";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ExperienceProps {
    experience: Experience[];
    content: any;
}

export default function Experience({ experience, content }: ExperienceProps) {
    if (experience.length === 0) return null;

    // Dynamic Content Defaults
    const title = content?.title || "Professional";
    const subtitle = content?.subtitle || "Journey";
    const badgeText = content?.badgeText || "Experience";
    const badgeColor = content?.badgeColor || "#ff6b35";

    return (
        <section id="experience" className="section relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-[#ff6b35]/10 to-transparent rounded-full blur-[120px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 mx-auto"
                >
                    <span className="badge-premium mb-6">
                        <BriefcaseIcon className="w-4 h-4 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                </motion.div>

                {/* Experience Cards */}
                <div className="max-w-6xl mx-auto space-y-12 md:space-y-16 px-4 sm:px-0">
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative group lg:px-6"
                        >
                            {/* Neon Left Border */}
                            <div className="absolute left-0 lg:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 via-[#b026ff] to-primary-600 rounded-full" />

                            {/* Card */}
                            <div className="relative p-8 md:p-12 ml-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                        <div className="max-w-xl">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 font-heading tracking-tight">
                                                {item.position}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-primary-400 font-bold text-lg md:text-xl lg:text-2xl font-heading">
                                                    {item.company}
                                                </p>
                                                {item.location && (
                                                    <span className="text-white/30 text-xs md:text-sm uppercase tracking-widest font-bold flex items-center gap-1.5">
                                                        <MapPinIcon className="w-3.5 h-3.5" />
                                                        {item.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base font-mono font-bold text-white/60 whitespace-nowrap">
                                            <CalendarIcon className="w-4 h-4 text-[#b026ff]" />
                                            <span>
                                                {new Date(item.startDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                })}{" "}
                                                -{" "}
                                                {item.endDate
                                                    ? new Date(item.endDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                    })
                                                    : "Present"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Responsibilities */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {item.responsibilities.split("\n").map((line, i) => (
                                            <motion.p
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.05 }}
                                                className="flex items-start gap-4 text-white/70 text-base md:text-lg leading-relaxed"
                                            >
                                                <span className="text-primary-500 mt-2 flex-shrink-0 text-xl leading-none">▹</span>
                                                <span className="flex-1">{line}</span>
                                            </motion.p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
