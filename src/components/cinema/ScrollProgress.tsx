"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
    const bar = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const st = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                if (bar.current) gsap.set(bar.current, { scaleX: self.progress });
            },
        });
        return () => st.kill();
    }, []);
    return <div ref={bar} aria-hidden className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left scale-x-0 bg-tungsten" />;
}
