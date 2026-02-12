"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addProject, updateProject } from "@/lib/actions";
import { Project, NewProject } from "@/db/schema";
import { ChevronLeftIcon, CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface ProjectFormProps {
    initialData?: Project;
    isEditMode?: boolean;
}

export default function ProjectForm({ initialData, isEditMode = false }: ProjectFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<NewProject>>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        shortDescription: initialData?.shortDescription || "",
        longDescription: initialData?.longDescription || "",
        techStack: initialData?.techStack || [],
        liveUrl: initialData?.liveUrl || "",
        githubUrl: initialData?.githubUrl || "",
        imageUrl: initialData?.imageUrl || "",
        featured: initialData?.featured || false,
        category: initialData?.category || "Web Development",
        sortOrder: initialData?.sortOrder || 0,
        isVisible: initialData?.isVisible ?? true,
        collaboratorName: initialData?.collaboratorName || "",
        collaboratorLinkedIn: initialData?.collaboratorLinkedIn || "",
        gallery: initialData?.gallery || [],
    });

    const [newTech, setNewTech] = useState("");
    const [newGalleryImage, setNewGalleryImage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddTech = () => {
        if (!newTech.trim()) return;
        const currentTech = formData.techStack as string[] || [];
        setFormData({ ...formData, techStack: [...currentTech, newTech.trim()] });
        setNewTech("");
    };

    const handleRemoveTech = (techToRemove: string) => {
        const currentTech = formData.techStack as string[] || [];
        setFormData({ ...formData, techStack: currentTech.filter(t => t !== techToRemove) });
    };

    const handleAddGalleryImage = () => {
        if (!newGalleryImage.trim()) return;
        const currentGallery = formData.gallery as string[] || [];
        setFormData({ ...formData, gallery: [...currentGallery, newGalleryImage.trim()] });
        setNewGalleryImage("");
    };

    const handleRemoveGalleryImage = (index: number) => {
        const currentGallery = formData.gallery as string[] || [];
        setFormData({ ...formData, gallery: currentGallery.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Validation: slug is required
        if (!formData.slug) {
            // Auto generate slug from title if missing
            if (formData.title) {
                formData.slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            } else {
                alert("Slug is required");
                setSaving(false);
                return;
            }
        }

        let res;
        if (isEditMode && initialData?.id) {
            res = await updateProject(initialData.id, formData);
        } else {
            res = await addProject(formData as NewProject);
        }

        if (res.success) {
            router.push("/letmein/sections/projects");
            router.refresh();
        } else {
            alert(res.message);
            setSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/letmein/sections/projects"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg mb-1">{isEditMode ? "Edit Project" : "Add New Project"}</h1>
                    <p className="text-white/60">Showcase your best work.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Slug (URL) *</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="auto-generated-from-title"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Short Description</label>
                                <textarea
                                    name="shortDescription"
                                    value={formData.shortDescription || ""}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Long Description (Markdown/HTML supported)</label>
                                <textarea
                                    name="longDescription"
                                    value={formData.longDescription || ""}
                                    onChange={handleChange}
                                    rows={8}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime font-mono text-sm"
                                />
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Media & Links</h3>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Main Image URL</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl || ""}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                    />
                                    {/* Placeholder for Upload Button - could implement specific upload logic later */}
                                    <button type="button" className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                                        <CloudArrowUpIcon className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                                {formData.imageUrl && (
                                    <div className="mt-4 relative h-48 w-full rounded-xl overflow-hidden border border-white/10">
                                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Live Demo URL</label>
                                    <input
                                        type="text"
                                        name="liveUrl"
                                        value={formData.liveUrl || ""}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">GitHub URL</label>
                                    <input
                                        type="text"
                                        name="githubUrl"
                                        value={formData.githubUrl || ""}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Gallery Images (URLs)</label>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={newGalleryImage}
                                        onChange={(e) => setNewGalleryImage(e.target.value)}
                                        placeholder="Add image URL"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGalleryImage())}
                                    />
                                    <button type="button" onClick={handleAddGalleryImage} className="px-4 py-2 bg-lime/20 text-lime rounded-xl hover:bg-lime/30">Add</button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {(formData.gallery as string[])?.map((img, idx) => (
                                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                                            <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveGalleryImage(idx)}
                                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column - Meta & Config */}
                    <div className="space-y-6">
                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Configuration</h3>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                >
                                    <option value="Web Development" className="bg-charcoal text-white">Web Development</option>
                                    <option value="Apps" className="bg-charcoal text-white">Apps</option>
                                    <option value="Tools" className="bg-charcoal text-white">Tools</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Sort Order</label>
                                <input
                                    type="number"
                                    name="sortOrder"
                                    value={formData.sortOrder}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={formData.featured || false}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime focus:ring-lime"
                                />
                                <label htmlFor="featured" className="text-white select-none cursor-pointer">Featured Project</label>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isVisible"
                                    name="isVisible"
                                    checked={formData.isVisible ?? true}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime focus:ring-lime"
                                />
                                <label htmlFor="isVisible" className="text-white select-none cursor-pointer">VisiblePublicly</label>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newTech}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    placeholder="Add tech (e.g. React)"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm"
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                                />
                                <button type="button" onClick={handleAddTech} className="px-4 py-2 bg-lime/20 text-lime rounded-xl hover:bg-lime/30">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(formData.techStack as string[])?.map(tech => (
                                    <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                                        {tech}
                                        <button type="button" onClick={() => handleRemoveTech(tech)} className="hover:text-red-400">
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Collaboration</h3>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Collaborator Name</label>
                                <input
                                    type="text"
                                    name="collaboratorName"
                                    value={formData.collaboratorName || ""}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Collaborator LinkedIn</label>
                                <input
                                    type="text"
                                    name="collaboratorLinkedIn"
                                    value={formData.collaboratorLinkedIn || ""}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                        </GlassCard>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-white/10">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {saving ? "Saving..." : isEditMode ? "Update Project" : "Create Project"}
                    </button>
                </div>
            </form>
        </div>
    );
}
