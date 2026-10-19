"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { WORK } from "@/lib/site";
import { scrollToTarget } from "@/lib/scroll";
import Magnetic from "./Magnetic";

const HORIZONTAL = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
const pad = (n: number) => String(n).padStart(2, "0");

export default function Work() {
    const root = useRef<HTMLElement>(null);
    const pin = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const counter = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add(HORIZONTAL, () => {
            const p = pin.current;
            const t = track.current;
            if (!p || !t) return;
            const dist = () => Math.max(t.scrollWidth - window.innerWidth, 0);

            const tween = gsap.to(t, {
                x: () => -dist(),
                ease: "none",
                scrollTrigger: {
                    trigger: p,
                    start: "top top",
                    end: () => "+=" + dist(),
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const i = Math.min(WORK.length, Math.round(self.progress * WORK.length));
                        if (counter.current) counter.current.textContent = i >= WORK.length ? "Next" : `${pad(i + 1)} / ${pad(WORK.length)}`;
                    },
                },
            });

            gsap.to(".work-bar", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: p, start: "top top", end: () => "+=" + dist(), scrub: true, invalidateOnRefresh: true },
            });

            // Each card tilts into the frame, faces forward at centre, then tilts away.
            gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
                gsap.timeline({
                    scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "right 5%", scrub: true },
                })
                    .fromTo(card, { rotateY: 18, scale: 0.9, opacity: 0.3 }, { rotateY: 0, scale: 1, opacity: 1, duration: 0.5, ease: "none" })
                    .to(card, { rotateY: -18, scale: 0.9, opacity: 0.3, duration: 0.5, ease: "none" });
            });
        });
        return () => mm.revert();
    }, []);

    return (
        <section ref={root} id="work" data-scene="work" className="relative">
            <div ref={pin} className="work-pin">
                <div className="work-head">
                    <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-bone">Sites built for real businesses</h2>
                    <p className="mt-4 max-w-[44ch] text-mist">Live projects for clients in the US and Pakistan. Open any of them and judge for yourself.</p>
                </div>
                <span ref={counter} className="work-count font-display text-sm font-semibold tabular-nums text-bone/80">
                    {`01 / ${pad(WORK.length)}`}
                </span>

                <div ref={track} className="work-track">
                    {WORK.map((w) => {
                        const host = w.url.replace(/^https?:\/\/(www\.)?/, "");
                        return (
                            <article key={w.name} className="work-card">
                                <a href={w.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit" className="group block">
                                    <div className="overflow-hidden rounded-2xl border border-bone/15 bg-night shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] transition-colors duration-500 group-hover:border-tungsten/60">
                                        <div className="flex items-center gap-3 border-b border-bone/10 bg-slate2 px-4 py-2.5">
                                            <span className="flex gap-1.5" aria-hidden>
                                                <i className="h-2 w-2 rounded-full bg-bone/20" />
                                                <i className="h-2 w-2 rounded-full bg-bone/20" />
                                                <i className="h-2 w-2 rounded-full bg-bone/20" />
                                            </span>
                                            <span className="truncate text-xs text-mist">{host}</span>
                                        </div>
                                        <div className="relative aspect-[2.2/1] w-full">
                                            <Image
                                                src={w.image}
                                                alt={`${w.name} website homepage`}
                                                fill
                                                sizes="(min-width: 900px) 640px, 92vw"
                                                className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                                            />
                                        </div>
                                    </div>
                                </a>
                                <div className="mt-5 flex items-baseline justify-between gap-4">
                                    <h3 className="font-display text-2xl font-bold tracking-tight text-bone">{w.name}</h3>
                                    <span className="shrink-0 text-sm text-tungsten">{w.industry}</span>
                                </div>
                                <p className="mt-2 max-w-[52ch] leading-relaxed text-bone/70">{w.summary}</p>
                                <p className="mt-3 text-sm text-mist">{w.stack.join(", ")}</p>
                            </article>
                        );
                    })}

                    <div className="work-card work-end">
                        <h3 className="font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-bone">Your business could be next.</h3>
                        <p className="mt-5 max-w-[40ch] leading-relaxed text-mist">Tell me what you sell and who you want to reach. I&apos;ll reply with ideas and a fixed quote.</p>
                        <div className="mt-8">
                            <Magnetic>
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToTarget("#contact");
                                    }}
                                    className="btn btn-primary"
                                >
                                    Start your project
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <div className="work-progress" aria-hidden>
                    <div className="work-bar h-full origin-left scale-x-0 bg-tungsten" />
                </div>
            </div>
        </section>
    );
}
