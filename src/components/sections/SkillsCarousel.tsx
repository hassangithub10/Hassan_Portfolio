"use client";

import { motion } from "framer-motion";
import LogoTicker, { TickerItem } from "@/components/ui/LogoTicker";
import { StarIcon } from "@heroicons/react/24/solid";
import Parallax3DCard from "@/components/ui/Parallax3DCard";
import { executeRecaptcha } from "@/lib/recaptcha";



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
        { id: 8, name: "JavaScript", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", proficiencyLevel: 95 },
        { id: 9, name: "HTML5", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", proficiencyLevel: 98 },
        { id: 10, name: "CSS3", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", proficiencyLevel: 96 },
        { id: 11, name: "Git", logoSvgOrUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", proficiencyLevel: 90 },
    ];

    const title = "Technologies";
    const subtitle = "I Work With";
    const description = "A curated selection of modern technologies I use to build high-performance, cinematic digital experiences.";

    return (
        <section id="technologies" className="section relative overflow-hidden" aria-labelledby="technologies-heading">
            {/* Shimmer border lines */}
            <div className="shimmer-line absolute top-0 left-0 w-full h-[1px]" />
            <div className="shimmer-line absolute bottom-0 left-0 w-full h-[1px]" style={{ animationDelay: "1.5s" }} />

            {/* Background orb */}
            <div className="float-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-[100px]" />

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: -6 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                    className="text-center mb-8 mx-auto"
                >
                    <motion.h2
                        id="technologies-heading"
                        className="heading-md text-gray-900 mb-4"
                    >
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                </motion.div>

                <LogoTicker speed={30} pauseOnHover={true}>
                    {skills.map((skill) => (
                        <TickerItem key={skill.id} className="min-w-[120px] md:min-w-[180px]">
                            <div onClick={() => executeRecaptcha(`skill_interact_${skill.name.toLowerCase()}`)}>
                                <Parallax3DCard
                                    maxTilt={16}
                                    glowColor="rgba(249, 115, 22, 0.2)"

                                    hoverScale={1.08}
                                    className="flex flex-col items-center gap-4 py-2 cursor-pointer"
                                >

                                {skill.logoSvgOrUrl ? (
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 p-4 transition-all duration-300 hover:border-primary-500 hover:bg-primary-500/20 card-3d">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={skill.logoSvgOrUrl}
                                            alt={`${skill.name} icon`}
                                            width={64}
                                            height={64}
                                            loading="lazy"
                                            className="w-full h-full object-contain filter brightness-90 hover:brightness-110 transition-all"
                                        />
                                    </div>
                                ) : (

                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 transition-all duration-300 hover:border-primary-500 hover:bg-primary-500/20 card-3d">
                                        <span className="text-primary-500 font-bold text-2xl">
                                            {skill.name.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <div className="font-heading text-primary-500 text-xs uppercase tracking-widest">
                                        {skill.name}
                                    </div>
                                    <div className="flex gap-0.5 mt-2 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`w-3 h-3 ${i < (Math.round((skill.proficiencyLevel || 0) / 20))
                                                    ? "text-primary-500"
                                                    : "text-primary-500/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Parallax3DCard>
                        </div>
                    </TickerItem>

                    ))}
                </LogoTicker>
            </div>
        </section>
    );
}
