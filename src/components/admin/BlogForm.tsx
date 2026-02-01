"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addBlogPost, updateBlogPost } from "@/lib/actions";
import { clsx } from "clsx";
import ImageUploader from "./ImageUploader";

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        coverImage: initialData?.coverImage || "",
        author: initialData?.author || "Hassan Sarfraz",
        readTime: initialData?.readTime || "5 min read",
        tags: Array.isArray(initialData?.tags) ? initialData.tags.join(", ") : "",
        isVisible: initialData?.isVisible !== undefined ? initialData.isVisible : true,
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        keywords: initialData?.keywords || "",
        gallery: Array.isArray(initialData?.gallery) ? initialData.gallery.join("\n") : "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== ""),
            gallery: formData.gallery.split("\n").map((t: string) => t.trim()).filter((t: string) => t !== ""),
        };

        const res = isEditing
            ? await updateBlogPost(initialData.id, payload)
            : await addBlogPost(payload);

        if (res.success) {
            router.push("/letmein/blog");
            router.refresh();
        } else {
            alert(res.message);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        const url = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&title=${encodeURIComponent(formData.title)}`;
        setFormData(prev => ({ ...prev, coverImage: url }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Main Content</h3>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Enter post title"
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
                                placeholder="post-url-slug"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Excerpt</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Brief summary of the post"
                            />
                        </div>

                        <div>
                            <ImageUploader
                                label="Featured / Cover Image"
                                value={formData.coverImage}
                                onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                                type="blog"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Content (Markdown supported)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={15}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Write your post content here..."
                            />
                        </div>
                    </GlassCard>

                    {/* SEO Section */}
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-lime">Search Engine Optimization (SEO)</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Meta Title</label>
                                <input
                                    type="text"
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                    placeholder="Blue-centric title for search engines"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Keywords</label>
                                <input
                                    type="text"
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                    placeholder="web, code, development"
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
                                    placeholder="Brief meta description for SEO"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    {/* Gallery Section */}
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Image Gallery</h3>
                        <p className="text-white/40 text-sm">Add one image URL per line. These will be displayed in the cinematic gallery section.</p>
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

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Publishing</h3>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Read Time</label>
                            <input
                                type="text"
                                name="readTime"
                                value={formData.readTime}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="React, Nextjs, UI"
                            />
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
                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">Visible on Blog</span>
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {loading ? "Processing..." : isEditing ? "Update Post" : "Publish Post"}
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </form>
    );
}
