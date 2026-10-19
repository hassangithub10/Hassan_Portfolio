"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExplorationItem {
  id: number;
  title: string;
  tag: string;
  image: string;
  rotation: string;
}

const explorations: ExplorationItem[] = [
  {
    id: 1,
    title: "Mindzbay UI/UX System",
    tag: "Interface Motion",
    image: "/uploads/2026/03/mindzbay.webp",
    rotation: "-rotate-2",
  },
  {
    id: 2,
    title: "Tanzeem Welfare Portal",
    tag: "Design System",
    image: "/uploads/2026/03/tanzeem.webp",
    rotation: "rotate-3",
  },
  {
    id: 3,
    title: "Taryaq Medical Platform",
    tag: "Web Experience",
    image: "/uploads/2026/03/taryaq.webp",
    rotation: "-rotate-3",
  },
  {
    id: 4,
    title: "Ali Zaman Portfolio Craft",
    tag: "Visual Identity",
    image: "/uploads/2026/03/alizaman.webp",
    rotation: "rotate-2",
  },
  {
    id: 5,
    title: "Ahmed Zaman Editorial",
    tag: "Digital Editorial",
    image: "/uploads/2026/03/ahmedzaman.webp",
    rotation: "-rotate-1",
  },
  {
    id: 6,
    title: "MMDC Healthcare System",
    tag: "Functional Minimalism",
    image: "/uploads/2026/03/mmdc.webp",
    rotation: "rotate-4",
  },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const [activeLightbox, setActiveLightbox] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinnedContent = pinnedContentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!container || !pinnedContent || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      // Pin the center content across the 300vh scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedContent,
        pinSpacing: false,
      });

      // Parallax movement on column 1
      gsap.fromTo(
        col1,
        { y: 150 },
        {
          y: -400,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Parallax movement on column 2 (different speed and offset for dynamic depth)
      gsap.fromTo(
        col2,
        { y: 350 },
        {
          y: -650,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightbox(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const col1Items = explorations.filter((_, idx) => idx % 2 === 0);
  const col2Items = explorations.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[300vh] w-full bg-bg select-none"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Eyebrow: "Explorations" */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          {/* Heading: "Visual *playground*" */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight font-light mb-4">
            Visual{" "}
            <span className="font-display italic font-normal text-text-primary">
              playground
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed">
            Experiments in interface design, motion micro-interactions, and reactive design systems.
          </p>

          {/* Action button (pointer-events-auto) */}
          <div className="pointer-events-auto">
            <a
              href="https://github.com/hassangithub10"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 font-medium inline-flex items-center gap-2"
            >
              <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span
                className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-all duration-300 backdrop-blur-md"
                style={{ backgroundColor: "hsl(var(--surface) / 0.9)" }}
              >
                <span>Explore on GitHub</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  ↗
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute) */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 md:px-12 pointer-events-none z-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-14 md:gap-32 lg:gap-44 pt-32 pb-48">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-28 md:gap-40 items-start">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden bg-surface border border-stroke p-3 cursor-pointer pointer-events-auto shadow-2xl transition-transform duration-500 hover:scale-105 ${item.rotation} group hover:z-30`}
                style={{
                  backgroundColor: "hsl(var(--surface))",
                  borderColor: "hsl(var(--stroke))",
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stroke/30">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="320px"
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-display italic text-text-primary">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-28 md:gap-40 items-end pt-48 md:pt-64">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden bg-surface border border-stroke p-3 cursor-pointer pointer-events-auto shadow-2xl transition-transform duration-500 hover:scale-105 ${item.rotation} group hover:z-30`}
                style={{
                  backgroundColor: "hsl(var(--surface))",
                  borderColor: "hsl(var(--stroke))",
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stroke/30">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="320px"
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-display italic text-text-primary">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal on Card Click */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 sm:p-10 cursor-pointer"
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-3xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden p-3 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--stroke))",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:scale-110 transition-transform cursor-pointer"
              >
                ✕
              </button>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stroke/20">
                <Image
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  fill
                  sizes="800px"
                  className="object-cover object-top"
                />
              </div>

              <div className="p-5 flex justify-between items-center">
                <div>
                  <span className="text-xs text-muted uppercase tracking-widest font-mono">
                    {activeLightbox.tag}
                  </span>
                  <h3 className="text-2xl font-display italic text-text-primary">
                    {activeLightbox.title}
                  </h3>
                </div>
                <span className="text-xs text-muted font-mono">Press ESC or click outside</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
