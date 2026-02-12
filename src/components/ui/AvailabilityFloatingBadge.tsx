"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SiteSetting } from "@/db/schema";

interface AvailabilityFloatingBadgeProps {
    settings: SiteSetting[];
}

export default function AvailabilityFloatingBadge({ settings }: AvailabilityFloatingBadgeProps) {
    const pathname = usePathname();

    // Find relevant settings
    const visibleSetting = settings.find(s => s.settingKey === "floating_badge_visible");
    const textSetting = settings.find(s => s.settingKey === "floating_badge_text");
    const linkSetting = settings.find(s => s.settingKey === "floating_badge_link");

    // Default to true/available if not set, or handle strict defaults
    const isVisible = visibleSetting ? visibleSetting.settingValue === "true" : true;
    const text = textSetting?.settingValue || "Available for Projects";
    const link = linkSetting?.settingValue || "#contact";

    // Hide on admin DASHBOARD routes (anything starting with /letmein)
    if (pathname?.startsWith("/letmein")) return null;

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.a
                href={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-50 group cursor-pointer no-underline"
            >
                <div className="absolute inset-0 bg-[#00f0ff] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                <div className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-black/80 border border-[#00f0ff]/30 backdrop-blur-md shadow-lg shadow-[#00f0ff]/10 group-hover:bg-black/90 transition-colors">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff]"></span>
                    </span>
                    <span className="text-sm font-bold text-[#00f0ff] tracking-wider uppercase font-heading whitespace-nowrap">
                        {text}
                    </span>
                </div>
            </motion.a>
        </AnimatePresence>
    );
}
