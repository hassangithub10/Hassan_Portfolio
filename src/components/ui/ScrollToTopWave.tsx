"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { executeRecaptcha } from "@/lib/recaptcha";

export default function ScrollToTopWave() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const current = window.scrollY;
                const progress = Math.min(100, Math.max(0, (current / totalScroll) * 100));
                setScrollProgress(progress);
                setIsVisible(current > 120);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        executeRecaptcha("back_to_top");
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    aria-label={`Back to top (${Math.round(scrollProgress)}% scrolled)`}
                    className="fixed bottom-24 right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/95 border-2 border-primary-500/30 backdrop-blur-md shadow-xl shadow-primary-500/20 overflow-hidden cursor-pointer flex items-center justify-center group"
                    style={{
                        width: "3.25rem",
                        height: "3.25rem",
                    }}
                >
                    {/* Water container filling with scroll */}
                    <div
                        className="absolute bottom-0 left-0 right-0 w-full transition-[height] duration-150 ease-out overflow-hidden pointer-events-none"
                        style={{ height: `${Math.max(scrollProgress, 4)}%` }}
                    >
                        {/* Background Wave (Wave 2) */}
                        <div className="absolute -top-3 left-0 w-[200%] h-6 opacity-60 animate-wave-back">
                            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-orange-400">
                                <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
                            </svg>
                        </div>

                        {/* Foreground Wave (Wave 1) */}
                        <div className="absolute -top-3 left-0 w-[200%] h-6 animate-wave-front">
                            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-primary-500">
                                <path d="M0,45 C150,-30 350,90 500,20 C650,-50 900,80 1200,30 L1200,120 L0,120 Z" />
                            </svg>
                        </div>

                        {/* Solid water body */}
                        <div className="w-full h-full bg-gradient-to-t from-primary-600 via-primary-500 to-primary-500" />
                    </div>

                    {/* Arrow Icon with dynamic contrast */}
                    <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
                        <svg
                            className={`w-5 h-5 transition-colors duration-300 drop-shadow-sm ${
                                scrollProgress > 45 ? "text-white" : "text-primary-600"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </div>

                    {/* Subtle outer glow ring on hover */}
                    <div className="absolute inset-0 rounded-full border border-primary-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <style jsx>{`
                        @keyframes waveMoveFront {
                            0% {
                                transform: translateX(0);
                            }
                            100% {
                                transform: translateX(-50%);
                            }
                        }
                        @keyframes waveMoveBack {
                            0% {
                                transform: translateX(-50%);
                            }
                            100% {
                                transform: translateX(0);
                            }
                        }
                        .animate-wave-front {
                            animation: waveMoveFront 2.5s linear infinite;
                        }
                        .animate-wave-back {
                            animation: waveMoveBack 3.5s linear infinite;
                        }
                    `}</style>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
