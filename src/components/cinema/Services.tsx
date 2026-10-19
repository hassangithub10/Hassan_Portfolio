"use client";

import { useEffect, useRef } from "react";
import { loadAnime } from "@/lib/anime";
import { prefersReducedMotion } from "@/lib/motion";
import { SERVICES } from "@/lib/site";
import { prefillProject } from "@/lib/scroll";

const ICONS: Record<string, string[]> = {
    browser: ["M4 7a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z", "M4 11h24", "M8 7.5h.01M12 7.5h.01"],
    layers: ["M16 4 4 10l12 6 12-6-12-6Z", "M4 16l12 6 12-6", "M4 22l12 6 12-6"],
    gauge: ["M5 24a12 12 0 1 1 22 0", "M16 24l6-8", "M8 24h2M22 24h2"],
    search: ["M14 24a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M21.5 21.5 28 28"],
};

export default function Services() {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const reduced = prefersReducedMotion();
        let played = false;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || played || reduced) return;
                played = true;
                loadAnime().then((anime) => {
                    anime({
                        targets: el.querySelectorAll(".svc-card"),
                        translateY: [60, 0],
                        opacity: [0, 1],
                        scale: [0.96, 1],
                        duration: 1200,
                        delay: anime.stagger(120),
                        easing: "easeOutExpo",
                    });
                    el.querySelectorAll<SVGPathElement>(".svc-icon path").forEach((path) => {
                        const len = path.getTotalLength();
                        path.style.strokeDasharray = String(len);
                        anime({ targets: path, strokeDashoffset: [len, 0], duration: 1600, delay: 500, easing: "easeInOutSine" });
                    });
                });
            },
            { threshold: 0.2 }
        );
        if (!reduced) {
            el.querySelectorAll<HTMLElement>(".svc-card").forEach((c) => (c.style.opacity = "0"));
            io.observe(el);
        }
        return () => io.disconnect();
    }, []);

    const spotlight = (e: React.PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    return (
        <section ref={root} id="services" data-scene="services" className="relative py-[16vh]">
            <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
                <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,5.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-bone">What I can build for you</h2>
                <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mist">Pick one, or combine them. Every project starts with a free conversation about your goals.</p>

                <div className="mt-16 grid gap-5 md:grid-cols-2">
                    {SERVICES.map((s) => (
                        <article key={s.id} onPointerMove={spotlight} className="svc-card spotlight group relative overflow-hidden rounded-3xl border border-bone/12 bg-night/70 p-8 backdrop-blur-sm md:p-10">
                            <svg className="svc-icon h-10 w-10 text-tungsten" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                {ICONS[s.icon].map((d, i) => (
                                    <path key={i} d={d} />
                                ))}
                            </svg>
                            <h3 className="mt-8 font-display text-3xl font-bold tracking-tight text-bone">{s.title}</h3>
                            <p className="mt-4 max-w-[46ch] leading-relaxed text-bone/70">{s.text}</p>
                            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools">
                                {s.tags.map((t) => (
                                    <li key={t} className="rounded-full border border-bone/15 px-3 py-1 text-xs text-mist">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <button type="button" onClick={() => prefillProject(s.projectType)} className="link-underline mt-8 text-sm font-semibold text-tungsten">
                                Ask about this
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
