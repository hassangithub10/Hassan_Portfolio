"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { loadAnime } from "@/lib/anime";
import { prefersReducedMotion } from "@/lib/motion";
import { PROCESS } from "@/lib/site";
import { scrollToTarget } from "@/lib/scroll";

export default function Process() {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) {
            root.current?.querySelectorAll(".step").forEach((s) => s.classList.add("is-active"));
            root.current?.querySelector<HTMLElement>(".line-fill")?.style.setProperty("transform", "scaleY(1)");
            return;
        }
        let anime: Awaited<ReturnType<typeof loadAnime>> | null = null;
        loadAnime().then((a) => (anime = a));

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".line-fill",
                { scaleY: 0 },
                { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".steps", start: "top 65%", end: "bottom 65%", scrub: true } }
            );
            gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top 65%",
                    onEnter: () => {
                        step.classList.add("is-active");
                        const ring = step.querySelector(".node-ring");
                        if (anime && ring) anime({ targets: ring, scale: [1, 2.8], opacity: [0.7, 0], duration: 1000, easing: "easeOutQuad" });
                    },
                    onLeaveBack: () => step.classList.remove("is-active"),
                });
            });
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={root} id="process" data-scene="process" className="relative py-[16vh]">
            <div className="mx-auto grid w-full max-w-[1320px] gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.15fr]">
                <div className="self-start lg:sticky lg:top-32">
                    <h2 className="max-w-[12ch] font-display text-[clamp(2.2rem,5.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-bone">From first message to launch</h2>
                    <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mist">A clear process with no surprises. You always know what happens next and what it costs.</p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToTarget("#contact");
                        }}
                        className="btn btn-ghost mt-10"
                    >
                        Book the intro call
                    </a>
                </div>

                <ol className="steps relative pl-14">
                    <div aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-bone/15" />
                    <div aria-hidden className="line-fill absolute bottom-3 left-[15px] top-3 w-px origin-top scale-y-0 bg-tungsten" />
                    {PROCESS.map((p, i) => (
                        <li key={p.title} className="step relative pb-20 last:pb-0">
                            <span className="node absolute -left-14 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-bone/25 bg-ink text-sm font-semibold text-mist transition-colors duration-500">
                                <span className="node-ring absolute inset-0 rounded-full border border-tungsten opacity-0" />
                                {i + 1}
                            </span>
                            <h3 className="step-title font-display text-3xl font-bold tracking-tight text-bone/40 transition-colors duration-500">{p.title}</h3>
                            <p className="mt-3 max-w-[46ch] leading-relaxed text-mist">{p.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
