"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface LogoTickerProps {
    children: ReactNode;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

export default function LogoTicker({
    children,
    direction = "left",
    speed = 20,
    pauseOnHover = true,
    className,
}: LogoTickerProps) {
    return (
        <div
            className={clsx(
                "relative overflow-hidden py-8",
                pauseOnHover && "group",
                className
            )}
        >
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-charcoal to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-charcoal to-transparent pointer-events-none" />

            {/* Scrolling content */}
            <motion.div
                className={clsx(
                    "flex gap-8 items-center w-max",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
                style={{
                    animation: `${direction === "left" ? "ticker" : "ticker-reverse"} ${speed}s linear infinite`,
                }}
            >
                {/* Original items */}
                {children}
                {/* Duplicate for seamless loop */}
                {children}
            </motion.div>
        </div>
    );
}

// Individual ticker item
interface TickerItemProps {
    children: ReactNode;
    className?: string;
}

export function TickerItem({ children, className }: TickerItemProps) {
    return (
        <div
            className={clsx(
                "flex-shrink-0 flex items-center justify-center px-6 py-4 glass-card rounded-xl",
                "hover:shadow-glow transition-shadow duration-300 cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
}
