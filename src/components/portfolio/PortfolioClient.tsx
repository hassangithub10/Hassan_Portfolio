"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Hero from "./Hero";
import SelectedWorks from "./SelectedWorks";
import Journal from "./Journal";
import Explorations from "./Explorations";
import Stats from "./Stats";
import ContactFooter from "./ContactFooter";

export default function PortfolioClient() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full bg-bg text-text-primary min-h-screen selection:bg-text-primary selection:text-bg">
      {/* Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Pill Navbar */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main className="w-full relative">
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Selected Works */}
        <SelectedWorks />

        {/* Section 4: Journal */}
        <Journal />

        {/* Section 5: Explorations (Parallax Gallery) */}
        <Explorations />

        {/* Section 6: Stats */}
        <Stats />

        {/* Section 7: Contact / Footer */}
        <ContactFooter />
      </main>
    </div>
  );
}
