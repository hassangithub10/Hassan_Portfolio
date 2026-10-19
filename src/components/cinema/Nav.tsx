"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { NAV } from "@/lib/site";
import { scrollToTarget } from "@/lib/scroll";
import Magnetic from "./Magnetic";

export default function Nav({ ready }: { ready: boolean }) {
    const bar = useRef<HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setSolid(y > 40);
            if (bar.current && !open) {
                const hide = y > last && y > 240;
                gsap.to(bar.current, { yPercent: hide ? -110 : 0, duration: 0.45, ease: "power3.out", overwrite: true });
            }
            last = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [open]);

    useEffect(() => {
        if (!ready || !bar.current) return;
        gsap.fromTo(bar.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.3 });
    }, [ready]);

    useEffect(() => {
        if (!open) return;
        const items = gsap.fromTo(".menu-item", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "expo.out" });
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            items.kill();
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const go = (href: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(false);
        scrollToTarget(href);
    };

    return (
        <>
            <header
                ref={bar}
                className={`fixed inset-x-0 top-0 z-[80] opacity-0 transition-colors duration-500 ${solid || open ? "bg-ink/70 backdrop-blur-xl" : "bg-transparent"}`}
            >
                <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between px-6 md:px-10">
                    <a href="#home" onClick={go("#home")} className="font-display text-lg font-bold tracking-tight text-bone" data-cursor="">
                        Hassan Sarfraz
                    </a>
                    <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
                        {NAV.map((n) => (
                            <a key={n.href} href={n.href} onClick={go(n.href)} className="link-underline text-sm text-bone/80 transition-colors hover:text-bone">
                                {n.label}
                            </a>
                        ))}
                        <Magnetic strength={0.25}>
                            <a href="#contact" onClick={go("#contact")} className="btn btn-primary !px-5 !py-2.5 text-sm">
                                Start a project
                            </a>
                        </Magnetic>
                    </nav>
                    <button
                        type="button"
                        className="relative z-[90] flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                        onClick={() => setOpen((o) => !o)}
                    >
                        <span className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                        <span className={`h-px w-6 bg-bone transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
                    </button>
                </div>
            </header>

            {open && (
                <div id="mobile-menu" className="fixed inset-0 z-[75] flex flex-col justify-center gap-6 bg-ink/95 px-8 backdrop-blur-xl md:hidden">
                    {[...NAV, { label: "Contact", href: "#contact" }].map((n) => (
                        <a key={n.href} href={n.href} onClick={go(n.href)} className="menu-item font-display text-5xl font-bold tracking-tight text-bone">
                            {n.label}
                        </a>
                    ))}
                </div>
            )}
        </>
    );
}
