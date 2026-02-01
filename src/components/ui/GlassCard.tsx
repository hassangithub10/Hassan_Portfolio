"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
    delay?: number;
}

export default function GlassCard({
    children,
    className,
    hover = true,
    gradient = false,
    delay = 0,
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={
                hover
                    ? {
                        y: -8,
                        transition: { duration: 0.3 },
                    }
                    : undefined
            }
            className={clsx(
                "relative overflow-hidden rounded-2xl",
                "bg-[#FDDFCC]/5 border border-[#FDDFCC]/10 backdrop-blur-sm",
                hover && "cursor-pointer hover:border-primary-500/30",
                className
            )}
        >
            {/* Inner glow effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 0%, rgba(247, 93, 0, 0.15) 0%, transparent 50%)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>

            {/* Shimmer effect */}
            {hover && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(247, 93, 0, 0.08), transparent)",
                    }}
                />
            )}
        </motion.div>
    );
}
