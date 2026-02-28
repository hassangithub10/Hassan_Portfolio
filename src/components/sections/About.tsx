"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LogoTicker, { TickerItem } from "@/components/ui/LogoTicker";
import { SparklesIcon, CodeBracketSquareIcon, RocketLaunchIcon, UserGroupIcon, UserIcon, CpuChipIcon } from "@heroicons/react/24/outline";


export default function About() {
    const statsRef = useRef(null);
    const isInView = useInView(statsRef, { once: true, margin: "-100px" });

    // Static Content
    const stats = {
        yearsExperience: "3+",
        projectsCompleted: "20+",
        happyClients: "8+",
        technologiesCount: "20+",
    };

    // Static Content
    const title = "Passionate About Creating";
    const subtitle = "Digital Excellence";
    const description = "With years of experience in full-stack development, I specialize in building modern, responsive, and performant web applications.";
    const badgeText = "About Me";
    const badgeColor = "#00f0ff";

    return (
        <section id="about" className="section relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black" aria-labelledby="about-heading">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-[#b026ff]/20 to-transparent rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-l from-[#00f0ff]/20 to-transparent rounded-full blur-[100px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 mx-auto"
                >
                    <span className="badge-premium mb-3 mt-6">
                        <SparklesIcon className="w-6 h-6" />
                        {badgeText}
                    </span>

                    <h2 id="about-heading" className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>

                    <p className="body-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Animated Stats Grid */}
                <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
                    {[
                        {
                            icon: CodeBracketSquareIcon,
                            value: stats.yearsExperience,
                            label: "Years Experience",
                            color: "#00f0ff",
                            delay: 0,
                        },
                        {
                            icon: RocketLaunchIcon,
                            value: stats.projectsCompleted,
                            label: "Projects Completed",
                            color: "#b026ff",
                            delay: 0.1,
                        },
                        {
                            icon: UserGroupIcon,
                            value: stats.happyClients,
                            label: "Happy Clients",
                            color: "#ff6b35",
                            delay: 0.2,
                        },
                        {
                            icon: SparklesIcon,
                            value: stats.technologiesCount,
                            label: "Technologies",
                            color: "#00f0ff",
                            delay: 0.3,
                        },
                    ].map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            color={stat.color}
                            delay={stat.delay}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Animated Stat Card Component
function StatCard({
    icon: Icon,
    value,
    label,
    color,
    delay,
    isInView,
}: {
    icon: React.ElementType;
    value: string;
    label: string;
    color: string;
    delay: number;
    isInView: boolean;
}) {
    const [count, setCount] = useState(0);
    const targetValue = parseInt(value.replace(/\D/g, ""), 10) || 0;

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetValue / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                setCount(targetValue);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, targetValue]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative w-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden group"
        >
            {/* Glow Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${color}30, transparent 70%)`,
                }}
            />

            {/* Neon Border on Hover */}
            <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${color}, transparent)`,
                }}
            />

            <div className="relative z-10">
                <Icon className="w-10 h-10 mb-4 transition-colors" style={{ color }} />
                <div className="text-4xl font-black font-heading mb-2" style={{ color }}>
                    {isInView ? count : 0}
                    {value.includes("+") ? "+" : ""}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-heading">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}
