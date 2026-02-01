"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Service } from "@/db/schema";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ServicesProps {
    services: Service[];
    content: any;
}

export default function Services({ services, content }: ServicesProps) {
    if (services.length === 0) return null;

    // Dynamic Content Defaults
    const title = content?.title || "What I";
    const subtitle = content?.subtitle || "Offer";
    const badgeText = content?.badgeText || "Services";

    return (
        <section id="services" className="section relative overflow-hidden bg-black">
            {/* Background */}
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-transparent rounded-full blur-[120px]" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 mx-auto"
                >
                    <span className="badge-premium mb-6">
                        <SparklesIcon className="w-4 h-4 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 10, y: -x * 10 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full perspective-1000"
        >
            <motion.div
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative p-8 bg-white/[0.03] backdrop-blur-xl rounded-3xl border overflow-hidden transition-all duration-500 hover:bg-white/[0.08] ${service.isRecommended
                    ? "border-primary-500/50 shadow-lg shadow-primary-500/20"
                    : "border-white/10"
                    }`}
            >
                {/* Recommended Badge */}
                {service.isRecommended && (
                    <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500 text-black text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-lg shadow-primary-500/30">
                            <SparklesIcon className="w-3 h-3" />
                            Popular Choice
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 font-heading tracking-tight group-hover:text-primary-400 transition-colors">{service.title}</h3>
                    <p className="text-white/60 text-base leading-relaxed mb-8">{service.description}</p>

                    <div className="text-4xl md:text-5xl font-black text-primary-500 mb-8 font-heading tabular-nums">{service.priceText}</div>

                    {/* Features */}
                    <ul className="space-y-4 mb-10">
                        {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 text-white/70 text-sm">
                                <CheckIcon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <Link
                        href="#contact"
                        className={`block w-full py-4 text-center rounded-2xl font-heading font-bold uppercase tracking-widest text-sm transition-all ${service.isRecommended
                            ? "bg-primary-500 text-black shadow-lg shadow-primary-500/30 hover:scale-[1.02]"
                            : "bg-white/5 text-white border border-white/20 hover:bg-white/10"
                            }`}
                    >
                        Get Started
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
