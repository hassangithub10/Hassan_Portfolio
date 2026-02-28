"use client";

import { motion } from "framer-motion";
import LogoTicker, { TickerItem } from "@/components/ui/LogoTicker";
import { StarIcon } from "@heroicons/react/24/solid";


export default function SkillsCarousel() {
    // Static Content
    const skills = [
        { id: 1, name: "Next.js", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", proficiencyLevel: 95 },
        { id: 2, name: "React", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", proficiencyLevel: 90 },
        { id: 3, name: "TypeScript", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", proficiencyLevel: 92 },
        { id: 4, name: "Tailwind CSS", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", proficiencyLevel: 98 },
        { id: 5, name: "Node.js", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", proficiencyLevel: 85 },
        { id: 6, name: "MySQL", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", proficiencyLevel: 80 },
        { id: 7, name: "Figma", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", proficiencyLevel: 88 },
        { id: 8, name: "Framer Motion", logoSvgOrUrl: "https://www.framer.com/images/favicons/favicon.png", proficiencyLevel: 90 },
        { id: 9, name: "JavaScript", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", proficiencyLevel: 95 },
        { id: 10, name: "HTML5", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", proficiencyLevel: 98 },
        { id: 11, name: "CSS3", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", proficiencyLevel: 96 },
        { id: 12, name: "Git", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", proficiencyLevel: 90 },
    ];


    // Static Content
    const title = "Technologies";
    const subtitle = "I Work With";
    const description = "A curated selection of modern technologies I use to build high-performance, cinematic digital experiences.";

    return (
        <section id="technologies" className="py-24 relative overflow-hidden bg-black" aria-labelledby="technologies-heading">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FEC107]/20 to-transparent" />

            <div className="container relative z-10">
                <div className="text-center mb-16 mx-auto">
                    <motion.h2
                        id="technologies-heading"
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
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 p-4 transition-all duration-300 group-hover:border-primary-500 group-hover:bg-primary-500/20">
                                        <img
                                            src={skill.logoSvgOrUrl}
                                            alt={skill.name}
                                            className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 transition-all duration-300 group-hover:border-primary-500 group-hover:bg-primary-500/20">
                                        <span className="text-primary-500 font-bold text-2xl group-hover:scale-110 transition-transform">
                                            {skill.name.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <div className="font-heading text-white/50 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                                        {skill.name}
                                    </div>
                                    <div className="flex gap-0.5 mt-2 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`w-3 h-3 ${i < (Math.round((skill.proficiencyLevel || 0) / 20))
                                                    ? "text-[#FEC107]"
                                                    : "text-white/10"
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
