"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter 000 -> 100 over 2700ms using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    const duration = 2700;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        // 400ms delay then calls onComplete
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Center rotating words every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-auto"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Top Bar: Top-left "Portfolio" label */}
      <div className="w-full flex justify-between items-start">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.span>
        <span className="text-xs text-muted/60 font-mono tracking-widest">
          EST. 2026
        </span>
      </div>

      {/* Center: Rotating words cycling every 900ms */}
      <div className="w-full flex items-center justify-center py-12">
        <AnimatePresence mode="wait">
          <motion.h2
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.85 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary text-center tracking-tight"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Section: Counter display + bottom progress bar */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-end items-baseline">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter leading-none">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Bottom progress bar: h-[3px] bg-stroke/50, inner div with .accent-gradient, scaleX(count/100) */}
        <div className="w-full h-[3px] bg-stroke/50 relative overflow-hidden rounded-full">
          <div
            className="h-full accent-gradient transition-transform duration-75 ease-linear rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: "left",
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
