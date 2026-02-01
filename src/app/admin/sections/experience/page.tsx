"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getExperience, deleteExperience, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export default function ExperiencePage() {
    const [experience, setExperience] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadExperience();
    }, []);

    const loadExperience = async () => {
        setLoading(true);
        const data = await getExperience();
        setExperience(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this experience entry?")) return;
        const res = await deleteExperience(id);
        if (res.success) {
            setExperience(experience.filter(e => e.id !== id));
        } else {
            alert(res.message);
        }
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('experience', id, currentStatus);
        if (res.success) {
            setExperience(experience.map(e => e.id === id ? { ...e, isVisible: !currentStatus } : e));
        } else {
            alert(res.message);
        }
    };

    if (loading) return <div className="text-white">Loading experience history...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/sections"
                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="heading-lg mb-2">Work Experience</h1>
                        <p className="text-white/60">Manage your professional career timeline.</p>
                    </div>
                </div>
                <Link
                    href="/admin/sections/experience/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Experience
                </Link>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Company</th>
                                <th className="px-6 py-4 font-medium">Position</th>
                                <th className="px-6 py-4 font-medium">Period</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {experience.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-white/30">
                                        No experience entries found.
                                    </td>
                                </tr>
                            ) : (
                                experience.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{entry.company}</div>
                                            <div className="text-xs text-white/40">{entry.location}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{entry.position}</td>
                                        <td className="px-6 py-4 text-white/70">
                                            {new Date(entry.startDate).getFullYear()} - {entry.endDate ? new Date(entry.endDate).getFullYear() : "Present"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(entry.id, entry.isVisible)}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-colors",
                                                    entry.isVisible
                                                        ? "bg-lime/10 text-lime hover:bg-lime/20"
                                                        : "bg-white/5 text-white/30 hover:bg-white/10"
                                                )}
                                                title={entry.isVisible ? "Hide entry" : "Show entry"}
                                            >
                                                {entry.isVisible ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/admin/sections/experience/${entry.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(entry.id)}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
