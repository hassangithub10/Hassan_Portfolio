"use client";

import { useState } from "react";
import LiquidImage from "./LiquidImage";
import { Eyebrow, RevealText } from "./Reveal";
import { SERVICES_SECTION } from "./content";

export default function Services() {
    const [active, setActive] = useState(0);
    const items = SERVICES_SECTION.items;
    const cur = items[active];

    return (
        <section id="services" data-scene="services" className="section">
            <Eyebrow>{SERVICES_SECTION.eyebrow}</Eyebrow>
            <RevealText as="h2" text={SERVICES_SECTION.heading} className="h-plain" />

            <div className="svc">
                <ul className="svc-list">
                    {items.map((s, i) => (
                        <li key={s.id}>
                            <button
                                type="button"
                                className="svc-btn"
                                data-active={i === active ? "" : undefined}
                                aria-pressed={i === active}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                onClick={() => setActive(i)}
                            >
                                <span className="svc-n">{String(i + 1).padStart(2, "0")}</span>
                                <span className="svc-main">
                                    <span className="svc-name">{s.title}</span>
                                    <span className="svc-role">{s.tags.join(" · ")}</span>
                                </span>
                                <span className="svc-rule" />
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="svc-panel" aria-live="polite">
                    <p key={cur.id} className="svc-quote">
                        {cur.text.split(" ").map((w, i) => (
                            <span key={i} className="qw" style={{ animationDelay: `${i * 22}ms` }}>
                                {w}{" "}
                            </span>
                        ))}
                    </p>
                    <p className="svc-foot label">{cur.tags.join(" — ")}</p>
                    <LiquidImage
                        src={cur.image}
                        alt={`${cur.title} example project`}
                        ratio="16 / 9"
                        maxScale={22}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        position="center top"
                        className="svc-fig"
                    />
                </div>
            </div>
        </section>
    );
}
