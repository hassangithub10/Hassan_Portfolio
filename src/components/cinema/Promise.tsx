"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { OUTCOMES } from "@/lib/site";

const STATEMENT =
    "A website is your hardest-working salesperson. Most are slow, forgettable and impossible to find on Google. I build the other kind.";

export default function Promise_() {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".pw",
                { opacity: 0.14 },
                {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".promise-text", start: "top 78%", end: "bottom 45%", scrub: 0.4 },
                }
            );
            gsap.utils.toArray<HTMLElement>(".out-item").forEach((item) => {
                gsap.fromTo(
                    item.querySelector(".out-line"),
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } }
                );
            });
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={root} data-scene="promise" id="promise" className="relative py-[18vh]">
            <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
                <p className="promise-text max-w-[22ch] font-display text-[clamp(2rem,5.6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-bone sm:max-w-[26ch] lg:max-w-[30ch]">
                    {STATEMENT.split(" ").map((w, i) => (
                        <span key={i} className="pw inline-block pr-[0.25em]">
                            {w}
                        </span>
                    ))}
                </p>

                <div className="mt-[14vh] grid gap-12 md:grid-cols-3 md:gap-10">
                    {OUTCOMES.map((o) => (
                        <div key={o.title} className="out-item">
                            <div className="out-line mb-6 h-px w-full origin-left bg-bone/25" />
                            <h3 className="font-display text-2xl font-bold tracking-tight text-bone">{o.title}</h3>
                            <p className="mt-3 max-w-[38ch] leading-relaxed text-mist">{o.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
