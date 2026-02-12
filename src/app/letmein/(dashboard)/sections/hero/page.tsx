"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { getPersonalInfo, updatePersonalInfo, getSiteSettings, updateSiteSettings } from "@/lib/actions";

export default function HeroSectionEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [info, setInfo] = useState({
        fullName: "",
        title: "",
        bio: "",
        email: "",
        phone: "",
        location: "",
    });
    const [ctas, setCtas] = useState({
        greeting: "",
        primaryText: "",
        primaryLink: "",
        secondaryText: "",
        secondaryLink: "",
    });

    useEffect(() => {
        async function load() {
            const [data, settings] = await Promise.all([
                getPersonalInfo(),
                getSiteSettings()
            ]);

            if (data) {
                setInfo({
                    fullName: data.fullName || "",
                    title: data.title || "",
                    bio: data.bio || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    location: data.location || "",
                });
            }

            if (settings) {
                const find = (key: string) => settings.find((s: any) => s.settingKey === key)?.settingValue || "";
                setCtas({
                    greeting: find('hero_greeting') || "Hi, I'm",
                    primaryText: find('hero_cta_primary_text') || "View Projects",
                    primaryLink: find('hero_cta_primary_link') || "#projects",
                    secondaryText: find('hero_cta_secondary_text') || "Get In Touch",
                    secondaryLink: find('hero_cta_secondary_link') || "#contact",
                });
            }
            setLoading(false);
        }
        load();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        await updatePersonalInfo(info);
        await updateSiteSettings([
            { settingKey: 'hero_greeting', settingValue: ctas.greeting },
            { settingKey: 'hero_cta_primary_text', settingValue: ctas.primaryText },
            { settingKey: 'hero_cta_primary_link', settingValue: ctas.primaryLink },
            { settingKey: 'hero_cta_secondary_text', settingValue: ctas.secondaryText },
            { settingKey: 'hero_cta_secondary_link', settingValue: ctas.secondaryLink },
        ]);

        alert("Hero section updated successfully!");
        setSaving(false);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl">
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Hero Section</h1>
                <p className="text-white/60">Update your primary identity, contact info, and call-to-action buttons.</p>
            </div>

            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Info Section */}
                    <div className="space-y-6 border-b border-white/5 pb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Hero Content</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-lime mb-2">Greeting / Top Title</label>
                                <input
                                    type="text"
                                    value={ctas.greeting}
                                    onChange={(e) => setCtas({ ...ctas, greeting: e.target.value })}
                                    placeholder="e.g. Hi, I'm"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Name (Main Heading)</label>
                                <input
                                    type="text"
                                    value={info.fullName}
                                    onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Designation / Job Title</label>
                                <input
                                    type="text"
                                    value={info.title}
                                    onChange={(e) => setInfo({ ...info, title: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Location (Optional)</label>
                                <input
                                    type="text"
                                    value={info.location}
                                    onChange={(e) => setInfo({ ...info, location: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Description / Short Bio</label>
                            <textarea
                                value={info.bio}
                                onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                                required
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>

                        {/* Hidden contact fields to preserve state but simplify UI if not needed here */}
                        <div className="grid md:grid-cols-2 gap-6 opacity-50 hidden">
                            <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
                            <input type="text" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                        </div>
                    </div>

                    {/* CTA Buttons Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Call to Action Buttons</h3>

                        <div className="grid md:grid-cols-2 gap-6 p-4 bg-white/5 rounded-xl">
                            <h4 className="md:col-span-2 text-lime font-bold text-sm uppercase tracking-wider">Primary Button</h4>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Label</label>
                                <input
                                    type="text"
                                    value={ctas.primaryText}
                                    onChange={(e) => setCtas({ ...ctas, primaryText: e.target.value })}
                                    placeholder="e.g. View Projects"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Link / Anchor</label>
                                <input
                                    type="text"
                                    value={ctas.primaryLink}
                                    onChange={(e) => setCtas({ ...ctas, primaryLink: e.target.value })}
                                    placeholder="e.g. #projects"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 p-4 bg-white/5 rounded-xl">
                            <h4 className="md:col-span-2 text-white font-bold text-sm uppercase tracking-wider">Secondary Button</h4>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Label</label>
                                <input
                                    type="text"
                                    value={ctas.secondaryText}
                                    onChange={(e) => setCtas({ ...ctas, secondaryText: e.target.value })}
                                    placeholder="e.g. Get In Touch"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Link / Anchor</label>
                                <input
                                    type="text"
                                    value={ctas.secondaryLink}
                                    onChange={(e) => setCtas({ ...ctas, secondaryLink: e.target.value })}
                                    placeholder="e.g. #contact"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full md:w-auto px-8 py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {saving ? "Saving Changes..." : "Save All Changes"}
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
