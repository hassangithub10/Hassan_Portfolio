"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { getPersonalInfo, updatePersonalInfo } from "@/lib/actions";

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

    useEffect(() => {
        async function load() {
            const data = await getPersonalInfo();
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
            setLoading(false);
        }
        load();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await updatePersonalInfo(info);
        alert(res.message);
        setSaving(false);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl">
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Hero Section</h1>
                <p className="text-white/60">Update your primary identity and contact info.</p>
            </div>

            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={info.fullName}
                                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Job Title</label>
                            <input
                                type="text"
                                value={info.title}
                                onChange={(e) => setInfo({ ...info, title: e.target.value })}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Short Bio</label>
                        <textarea
                            value={info.bio}
                            onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                            required
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Email</label>
                            <input
                                type="email"
                                value={info.email}
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Phone</label>
                            <input
                                type="text"
                                value={info.phone}
                                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Location</label>
                            <input
                                type="text"
                                value={info.location}
                                onChange={(e) => setInfo({ ...info, location: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {saving ? "Saving Changes..." : "Save Selection"}
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
