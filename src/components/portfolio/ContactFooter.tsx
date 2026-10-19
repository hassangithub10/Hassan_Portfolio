"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Hls from "hls.js";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Setup Flipped HLS background video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.muted = true;
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
      video.addEventListener("loadedmetadata", () => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Marquee: xPercent -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const anim = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const marqueeText = "BUILDING THE FUTURE • ".repeat(10);

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/hassangithub10" },
    { label: "LinkedIn", href: "https://linkedin.com/in/hassan-sarfraz-6047ba269" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Email", href: "mailto:digitalwork.990@gmail.com" },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden border-t border-stroke/50 select-none"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Flipped vertically HLS background video (scale-y-[-1]) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated motion fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/animated.webp"
          alt="Cosmic Motion Footer Background"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full object-cover object-center -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-40"
        />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/thumbnail.webp?time=2"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full object-cover object-center -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-50"
        />

        {/* Heavier overlay: bg-black/60 */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        {/* Top fade gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, hsl(var(--bg)) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* GSAP Marquee */}
      <div className="relative z-10 w-full overflow-hidden mb-16 md:mb-24 pointer-events-none opacity-40">
        <div
          ref={marqueeRef}
          className="inline-flex whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic text-text-primary/30 tracking-tight"
        >
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      {/* Center CTA Section */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-16 md:mb-20">
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono mb-4">
          Initiate Collaboration
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-text-primary tracking-tight max-w-3xl mb-8">
          Let&apos;s create something{" "}
          <span className="font-display italic font-normal text-text-primary">
            extraordinary
          </span>{" "}
          together.
        </h2>

        {/* CTA Email button with gradient hover border ring */}
        <a
          href="mailto:digitalwork.990@gmail.com"
          className="group relative rounded-full p-[1.5px] transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          {/* Accent gradient ring */}
          <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-80 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
          <span
            className="relative inline-flex items-center gap-3 rounded-full px-8 py-4 bg-surface text-text-primary font-medium text-sm md:text-base backdrop-blur-md group-hover:bg-bg transition-colors duration-300"
            style={{ backgroundColor: "hsl(var(--surface))" }}
          >
            <span>digitalwork.990@gmail.com</span>
            <span className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
              ↗
            </span>
          </span>
        </a>
      </div>

      {/* Footer Bar */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 border-t border-stroke pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Availability badge with green pulsing dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/80 border border-stroke text-xs font-mono text-text-primary/90">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for projects</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-text-primary transition-colors duration-200 font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted/60 font-mono">
          © {new Date().getFullYear()} Hassan Sarfraz • Built with Next.js, GSAP &amp; Tailwind
        </div>
      </div>
    </footer>
  );
}
