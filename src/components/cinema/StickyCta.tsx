"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/scroll";
import Magnetic from "./Magnetic";

/** Persistent call to action once the hero has passed; hides when the contact section is in view. */
export default function StickyCta() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const contact = document.getElementById("contact");
            const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
            setShow(window.scrollY > window.innerHeight * 0.8 && !nearContact);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-5 right-5 z-[70] transition-all duration-500 md:bottom-8 md:right-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
        >
            <Magnetic strength={0.3}>
                <a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToTarget("#contact");
                    }}
                    className="btn btn-primary shadow-[0_10px_40px_-8px_rgba(255,162,74,0.6)]"
                    tabIndex={show ? 0 : -1}
                >
                    Start a project
                </a>
            </Magnetic>
        </div>
    );
}
