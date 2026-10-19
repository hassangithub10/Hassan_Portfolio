"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { loadAnime } from "@/lib/anime";
import { prefersReducedMotion } from "@/lib/motion";

/** Title-sequence intro: anime.js counter, then a light streak splits the frame open (GSAP). */
export default function Preloader({ onDone }: { onDone: () => void }) {
    const root = useRef<HTMLDivElement>(null);
    const num = useRef<HTMLSpanElement>(null);
    const line = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const html = document.documentElement;
        html.classList.add("is-loading");
        window.scrollTo(0, 0);

        let seen = false;
        try {
            seen = sessionStorage.getItem("hs-intro") === "1";
            sessionStorage.setItem("hs-intro", "1");
        } catch {}
        const fast = seen || prefersReducedMotion();

        let dead = false;
        let tl: gsap.core.Timeline | undefined;

        const exit = () => {
            if (dead) return;
            tl = gsap.timeline({
                onComplete: () => {
                    html.classList.remove("is-loading");
                    el.style.display = "none";
                },
            });
            tl.to(".pl-content", { opacity: 0, duration: 0.35, ease: "power2.in" })
                .fromTo(".pl-seam", { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, 0.1)
                .to(".pl-top", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, 0.55)
                .to(".pl-bot", { yPercent: 100, duration: 1.05, ease: "expo.inOut" }, 0.55)
                .to(".pl-seam", { opacity: 0, duration: 0.4 }, 0.8)
                .add(() => onDone(), 0.85);
        };

        loadAnime().then((anime) => {
            if (dead) return;
            const o = { v: 0 };
            anime({
                targets: o,
                v: 100,
                round: 1,
                duration: fast ? 600 : 1900,
                easing: "easeInOutQuad",
                update: () => {
                    if (num.current) num.current.textContent = String(o.v).padStart(3, "0");
                    if (line.current) line.current.style.transform = `scaleX(${o.v / 100})`;
                },
                complete: exit,
            });
        });

        return () => {
            dead = true;
            tl?.kill();
            html.classList.remove("is-loading");
        };
    }, [onDone]);

    return (
        <div ref={root} className="preloader fixed inset-0 z-[100]" aria-hidden>
            <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-ink" />
            <div className="pl-bot absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
            <div className="pl-seam absolute left-0 top-1/2 h-[2px] w-full origin-center scale-x-0 bg-tungsten opacity-0 shadow-[0_0_30px_6px_rgba(255,162,74,0.55)]" />
            <div className="pl-content absolute inset-0 flex flex-col items-center justify-between px-6 py-10 md:px-12">
                <span className="font-display text-lg font-semibold tracking-tight text-bone">Hassan Sarfraz</span>
                <div className="flex flex-col items-center gap-5">
                    <span ref={num} className="font-display text-[clamp(4rem,14vw,9rem)] font-extrabold leading-none tabular-nums text-bone">
                        000
                    </span>
                    <div className="h-px w-48 bg-bone/15">
                        <div ref={line} className="h-full origin-left scale-x-0 bg-tungsten" />
                    </div>
                </div>
                <span className="text-sm text-mist">Web design and development</span>
            </div>
        </div>
    );
}
