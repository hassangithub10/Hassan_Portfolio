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
            #F75D00, 
            #FEC107, 
            #F75D00, 
            #FEC107, 
            #F75D00)`,
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
                className="relative rounded-2xl bg-black"
                style={{ padding: borderWidth }}
            >
                <div className="rounded-xl bg-black overflow-hidden">{children}</div>
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
                background: "linear-gradient(135deg, #F75D00 0%, #FEC107 50%, #F75D00 100%)",
            }}
        >
            <div className="rounded-2xl bg-black">{children}</div>
        </div>
    );
}
