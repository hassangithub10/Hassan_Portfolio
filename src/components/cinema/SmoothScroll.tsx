"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionState, prefersReducedMotion } from "@/lib/motion";
import { setLenis } from "@/lib/scroll";

/** Lenis smooth scrolling wired into GSAP ScrollTrigger, plus global velocity + pointer tracking. */
export default function SmoothScroll() {
    useEffect(() => {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";

        let lenis: Lenis | null = null;
        if (!prefersReducedMotion()) {
            lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
            setLenis(lenis);
            lenis.on("scroll", ScrollTrigger.update);
        }

        let last = window.scrollY;
        const tick = (time: number, deltaTime: number) => {
            lenis?.raf(time * 1000);
            const y = window.scrollY;
            const dt = Math.max(deltaTime, 1) / 1000;
            motionState.velocity += ((y - last) / dt - motionState.velocity) * 0.12;
            motionState.scrollY = y;
            last = y;
        };
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const onMove = (e: PointerEvent) => {
            motionState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            motionState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("load", onLoad);
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => {
            gsap.ticker.remove(tick);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("load", onLoad);
            lenis?.destroy();
            setLenis(null);
        };
    }, []);

    return null;
}
