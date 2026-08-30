"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "clsx";

export interface ScrollStackItemProps {
    children: ReactNode;
    /** 0-based stack index — controls z-index ordering */
    index: number;
    /** Total number of items in the stack */
    total: number;
    className?: string;
    /** Section id for accessibility */
    id?: string;
}

/**
 * ScrollStack
 * Wraps sections so they cover each other as the user scrolls.
 */
export function ScrollStack({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            style={{ position: "relative" }}
            className={clsx("relative w-full", className)}
        >
            {children}
        </div>
    );
}

/**
 * ScrollStackItem
 * Calculates its own height. If taller than viewport, it allows scrolling to the bottom before pinning.
 * Adds a scroll runway spacer so the next card doesn't immediately overlap it.
 */
export function ScrollStackItem({
    children,
    index,
    total,
    className,
    id,
}: ScrollStackItemProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [stickyTop, setStickyTop] = useState("0px");

    useEffect(() => {
        const updateTop = () => {
            if (!contentRef.current) return;
            const contentHeight = contentRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            if (contentHeight > viewportHeight) {
                // If content is taller than viewport, pin the bottom edge
                setStickyTop(`${viewportHeight - contentHeight}px`);
            } else {
                // Normal top pinning
                setStickyTop("0px");
            }
        };

        // Observe resize changes of content and window
        const observer = new ResizeObserver(updateTop);
        if (contentRef.current) {
            observer.observe(contentRef.current);
        }
        window.addEventListener("resize", updateTop);
        
        updateTop();

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateTop);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const isLast = index === total - 1;

    // Scale down and fade as it gets covered by the next card
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, index === 0 ? 0.92 : 0.95]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.8, 1],
        [1, 1, index === 0 ? 0.6 : 0.8]
    );

    // If pinned to the bottom (negative top), scale from the bottom so it doesn't lift off the viewport edge
    const transformOrigin = stickyTop === "0px" ? "top center" : "bottom center";

    return (
        <div 
            ref={containerRef} 
            style={{ position: "relative", zIndex: index + 1 }}
            className="relative w-full" 
        >
            <motion.div
                ref={contentRef}
                id={id}
                style={{
                    scale: !isLast ? scale : 1,
                    opacity: !isLast ? opacity : 1,
                    position: "sticky",
                    top: stickyTop,
                    transformOrigin,
                    minHeight: "100vh",
                    width: "100%",
                }}
                className={clsx(
                    "will-change-transform overflow-hidden",
                    className
                )}
            >
                {children}
            </motion.div>
            
            {/* Runway Spacer: Gives user a 75vh scrolling pause before the next section covers this one */}
            {!isLast && <div style={{ height: "75vh", pointerEvents: "none" }} />}
        </div>
    );
}
