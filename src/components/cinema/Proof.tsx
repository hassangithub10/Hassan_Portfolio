"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadAnime } from "@/lib/anime";
import { prefersReducedMotion } from "@/lib/motion";
import { STATS, TOOLS } from "@/lib/site";

export default function Proof() {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-count]"));
        const finalText = () => nums.forEach((n) => (n.textContent = `${n.dataset.count}${n.dataset.suffix ?? ""}`));
        if (prefersReducedMotion()) {
            finalText();
            return;
        }
        nums.forEach((n) => (n.textContent = `0${n.dataset.suffix ?? ""}`));
        let played = false;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || played) return;
                played = true;
                loadAnime().then((anime) => {
                    nums.forEach((n, i) => {
                        const o = { v: 0 };
                        anime({
                            targets: o,
                            v: Number(n.dataset.count),
                            round: 1,
                            duration: 2200,
                            delay: i * 150,
                            easing: "easeOutExpo",
                            update: () => (n.textContent = `${o.v}${n.dataset.suffix ?? ""}`),
                        });
                    });
                    anime({
                        targets: el.querySelectorAll(".tool-chip"),
                        translateY: [24, 0],
                        opacity: [0, 1],
                        duration: 900,
                        delay: anime.stagger(50, { start: 400 }),
                        easing: "easeOutQuart",
                    });
                });
            },
            { threshold: 0.25 }
        );
        el.querySelectorAll<HTMLElement>(".tool-chip").forEach((c) => (c.style.opacity = "0"));
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section ref={root} id="proof" data-scene="proof" className="relative py-[16vh]">
            <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
                <dl className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="flex flex-col border-t border-bone/20 pt-6">
                            <dt className="order-2 mt-3 max-w-[22ch] text-mist">{s.label}</dt>
                            <dd data-count={s.value} data-suffix={s.suffix} className="stat-num font-display text-[clamp(4rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                                {s.value}
                                {s.suffix}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-[14vh]">
                    <h2 className="max-w-[20ch] font-display text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone">Tools your team can actually use</h2>
                    <p className="mt-4 max-w-[52ch] text-mist">You are never locked in. Sites are built on mainstream tools, so you can edit them yourself or hand them to another developer later.</p>
                    <ul className="mt-10 flex flex-wrap gap-3">
                        {TOOLS.map((t) => (
                            <li key={t.name} className="tool-chip flex items-center gap-3 rounded-full border border-bone/12 bg-night/70 py-2 pl-2 pr-5 backdrop-blur-sm">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bone">
                                    <Image src={t.src} alt="" width={22} height={22} />
                                </span>
                                <span className="text-sm text-bone/85">{t.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
