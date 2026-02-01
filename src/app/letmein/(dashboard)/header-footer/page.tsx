"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSetting } from "@/lib/actions";
import { SiteSetting } from "@/db/schema";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function HeaderFooterSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        setIsLoading(true);
        const data = await getSiteSettings();
        const settingsMap: Record<string, string> = {};
        data.forEach(s => {
            settingsMap[s.settingKey] = s.settingValue;
        });
        setSettings(settingsMap);
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Save all settings in parallel
            const promises = Object.entries(settings).map(([key, value]) =>
                updateSiteSetting(key, value)
            );
            await Promise.all(promises);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error(error);
            alert("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    }

    function handleChange(key: string, value: string) {
        setSettings(prev => ({ ...prev, [key]: value }));
    }

    function handleFileChange(key: string, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Basic check to ensure it's an image
            if (base64String.startsWith("data:image")) {
                setSettings(prev => ({ ...prev, [key]: base64String }));
            } else {
                alert("Please upload a valid image file.");
            }
        };
        reader.readAsDataURL(file);
    }

    if (isLoading) return <div className="text-white/60">Loading settings...</div>;

    return (
        <div className="max-w-2xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Header & Footer</h1>
                    <p className="text-white/60">Customize global layout content.</p>
                </div>
                {showSuccess && (
                    <div className="flex items-center gap-2 text-lime animate-in fade-in">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Saved!</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header Section */}
                <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Header Configuration</h2>

                    <div className="grid gap-6">
                        {/* Header Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Header Logo Image</label>
                            <div className="flex items-center gap-4">
                                {settings["header_logo_image"] && (
                                    <div className="p-2 bg-black/40 rounded-lg border border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={settings["header_logo_image"]}
                                            alt="Header Logo Preview"
                                            className="h-10 w-auto object-contain"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange("header_logo_image", e)}
                                    className="block w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500 cursor-pointer"
                                />
                            </div>
                            {settings["header_logo_image"] && (
                                <button
                                    type="button"
                                    onClick={() => handleChange("header_logo_image", "")}
                                    className="text-xs text-red-400 mt-2 hover:underline"
                                >
                                    Remove Image (Revert to Text)
                                </button>
                            )}
                        </div>

                        {/* Header Logo Width */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">
                                Logo Width (px): {settings["header_logo_width"] || "150"}
                            </label>
                            <input
                                type="range"
                                min="40"
                                max="70"
                                value={settings["header_logo_width"] || "150"}
                                onChange={e => handleChange("header_logo_width", e.target.value)}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                            />
                        </div>


                        {/* Header Text Fallback (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">Logo Text (Fallback)</label>
                            <input
                                type="text"
                                value={settings["header_logo_text"] || ""}
                                onChange={e => handleChange("header_logo_text", e.target.value)}
                                placeholder="Hassan"
                                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                            />
                        </div>

                        <div className="h-px bg-white/10 my-2" />

                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">CTA Button Text</label>
                            <input
                                type="text"
                                value={settings["header_cta_text"] || ""}
                                onChange={e => handleChange("header_cta_text", e.target.value)}
                                placeholder="Hire Me"
                                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">CTA Button Link</label>
                            <input
                                type="text"
                                value={settings["header_cta_url"] || ""}
                                onChange={e => handleChange("header_cta_url", e.target.value)}
                                placeholder="#contact"
                                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                            />
                        </div>

                        <div className="h-px bg-white/10 my-2" />

                        {/* Site Favicon Upload */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Site Favicon (Tab Icon)</label>
                            <div className="flex items-center gap-4">
                                {settings["site_favicon"] && (
                                    <div className="p-2 bg-black/40 rounded-lg border border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={settings["site_favicon"]}
                                            alt="Favicon Preview"
                                            className="h-8 w-8 object-contain"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange("site_favicon", e)}
                                    className="block w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500 cursor-pointer"
                                />
                            </div>
                            {settings["site_favicon"] && (
                                <button
                                    type="button"
                                    onClick={() => handleChange("site_favicon", "")}
                                    className="text-xs text-red-400 mt-2 hover:underline"
                                >
                                    Remove Favicon
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Footer Configuration</h2>

                    <div className="grid gap-6">
                        {/* Footer Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Footer Logo Image</label>
                            <div className="flex items-center gap-4">
                                {settings["footer_logo_image"] && (
                                    <div className="p-2 bg-black/40 rounded-lg border border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={settings["footer_logo_image"]}
                                            alt="Footer Logo Preview"
                                            className="h-10 w-auto object-contain"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange("footer_logo_image", e)}
                                    className="block w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500 cursor-pointer"
                                />
                            </div>
                            {settings["footer_logo_image"] && (
                                <button
                                    type="button"
                                    onClick={() => handleChange("footer_logo_image", "")}
                                    className="text-xs text-red-400 mt-2 hover:underline"
                                >
                                    Remove Image (Revert to Text)
                                </button>
                            )}
                        </div>

                        {/* Footer Logo Width */}
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">
                                Logo Width (px): {settings["footer_logo_width"] || "150"}
                            </label>
                            <input
                                type="range"
                                min="50"
                                max="100"
                                value={settings["footer_logo_width"] || "150"}
                                onChange={e => handleChange("footer_logo_width", e.target.value)}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">Footer Logo Text (Fallback)</label>
                            <input
                                type="text"
                                value={settings["footer_logo_text"] || ""}
                                onChange={e => handleChange("footer_logo_text", e.target.value)}
                                placeholder="Hassan (searches Header Logo if empty)"
                                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                            />
                        </div>

                        <div className="h-px bg-white/10 my-2" />

                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-1">Copyright Text</label>
                            <input
                                type="text"
                                value={settings["footer_copyright_text"] || ""}
                                onChange={e => handleChange("footer_copyright_text", e.target.value)}
                                placeholder="© 2024 Hassan Sarfraz. All rights reserved."
                                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
