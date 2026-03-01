"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/types";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";


export default function Experience() {
    // Static Content
    const experience = [
        {
            id: 1,
            company: "Digital Konnector Systems (DKS)",
            position: "Frontend Developer",
            location: "Lahore",
            startDate: "Nov 2023",
            endDate: "Present",
            responsibilities: "Leading the frontend team in developing scalable Next.js applications.\nImplementing complex animations using Framer Motion and ensuring WCAG compliance.",
        },
        {
            id: 2,
            company: "Self Employed",
            // position: "Full Stack Developer",
            location: "(Part Time)",
            startDate: "2025",
            endDate: "Present",
            responsibilities: "Developed multiple high-traffic e-commerce sites using React and Node.js.\nOptimized site speed by 40%.",
        },
        {
            id: 3,
            company: "Pseudosquare",
            position: "Internship",
            location: "Lahore",
            startDate: "Jan 2023",
            endDate: "Apr 2024",
            responsibilities: "Developed multiple high-traffic e-commerce sites using React and Node.js.\nOptimized site speed by 40%.",
        }
    ];

    // Static Content
    const title = "Professional";
    const subtitle = "Journey";
    const badgeText = "Experience";
    const badgeColor = "#ff6b35";

    return (
        <section id="experience" className="section relative overflow-hidden" aria-labelledby="experience-heading">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/5 to-transparent rounded-full blur-[120px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 mx-auto"
                >
                    <span className="badge-premium mb-3 mt-6">
                        <BriefcaseIcon className="w-6 h-6 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 id="experience-heading" className="heading-lg text-gray-900">
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
                            {/* Left Border Accent */}
                            <div className="absolute left-0 lg:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />

                            {/* Card */}
                            <article className="relative p-8 md:p-12 ml-6 bg-white/40 backdrop-blur-xl rounded-3xl border border-primary-500/5 overflow-hidden shadow-2xl shadow-primary-500/5">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                        <div className="max-w-xl">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-2 font-heading tracking-tight">
                                                {item.position}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-primary-400 font-bold text-lg md:text-xl lg:text-2xl font-heading">
                                                    {item.company}
                                                </p>
                                                {item.location && (
                                                    <span className="text-gray-900/30 text-xs md:text-sm uppercase tracking-widest font-bold flex items-center gap-1.5">
                                                        <MapPinIcon className="w-3.5 h-3.5" />
                                                        {item.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary-500/5 border border-primary-500/10 text-sm md:text-base font-mono font-bold text-gray-900/60 whitespace-nowrap">
                                            <CalendarIcon className="w-6 h-6 text-primary-500" />
                                            <span>
                                                {item.startDate} - {item.endDate}
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
                                                className="flex items-start gap-4 text-gray-600 text-base md:text-lg leading-relaxed"
                                            >
                                                <span className="text-primary-500 mt-2 flex-shrink-0 text-xl leading-none">▹</span>
                                                <span className="flex-1">{line}</span>
                                            </motion.p>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
