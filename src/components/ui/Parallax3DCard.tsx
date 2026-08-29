"use client";

import { useRef, ReactNode } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { clsx } from "clsx";

interface Parallax3DCardProps {
    children: ReactNode;
    className?: string;
    /** Maximum tilt in degrees (default 12) */
    maxTilt?: number;
    /** Whether to apply a subtle lift shadow on hover */
    withLift?: boolean;
    /** Scale up slightly on hover */
    hoverScale?: number;
    /** Glow colour (CSS colour string) */
    glowColor?: string;
}

export default function Parallax3DCard({
    children,
    className,
    maxTilt = 12,
    withLift = true,
    hoverScale = 1.02,
    glowColor = "rgba(249, 115, 22, 0.18)",

}: Parallax3DCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Spring-interpolated raw values
    const rawX = useSpring(0, { stiffness: 180, damping: 22 });
    const rawY = useSpring(0, { stiffness: 180, damping: 22 });
    const rawScale = useSpring(1, { stiffness: 200, damping: 25 });
    const rawGlow = useSpring(0, { stiffness: 150, damping: 20 });

    // Transform raw → CSS values
    const rotateY: MotionValue<string> = useTransform(rawX, (v) => `${v}deg`);
    const rotateX: MotionValue<string> = useTransform(rawY, (v) => `${-v}deg`);
    const glowOpacity = useTransform(rawGlow, [0, 1], [0, 1]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        rawX.set(dx * maxTilt);
        rawY.set(dy * maxTilt);
        rawScale.set(hoverScale);
        rawGlow.set(1);
    }

    function handleMouseLeave() {
        rawX.set(0);
        rawY.set(0);
        rawScale.set(1);
        rawGlow.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                scale: rawScale,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                position: "relative",
            }}

            className={clsx("cursor-default", className)}
        >
            {/* Glow overlay */}
            {withLift && (
                <motion.div
                    style={{
                        opacity: glowOpacity,
                        background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />
            )}
            <div style={{ position: "relative", zIndex: 1, transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}
