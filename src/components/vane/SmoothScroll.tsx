"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scroll on a single rAF loop. Native touch scrolling is kept on phones
 * (syncTouch off) so mobile never feels laggy.
 */
export default function SmoothScroll() {
    useEffect(() => {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
        setLenis(lenis);

        let raf = 0;
        const loop = (t: number) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    return null;
}
