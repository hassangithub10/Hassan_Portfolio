"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import Nav from "./Nav";
import Hero from "./Hero";
import ClientMarquee from "./ClientMarquee";
import Promise_ from "./Promise";
import Work from "./Work";
import Services from "./Services";
import Process from "./Process";
import Proof from "./Proof";
import Faq from "./Faq";
import Contact from "./Contact";
import StickyCta from "./StickyCta";

const WebGLScene = dynamic(() => import("./WebGLScene"), { ssr: false });

export default function CinemaApp() {
    const [ready, setReady] = useState(false);
    const onDone = useCallback(() => setReady(true), []);

    return (
        <>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-tungsten focus:px-5 focus:py-2 focus:text-ink">
                Skip to content
            </a>
            <SmoothScroll />
            <WebGLScene />
            <div aria-hidden className="grain" />
            <ScrollProgress />
            <Cursor />
            <Preloader onDone={onDone} />
            <Nav ready={ready} />
            <main id="main-content" className="relative z-10">
                <Hero ready={ready} />
                <ClientMarquee />
                <Promise_ />
                <Work />
                <Services />
                <Process />
                <Proof />
                <Faq />
                <Contact />
            </main>
            <StickyCta />
        </>
    );
}
