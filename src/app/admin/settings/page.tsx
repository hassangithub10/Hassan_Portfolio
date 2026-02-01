"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { getSiteSettings, updateSiteSetting, seedGoogleSettings } from "@/lib/actions";

export default function SettingsPage() {
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            await seedGoogleSettings();
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
            // Update local state
            setSettings(settings.map(s => s.settingKey === key ? { ...s, settingValue: value } : s));
        }
        setSaving(false);
    };

    if (loading) return <div className="text-white">Loading settings...</div>;

    return (
        <div className="max-w-4xl">
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Global Settings</h1>
                <p className="text-white/60">Configure site-wide variables and integration keys.</p>
            </div>

            <div className="space-y-6">
                <GlassCard className="p-8">
                    <h3 className="text-xl font-heading text-white mb-6">General Configuration</h3>
                    <div className="space-y-4">
                        {settings.filter(s => !s.settingKey.startsWith('google_') && !s.settingKey.startsWith('section_')).map((setting) => (
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
                    </div>
                </GlassCard>

                <GlassCard className="p-8 border border-lime/20">
                    <h3 className="text-xl font-heading text-lime mb-2">Google Integration</h3>
                    <p className="text-white/40 text-sm mb-6">Enter your Google Cloud Service Account details to enable Analytics and Search Console graphs.</p>

                    <div className="space-y-4">
                        {settings.filter(s => s.settingKey.startsWith('google_')).map((setting) => (
                            <div key={setting.settingKey} className="flex flex-col gap-2 py-4 border-b border-white/5 last:border-0">
                                <label className="text-sm font-medium text-white/70 uppercase tracking-wider">
                                    {setting.settingKey.replace('google_', '').replace(/_/g, ' ')}
                                </label>
                                {setting.settingKey === 'google_service_account_key' ? (
                                    <textarea
                                        defaultValue={setting.settingValue}
                                        onBlur={(e) => handleSave(setting.settingKey, e.target.value)}
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs focus:border-lime focus:outline-none"
                                        placeholder="-----BEGIN PRIVATE KEY-----\n..."
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        defaultValue={setting.settingValue}
                                        onBlur={(e) => handleSave(setting.settingKey, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none"
                                        placeholder={setting.settingKey === 'google_ga4_property_id' ? 'e.g. 123456789' : ''}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="p-8 border-dashed border-white/10">
                    <h3 className="text-xl font-heading text-white/40 mb-4">Account & Security</h3>
                    <p className="text-white/30 text-sm">Authentication settings and admin password management will be implemented here.</p>
                </GlassCard>
            </div>
        </div>
    );
}
