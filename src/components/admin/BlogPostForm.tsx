"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addBlogPost, updateBlogPost } from "@/lib/actions";
import { BlogPost, NewBlogPost } from "@/db/schema";
import { ChevronLeftIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface BlogPostFormProps {
    initialData?: BlogPost;
    isEditMode?: boolean;
}

export default function BlogPostForm({ initialData, isEditMode = false }: BlogPostFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    // Note: BlogPost type might not exactly match NewBlogPost due to id/dates. 
    // We cast or map gently.
    const [formData, setFormData] = useState<Partial<NewBlogPost>>({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        content: initialData?.content || "",
        excerpt: initialData?.excerpt || "",
        coverImage: initialData?.coverImage || "",
        readTime: initialData?.readTime || "5 min read",
        publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt) : new Date(), // Date type for Drizzle? Usually generic date obj.
        isVisible: initialData?.isVisible ?? true,
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        keywords: initialData?.keywords || "",
        tags: initialData?.tags || [],
    });

    const [newTag, setNewTag] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, publishedAt: new Date(e.target.value) }));
    };

    const handleAddTag = () => {
        if (!newTag.trim()) return;
        const currentTags = formData.tags as string[] || [];
        setFormData({ ...formData, tags: [...currentTags, newTag.trim()] });
        setNewTag("");
    };

    const handleRemoveTag = (index: number) => {
        const currentTags = formData.tags as string[] || [];
        setFormData({ ...formData, tags: currentTags.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (!formData.title || !formData.content) {
            alert("Title and Content are required");
            setSaving(false);
            return;
        }

        // Auto slug if needed
        if (!formData.slug && formData.title) {
            formData.slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        let res;
        if (isEditMode && initialData?.id) {
            res = await updateBlogPost(initialData.id, formData);
        } else {
            res = await addBlogPost(formData as NewBlogPost);
        }

        if (res.success) {
            router.push("/letmein/sections/blogs");
            router.refresh();
        } else {
            alert(res.message);
            setSaving(false);
        }
    };

    // Helper for date input format YYYY-MM-DD
    const dateValue = formData.publishedAt instanceof Date
        ? formData.publishedAt.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/letmein/sections/blogs"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg mb-1">{isEditMode ? "Edit Post" : "New Blog Post"}</h1>
                    <p className="text-white/60">Share your knowledge.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <GlassCard className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-lg font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="auto-generated-from-title"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Excerpt (Short Summary)</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt || ""}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Content (Markdown supported) *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows={20}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime font-mono text-sm leading-relaxed"
                                    placeholder="# Heading 1&#10;&#10;Write your post content here..."
                                />
                            </div>
                        </GlassCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Publish Date</label>
                                <input
                                    type="date"
                                    value={dateValue}
                                    onChange={handleDateChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Read Time</label>
                                <input
                                    type="text"
                                    name="readTime"
                                    value={formData.readTime || ""}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="isVisible"
                                    name="isVisible"
                                    checked={formData.isVisible ?? true}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime focus:ring-lime"
                                />
                                <label htmlFor="isVisible" className="text-white select-none cursor-pointer">Visible Publicly</label>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">Media</h3>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Cover Image URL</label>
                                <input
                                    type="text"
                                    name="coverImage"
                                    value={formData.coverImage || ""}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>
                            {formData.coverImage && (
                                <div className="relative h-40 w-full rounded-xl overflow-hidden border border-white/10">
                                    <Image src={formData.coverImage} alt="Cover Preview" fill className="object-cover" />
                                </div>
                            )}
                        </GlassCard>

                        <GlassCard className="p-6 space-y-6">
                            <h3 className="text-lg font-bold text-white mb-4">SEO & Tags</h3>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Meta Title</label>
                                <input
                                    type="text"
                                    name="metaTitle"
                                    value={formData.metaTitle || ""}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Meta Description</label>
                                <textarea
                                    name="metaDescription"
                                    value={formData.metaDescription || ""}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Tags</label>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Add tag"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                    />
                                    <button type="button" onClick={handleAddTag} className="px-4 py-2 bg-lime/20 text-lime rounded-xl hover:bg-lime/30">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(formData.tags as string[])?.map((tag, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                                            {tag}
                                            <button type="button" onClick={() => handleRemoveTag(idx)} className="hover:text-red-400">
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
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
                        {saving ? "Saving..." : isEditMode ? "Update Post" : "Publish Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
