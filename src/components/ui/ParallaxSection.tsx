"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "clsx";

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: "up" | "down";
}

export default function ParallaxSection({
    children,
    className,
    speed = 0.5,
    direction = "up",
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
    );

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className={clsx("relative", className)}
        >
            {children}
        </motion.div>
    );
}

// Parallax background layer
interface ParallaxLayerProps {
    children?: ReactNode;
    className?: string;
    speed?: number;
    zIndex?: number;
}

export function ParallaxLayer({
    children,
    className,
    speed = 0.3,
    zIndex = -1,
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);

    return (
        <motion.div
            ref={ref}
            style={{ y, zIndex }}
            className={clsx("absolute inset-0 pointer-events-none", className)}
        >
            {children}
        </motion.div>
    );
}
