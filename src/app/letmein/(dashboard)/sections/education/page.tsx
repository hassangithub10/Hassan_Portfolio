"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getEducation, deleteEducation, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { usePopup } from "@/components/admin/PopupProvider";

export default function EducationPage() {
    const popup = usePopup();
    const [education, setEducation] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEducation();
    }, []);

    const loadEducation = async () => {
        setLoading(true);
        const data = await getEducation();
        setEducation(data);
        setLoading(false);
    };

    const handleDelete = (id: number, title: string) => {
        popup.confirm({
            title: "Delete Item?",
            message: "This entry will be permanently removed.",
            onConfirm: async () => {
                const res = await deleteEducation(id);
                if (res.success) {
                    setEducation(education.filter(s => s.id !== id));
                    popup.deleted("Item Deleted", "The item has been removed.");
                } else {
                    popup.error("Deletion Failed", res.message);
                }
            },
        });
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('education', id, currentStatus);
        if (res.success) {
            setEducation(education.map(e => e.id === id ? { ...e, isVisible: !currentStatus } : e));
        } else {
            popup.error("Update Failed", res.message);
        }
    };

    if (loading) return <div className="text-white">Loading education history...</div>;

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
                        <h1 className="heading-lg mb-2">Education History</h1>
                        <p className="text-white/60">Manage your academic background.</p>
                    </div>
                </div>
                <Link
                    href="/admin/sections/education/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Entry
                </Link>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Institution</th>
                                <th className="px-6 py-4 font-medium">Degree</th>
                                <th className="px-6 py-4 font-medium">Period</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {education.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-white/30">
                                        No education entries found.
                                    </td>
                                </tr>
                            ) : (
                                education.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{entry.institution}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70">
                                            {entry.degree}
                                            {entry.fieldOfStudy && ` in ${entry.fieldOfStudy}`}
                                        </td>
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
                                                    href={`/admin/sections/education/${entry.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(entry.id, entry.institution)}
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
