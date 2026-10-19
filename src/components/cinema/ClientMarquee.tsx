"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motionState, prefersReducedMotion } from "@/lib/motion";
import { WORK } from "@/lib/site";

/** Client names drifting sideways. Speed, direction and skew follow your scroll in real time. */
export default function ClientMarquee() {
    const track = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = track.current;
        if (!el || prefersReducedMotion()) return;
        let x = 0;
        let dir = -1;
        let skew = 0;
        const tick = (_t: number, delta: number) => {
            const dt = delta / 1000;
            const half = el.scrollWidth / 2;
            const v = motionState.velocity;
            if (Math.abs(v) > 40) dir += ((v > 0 ? -1 : 1) - dir) * 0.08;
            const speed = 70 + Math.min(Math.abs(v), 3000) * 0.55;
            x += dir * speed * dt;
            if (x <= -half) x += half;
            if (x > 0) x -= half;
            const targetSkew = Math.max(-9, Math.min(9, v * -0.004));
            skew += (targetSkew - skew) * 0.1;
            gsap.set(el, { x, skewX: skew });
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    const names = WORK.map((w) => w.name);
    const row = (key: string) =>
        names.map((n) => (
            <span key={key + n} className="flex items-center gap-10 pr-10">
                <span className="marquee-word font-display text-[clamp(2rem,5vw,4.2rem)] font-bold tracking-[-0.03em]">{n}</span>
                <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-tungsten" />
            </span>
        ));

    return (
        <section aria-label="Clients" className="relative overflow-hidden border-y border-bone/10 bg-ink/50 py-10 backdrop-blur-sm">
            <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
                {row("a")}
                {row("b")}
            </div>
        </section>
    );
}
