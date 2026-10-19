"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { scrollToTarget } from "@/lib/scroll";
import Magnetic from "./Magnetic";

const LINES = ["Hassan", "Sarfraz"];

export default function Hero({ ready }: { ready: boolean }) {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const pulse = anime({
            targets: ".hero-kicker-dot",
            scale: [1, 1.55],
            opacity: [1, 0.55],
            direction: "alternate",
            easing: "easeInOutSine",
            duration: 1150,
            loop: true,
        });
        return () => pulse.pause();
    }, []);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const ctx = gsap.context(() => {
            if (!ready) {
                gsap.set(".hero-char", { yPercent: 115, rotate: 6, opacity: 0 });
                gsap.set(".hero-fade", { opacity: 0 });
                return;
            }
            gsap.timeline({ defaults: { ease: "expo.out" } })
                .fromTo(".hero-char", { yPercent: 115, rotate: 6, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.3, stagger: 0.022 })
                .fromTo(".hero-fade", { y: 24, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.1 }, 0.5);

            // Copy drifts up and fades as the hero leaves the screen.
            gsap.to(".hero-copy", {
                yPercent: -14,
                opacity: 0.1,
                ease: "none",
                scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            });
        }, root);
        return () => ctx.revert();
    }, [ready]);

    return (
        <section ref={root} id="home" data-scene="home" className="relative flex min-h-[100svh] items-end pb-[12vh] pt-32">
            <div className="hero-copy mx-auto w-full max-w-[1320px] px-6 md:px-10">
                <p className="hero-fade mb-8 inline-flex items-center gap-3 rounded-full border border-bone/15 bg-ink/40 px-4 py-2 text-sm text-bone/90 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lagoon opacity-70" />
                        <span className="hero-kicker-dot relative inline-flex h-2 w-2 rounded-full bg-lagoon" />
                    </span>
                    Taking on new projects
                </p>

                <h1 aria-label={LINES.join(" ")} className="font-display text-[clamp(2.7rem,9.4vw,7.6rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-bone">
                    {LINES.map((line, i) => (
                        <span key={i} aria-hidden className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                            {line.split(" ").map((w, wi) => (
                                <span key={wi} className="mr-[0.22em] inline-block whitespace-nowrap">
                                    {w.split("").map((c, ci) => (
                                        <span key={ci} className="hero-char inline-block will-change-transform">
                                            {c}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>

                <p className="hero-fade mt-8 max-w-[54ch] text-lg leading-relaxed text-bone/75 md:text-xl">
                    Web developer, i build fast, good-looking sites for clinics, shops, charities and growing
                    companies, and set them up so people can find you on Google.
                </p>

                <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
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
                    <a
                        href="#work"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToTarget("#work");
                        }}
                        className="btn btn-ghost"
                    >
                        See client work
                    </a>
                </div>

                <p className="hero-fade mt-10 text-sm text-mist">Trusted by businesses in healthcare, auto repair, software and non-profit.</p>
            </div>
        </section>
    );
}
