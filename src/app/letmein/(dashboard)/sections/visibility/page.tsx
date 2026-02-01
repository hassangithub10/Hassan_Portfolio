"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getSiteSettings, updateSiteSetting, seedSectionVisibility } from "@/lib/actions";
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

const SECTIONS = [
    { id: 'hero', name: 'Hero (Landing)', description: 'Displays your main title, subtitle and intro bio.' },
    { id: 'about', name: 'About Me', description: 'Displays your detailed bio and profile photo.' },
    { id: 'education', name: 'Education', description: 'Displays your academic background and degrees.' },
    { id: 'experience', name: 'Work Experience', description: 'Displays your professional career timeline.' },
    { id: 'projects', name: 'Projects', description: 'Displays your featured and categorized works.' },
    { id: 'services', name: 'Services', description: 'Displays your offerings and pricing plans.' },
    { id: 'blog', name: 'Blog Posts', description: 'Displays your latest articles and news.' },
    { id: 'contact', name: 'Contact Section', description: 'Displays the contact form and details.' },
];

export default function VisibilityPage() {
    const [settings, setSettings] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        // Ensure default settings exist first
        await seedSectionVisibility();

        const data = await getSiteSettings();
        const simplified: Record<string, boolean> = {};
        data.forEach(s => {
            if (s.settingKey.startsWith('section_')) {
                simplified[s.settingKey] = s.settingValue === "true";
            }
        });
        setSettings(simplified);
        setLoading(false);
    };

    const handleToggle = async (sectionId: string) => {
        const key = `section_${sectionId}_visible`;
        const currentValue = settings[key] ?? true;
        const newValue = !currentValue;

        setSaving(sectionId);
        const res = await updateSiteSetting(key, newValue.toString());

        if (res.success) {
            setSettings(prev => ({ ...prev, [key]: newValue }));
        } else {
            alert("Failed to update setting.");
        }
        setSaving(null);
    };

    if (loading) return <div className="text-white">Loading visibility settings...</div>;

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
                    <h1 className="heading-lg mb-2">Visibility Control</h1>
                    <p className="text-white/60">Choose which sections are visible on your portfolio homepage.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {SECTIONS.map((section) => {
                    const key = `section_${section.id}_visible`;
                    const isVisible = settings[key] !== false; // Default true if not found

                    return (
                        <GlassCard key={section.id} className="p-6">
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-white">{section.name}</h3>
                                        {isVisible && (
                                            <span className="flex items-center gap-1 text-[10px] bg-lime/10 text-lime px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                                <CheckCircleIcon className="w-3 h-3" /> Live
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-white/50">{section.description}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleToggle(section.id)}
                                        disabled={saving === section.id}
                                        className={clsx(
                                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all min-w-[140px] justify-center",
                                            isVisible
                                                ? "bg-lime text-charcoal hover:scale-105"
                                                : "bg-white/5 text-white/40 hover:bg-white/10"
                                        )}
                                    >
                                        {saving === section.id ? (
                                            "Updating..."
                                        ) : isVisible ? (
                                            <>
                                                <EyeIcon className="w-5 h-5" />
                                                Visible
                                            </>
                                        ) : (
                                            <>
                                                <EyeSlashIcon className="w-5 h-5" />
                                                Hidden
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm flex gap-4">
                <div className="p-2 rounded-full bg-blue-500/20 h-fit">
                    <EyeIcon className="w-5 h-5" />
                </div>
                <p>
                    <strong>Note:</strong> Hiding a section here will completely remove it from the homepage.
                    Individual items (like a specific project) can still be toggled independently within their respective management pages.
                </p>
            </div>
        </div>
    );
}
