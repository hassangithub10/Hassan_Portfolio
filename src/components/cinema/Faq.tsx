"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { FAQS } from "@/lib/site";

export default function Faq() {
    const [open, setOpen] = useState<number | null>(0);
    const panels = useRef<(HTMLDivElement | null)[]>([]);

    const toggle = (i: number) => {
        const reduced = prefersReducedMotion();
        const closing = open === i;
        const prev = open;
        setOpen(closing ? null : i);
        const run = (idx: number | null, show: boolean) => {
            const el = idx === null ? null : panels.current[idx];
            if (!el) return;
            if (reduced) {
                el.style.height = show ? "auto" : "0px";
                return;
            }
            gsap.to(el, {
                height: show ? "auto" : 0,
                duration: 0.55,
                ease: "power3.inOut",
                onComplete: () => ScrollTrigger.refresh(),
            });
        };
        if (prev !== null && !closing) run(prev, false);
        run(i, !closing);
    };

    return (
        <section id="faq" data-scene="faq" className="relative py-[14vh]">
            <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 className="max-w-[10ch] font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-bone">Questions clients ask first</h2>
                <div className="divide-y divide-bone/15 border-y border-bone/15">
                    {FAQS.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={f.q}>
                                <h3>
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-${i}`}
                                        onClick={() => toggle(i)}
                                        className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold tracking-tight text-bone md:text-2xl"
                                    >
                                        {f.q}
                                        <span aria-hidden className={`relative h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                                            <span className="absolute left-0 top-1/2 h-px w-full bg-tungsten" />
                                            <span className="absolute left-1/2 top-0 h-full w-px bg-tungsten" />
                                        </span>
                                    </button>
                                </h3>
                                <div
                                    id={`faq-${i}`}
                                    role="region"
                                    ref={(el) => {
                                        panels.current[i] = el;
                                    }}
                                    style={{ height: i === 0 ? "auto" : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="max-w-[56ch] pb-7 leading-relaxed text-mist">{f.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
