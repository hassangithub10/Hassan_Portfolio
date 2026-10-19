"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hls from "hls.js";

const roles = [
  "Frontend Developer",
  "AI Specialist",
  "Creative Technologist",
  "Fullstack Engineer",
];

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Setup HLS video stream & fallback motion image
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set DOM properties for autoplay compliance in modern browsers
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
        backBufferLength: 90,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.muted = true;
        video.play().catch((err) => {
          console.warn("Autoplay blocked, user interaction required:", err);
        });
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.warn("HLS fatal error, falling back to native or poster:", data);
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Apple HLS support (Safari/iOS)
      video.src = HLS_SRC;
      video.addEventListener("loadedmetadata", () => {
        video.muted = true;
        video.play().catch(() => { });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance Timeline:
  // .name-reveal: opacity 0->1, y 50->0, duration 1.2s, delay 0.1s
  // .blur-in: opacity 0->1, filter blur(10px)->blur(0px), y 20->0, duration 1s, stagger 0.1, delay 0.3s
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.0, stagger: 0.1 },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Cycle role every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-16 px-6 select-none"
      style={{ backgroundColor: "hsl(var(--bg))" }}
    >
      {/* Background Motion Image & HLS Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Persistent High-Resolution Swirling Motion Vortex Fallback (ensures zero blank delay) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/animated.webp"
          alt="Cosmic Vortex Motion Background"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full object-cover object-center -translate-x-1/2 -translate-y-1/2"
        />

        {/* Live Smooth HLS Stream Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://image.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g/thumbnail.webp?time=2"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full object-cover object-center -translate-x-1/2 -translate-y-1/2"
        />

        {/* Dark overlay: bg-black/20 as specified */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Bottom fade: h-48 bg-gradient-to-t from-bg to-transparent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to top, hsl(var(--bg)) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Hero Centered Content (z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow: text-xs text-muted uppercase tracking-[0.3em] mb-8 — "COLLECTION '26". Class blur-in */}
        {/* <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 md:mb-8 font-medium">
          COLLECTION &apos;26 • PORTFOLIO
        </div> */}

        {/* Name: text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 — "Hassan Sarfraz". Class name-reveal */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 font-normal">
          Hassan Sarfraz
        </h1>

        {/* Role line: "A {role} based in Lahore & Global." Roles cycle every 2s */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-text-primary/90 font-light mb-4 flex items-center justify-center flex-wrap gap-2">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-medium border-b border-stroke/70 px-1"
          >
            {roles[roleIndex]}
          </span>
          <span>based in Lahore &amp; Global.</span>
        </div>

        {/* Description: text-sm md:text-base text-muted max-w-md mb-12 */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons (inline-flex gap-4) */}
        <div className="blur-in inline-flex items-center gap-4 flex-wrap justify-center">
          {/* "See Works": Solid button. Default: bg-text-primary text-bg. Hover: bg-bg text-text-primary with accent gradient border ring */}
          <button
            onClick={() => scrollToSection("work")}
            className="group relative rounded-full text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 cursor-pointer font-medium"
          >
            {/* Animated accent gradient ring behind on hover */}
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span
              className="relative inline-flex items-center justify-center rounded-full w-full h-full px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300"
              style={{
                backgroundColor: undefined,
              }}
            >
              See Works
            </span>
          </button>

          {/* "Reach out...": Outlined button. Default: border-2 border-stroke bg-bg text-text-primary. Hover: border-transparent with accent gradient border ring */}
          <a
            href="mailto:digitalwork.990@gmail.com"
            className="group relative rounded-full text-sm px-7 py-3.5 transition-all duration-300 hover:scale-105 cursor-pointer font-medium"
          >
            {/* Accent gradient ring behind on hover */}
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span
              className="relative inline-flex items-center justify-center rounded-full w-full h-full px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent transition-all duration-300"
              style={{
                backgroundColor: "hsl(var(--bg))",
              }}
            >
              Reach out...
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator: Bottom-center, text-xs text-muted uppercase tracking-[0.2em] "SCROLL" above line with .animate-scroll-down */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] font-mono">
          SCROLL
        </span>
        <div className="relative w-[1px] h-10 bg-stroke overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
