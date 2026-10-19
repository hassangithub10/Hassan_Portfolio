"use client";

import React, { useEffect, useState } from "react";

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection = "home" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = ["home", "work", "journal", "explorations", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Journal", href: "#journal", id: "journal" },
    { label: "Explorations", href: "#explorations", id: "explorations" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-all duration-300 ${
          isScrolled ? "shadow-md shadow-black/40 border-white/15" : ""
        }`}
        style={{
          backgroundColor: "hsl(var(--surface) / 0.85)",
          borderColor: "hsl(var(--stroke))",
        }}
      >
        {/* 1. Logo: 9x9 circle with accent gradient border (reverses on hover) */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center shrink-0 cursor-pointer"
          aria-label="Hassan Sarfraz Home"
        >
          {/* Gradient ring reversing direction on hover */}
          <div className="absolute inset-0 rounded-full accent-gradient group-hover:rotate-180 transition-transform duration-700 ease-out" />
          {/* Inner bg-bg circle with "HS" */}
          <div
            className="relative w-full h-full rounded-full bg-bg flex items-center justify-center"
            style={{ backgroundColor: "hsl(var(--bg))" }}
          >
            <span className="font-display italic text-[13px] text-text-primary tracking-tighter select-none font-semibold">
              HS
            </span>
          </div>
        </a>

        {/* 2. Divider (hidden on mobile) */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden sm:block opacity-60" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
                  isActive
                    ? "text-text-primary bg-stroke/60 shadow-sm"
                    : "text-muted hover:text-text-primary hover:bg-stroke/40"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden sm:block opacity-60" />

        {/* 5. "Say hi" button with accent gradient hover border behind */}
        <a
          href="mailto:digitalwork.990@gmail.com"
          className="group relative text-xs sm:text-sm rounded-full transition-all duration-200"
        >
          {/* Accent gradient border behind shown on hover */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
          <span
            className="relative inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md text-text-primary font-medium transition-colors duration-200"
            style={{ backgroundColor: "hsl(var(--surface))" }}
          >
            <span>Say hi</span>
            <span className="text-[11px] font-mono group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </span>
        </a>
      </nav>
    </header>
  );
}
