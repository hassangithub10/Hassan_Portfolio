"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { getSiteSettings, updateSiteSetting, seedGoogleSettings } from "@/lib/actions";
import { Switch } from "@headlessui/react";
import { clsx } from "clsx";

export default function SettingsPage() {
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Advanced SEO/AEO keys we want to manage specifically
    const advancedKeys = [
        "aeo_focused_keywords",
        "ctr_optimization_enabled",
        "google_indexing_mode",
        "pagespeed_monitoring_enabled",
        "geo_targeting_enabled"
    ];

    useEffect(() => {
        async function load() {
            await seedGoogleSettings();
            // We might also want to seed advanced keys if they don't exist, 
            // but we can just handle them gracefully in UI or create them on save.
            const data = await getSiteSettings();
            setSettings(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (key: string, value: string) => {
        setSaving(true);
        const res = await updateSiteSetting(key, value);
        if (res.success) {
            // Check if key exists in local state, if not add it
            const exists = settings.find(s => s.settingKey === key);
            if (exists) {
                setSettings(settings.map(s => s.settingKey === key ? { ...s, settingValue: value } : s));
            } else {
                setSettings([...settings, { settingKey: key, settingValue: value }]);
            }
        }
        setSaving(false);
    };

    const getSettingValue = (key: string) => {
        return settings.find(s => s.settingKey === key)?.settingValue || "";
    };

    if (loading) return <div className="text-white">Loading settings...</div>;

    return (
        <div className="max-w-4xl space-y-8 pb-10">
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Global Settings</h1>
                <p className="text-white/60">Configure site-wide variables, integrations, and SEO strategies.</p>
            </div>

            {/* Theme Configuration */}
            <GlassCard className="p-8 border border-primary-500/20 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-heading text-primary-500 mb-1">Live Theme Engine</h3>
                        <p className="text-white/40 text-sm">Customize the site's color palette in real-time.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Primary Color */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white uppercase tracking-wider block">Primary Color</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                defaultValue={getSettingValue('theme_primary') || '#DB001E'}
                                onBlur={(e) => handleSave('theme_primary', e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent p-0"
                            />
                            <div className="text-xs font-mono text-white/50">{getSettingValue('theme_primary') || '#DB001E'}</div>
                        </div>
                        <p className="text-xs text-white/40">Main accent color, used for buttons, highlights, and neon effects.</p>
                    </div>

                    {/* Background Color */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white uppercase tracking-wider block">Background</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                defaultValue={getSettingValue('theme_background') || '#222222'}
                                onBlur={(e) => handleSave('theme_background', e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent p-0"
                            />
                            <div className="text-xs font-mono text-white/50">{getSettingValue('theme_background') || '#222222'}</div>
                        </div>
                        <p className="text-xs text-white/40">Base background color. "Obsidian" dark tones recommended.</p>
                    </div>

                    {/* Accent/Secondary */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-white uppercase tracking-wider block">Accent</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                defaultValue={getSettingValue('theme_accent') || '#ef4444'}
                                onBlur={(e) => handleSave('theme_accent', e.target.value)}
                                className="w-12 h-12 rounded-lg cursor-pointer border-none bg-transparent p-0"
                            />
                            <div className="text-xs font-mono text-white/50">{getSettingValue('theme_accent') || '#ef4444'}</div>
                        </div>
                        <p className="text-xs text-white/40">Secondary highlights.</p>
                    </div>
                </div>
            </GlassCard>

            {/* Google Integration */}
            <GlassCard className="p-8 border border-lime/20">
                <h3 className="text-xl font-heading text-lime mb-2">Google Integration</h3>
                <p className="text-white/40 text-sm mb-6">Enter your Google Cloud Service Account details to enable Analytics and Search Console graphs.</p>

                <div className="space-y-4">
                    {/* Render known Google keys explicitly or filter */}
                    {['google_ga4_property_id', 'google_gsc_site_url', 'google_service_account_email', 'google_service_account_key'].map((key) => {
                        const val = getSettingValue(key);
                        return (
                            <div key={key} className="flex flex-col gap-2 py-4 border-b border-white/5 last:border-0">
                                <label className="text-sm font-medium text-white/70 uppercase tracking-wider">
                                    {key.replace('google_', '').replace(/_/g, ' ')}
                                </label>
                                {key === 'google_service_account_key' ? (
                                    <textarea
                                        defaultValue={val}
                                        onBlur={(e) => handleSave(key, e.target.value)}
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                        placeholder="-----BEGIN PRIVATE KEY-----\n..."
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        defaultValue={val}
                                        onBlur={(e) => handleSave(key, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                        placeholder={key === 'google_ga4_property_id' ? 'e.g. 123456789' : ''}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

            {/* Advanced SEO & AEO */}
            <GlassCard className="p-8 border border-blue-400/20">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-heading text-blue-400">Advanced SEO & AEO</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-400/10 text-blue-400 uppercase">Pro</span>
                </div>
                <p className="text-white/40 text-sm mb-6">Configure Answer Engine Optimization (AEO), CTR strategies, and indexing behavior.</p>

                <div className="space-y-6">
                    {/* AEO Keywords */}
                    <div>
                        <label className="block text-sm font-medium text-white/70 uppercase tracking-wider mb-2">
                            AEO Focused Keywords & Questions
                        </label>
                        <p className="text-xs text-white/40 mb-2">Keywords and questions to target for AI overviews and featured snippets.</p>
                        <textarea
                            defaultValue={getSettingValue("aeo_focused_keywords")}
                            onBlur={(e) => handleSave("aeo_focused_keywords", e.target.value)}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                            placeholder="How to build a nextjs app?&#10;Best frontend developer in..."
                        />
                    </div>

                    {/* Google Indexing Mode */}
                    <div>
                        <label className="block text-sm font-medium text-white/70 uppercase tracking-wider mb-2">
                            Google Indexing Strategy
                        </label>
                        <select
                            defaultValue={getSettingValue("google_indexing_mode") || "standard"}
                            onChange={(e) => handleSave("google_indexing_mode", e.target.value)}
                            className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all appearance-none"
                        >
                            <option value="standard">Standard (Recommended)</option>
                            <option value="aggressive">Aggressive (Submit sitemaps daily)</option>
                            <option value="conservative">Conservative (Limit crawl rate)</option>
                        </select>
                    </div>

                    {/* Toggles */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <h4 className="font-medium text-white">CTR Optimization</h4>
                                <p className="text-xs text-white/40">Auto-test meta titles for higher clicks</p>
                            </div>
                            <Toggle
                                checked={getSettingValue("ctr_optimization_enabled") === "true"}
                                onChange={(val) => handleSave("ctr_optimization_enabled", String(val))}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <h4 className="font-medium text-white">PageSpeed Insights</h4>
                                <p className="text-xs text-white/40">Monitor Core Web Vitals daily</p>
                            </div>
                            <Toggle
                                checked={getSettingValue("pagespeed_monitoring_enabled") === "true"}
                                onChange={(val) => handleSave("pagespeed_monitoring_enabled", String(val))}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <h4 className="font-medium text-white">Geo-Targeting</h4>
                                <p className="text-xs text-white/40">Prioritize local search results</p>
                            </div>
                            <Toggle
                                checked={getSettingValue("geo_targeting_enabled") === "true"}
                                onChange={(val) => handleSave("geo_targeting_enabled", String(val))}
                            />
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Other Settings */}
            <GlassCard className="p-8">
                <h3 className="text-xl font-heading text-white mb-6">General Configuration</h3>
                <div className="space-y-4">
                    {settings
                        .filter(s =>
                            !s.settingKey.startsWith('google_') &&
                            !s.settingKey.startsWith('section_') &&
                            !advancedKeys.includes(s.settingKey)
                        )
                        .map((setting) => (
                            <div key={setting.settingKey} className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-white/5 last:border-0">
                                <div className="md:w-1/3">
                                    <label className="text-sm font-medium text-white/70 uppercase tracking-wider">
                                        {setting.settingKey.replace(/_/g, ' ')}
                                    </label>
                                </div>
                                <div className="md:w-2/3 flex gap-4">
                                    <input
                                        type="text"
                                        defaultValue={setting.settingValue}
                                        onBlur={(e) => handleSave(setting.settingKey, e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    {settings.filter(s =>
                        !s.settingKey.startsWith('google_') &&
                        !s.settingKey.startsWith('section_') &&
                        !advancedKeys.includes(s.settingKey)
                    ).length === 0 && (
                            <p className="text-white/30 text-sm">No other settings found.</p>
                        )}
                </div>
            </GlassCard>
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            className={clsx(
                checked ? 'bg-lime' : 'bg-white/10',
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-charcoal'
            )}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={clsx(
                    checked ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    )
}
