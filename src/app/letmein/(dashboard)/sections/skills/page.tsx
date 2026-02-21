"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getSkills, deleteSkill, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon, StarIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { usePopup } from "@/components/admin/PopupProvider";
import Image from "next/image";

export default function SkillsPage() {
    const popup = usePopup();
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        setLoading(true);
        const data = await getSkills();
        setSkills(data);
        setLoading(false);
    };

    const handleDelete = (id: number, title: string) => {
        popup.confirm({
            title: "Delete Item?",
            message: "This skill will be permanently removed.",
            onConfirm: async () => {
                const res = await deleteSkill(id);
                if (res.success) {
                    setSkills(skills.filter(s => s.id !== id));
                    popup.deleted("Item Deleted", "The item has been removed.");
                } else {
                    popup.error("Deletion Failed", res.message);
                }
            },
        });
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('skills', id, currentStatus);
        if (res.success) {
            setSkills(skills.map(s => s.id === id ? { ...s, isVisible: !currentStatus } : s));
        } else {
            popup.error("Update Failed", res.message);
        }
    };

    if (loading) return <div className="text-white">Loading skills...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link
                        href="/letmein/sections"
                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="heading-lg mb-2">Technolgies & Skills</h1>
                        <p className="text-white/60">Manage your tech stack.</p>
                    </div>
                </div>
                <Link
                    href="/letmein/sections/skills/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Skill
                </Link>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Skill</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Proficiency</th>
                                <th className="px-6 py-4 font-medium">Featured</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {skills.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                                        No skills found.
                                    </td>
                                </tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-8 h-8 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                                                    {skill.logoSvgOrUrl ? (
                                                        <Image src={skill.logoSvgOrUrl} alt={skill.name} fill className="object-cover p-1" />
                                                    ) : (
                                                        <div className="text-xs text-white/50">{skill.name.charAt(0)}</div>
                                                    )}
                                                </div>
                                                <div className="font-medium text-white">{skill.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70 text-sm">
                                            {skill.category}
                                        </td>
                                        <td className="px-6 py-4 text-white/70">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-lime" style={{ width: `${skill.proficiencyLevel}%` }}></div>
                                                </div>
                                                <span className="text-xs">{skill.proficiencyLevel}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {skill.isFeatured ? (
                                                <StarIconSolid className="w-5 h-5 text-lime" />
                                            ) : (
                                                <StarIcon className="w-5 h-5 text-white/20" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(skill.id, skill.isVisible)}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-colors",
                                                    skill.isVisible
                                                        ? "bg-lime/10 text-lime hover:bg-lime/20"
                                                        : "bg-white/5 text-white/30 hover:bg-white/10"
                                                )}
                                                title={skill.isVisible ? "Hide skill" : "Show skill"}
                                            >
                                                {skill.isVisible ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/letmein/sections/skills/${skill.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(skill.id, skill.name)}
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
