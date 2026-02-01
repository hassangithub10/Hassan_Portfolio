"use client";

import { useState, useEffect } from "react";
import { getPersonalInfo, updatePersonalInfo } from "@/lib/actions";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        fullName: "",
        title: "",
        bio: "",
        email: "",
        phone: "",
        location: "",
        currentFocus: "",
        availabilityStatus: "available"
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await getPersonalInfo();
        if (data) {
            setFormData({
                fullName: data.fullName || "",
                title: data.title || "",
                bio: data.bio || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
                currentFocus: data.currentFocus || "",
                availabilityStatus: data.availabilityStatus || "available"
            });
        }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            await updatePersonalInfo(formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="text-white/60">Loading profile...</div>;

    return (
        <div className="max-w-2xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Profile & Bio</h1>
                    <p className="text-white/60">Manage your personal information and biography.</p>
                </div>
                {success && (
                    <div className="flex items-center gap-2 text-lime animate-in fade-in">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Saved!</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Bio (Main Hero Text)</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Current Focus (Hero Badge Text)</label>
                    <textarea
                        rows={2}
                        value={formData.currentFocus}
                        onChange={e => setFormData({ ...formData, currentFocus: e.target.value })}
                        placeholder="Building scalable, modern web solutions with cutting-edge technologies."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                    />
                    <p className="text-xs text-white/40 mt-1">This text appears in the "terminal" mockup on the laptop/desktop hero section.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-1">Phone</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">Availability Status</label>
                    <select
                        value={formData.availabilityStatus}
                        onChange={e => setFormData({ ...formData, availabilityStatus: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                    >
                        <option value="available">Available for Projects</option>
                        <option value="busy">Busy / Currently Booked</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
