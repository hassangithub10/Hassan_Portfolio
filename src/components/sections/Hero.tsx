"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PersonalInfo } from "@/db/schema";

export default function Hero({ info, content }: { info: PersonalInfo | null | undefined; content: any }) {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [particles, setParticles] = useState<Array<{ id: number; size: number; x: number; y: number; duration: number; delay: number }>>([]);

    const fullName = info?.fullName || "Hassan Sarfraz";
    const title = info?.title || "Full-Stack Developer";

    // Dynamic Content Defaults
    const greeting = content?.title || "Hi, I'm"; // Using 'title' from section_content as greeting
    // The previous implementation might have mapped 'greeting' to a specific field. 
    // Checking schema, section_content has title, subtitle, description, badgeText, badgeColor.
    // So 'title' is likely 'Hi, I'm' or similar.

    // Actually, looking at other components, 'title' is the main heading. 
    // In Hero, "Hi, I'm" is a small prefix. The main typed text is the name.
    // Let's assume 'title' maps to "Hi, I'm" for now, or just keep it hardcoded if not sure.
    // But the task said "Update Hero.tsx to use dynamic greeting".
    // I will use content?.title as the greeting prefix if available, default to "Hi, I'm".

    const prefix = content?.title || "Hi, I'm";
    const badgeText = content?.badgeText || "Available for Projects";
    const badgeColor = content?.badgeColor || "#00f0ff";

    // Parallax effects
    const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

    // Typing animation
    useEffect(() => {
        let currentIndex = 0;
        const textToType = fullName;

        const typingInterval = setInterval(() => {
            if (currentIndex <= textToType.length) {
                setTypedText(textToType.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, [fullName]);

    // Floating particles (Client-side only)
    useEffect(() => {
        setParticles(
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                size: Math.random() * 4 + 2,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: Math.random() * 10 + 20,
                delay: Math.random() * 5,
            }))
        );
    }, []);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-black to-black"
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff]"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            filter: 'blur(1px)',
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#00f0ff]/30 to-[#b026ff]/30 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-[#ff6b35]/20 to-[#b026ff]/20 blur-[150px]"
            />

            <div className="container relative z-10 px-6 py-12 md:py-20 lg:py-32">
                <div className="flex items-center justify-center">
                    {/* Text Content - Centered */}
                    <motion.div
                        style={{ opacity: opacityFade }}
                        className="flex flex-col items-center text-center w-full max-w-5xl"
                    >
                        {/* Status Badge */}
                        {/* Status badge logic removed as per user edit */}

                        {/* Typing Name Animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8 w-full"
                        >
                            <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-black font-heading leading-tight tracking-tighter">
                                <span className="text-white/40 block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 tracking-normal uppercase">
                                    {prefix}
                                </span>
                                <span className="bg-gradient-to-r from-white via-primary-400 to-[#b026ff] bg-clip-text text-transparent break-words">
                                    {typedText}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 font-heading tracking-wide">
                                {title}
                            </h2>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl px-4"
                        >
                            {info?.bio || "Crafting high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence."}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto"
                        >
                            <Link href="#projects" className="btn-premium">
                                View Projects
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                            <Link href="#contact" className="btn-outline-premium">
                                Get In Touch
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
