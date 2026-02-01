"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavigationItem, SiteSetting } from "@/db/schema";
import Link from "next/link";

interface HeaderProps {
    navItems?: NavigationItem[];
    settings?: SiteSetting[];
}

export default function Header({ navItems = [], settings = [] }: HeaderProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback items if none provided
    const displayItems = navItems.length > 0 ? navItems : [
        { label: "About", path: "#about" },
        { label: "Education", path: "#education" },
        { label: "Experience", path: "#experience" },
        { label: "Projects", path: "#projects" },
        { label: "Services", path: "#services" },
        { label: "Blogs", path: "#blogs" },
        { label: "Contact", path: "#contact" },
    ];

    const ctaText = settings.find(s => s.settingKey === "header_cta_text")?.settingValue || "Contact Me";
    const ctaUrl = settings.find(s => s.settingKey === "header_cta_url")?.settingValue || "mailto:hassandigital94@gmail.com";
    const logoText = settings.find(s => s.settingKey === "header_logo_text")?.settingValue || "Hassan";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname && (pathname.startsWith("/letmein") || pathname.startsWith("/admin"))) return null;

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                <motion.div
                    className={clsx(
                        "pointer-events-auto relative flex items-center justify-between",
                        "bg-black/10 backdrop-blur-lg border border-[#FDDFCC]/10",
                        isMobileMenuOpen ? "rounded-3xl" : "rounded-full"
                    )}
                    animate={{
                        width: isMobileMenuOpen ? "90vw" : isScrolled ? "auto" : "auto",
                        height: isMobileMenuOpen ? "auto" : "3.5rem",
                        padding: isMobileMenuOpen ? "1.5rem" : "0.5rem 0.5rem 0.5rem 1.5rem",
                        marginTop: isScrolled ? "0" : "1rem"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mr-4 md:mr-8 flex-shrink-0 relative z-20">
                        {settings.find(s => s.settingKey === "header_logo_image")?.settingValue ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={settings.find(s => s.settingKey === "header_logo_image")?.settingValue}
                                alt={logoText}
                                style={{
                                    width: `${settings.find(s => s.settingKey === "header_logo_width")?.settingValue || "150"}px`,
                                    height: "auto",
                                }}
                                className="object-contain"
                            />
                        ) : (
                            <span className="font-heading font-black tracking-tighter text-2xl text-white">
                                {logoText}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    {!isMobileMenuOpen && (
                        <div className="hidden md:flex items-center gap-1 pr-1">
                            {displayItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className="px-4 py-1.5 rounded-full text-sm font-medium text-[#FDDFCC]/70 hover:text-[#FDDFCC] hover:bg-[#FDDFCC]/10 transition-all font-heading uppercase tracking-wider"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <motion.a
                                href={ctaUrl}
                                className="ml-2 px-6 py-2.5 rounded-full bg-primary-500 text-black text-sm font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all uppercase font-heading tracking-widest border border-white/20"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {ctaText}
                            </motion.a>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#FDDFCC]/10 text-[#FDDFCC] hover:bg-primary-500/20 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>

                    {/* Mobile Menu Content */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                                className="absolute inset-x-0 top-16 px-6 pb-6 flex flex-col gap-2 md:hidden"
                            >
                                <div className="h-px w-full bg-[#FDDFCC]/10 mb-4" />
                                {displayItems.map((item, i) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-lg font-medium text-[#FDDFCC]/80 hover:text-primary-500 py-2 font-heading uppercase"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.a
                                    href={ctaUrl}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-4 w-full py-3 bg-[#FEC107] text-black font-bold rounded-xl text-center shadow-lg shadow-[#FEC107]/30 font-heading uppercase"
                                >
                                    {ctaText}
                                </motion.a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.header>
        </>
    );
}
