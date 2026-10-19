"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidImage from "./LiquidImage";
import { BRAND, HERO } from "./content";

gsap.registerPlugin(ScrollTrigger);

function Letters({ text, delay }: { text: string; delay: number }) {
    return (
        <span className="hn-line" aria-hidden="true">
            {[...text].map((c, i) => (
                <span key={`${c}-${i}`} className="hn-ch" style={{ animationDelay: `${delay + i * 52}ms` }}>
                    {c}
                </span>
            ))}
        </span>
    );
}

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            const portrait = hero.querySelector<HTMLElement>(".hero-portrait");
            const glow = hero.querySelector<HTMLElement>(".hero-orbit");
            const lines = hero.querySelectorAll<HTMLElement>(".hero-motion-line");
            if (portrait) {
                gsap.fromTo(portrait, { y: 36, scale: 0.94 }, {
                    y: -18, scale: 1.035, ease: "none",
                    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
                });
            }
            if (glow) {
                gsap.to(glow, { rotation: 24, scale: 1.12, ease: "none", scrollTrigger: {
                    trigger: hero, start: "top top", end: "bottom top", scrub: 1,
                } });
            }
            lines.forEach((line, i) => gsap.to(line, {
                xPercent: i % 2 ? 24 : -24, opacity: 0.12, ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2 },
            }));
        }, hero);

        return () => ctx.revert();
    }, []);

    return (
        <section id="top" data-scene="home" ref={heroRef} className="hero">
            <div className="hero-motion" aria-hidden="true">
                <span className="hero-orbit" />
                <span className="hero-motion-line hero-motion-line--one" />
                <span className="hero-motion-line hero-motion-line--two" />
                <span className="hero-crosshair">HS <i /> 2026</span>
            </div>

            <div className="hero-top">
                <h2 className="hero-roles">
                    {HERO.roles.map((r, i) => (
                        <span key={r} className="role">
                            <span className="role-i" style={{ animationDelay: `${200 + i * 80}ms` }}>{r}</span>
                        </span>
                    ))}
                </h2>
                <p className="hero-desc">{HERO.description}</p>
            </div>

            <div className="hero-portrait">
                <LiquidImage
                    bare priority src={BRAND.portrait} alt={`${BRAND.full}: cinematic portrait`}
                    maxScale={18} position="center center" sizes="(min-width: 1024px) 58vw, 100vw" className="hero-fig"
                />
            </div>

            <div className="hero-fade" />
            <h1 className="hero-name" aria-label={BRAND.full}>
                <Letters text={BRAND.first} delay={0} />
                <Letters text={BRAND.last} delay={240} />
            </h1>
            <div className="hero-cue"><span className="hero-cue-rule" />{HERO.cue}</div>
        </section>
    );
}
