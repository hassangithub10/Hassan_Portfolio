"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface JournalEntry {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  url: string;
}

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    title: "Engineering Scalable Frontend Architectures with Next.js & React 19",
    category: "Architecture",
    date: "Mar 2026",
    readTime: "5 min read",
    image: "/uploads/2026/02/nextjs.webp",
    url: "https://linkedin.com/in/hassan-sarfraz-6047ba269",
  },
  {
    id: 2,
    title: "Integrating Generative AI & Agentic Workflows in Modern Development",
    category: "Artificial Intelligence",
    date: "Feb 2026",
    readTime: "6 min read",
    image: "/uploads/2026/02/reactjs.webp",
    url: "https://linkedin.com/in/hassan-sarfraz-6047ba269",
  },
  {
    id: 3,
    title: "Performance First: Achieving 95+ PageSpeed & Core Web Vitals",
    category: "Web Performance",
    date: "Jan 2026",
    readTime: "4 min read",
    image: "/uploads/2026/02/seo.webp",
    url: "https://linkedin.com/in/hassan-sarfraz-6047ba269",
  },
  {
    id: 4,
    title: "The Art of Micro-Interactions: Bringing Systems to Life with Framer Motion",
    category: "Interaction Design",
    date: "Dec 2025",
    readTime: "7 min read",
    image: "/uploads/2026/02/typescript.webp",
    url: "https://linkedin.com/in/hassan-sarfraz-6047ba269",
  },
];

export default function Journal() {
  return (
    <section
      id="journal"
      className="bg-bg py-16 md:py-24 relative"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header pattern matching Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            {/* Heading: Recent *thoughts* */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Recent{" "}
              <span className="font-display italic font-normal text-text-primary">
                thoughts
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md mt-3">
              Reflections on frontend engineering, AI paradigms, and digital product design.
            </p>
          </div>

          {/* Desktop "View all" button */}
          <div className="hidden md:inline-flex items-center">
            <a
              href="https://linkedin.com/in/hassan-sarfraz-6047ba269"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-300 font-medium"
            >
              <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span
                className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-all duration-300"
                style={{ backgroundColor: "hsl(var(--surface))" }}
              >
                <span>View all articles</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* 4 journal entries displayed as horizontal pills (rounded-[40px] sm:rounded-full) */}
        <div className="flex flex-col gap-4">
          {journalEntries.map((entry, idx) => (
            <motion.a
              key={entry.id}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-all duration-300 group hover:border-text-primary/30"
              style={{
                backgroundColor: "hsl(var(--surface) / 0.35)",
                borderColor: "hsl(var(--stroke))",
              }}
            >
              {/* Left: Thumbnail + Title */}
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-stroke/30 shrink-0 border border-stroke p-2 flex items-center justify-center">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    width={32}
                    height={32}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="truncate">
                  <span className="text-[11px] text-muted font-mono uppercase tracking-wider block sm:hidden mb-0.5">
                    {entry.category} • {entry.date}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-colors duration-200 truncate">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Right: Meta & Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pl-16 sm:pl-0">
                <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-muted">
                  <span className="px-3 py-1 rounded-full bg-stroke/40 border border-stroke/50">
                    {entry.readTime}
                  </span>
                  <span>{entry.date}</span>
                </div>

                {/* Arrow indicator */}
                <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-text-primary/40 group-hover:bg-stroke/40 transition-all duration-200">
                  <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
