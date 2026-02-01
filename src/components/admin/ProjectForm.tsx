"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addProject, updateProject } from "@/lib/actions";
import { clsx } from "clsx";
import ImageUploader from "./ImageUploader";

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const categories = ["Web Development", "Apps", "Tools"] as const;

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        shortDescription: initialData?.shortDescription || "",
        longDescription: initialData?.longDescription || "",
        techStack: Array.isArray(initialData?.techStack) ? initialData.techStack.join(", ") : "",
        liveUrl: initialData?.liveUrl || "",
        githubUrl: initialData?.githubUrl || "",
        imageUrl: initialData?.imageUrl || "",
        featured: initialData?.featured || false,
        category: initialData?.category || "Web Development",
        sortOrder: initialData?.sortOrder || 0,
        isVisible: initialData?.isVisible !== undefined ? initialData.isVisible : true,
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        keywords: initialData?.keywords || "",
        gallery: Array.isArray(initialData?.gallery) ? initialData.gallery.join("\n") : "",
        collaboratorName: initialData?.collaboratorName || "",
        collaboratorLinkedIn: initialData?.collaboratorLinkedIn || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            techStack: formData.techStack.split(",").map((t: string) => t.trim()).filter((t: string) => t !== ""),
            sortOrder: Number(formData.sortOrder),
            gallery: formData.gallery.split("\n").map((t: string) => t.trim()).filter((t: string) => t !== ""),
        };

        const res = isEditing
            ? await updateProject(initialData.id, payload)
            : await addProject(payload);

        if (res.success) {
            router.push("/letmein/projects");
            router.refresh();
        } else {
            alert(res.message);
            setLoading(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: val }));

        // Auto-generate slug from title
        if (name === "title" && !isEditing) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            }));
        }
    };

    const generateImage = () => {
        const url = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&title=${encodeURIComponent(formData.title)}`;
        setFormData(prev => ({ ...prev, imageUrl: url }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Project Details</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm text-white/60 mb-2">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                    placeholder="e.g. Lumina Dashboard"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                    placeholder="project-url-slug"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all appearance-none"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Short Description</label>
                            <textarea
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                rows={2}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="A brief summary for the project card"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Long Description (Markdown)</label>
                            <textarea
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleChange}
                                rows={10}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Detailed project description..."
                            />
                        </div>
                    </GlassCard>

                    {/* SEO Section */}
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-lime">SEO Configuration</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm text-white/60 mb-2">Meta Title</label>
                                <input
                                    type="text"
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-white/60 mb-2">Meta Description</label>
                                <textarea
                                    name="metaDescription"
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-white/60 mb-2">Keywords (comma separated)</label>
                                <input
                                    type="text"
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    {/* Gallery Section */}
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Project Gallery</h3>
                        <p className="text-white/40 text-sm">Add one image URL per line. These will be displayed in the project showcase.</p>
                        <textarea
                            name="gallery"
                            value={formData.gallery}
                            onChange={handleChange}
                            rows={5}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2..."
                        />
                    </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Appearance & Links</h3>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={clsx(
                                        "w-12 h-6 rounded-full transition-colors duration-300",
                                        formData.featured ? "bg-lime" : "bg-white/10"
                                    )}></div>
                                    <div className={clsx(
                                        "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                                        formData.featured && "translate-x-6"
                                    )}></div>
                                </div>
                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">Featured Project</span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="isVisible"
                                        checked={formData.isVisible}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={clsx(
                                        "w-12 h-6 rounded-full transition-colors duration-300",
                                        formData.isVisible ? "bg-cyan-400" : "bg-white/10"
                                    )}></div>
                                    <div className={clsx(
                                        "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                                        formData.isVisible && "translate-x-6"
                                    )}></div>
                                </div>
                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">Display on Portfolio</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Sort Order</label>
                            <input
                                type="number"
                                name="sortOrder"
                                value={formData.sortOrder}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                name="techStack"
                                value={formData.techStack}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Next.js, Tailwind, TypeScript"
                            />
                        </div>

                        <div>
                            <ImageUploader
                                label="Project Image"
                                value={formData.imageUrl}
                                onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                                type="project"
                                aspectRatio="2.18:1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Live URL</label>
                            <input
                                type="text"
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Github URL</label>
                            <input
                                type="text"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-4">
                            <h4 className="text-sm font-bold text-lime mb-4 uppercase tracking-widest">Collaborator Info</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="collaboratorName"
                                        value={formData.collaboratorName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                        placeholder="Person Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">LinkedIn Profile URL</label>
                                    <input
                                        type="text"
                                        name="collaboratorLinkedIn"
                                        value={formData.collaboratorLinkedIn}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-glow"
                            >
                                {loading ? "Saving..." : isEditing ? "Update Project" : "Add Project"}
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </form>
    );
}
