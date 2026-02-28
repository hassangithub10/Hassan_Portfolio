"use client";

import { motion } from "framer-motion";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";


const contactInfoItems = [
    {
        icon: EnvelopeIcon,
        label: "Email",
        value: "hassandigital94@hotmail.com",
        href: "mailto:hassandigital94@hotmail.com",
        gradient: "from-[#00f0ff] to-[#0080ff]",
        glow: "group-hover:shadow-[0_0_40px_rgba(0,240,255,0.15)]",
    },
    {
        icon: PhoneIcon,
        label: "Phone",
        value: "+92 311 7371750",
        href: "tel:+923117371750",
        gradient: "from-[#b026ff] to-[#701ced]",
        glow: "group-hover:shadow-[0_0_40px_rgba(176,38,255,0.15)]",
    },
    {
        icon: MapPinIcon,
        label: "Location",
        value: "Remote / Worldwide",
        href: "#",
        gradient: "from-[#00f0ff] to-[#FEC107]",
        glow: "group-hover:shadow-[0_0_40px_rgba(254,193,7,0.15)]",
    },
];

export default function Contact() {
    const personalInfo = {
        fullName: "Hassan Sarfraz",
        title: "Frontend Developer & AI Enthusiast",
        bio: "I craft high-performance, cinematic web experiences with a focus on modern aesthetics and technical excellence. With over 3 years of experience in the digital realm, I bridge the gap between complex backend logic and pixel-perfect frontend interfaces.",
    };

    const title = "Let's";
    const subtitle = "Connect";
    const description = "Have a project in mind? Let's discuss as I'm available.";
    const badgeText = "Contact";

    return (
        <section id="contact" className="section relative overflow-hidden bg-gradient-to-b from-black via-[#05050f] to-black" aria-labelledby="contact-heading">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#00f0ff]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#b026ff]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-[#00f0ff]/3 blur-[100px] pointer-events-none" />

            <div className="container relative z-10 px-4 sm:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <span className="badge-premium mb-3 mt-6 inline-flex items-center gap-2">
                        <EnvelopeIcon className="w-6 h-6" />
                        {badgeText}
                    </span>
                    <h2 id="contact-heading" className="heading-lg text-white mt-4">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                    <p className="body-lg text-white/50 max-w-xl mx-auto mt-5 leading-relaxed">
                        {description}
                    </p>
                </motion.div>

                {/* Contact Info Cards */}
                <div className="max-w-3xl mx-auto flex flex-col gap-5">

                    {contactInfoItems.map((item, i) => (
                        <motion.a
                            key={i}
                            href={item.href}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                            whileHover={{ x: 8 }}
                            className={`group flex items-center gap-6 p-6 sm:p-7 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 ${item.glow}`}
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl flex-shrink-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-7 h-7 text-black" />
                            </div>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                                <p className="text-white font-semibold text-lg truncate">{item.value}</p>
                            </div>

                            {/* Arrow */}
                            <svg className="w-5 h-5 text-white/20 group-hover:text-white/50 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
