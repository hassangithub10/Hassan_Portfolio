"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  image: string;
  url: string;
  colSpan: string; // 'md:col-span-7' or 'md:col-span-5'
  aspectRatio: string;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Digital Konnecter Systems",
    category: "Enterprise Infrastructure & Modern Web",
    summary: "Leading IT integrator delivering robust, scalable web architectures and digital platforms.",
    image: "/uploads/2026/03/dks.webp",
    url: "https://www.dks.com.pk",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10] md:aspect-auto md:h-[430px]",
  },
  {
    id: 2,
    title: "Cheo's Auto Motion",
    category: "Automotive Service & Workflow",
    summary: "High-performance automotive diagnostics portal and service experience.",
    image: "/uploads/2026/03/cheosautosservice.webp",
    url: "https://www.cheosautosservice.com",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[16/10] md:aspect-auto md:h-[430px]",
  },
  {
    id: 3,
    title: "Oris Dental Aesthetics",
    category: "Healthcare & Smile Architecture",
    summary: "Refined digital branding and patient booking portal for smile cosmetic artisans.",
    image: "/uploads/2026/03/oriscare.webp",
    url: "https://new.oriscare.com",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[16/10] md:aspect-auto md:h-[430px]",
  },
  {
    id: 4,
    title: "Khudii Welfare Network",
    category: "Civic Impact & Digital Welfare",
    summary: "Pakistan's digital welfare ecosystem connecting donors, volunteers, and social initiatives.",
    image: "/uploads/2026/03/khudii.webp",
    url: "https://www.khudii.com",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10] md:aspect-auto md:h-[430px]",
  },
];

export default function SelectedWorks() {
  return (
    <section
      id="work"
      className="bg-bg py-16 md:py-24 relative"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with Framer Motion whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow: w-8 h-px bg-stroke + "Selected Work" text-xs text-muted uppercase tracking-[0.3em] */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading: Featured *projects* */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light">
              Featured{" "}
              <span className="font-display italic font-normal text-text-primary">
                projects
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md mt-3">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* Desktop "View all work" button */}
          <div className="hidden md:inline-flex items-center">
            <a
              href="https://github.com/hassangithub10"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-300 font-medium"
            >
              <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span
                className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-all duration-300"
                style={{ backgroundColor: "hsl(var(--surface))" }}
              >
                <span>View all work</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid: 7 / 5 / 5 / 7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`${project.colSpan} ${project.aspectRatio} relative bg-surface border border-stroke rounded-3xl overflow-hidden group cursor-pointer`}
              style={{
                backgroundColor: "hsl(var(--surface))",
                borderColor: "hsl(var(--stroke))",
              }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                {/* Background image with object-cover group-hover:scale-105 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                  />
                </div>

                {/* Halftone overlay: radial-gradient(circle, #000 1px, transparent 1px) at 4x4px, opacity-20 mix-blend-multiply */}
                <div
                  className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />

                {/* Subtle base vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Default bottom text for mobile/idle */}
                <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end z-10 group-hover:opacity-0 transition-opacity duration-200">
                  <div>
                    <span className="text-[11px] text-muted uppercase tracking-wider block font-mono">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display italic text-text-primary">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs text-muted font-mono">0{project.id}</span>
                </div>

                {/* Hover overlay: bg-bg/70 opacity-0->1 + backdrop-blur-lg */}
                <div className="absolute inset-0 bg-bg/75 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md flex flex-col justify-between p-7 sm:p-8 z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-muted uppercase tracking-widest font-mono">
                      0{project.id} • {project.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-stroke/60 flex items-center justify-center text-text-primary text-xs font-mono group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      ↗
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-text-primary/80 max-w-md leading-relaxed hidden sm:block">
                      {project.summary}
                    </p>

                    {/* Hover label: pill with animated gradient border, white bg, "View — *Title*" */}
                    <div>
                      <div className="relative inline-flex rounded-full p-[1px] overflow-hidden">
                        <span className="absolute inset-0 accent-gradient animate-gradient-shift rounded-full" />
                        <span className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium tracking-wide shadow-lg">
                          <span>View —</span>
                          <span className="font-display italic text-sm font-semibold">
                            {project.title}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
