"use client";

import { motion } from "framer-motion";
import LogoTicker, { TickerItem } from "@/components/ui/LogoTicker";
import type { Skill } from "@/db/schema";

interface SkillsCarouselProps {
    skills: Skill[];
    content: any;
}

export default function SkillsCarousel({ skills, content }: SkillsCarouselProps) {
    if (!skills || skills.length === 0) return null;

    // Dynamic Content Defaults
    const title = content?.title || "Technologies";
    const subtitle = content?.subtitle || "I Work With";
    const description = content?.description || "Dynamically updated tech stack ensuring modern and performant solutions.";

    return (
        <section id="technologies" className="py-24 relative overflow-hidden bg-black">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FEC107]/20 to-transparent" />

            <div className="container relative z-10">
                <div className="text-center mb-16 mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="heading-md text-white mb-4"
                    >
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#FDDFCC]/60 max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                </div>

                <LogoTicker speed={30} pauseOnHover={true}>
                    {skills.map((skill) => (
                        <TickerItem key={skill.id} className="min-w-[120px] md:min-w-[180px]">
                            <div className="flex flex-col items-center gap-4 py-2">
                                {skill.logoSvgOrUrl ? (
                                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary-500 transition-all duration-500 p-4">
                                        <img
                                            src={skill.logoSvgOrUrl}
                                            alt={skill.name}
                                            className="w-full h-full object-contain filter brightness-90 hover:brightness-110 transition-all"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                                        <span className="text-primary-500 font-bold text-2xl">
                                            {skill.name.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <div className="font-heading text-white/50 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                                        {skill.name}
                                    </div>
                                    <div className="flex gap-1 mt-2 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-1 h-1 rounded-full ${i < (Math.round((skill.proficiencyLevel || 0) / 20))
                                                    ? "bg-primary-500"
                                                    : "bg-white/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TickerItem>
                    ))}
                </LogoTicker>
            </div>
        </section>
    );
}
