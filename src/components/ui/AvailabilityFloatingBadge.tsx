"use client";

import { motion, AnimatePresence } from "framer-motion";
import { executeRecaptcha } from "@/lib/recaptcha";

export default function AvailabilityFloatingBadge() {
    const isVisible = true;
    const text = "Available";
    const link = "https://api.whatsapp.com/send/?phone=%2B923117371750&text&type=phone_number&app_absent=0";

    if (!isVisible) return null;

    const handleClick = () => {
        executeRecaptcha("whatsapp_floating_badge");
    };

    return (
        <AnimatePresence>
            <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                aria-label="Contact Hassan Sarfraz on WhatsApp (Available for work)"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-6 left-6 z-40 group cursor-pointer no-underline"
            >



                <div className="absolute inset-0 bg-[#f97316] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                <div className="relative flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 border border-primary-500/25 backdrop-blur-md shadow-lg shadow-primary-500/15 group-hover:bg-white transition-colors">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f97316]"></span>
                    </span>
                    <span className="text-sm font-bold text-[#ea580c] tracking-wider uppercase font-heading whitespace-nowrap">
                        {text}
                    </span>
                </div>

            </motion.a>
        </AnimatePresence>
    );
}
