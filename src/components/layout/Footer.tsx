"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/lib/types";
import Link from "next/link";

// Removed FooterProps

const defaultSocialLinks = [
    // {
    //     name: "Blogs",
    //     url: "/blog",
    //     icon: (
    //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    //         </svg>
    //     ),
    // },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/hassan",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        url: "https://github.com/hassan",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "Whatsapp",
        url: "https://wa.me/923117371750",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    const logoText = "Hassan";
    const copyrightText = `© ${currentYear} ${logoText}. All rights reserved.`;

    if (pathname && (pathname.startsWith("/letmein") || pathname.startsWith("/admin"))) return null;

    return (
        <footer className="relative py-8 border-t border-[#FDDFCC]/10 bg-black">
            {/* Background gradient */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 50% 100%, rgba(247, 93, 0, 0.15) 0%, transparent 70%)`,
                }}
            />

            <div className="container relative z-10">
                <div className="flex flex-row md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={"/logo.svg"}
                                alt={logoText}
                                style={{
                                    width: `50px`,
                                    height: "auto",
                                }}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-[#FDDFCC]/50 text-sm text-center" suppressHydrationWarning>
                            {copyrightText}
                        </p>
                    </div>

                    {/* Footer Nav - Optional, if we want strict footer links, we can use navItems.filter(i => i.location === 'footer') here
                       but usually footprint is cleaner with just social. Let's stick to social for now or add footer-specific links?
                       Plan didn't specify distinct footer links UI, just dynamic mechanism. I'll stick to social as the primary footer nav 
                       unless user explicitly asked for a link columns section. 
                       Wait, the user said "header or footer dno ko dynamic kren", implying the footer might need menu links too.
                       The previous design didn't have footer links aside from social. 
                       I'll add the dynamic nav items here as well if they exist for footer.
                    */}
                    {/* Static Footer Nav removed */}


                    {/* Social Links */}
                    <nav aria-label="Social Links" className="flex items-center gap-4">
                        {defaultSocialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-[#FDDFCC]/5 flex items-center justify-center text-[#FDDFCC]/60 hover:text-[#FEC107] hover:bg-[#FEC107]/10 transition-all"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </nav>
                </div>

                {/* Back to top */}
                <motion.a
                    href="#"
                    className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-[#FDDFCC]/10 flex items-center justify-center text-[#FEC107] hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                    whileHover={{ y: -3 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    aria-label="Back to top"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </motion.a>
            </div>
        </footer>
    );
}
