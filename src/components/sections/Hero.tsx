"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { PersonalInfo, SiteSetting } from "@/db/schema";
import { clsx } from "clsx";

interface HeroProps {
    info: PersonalInfo | null | undefined;
    content: any;
    settings?: SiteSetting[];
}

export default function Hero({ info, content, settings = [] }: HeroProps) {
    if (!info) return null;

    // Helper to get settings
    const getSetting = (key: string) => settings?.find(s => s.settingKey === key)?.settingValue;

    // settings
    const greeting = getSetting('hero_greeting') || "Hi, I'm";
    const ctaPrimaryText = getSetting('hero_cta_primary_text') || "View Work";
    const ctaPrimaryLink = getSetting('hero_cta_primary_link') || "#projects";
    const ctaSecondaryText = getSetting('hero_cta_secondary_text') || "Contact Me";
    const ctaSecondaryLink = getSetting('hero_cta_secondary_link') || "#contact";

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary-500/10 to-transparent blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Greeting */}
                    <h2 className="text-xl md:text-2xl text-lime font-medium mt-10 mb-4 tracking-wide">
                        {greeting}
                    </h2>

                    {/* Main Name */}
                    <h1 className="text-5xl text-white mb-6">
                        {info.fullName.split(" ").map((word: string, i: number) => (
                            <span key={i} className={clsx(i === info.fullName.split(" ").length - 1 ? "text-gradient-primary" : "")}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>

                    {/* Designation / Job Title */}
                    <h3 className="text-3xl md:text-4xl text-[#f75d00]/60 font-heading mb-8">
                        {info.title}
                    </h3>

                    {/* Subtitle/Bio */}
                    <p className="body-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
                        {info.bio}
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
                            className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/30 transition-all"
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
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            </motion.div>
        </section>
    );
}
