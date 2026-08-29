"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SparklesIcon, CodeBracketSquareIcon, RocketLaunchIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Parallax3DCard from "@/components/ui/Parallax3DCard";
import { executeRecaptcha } from "@/lib/recaptcha";




export default function About() {
    const statsRef = useRef(null);
    const isInView = useInView(statsRef, { once: true, margin: "-100px" });

    // Static Content
    const stats = {
        yearsExperience: "4+",
        projectsCompleted: "26+",
        happyClients: "10+",
        technologiesCount: "30+",
    };

    const title = "Passionate About Creating";
    const subtitle = "Digital Excellence";
    const description = "With years of experience in full-stack development, I specialize in building modern, responsive, and performant web applications.";
    const badgeText = "About Me";

    return (
        <section id="about" className="section relative overflow-hidden" aria-labelledby="about-heading">
            {/* Floating depth orbs removed for global 3D canvas */}

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
                        <SparklesIcon className="w-6 h-6" />
                        {badgeText}
                    </span>

                    <h2 id="about-heading" className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>

                    <p className="body-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* ── Animated Stats Grid with 3D Tilt ── */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto perspective-container"
                >
                    {[
                        {
                            icon: CodeBracketSquareIcon,
                            value: stats.yearsExperience,
                            label: "Years Experience",
                            color: "var(--color-primary)",
                            delay: 0,
                        },
                        {
                            icon: RocketLaunchIcon,
                            value: stats.projectsCompleted,
                            label: "Projects Completed",
                            color: "var(--color-primary)",
                            delay: 0.1,
                        },
                        {
                            icon: UserGroupIcon,
                            value: stats.happyClients,
                            label: "Happy Clients",
                            color: "var(--color-primary)",
                            delay: 0.2,
                        },
                        {
                            icon: SparklesIcon,
                            value: stats.technologiesCount,
                            label: "Technologies",
                            color: "var(--color-primary)",
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

// Animated Stat Card Component — wrapped with Parallax3DCard
function StatCard({
    icon: Icon,
    value,
    label,
    color,
    delay,
    isInView,
}: {
    icon: React.ComponentType<React.ComponentProps<"svg">>;
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

        const duration = 2000;
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
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: "1200px" }}
            onClick={() => executeRecaptcha(`about_stat_${label.toLowerCase().replace(/\s+/g, "_")}`)}
            className="cursor-pointer"
        >
            <Parallax3DCard
                maxTilt={20}
                glowColor={`rgba(14, 165, 233, 0.4)`}
                className="relative w-full p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden group card-3d shadow-2xl"
            >

                {/* Neon Border on Hover */}
                <div
                    className="absolute -inset-[1px] rounded-3xl duration-500 pointer-events-none"
                />

                <div className="relative z-10">
                    <Icon className="w-10 h-10 mb-4 transition-colors" style={{ color: `rgb(${color})` }} />
                    <div className="text-4xl font-black font-heading mb-2" style={{ color: `rgb(${color})` }}>
                        {isInView ? count : 0}
                        {value.includes("+") ? "+" : ""}
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider font-heading">
                        {label}
                    </div>
                </div>
            </Parallax3DCard>
        </motion.div>
    );
}
