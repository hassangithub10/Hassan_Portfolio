"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { clsx } from "clsx";


export default function Hero() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax layers at different depths
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]); // slowest — farthest
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // medium
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -320]); // fastest — closest
    const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    // Static Content
    const personalInfo = {
        fullName: "Hassan Sarfraz",
        title: "Frontend Developer & AI Enthusiast",
        bio: "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence. With over 5 years of experience in the digital realm, I bridge the gap between complex backend logic and pixel-perfect frontend interfaces.",
    };

    const greeting = "Hi, I'm";
    const ctaPrimaryText = "View Work";
    const ctaPrimaryLink = "#projects";
    const ctaSecondaryText = "Contact Me";
    const ctaSecondaryLink = "#contact";

    return (
        <section
            ref={ref}
            id="hero"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 stack-bg-0"
            aria-labelledby="hero-heading"
        >
            {/* ── Depth Layer 1: farthest background orbs ── */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="float-orb absolute top-[8%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary-500/8 blur-[130px]" />
                <div className="float-orb-slow absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary-400/6 blur-[110px]" />
            </motion.div>

            {/* ── Depth Layer 2: mid-ground geometric accents ── */}
            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-[20%] right-[15%] w-[220px] h-[220px] rounded-full border border-primary-500/10 blur-sm" />
                <div className="absolute top-[55%] left-[8%] w-[160px] h-[160px] rounded-full border border-primary-500/8 blur-sm" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary-500/4 to-transparent blur-[80px]" />
            </motion.div>

            {/* ── Depth Layer 3: foreground shimmer line ── */}
            <motion.div
                style={{ y: y3 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="shimmer-line absolute top-[18%] left-0 w-full h-[1px] opacity-60" />
                <div className="shimmer-line absolute bottom-[22%] left-0 w-full h-[1px] opacity-40" style={{ animationDelay: "1.5s" }} />
            </motion.div>

            {/* ── Main Content ── */}
            <motion.div
                style={{ y: textY, opacity: heroOpacity }}
                className="container relative z-10 text-center px-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: -8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                >
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-xl md:text-2xl text-primary-500 font-medium mt-10 mb-4 tracking-wide"
                    >
                        {greeting}
                    </motion.p>

                    {/* Main Name */}
                    <motion.h1
                        id="hero-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-5xl text-gray-900 mb-6"
                    >
                        {personalInfo.fullName.split(" ").map((word: string, i: number) => (
                            <span key={i} className={clsx(i === personalInfo.fullName.split(" ").length - 1 ? "text-gradient-primary" : "")}>
                                {word}{" "}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Designation / Job Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-3xl md:text-4xl text-[#11182a] font-heading mb-8"
                    >
                        {personalInfo.title}
                    </motion.h2>

                    {/* Subtitle/Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="body-lg text-[#11182a] max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        {personalInfo.bio}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href={ctaPrimaryLink} className="btn-premium group">
                            {ctaPrimaryText}
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href={ctaSecondaryLink}
                            className="px-8 py-4 rounded-xl border border-primary-500/10 text-primary-500 font-bold hover:bg-primary-500/5 hover:border-primary-500/30 transition-all"
                        >
                            {ctaSecondaryText}
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                style={{ opacity: heroOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-500/30"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary-500/40 to-transparent"
                />
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            </motion.div>
        </section>
    );
}
