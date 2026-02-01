"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { getSiteSettings, updateSiteSetting, getPersonalInfo, updatePersonalInfo } from "@/lib/actions";
import Link from "next/link";
import { ChevronLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function AboutManager() {
    const [settings, setSettings] = useState<any[]>([]);
    const [info, setInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            const [sData, iData] = await Promise.all([
                getSiteSettings(),
                getPersonalInfo()
            ]);
            setSettings(sData);
            setInfo(iData);
            setLoading(false);
        }
        load();
    }, []);

    const handleSettingSave = async (key: string, value: string) => {
        setSaving(true);
        const res = await updateSiteSetting(key, value);
        if (res.success) {
            setSettings(prev => prev.map(s => s.settingKey === key ? { ...s, settingValue: value } : s));
        }
        setSaving(false);
    };

    const handleInfoSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await updatePersonalInfo(info);
        if (res.success) {
            alert("Bio updated!");
        }
        setSaving(false);
    };

    if (loading) return <div className="text-white">Loading about details...</div>;

    const getSetting = (key: string) => settings.find(s => s.settingKey === key)?.settingValue || "";

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/sections"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg mb-2">About & Identity</h1>
                    <p className="text-white/60">Manage your detailed bio, stats, and social presence.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Detailed Bio (Personal Info) */}
                <GlassCard className="p-8 space-y-6">
                    <h3 className="text-xl font-heading text-white">Profile Bio</h3>
                    <form onSubmit={handleInfoSave} className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Your Detailed Bio</label>
                            <textarea
                                value={info?.bio || ""}
                                onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-lime text-charcoal rounded-lg font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Update Bio"}
                            </button>
                        </div>
                    </form>
                </GlassCard>

                {/* Portfolio Stats */}
                <GlassCard className="p-8 space-y-6">
                    <h3 className="text-xl font-heading text-white">Portfolio Stats</h3>
                    <p className="text-sm text-white/40 mb-4">These appear in the About section counters.</p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { key: "about_experience_years", label: "Years Experience", placeholder: "6+" },
                            { key: "about_projects_completed", label: "Projects Completed", placeholder: "50+" },
                            { key: "about_happy_clients", label: "Happy Clients", placeholder: "30+" },
                            { key: "about_technologies_count", label: "Technologies Count", placeholder: "10+" },
                        ].map((stat) => (
                            <div key={stat.key}>
                                <label className="block text-sm text-white/60 mb-2">{stat.label}</label>
                                <input
                                    type="text"
                                    defaultValue={getSetting(stat.key)}
                                    placeholder={stat.placeholder}
                                    onBlur={(e) => handleSettingSave(stat.key, e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Social Links */}
                <GlassCard className="p-8 space-y-6">
                    <h3 className="text-xl font-heading text-white">Social Presence</h3>
                    <div className="space-y-6">
                        {[
                            { key: "github_url", label: "GitHub URL", placeholder: "https://github.com/..." },
                            { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
                            { key: "twitter_url", label: "Twitter / X URL", placeholder: "https://twitter.com/..." },
                        ].map((social) => (
                            <div key={social.key} className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm text-white/60 mb-2">{social.label}</label>
                                    <input
                                        type="text"
                                        defaultValue={getSetting(social.key)}
                                        placeholder={social.placeholder}
                                        onBlur={(e) => handleSettingSave(social.key, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none transition-all"
                                    />
                                </div>
                                <a
                                    href={getSetting(social.key)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-lime hover:bg-lime/10 transition-all mb-0.5"
                                >
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                </a>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
