"use client";

import { motion } from "framer-motion";
import type { Education } from "@/lib/types";
import { AcademicCapIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Parallax3DCard from "@/components/ui/Parallax3DCard";


export default function Education() {
    // Static Content
    const education = [
        {
            id: 1,
            institution: "Government College University Faisalabad",
            degree: "BS Hons Computer Science",
            fieldOfStudy: "Computer Science",
            startDate: "2018",
            endDate: "2022",
            description: "Focused on Software Engineering, Web Technologies, and Human-Computer Interaction.",
        }
    ];

    const title = "Academic";
    const subtitle = "Journey";
    const badgeText = "Education";

    return (
        <section id="education" className="section relative overflow-hidden" aria-labelledby="education-heading">
            {/* Background Effects */}
            <div className="float-orb absolute top-20 right-20 w-72 h-72 bg-primary-500/5 rounded-full blur-[120px]" />
            <div className="float-orb-slow absolute bottom-20 left-20 w-96 h-96 bg-primary-600/5 rounded-full blur-[140px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: -6 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                    className="text-center mb-10 mx-auto"
                >
                    <span className="badge-premium mb-3 mt-6">
                        <AcademicCapIcon className="w-6 h-6 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 id="education-heading" className="heading-lg text-gray-900">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-6xl mx-auto relative px-4 sm:px-0">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500/30 via-primary-600/30 to-primary-500/30 -translate-x-1/2 md:translate-x-0" />

                    <div className="space-y-12 md:space-y-20">
                        {education.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -8 : 8 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                                style={{ perspective: "1200px" }}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } gap-8 items-start md:items-center`}
                            >
                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                                    <Parallax3DCard
                                        maxTilt={10}
                                        glowColor="rgba(249, 115, 22, 0.2)"
                                        className="relative p-6 md:p-8 bg-white/90 backdrop-blur-xl rounded-2xl border border-primary-500/20 group overflow-hidden card-3d shadow-md hover:shadow-xl"
                                    >

                                        {/* Shimmer top border */}
                                        <div className="shimmer-line absolute top-0 left-0 w-full h-[2px]" />

                                        <div className="relative z-10">
                                            <div className={`flex items-center gap-2 text-primary-400 text-sm mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                                <CalendarIcon className="w-6 h-6" />
                                                <span className="font-mono font-bold tracking-tighter">
                                                    {new Date(item.startDate).getFullYear()} —{" "}
                                                    {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-heading tracking-tight">{item.degree}</h3>
                                            {item.fieldOfStudy && (
                                                <p className="text-primary-500 font-bold mb-2 uppercase text-xs tracking-widest">{item.fieldOfStudy}</p>
                                            )}
                                            <p className="text-gray-900/80 font-semibold mb-4 text-base md:text-lg">{item.institution}</p>

                                            {item.description && (
                                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                                            )}
                                        </div>
                                    </Parallax3DCard>
                                </div>

                                {/* Center Dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white z-20 -translate-x-1/2 shadow-lg shadow-primary-500/30"
                                />

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
