"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactForm } from "@/lib/actions";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { PersonalInfo } from "@/db/schema"; // Import PersonalInfo

interface ContactProps {
    info?: PersonalInfo | null;
    content: any;
}

export default function Contact({ info, content }: ContactProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    // Dynamic Content Defaults
    const title = content?.title || "Let's";
    const subtitle = content?.subtitle || "Connect";
    const description = content?.description || "Have a project in mind? Let's discuss as I'm available.";
    const badgeText = content?.badgeText || "Contact";
    const badgeColor = content?.badgeColor || "#00f0ff";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const result = await submitContactForm(formData);
            setSubmitStatus(result);
            if (result.success) {
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch {
            setSubmitStatus({ success: false, message: "An error occurred. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="contact" className="section relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black">
            {/* Background */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-[#ff6b35]/10 to-transparent rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#00f0ff]/10 to-transparent rounded-full blur-[120px]" />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 mx-auto"
                >
                    <span className="badge-premium mb-6">
                        <EnvelopeIcon className="w-4 h-4" />
                        {badgeText}
                    </span>
                    <h2 className="heading-lg text-white">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                    <p className="body-lg text-white/60 max-w-2xl mx-auto mt-6">
                        {description}
                    </p>
                </motion.div>

                {/* Split Layout: Form + Contact Info */}
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Inputs */}
                            {[
                                { name: "name", placeholder: "Your Name", type: "text" },
                                { name: "email", placeholder: "Your Email", type: "email" },
                                { name: "subject", placeholder: "Subject", type: "text" },
                            ].map((field) => (
                                <div key={field.name} className="relative group">
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={(formData as any)[field.name]}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField(field.name)}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        placeholder={field.placeholder}
                                        className={`w-full px-6 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-white/30 outline-none transition-all ${focusedField === field.name
                                            ? "border-primary-500 shadow-lg shadow-primary-500/20"
                                            : "border-white/10 group-hover:border-white/20"
                                            }`}
                                    />
                                </div>
                            ))}

                            {/* Message */}
                            <div className="relative group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    rows={6}
                                    placeholder="Your Message"
                                    className={`w-full px-6 py-4 bg-white/5 backdrop-blur-xl border rounded-2xl text-white placeholder-white/30 outline-none resize-none transition-all ${focusedField === "message"
                                        ? "border-primary-500 shadow-lg shadow-primary-500/20"
                                        : "border-white/10 group-hover:border-white/20"
                                        }`}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-premium w-full py-5 text-base"
                            >
                                {isSubmitting ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        Send Message
                                        <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>

                            {/* Status Message */}
                            <AnimatePresence>
                                {submitStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-5 rounded-2xl text-center font-bold text-sm tracking-widest uppercase ${submitStatus.success
                                            ? "bg-primary-500/10 text-primary-400 border border-primary-500/30"
                                            : "bg-red-500/10 text-red-400 border border-red-500/30"
                                            }`}
                                    >
                                        {submitStatus.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 lg:max-w-md"
                    >
                        <div className="space-y-6 relative">
                            {/* Background Glow for Info Column */}
                            <div className="absolute -inset-10 bg-primary-500/5 blur-[100px] pointer-events-none" />

                            <h3 className="text-3xl font-black text-white mb-10 font-heading tracking-tight underline decoration-primary-500 decoration-4 underline-offset-8">
                                Connection Hub
                            </h3>

                            {/* Info Items */}
                            {[
                                { icon: EnvelopeIcon, label: "Email", value: "hassan@example.com", color: "from-primary-500 to-primary-600" },
                                { icon: PhoneIcon, label: "Phone", value: "+1 (555) 123-4567", color: "from-[#b026ff] to-[#701ced]" },
                                { icon: MapPinIcon, label: "Location", value: "Remote / Worldwide", color: "from-primary-400 to-[#FEC107]" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="flex items-start gap-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl group transition-all hover:bg-white/[0.08] hover:border-white/20"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-7 h-7 text-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-1">{item.label}</h4>
                                        <p className="text-white font-heading font-bold text-xl">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
