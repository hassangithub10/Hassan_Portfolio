"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface AnimatedBorderProps {
    children: ReactNode;
    className?: string;
    borderWidth?: number;
    duration?: number;
}

export default function AnimatedBorder({
    children,
    className,
    borderWidth = 2,
    duration = 3,
}: AnimatedBorderProps) {
    return (
        <div className={clsx("relative p-[2px] rounded-2xl overflow-hidden", className)}>
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(90deg, 
            var(--color-primary-400), 
            var(--color-primary-600), 
            var(--color-primary-400), 
            var(--color-primary-600), 
            var(--color-primary-400))`,
                    backgroundSize: "300% 100%",
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Inner content */}
            <div
                className="relative rounded-2xl bg-white/40 backdrop-blur-md"
                style={{ padding: borderWidth }}
            >
                <div className="rounded-xl bg-transparent overflow-hidden">{children}</div>
            </div>
        </div>
    );
}

// Static gradient border variant
interface StaticBorderProps {
    children: ReactNode;
    className?: string;
}

export function StaticBorder({ children, className }: StaticBorderProps) {
    return (
        <div
            className={clsx(
                "relative p-[1px] rounded-2xl overflow-hidden",
                className
            )}
            style={{
                background: "linear-gradient(135deg, var(--color-primary-400) 0%, var(--color-primary-600) 50%, var(--color-primary-400) 100%)",
            }}
        >
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm">{children}</div>
        </div>
    );
}
