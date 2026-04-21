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
        value: "webguy@hassansarfraz.online",
        href: "mailto:webguy@hassansarfraz.online",
        gradient: "from-primary-400 to-primary-600",
        glow: "group-hover:shadow-lg group-hover:shadow-primary-500/10",
    },
    {
        icon: PhoneIcon,
        label: "Phone",
        value: "+92 311 7371750",
        href: "tel:+923117371750",
        gradient: "from-primary-500 to-primary-700",
        glow: "group-hover:shadow-lg group-hover:shadow-primary-500/10",
    },
    {
        icon: MapPinIcon,
        label: "Location",
        value: "Remote / Worldwide",
        href: "#",
        gradient: "from-primary-400 to-primary-900",
        glow: "group-hover:shadow-lg group-hover:shadow-primary-500/10",
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
        <section id="contact" className="section relative overflow-hidden" aria-labelledby="contact-heading">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-primary-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-primary-500/5 blur-[100px] pointer-events-none" />

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
                    <h2 id="contact-heading" className="heading-lg text-gray-900 mt-4">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                    <p className="body-lg text-gray-600 max-w-xl mx-auto mt-5 leading-relaxed">
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
                            className={`group flex items-center gap-6 p-6 sm:p-7 rounded-3xl bg-white/40 backdrop-blur-xl border border-primary-500/10 hover:border-primary-500/30 hover:bg-white/60 transition-all duration-300 ${item.glow}`}
                        >
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
                            <svg className="w-5 h-5 text-gray-900/20 group-hover:text-primary-500 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
