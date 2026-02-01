"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getSkills, deleteSkill, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export default function SkillsPage() {
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

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;
        const res = await deleteSkill(id);
        if (res.success) {
            setSkills(skills.filter(s => s.id !== id));
        } else {
            alert(res.message);
        }
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('skills', id, currentStatus);
        if (res.success) {
            setSkills(skills.map(s => s.id === id ? { ...s, isVisible: !currentStatus } : s));
        } else {
            alert(res.message);
        }
    };

    if (loading) return <div className="text-white">Loading skills...</div>;

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
                        <h1 className="heading-lg mb-2">Technical Skills</h1>
                        <p className="text-white/60">Manage your expertise and featured tools.</p>
                    </div>
                </div>
                <Link
                    href="/admin/sections/skills/new"
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
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium">Featured</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {skills.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                                        No skills found.
                                    </td>
                                </tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{skill.name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{skill.category}</td>
                                        <td className="px-6 py-4 text-white/70">{skill.proficiencyLevel}%</td>
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
                                        <td className="px-6 py-4">
                                            {skill.isFeatured ? (
                                                <span className="text-lime text-xs font-bold">YES</span>
                                            ) : (
                                                <span className="text-white/30 text-xs">NO</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/admin/sections/skills/${skill.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(skill.id)}
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
