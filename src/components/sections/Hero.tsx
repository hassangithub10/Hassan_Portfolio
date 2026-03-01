"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

import { clsx } from "clsx";


export default function Hero() {
    // Static Content
    const personalInfo = {
        fullName: "Hassan Sarfraz",
        title: "Frontend Developer & AI Enthusiast",
        bio: "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence. With over 3 years of experience in the digital realm, I bridge the gap between complex backend logic and pixel-perfect frontend interfaces.",
    };

    // Static Content
    const greeting = "Hi, I'm";
    const ctaPrimaryText = "View Work";
    const ctaPrimaryLink = "#projects";
    const ctaSecondaryText = "Contact Me";
    const ctaSecondaryLink = "#contact";

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-labelledby="hero-heading">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary-500/5 to-transparent blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Greeting */}
                    <p className="text-xl md:text-2xl text-primary-500 font-medium mt-10 mb-4 tracking-wide">
                        {greeting}
                    </p>

                    {/* Main Name */}
                    <h1 id="hero-heading" className="text-5xl text-gray-900 mb-6">
                        {personalInfo.fullName.split(" ").map((word: string, i: number) => (
                            <span key={i} className={clsx(i === personalInfo.fullName.split(" ").length - 1 ? "text-gradient-primary" : "")}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>

                    {/* Designation / Job Title */}
                    <h2 className="text-3xl md:text-4xl text-primary-900/40 font-heading mb-8">
                        {personalInfo.title}
                    </h2>

                    {/* Subtitle/Bio */}
                    <p className="body-lg text-gray-900/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                        {personalInfo.bio}
                    </p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link
                            href={ctaPrimaryLink}
                            className="btn-premium group"
                        >
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
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-500/20"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary-500/20 to-transparent" />
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            </motion.div>
        </section>
    );
}
