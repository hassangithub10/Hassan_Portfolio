"use client";

import { motion } from "framer-motion";
import type { Education } from "@/db/schema";
import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface EducationProps {
    education: Education[];
    content: any;
}

export default function Education({ education, content }: EducationProps) {
    if (education.length === 0) return null;

    // Dynamic Content Defaults
    const title = content?.title || "Academic";
    const subtitle = content?.subtitle || "Journey";
    const badgeText = content?.badgeText || "Education";
    const badgeColor = content?.badgeColor || "#b026ff";

    return (
        <section id="education" className="section relative overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-[#00f0ff]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#b026ff]/10 rounded-full blur-[140px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 mx-auto"
                >
                    <span className="badge-premium mb-6">
                        <AcademicCapIcon className="w-4 h-4 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-6xl mx-auto relative px-4 sm:px-0">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500/50 via-[#b026ff]/50 to-primary-500/50 -translate-x-1/2 md:translate-x-0" />

                    <div className="space-y-12 md:space-y-20">
                        {education.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } gap-8 items-start md:items-center`}
                            >

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="relative p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 group overflow-hidden"
                                    >
                                        {/* Glow on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-[#b026ff]/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10">
                                            <div className={`flex items-center gap-2 text-primary-400 text-sm mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                                <CalendarIcon className="w-4 h-4" />
                                                <span className="font-mono font-bold tracking-tighter">
                                                    {new Date(item.startDate).getFullYear()} -{" "}
                                                    {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading tracking-tight">{item.degree}</h3>
                                            {item.fieldOfStudy && (
                                                <p className="text-[#b026ff] font-bold mb-2 uppercase text-xs tracking-widest">{item.fieldOfStudy}</p>
                                            )}
                                            <p className="text-white/80 font-semibold mb-4 text-base md:text-lg">{item.institution}</p>

                                            {item.description && (
                                                <p className="text-white/50 text-sm md:text-base leading-relaxed">{item.description}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-black z-20 -translate-x-1/2 shadow-[0_0_15px_rgba(var(--color-primary),0.5)]" />

                                {/* Spacer for desktop */}
                                <div className="hidden md:block w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
