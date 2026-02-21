"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import GlassCard from "@/components/ui/GlassCard";
import { getProjects, deleteProject, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, LinkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { usePopup } from "@/components/admin/PopupProvider";

const categories = ["All", "Web Development", "Apps", "Tools"] as const;

export default function ProjectsList() {
    const popup = usePopup();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");

    const [showHidden, setShowHidden] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
    };

    const filteredProjects = projects.filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchesVisibility = showHidden ? true : p.isVisible;
        return matchesCategory && matchesVisibility;
    });

    const handleDelete = (id: number, title: string) => {
        popup.confirm({
            title: "Delete Project?",
            message: `"${title}" will be permanently removed.`,
            onConfirm: async () => {
                const res = await deleteProject(id);
                if (res.success) {
                    setProjects(projects.filter(p => p.id !== id));
                    popup.deleted("Project Deleted", `"${title}" has been removed.`);
                } else {
                    popup.error("Deletion Failed", res.message);
                }
            },
        });
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean, title: string) => {
        const res = await toggleItemVisibility('projects', id, currentStatus);
        if (res.success) {
            setProjects(projects.map(p => p.id === id ? { ...p, isVisible: !currentStatus } : p));
            popup.success(
                currentStatus ? "Project Hidden" : "Project Visible",
                `"${title}" is now ${currentStatus ? "hidden" : "visible"}.`
            );
        } else {
            popup.error("Update Failed", res.message);
        }
    };

    if (loading) return <div className="text-white">Loading projects...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-lg mb-2">Projects</h1>
                    <p className="text-white/60">Showcase your best work.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Project
                </Link>
            </div>



            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                selectedCategory === cat
                                    ? "bg-lime text-charcoal shadow-sm"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setShowHidden(!showHidden)}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                        showHidden
                            ? "bg-lime/10 border-lime text-lime"
                            : "bg-transparent border-white/10 text-white/40 hover:text-white"
                    )}
                >
                    {showHidden ? (
                        <>
                            <EyeIcon className="w-4 h-4" />
                            <span>Showing Hidden</span>
                        </>
                    ) : (
                        <>
                            <EyeSlashIcon className="w-4 h-4" />
                            <span>Hidden Projects</span>
                        </>
                    )}
                </button>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Project</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium">Featured</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-white/30">
                                        No projects found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {project.imageUrl && (
                                                    <img src={project.imageUrl} className="w-10 h-10 rounded object-cover" alt="" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-white">{project.title}</div>
                                                    <div className="text-xs text-white/40 flex items-center gap-1">
                                                        {project.liveUrl && <LinkIcon className="w-3 h-3" />}
                                                        {project.liveUrl || "No live link"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{project.category}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(project.id, project.isVisible, project.title)}
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
                                        <td className="px-6 py-4">
                                            {project.featured ? (
                                                <span className="px-2 py-1 rounded-full bg-lime/10 text-lime text-xs font-bold">YES</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full bg-white/5 text-white/30 text-xs">NO</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/admin/projects/${project.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id, project.title)}
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
        </div >
    );
}
