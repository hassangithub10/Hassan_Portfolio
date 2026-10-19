"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { getLenis, scrollToTarget } from "@/lib/scroll";
import { BRAND, NAV_LINKS } from "./content";

export default function SiteNav() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const lenis = getLenis();
        if (open) lenis?.stop();
        else lenis?.start();
        document.documentElement.classList.toggle("menu-open", open);
        return () => {
            document.documentElement.classList.remove("menu-open");
        };
    }, [open]);

    const go = (href: string) => (e: MouseEvent) => {
        e.preventDefault();
        setOpen(false);
        // let Lenis restart before scrolling
        requestAnimationFrame(() => (href === "#top" ? scrollToTarget(0) : scrollToTarget(href)));
    };

    return (
        <header className="nav">
            <nav className="nav-inner" aria-label="Primary">
                <a href="#top" onClick={go("#top")} className="nav-logo" aria-label={`${BRAND.full}, back to top`}>
                    <span className="nav-badge">{BRAND.monogram}</span>
                    <span className="nav-name">{BRAND.full}</span>
                </a>

                <ul className="nav-links">
                    {NAV_LINKS.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} onClick={go(l.href)} className="nav-link">
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="burger"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    data-open={open ? "" : undefined}
                    onClick={() => setOpen((o) => !o)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            <div className="menu" data-open={open ? "" : undefined} aria-hidden={!open}>
                <ul>
                    {NAV_LINKS.map((l, i) => (
                        <li key={l.href} style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}>
                            <a href={l.href} onClick={go(l.href)} tabIndex={open ? 0 : -1}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
