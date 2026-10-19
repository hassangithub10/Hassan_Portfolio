"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/lib/scroll";
import { BRAND } from "./content";

const COUNT_MS = 2000;

export default function Preloader() {
    const [done, setDone] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const num = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const html = document.documentElement;
        const finish = () => {
            html.classList.remove("is-loading");
            getLenis()?.start();
            setDone(true);
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finish();
            return;
        }

        html.classList.add("is-loading");
        getLenis()?.stop();
        window.scrollTo(0, 0);

        const el = root.current;
        let raf = 0;
        const timers: number[] = [];
        const start = performance.now();

        const tick = (now: number) => {
            const p = Math.min((now - start) / COUNT_MS, 1);
            if (num.current) num.current.textContent = String(Math.round(p * 100));
            if (p < 1) {
                raf = requestAnimationFrame(tick);
                return;
            }
            el?.setAttribute("data-fade", "");
            timers.push(
                window.setTimeout(() => {
                    el?.setAttribute("data-wipe", "");
                    timers.push(window.setTimeout(finish, 680));
                }, 200)
            );
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            timers.forEach(clearTimeout);
            html.classList.remove("is-loading");
        };
    }, []);

    if (done) return null;

    return (
        <div ref={root} className="preloader" aria-hidden="true">
            <span className="preloader-brand">{BRAND.full}</span>
            <span className="preloader-count">
                <span ref={num}>0</span>
                <span className="preloader-pct">%</span>
            </span>
        </div>
    );
}
