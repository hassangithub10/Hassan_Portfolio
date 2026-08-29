"use client";

import { motion } from "framer-motion";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import Parallax3DCard from "@/components/ui/Parallax3DCard";
import { executeRecaptcha } from "@/lib/recaptcha";



const contactInfoItems = [
    {
        icon: EnvelopeIcon,
        label: "Email",
        value: "digitalwork.990@gmail.com",
        href: "mailto: digitalwork.990@gmail.com",
        gradient: "from-primary-400 to-primary-600",
    },
    {
        icon: PhoneIcon,
        label: "Phone",
        value: "+92 311 7371750",
        href: "tel:+923117371750",
        gradient: "from-primary-500 to-primary-700",
    },
    {
        icon: MapPinIcon,
        label: "Location",
        value: "Remote / Worldwide",
        href: "#",
        gradient: "from-primary-400 to-primary-900",
    },
];

export default function Contact() {
    const title = "Let's";
    const subtitle = "Connect";
    const description = "Have a project in mind? Let's discuss as I'm available.";
    const badgeText = "Contact";

    return (
        <section id="contact" className="section relative overflow-hidden" aria-labelledby="contact-heading">

            {/* Ambient Background Glows */}
            <div className="float-orb absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary-500/6 to-transparent rounded-full blur-[130px] pointer-events-none" />
            <div className="float-orb-slow absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-primary-600/5 to-transparent rounded-full blur-[130px] pointer-events-none" />
            <div className="shimmer-line absolute top-0 left-0 w-full h-[2px]" />

            <div className="container relative z-10 px-4 sm:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: -6 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <span className="badge-premium mb-3 mt-6 inline-flex items-center gap-2">
                        <EnvelopeIcon className="w-6 h-6" />
                        {badgeText}
                    </span>
                    <h2 id="contact-heading" className="heading-lg text-gray-900 mt-4">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                    <p className="body-lg text-gray-600 max-w-xl mx-auto mt-5 leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Contact Info Cards — 3D tilt */}
                <div className="max-w-3xl mx-auto flex flex-col gap-5 perspective-container">
                    {contactInfoItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, rotateX: -8 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                            style={{ perspective: "1200px" }}
                        >
                            <Parallax3DCard
                                maxTilt={10}
                                glowColor="rgba(14, 165, 233, 0.14)"
                                hoverScale={1.02}
                                className="w-full"
                            >
                                <a
                                    href={item.href}
                                    onClick={() => executeRecaptcha(`contact_${item.label.toLowerCase()}`)}
                                    className="group flex items-center gap-6 p-6 sm:p-7 rounded-3xl bg-white/60 backdrop-blur-xl border border-primary-500/10 hover:border-primary-500/30 hover:bg-white/80 transition-all duration-300 card-3d"
                                >

                                    {/* Shimmer top line */}
                                    <div className="shimmer-line absolute top-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl flex-shrink-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shadow-primary-500/20`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Text */}
                                    <div className="min-w-0 flex-1">
                                        <p className="text-gray-900/40 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-gray-900 font-semibold text-lg truncate">{item.value}</p>
                                    </div>

                                    {/* Arrow */}
                                    <svg className="w-5 h-5 text-gray-900/20 group-hover:text-primary-500 flex-shrink-0 transition-colors group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </Parallax3DCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
