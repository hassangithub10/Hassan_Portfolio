"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getVisibleProjects, toggleItemVisibility, deleteProject } from "@/lib/actions"; // getProjectById, updateProject, addProject needed for other pages
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { clsx } from "clsx";

// Note: We need a getProjects (all) not just visible ones for admin. 
// Assuming getVisibleProjects fetches all or we need a new action. 
// Usually getVisibleProjects filters by isVisible=true.
// I should check actions.ts if there is a getAllProjects or similar.
// If not, I'll stick to getVisibleProjects for now but it might miss hidden ones if the implementation is strict.
// Actually, looking at actions.ts, getVisibleProjects has "where(eq(projects.isVisible, true))".
// So I probably need to add `getProjects` to actions.ts or use `getVisibleProjects` and just toggle visibility of what I can see? No, that's bad.
// I should check actions.ts next. For now, I'll write this assuming `getProjects` exists or I'll implement it.

import { getProjects } from "@/lib/actions";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        // We'll filter or sort in the UI
        try {
            // Need to ensure getAllProjects is available
            const data = await getProjects();
            setProjects(data);
        } catch (e) {
            console.error("Failed to load projects", e);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        const res = await deleteProject(id);
        if (res.success) {
            setProjects(projects.filter(p => p.id !== id));
        } else {
            alert(res.message);
        }
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('projects', id, currentStatus);
        if (res.success) {
            setProjects(projects.map(p => p.id === id ? { ...p, isVisible: !currentStatus } : p));
        } else {
            alert(res.message);
        }
    };

    if (loading) return <div className="text-white">Loading projects...</div>;

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
                        <h1 className="heading-lg mb-2">Projects</h1>
                        <p className="text-white/60">Manage your portfolio showcase.</p>
                    </div>
                </div>
                <Link
                    href="/letmein/sections/projects/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Project
                </Link>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Project</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Featured</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                                        No projects found.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{project.title}</div>
                                            <div className="text-white/40 text-xs">{project.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{project.category}</td>
                                        <td className="px-6 py-4">
                                            {project.featured ? (
                                                <StarIconSolid className="w-5 h-5 text-lime" />
                                            ) : (
                                                <StarIcon className="w-5 h-5 text-white/20" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(project.id, project.isVisible)}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-colors",
                                                    project.isVisible
                                                        ? "bg-lime/10 text-lime hover:bg-lime/20"
                                                        : "bg-white/5 text-white/30 hover:bg-white/10"
                                                )}
                                                title={project.isVisible ? "Hide project" : "Show project"}
                                            >
                                                {project.isVisible ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/letmein/sections/projects/${project.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
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
