"use client";

import { useEffect } from "react";
import WebGLScene from "@/components/cinema/WebGLScene";
import ContactFooter from "./ContactFooter";
import Hero from "./Hero";
import Impact from "./Impact";
import Marquee from "./Marquee";
import Preloader from "./Preloader";
import Services from "./Services";
import SiteNav from "./SiteNav";
import SmoothScroll from "./SmoothScroll";
import Story from "./Story";
import Work from "./Work";

const REVEAL_DELAY = 2500;

/** Groups the words of each split heading by visual line and stores the index as --line. */
function measureLines() {
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((h) => {
        let top = -1;
        let line = -1;
        h.querySelectorAll<HTMLElement>(".rt-w").forEach((w) => {
            const t = w.offsetTop;
            if (Math.abs(t - top) > 4) {
                top = t;
                line++;
            }
            (w.firstElementChild as HTMLElement | null)?.style.setProperty("--line", String(line));
        });
    });
}

export default function VaneApp() {
    useEffect(() => {
        const html = document.documentElement;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const root = document.documentElement;
        let scrollFrame = 0;
        const updateAtmosphere = () => {
            scrollFrame = 0;
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
            root.style.setProperty("--atmo-x", `${78 - progress * 54}%`);
            root.style.setProperty("--atmo-y", `${24 + progress * 54}%`);
            root.style.setProperty("--atmo-x2", `${12 + progress * 62}%`);
            root.style.setProperty("--atmo-y2", `${76 - progress * 42}%`);
            root.style.setProperty("--atmo-ring-x", `${66 - progress * 42}%`);
            root.style.setProperty("--atmo-ring-y", `${48 + Math.sin(progress * Math.PI * 2) * 9}%`);
            root.style.setProperty("--atmo-rotation", `${progress * 110}deg`);
        };
        const onScrollAtmosphere = () => {
            if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateAtmosphere);
        };
        updateAtmosphere();
        window.addEventListener("scroll", onScrollAtmosphere, { passive: true });
        window.addEventListener("resize", onScrollAtmosphere);

        // Hero entrance, timed against the preloader wipe.
        const heroTimer = window.setTimeout(() => html.setAttribute("data-hero", "go"), reduced ? 0 : REVEAL_DELAY);

        // Scroll-triggered reveals: play once, no re-renders.
        const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-split]"));
        let io: IntersectionObserver | null = null;
        if (reduced) {
            els.forEach((e) => e.setAttribute("data-in", ""));
        } else {
            io = new IntersectionObserver((entries) => {
                for (const en of entries) {
                    if (!en.isIntersecting) continue;
                    en.target.setAttribute("data-in", "");
                    io?.unobserve(en.target);
                }
            });
            els.forEach((e) => io!.observe(e));
        }

        measureLines();
        document.fonts?.ready.then(measureLines);
        let rt = 0;
        const onResize = () => {
            clearTimeout(rt);
            rt = window.setTimeout(measureLines, 200);
        };
        window.addEventListener("resize", onResize);

        // Above 1920px, scale the root font-size up (damped) so the rem layout stays proportional.
        const FONT_BASE = 16;
        const BASE_W = 1920;
        const COEF = 0.6666;
        const adapt = () => {
            const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
            const size = FONT_BASE - (FONT_BASE * reduction) / 100;
            if (size > FONT_BASE) html.style.fontSize = `${size}px`;
            else html.style.removeProperty("font-size");
        };
        adapt();
        window.addEventListener("resize", adapt);

        return () => {
            clearTimeout(heroTimer);
            clearTimeout(rt);
            io?.disconnect();
            window.removeEventListener("resize", onResize);
            window.removeEventListener("resize", adapt);
            window.removeEventListener("scroll", onScrollAtmosphere);
            window.removeEventListener("resize", onScrollAtmosphere);
            if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
            ["--atmo-x", "--atmo-y", "--atmo-x2", "--atmo-y2", "--atmo-ring-x", "--atmo-ring-y", "--atmo-rotation"].forEach((name) => root.style.removeProperty(name));
            html.removeAttribute("data-hero");
            html.style.removeProperty("font-size");
        };
    }, []);

    return (
        <>
            <div className="vane-atmosphere" aria-hidden="true" />
            <WebGLScene />
            <SmoothScroll />
            <Preloader />
            <SiteNav />
            <main className="vane-main vane-content-layer">
                <Hero />
                <Marquee />
                <Story />
                <Work />
                <Impact />
                <Services />
                <ContactFooter />
            </main>
        </>
    );
}
