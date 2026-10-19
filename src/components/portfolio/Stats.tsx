"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  number: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    number: "04+",
    label: "Years Experience",
    description: "Architecting high-performance web systems and AI applications.",
  },
  {
    number: "25+",
    label: "Projects Done",
    description: "Production-ready platforms delivered from initial concept to launch.",
  },
  {
    number: "100%",
    label: "Satisfied Clients",
    description: "Committed to technical excellence, performance, and attention to detail.",
  },
];

export default function Stats() {
  return (
    <section
      className="bg-bg py-16 md:py-24 border-t border-stroke/40 relative select-none"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col border-t border-stroke pt-6 group"
              style={{ borderColor: "hsl(var(--stroke))" }}
            >
              {/* Stat number with font-display italic */}
              <div className="text-6xl sm:text-7xl md:text-8xl font-display italic text-text-primary tracking-tight leading-none mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {stat.number}
              </div>

              {/* Stat label uppercase tracking */}
              <div className="text-xs uppercase tracking-[0.25em] font-mono text-muted mb-2 font-medium">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-sm text-muted/80 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
