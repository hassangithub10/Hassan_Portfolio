"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getBlogPosts, deleteBlogPost, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export default function BlogList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showHidden, setShowHidden] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await getBlogPosts();
        setPosts(data);
        setLoading(false);
    };

    const filteredPosts = posts.filter(p => showHidden ? true : p.isVisible);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        const res = await deleteBlogPost(id);
        if (res.success) {
            setPosts(posts.filter(p => p.id !== id));
        } else {
            alert(res.message);
        }
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean | null) => {
        const newStatus = !currentStatus;
        // Optimistic update
        setPosts(posts.map(p => p.id === id ? { ...p, isVisible: newStatus } : p));

        const res = await toggleItemVisibility('blog_posts', id, newStatus);
        if (!res.success) {
            alert(res.message);
            // Revert on failure
            setPosts(posts.map(p => p.id === id ? { ...p, isVisible: currentStatus } : p));
        }
    };

    if (loading) return <div className="text-white">Loading posts...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-lg mb-2">Blog Posts</h1>
                    <p className="text-white/60">Manage your articles and insights.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Post
                </Link>
            </div>

            <div className="flex justify-end mb-4">
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
                            <span>Hidden Posts</span>
                        </>
                    )}
                </button>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Title</th>
                                <th className="px-6 py-4 font-medium">Author</th>
                                <th className="px-6 py-4 font-medium">Published At</th>
                                <th className="px-6 py-4 font-medium">Read Time</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                                        No posts found. Create your first post!
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{post.title}</div>
                                            <div className="text-xs text-white/40">{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{post.author}</td>
                                        <td className="px-6 py-4 text-white/70">
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{post.readTime}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(post.id, post.isVisible)}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-colors",
                                                    post.isVisible
                                                        ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                                                        : "bg-white/5 text-white/30 hover:bg-white/10"
                                                )}
                                                title={post.isVisible ? "Visible on Frontend" : "Hidden from Frontend"}
                                            >
                                                {post.isVisible ? (
                                                    <EyeIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeSlashIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/admin/blog/${post.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
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
