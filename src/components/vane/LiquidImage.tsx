"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createSpring } from "./spring";

interface LiquidImageProps {
    src: string;
    alt: string;
    /** CSS aspect-ratio, e.g. "16 / 9". Omit when the parent sizes the figure. */
    ratio?: string;
    /** Bare = only the displacement filter, no veil / glow / vignette (hero portrait). */
    bare?: boolean;
    /** Peak feDisplacementMap scale on hover. */
    maxScale?: number;
    sizes?: string;
    priority?: boolean;
    position?: string;
    fit?: "cover" | "contain";
    className?: string;
}

const BASE_FREQ = 0.009;
const HOVER_FREQ = 0.022;

/**
 * Image with a watery SVG displacement on hover.
 * The filter is only attached while the pointer is over the image (and removed once the spring
 * settles), so scrolling past the page costs nothing. Disabled on touch and <= 768px.
 */
export default function LiquidImage({
    src,
    alt,
    ratio,
    bare = false,
    maxScale = 28,
    sizes = "(min-width: 1024px) 50vw, 100vw",
    priority = false,
    position = "center",
    fit = "cover",
    className = "",
}: LiquidImageProps) {
    const fid = `liq-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const figRef = useRef<HTMLElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const turbRef = useRef<SVGFETurbulenceElement>(null);
    const dispRef = useRef<SVGFEDisplacementMapElement>(null);

    useEffect(() => {
        const fig = figRef.current;
        const media = mediaRef.current;
        const turb = turbRef.current;
        const disp = dispRef.current;
        if (!fig || !media || !turb || !disp) return;
        if (!window.matchMedia("(hover: hover) and (min-width: 769px)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let hovering = false;
        const spring = createSpring({
            tension: 140,
            friction: 13,
            onUpdate: (x) => {
                const k = Math.max(0, x);
                disp.setAttribute("scale", String(1 + k * (maxScale - 1)));
                turb.setAttribute("baseFrequency", String(BASE_FREQ + k * (HOVER_FREQ - BASE_FREQ)));
            },
            onRest: () => {
                if (!hovering) media.style.filter = "";
            },
        });

        const enter = () => {
            hovering = true;
            fig.dataset.hover = "1";
            media.style.filter = `url(#${fid})`;
            spring.to(1);
        };
        const leave = () => {
            hovering = false;
            delete fig.dataset.hover;
            spring.to(0);
        };

        fig.addEventListener("pointerenter", enter);
        fig.addEventListener("pointerleave", leave);
        return () => {
            fig.removeEventListener("pointerenter", enter);
            fig.removeEventListener("pointerleave", leave);
            spring.stop();
            media.style.filter = "";
        };
    }, [fid, maxScale]);

    return (
        <figure
            ref={figRef}
            className={`li ${bare ? "li--bare" : ""} ${className}`}
            style={ratio ? { aspectRatio: ratio } : undefined}
        >
            <svg className="li-defs" width="0" height="0" aria-hidden="true" focusable="false">
                <filter id={fid} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
                    <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency={BASE_FREQ} numOctaves={2} result="noise" />
                    <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale={1} />
                </filter>
            </svg>

            <div className="li-tone">
                <div ref={mediaRef} className="li-media">
                    <Image
                        key={src}
                        className="li-img"
                        src={src}
                        alt={alt}
                        fill
                        sizes={sizes}
                        priority={priority}
                        style={{ objectFit: fit, objectPosition: position }}
                    />
                </div>
            </div>

            {!bare && (
                <>
                    <span className="li-glow" aria-hidden="true" />
                    <span className="li-vignette" aria-hidden="true" />
                </>
            )}
        </figure>
    );
}
