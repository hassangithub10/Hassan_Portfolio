"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/** Follow ring for mouse users. Grows and shows a label over [data-cursor] elements. */
export default function Cursor() {
    const ring = useRef<HTMLDivElement>(null);
    const label = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ring.current;
        if (!el || !isFinePointer() || prefersReducedMotion()) return;
        el.style.opacity = "1";
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

        const move = (e: PointerEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };
        const over = (e: PointerEvent) => {
            const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
            const text = t?.dataset.cursor ?? "";
            if (label.current) label.current.textContent = text;
            gsap.to(el.firstElementChild, {
                scale: t ? (text ? 4.2 : 2.2) : 1,
                backgroundColor: t ? "rgba(255,162,74,0.95)" : "rgba(236,231,221,0.9)",
                duration: 0.35,
                ease: "power3.out",
            });
            gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.2 });
        };
        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerover", over, { passive: true });
        return () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerover", over);
        };
    }, []);

    return (
        <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[95] opacity-0">
            <div className="-ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-bone/90 mix-blend-normal" />
            <span ref={label} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold text-ink opacity-0" />
        </div>
    );
}
