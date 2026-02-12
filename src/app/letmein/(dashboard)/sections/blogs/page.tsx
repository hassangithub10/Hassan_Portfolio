"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getBlogPosts, deleteBlogPost, toggleItemVisibility } from "@/lib/actions"; // verify getBlogPosts (admin)
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Image from "next/image";

export default function BlogsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await getBlogPosts();
        setPosts(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        const res = await deleteBlogPost(id);
        if (res.success) {
            setPosts(posts.filter(p => p.id !== id));
        } else {
            alert(res.message);
        }
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('blog_posts', id, currentStatus);
        if (res.success) {
            setPosts(posts.map(p => p.id === id ? { ...p, isVisible: !currentStatus } : p));
        } else {
            alert(res.message);
        }
    };

    if (loading) return <div className="text-white">Loading posts...</div>;

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
                        <h1 className="heading-lg mb-2">Blog Posts</h1>
                        <p className="text-white/60">Manage your articles and thoughts.</p>
                    </div>
                </div>
                <Link
                    href="/letmein/sections/blogs/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Post
                </Link>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Post</th>
                                <th className="px-6 py-4 font-medium">Published</th>
                                <th className="px-6 py-4 font-medium">Stats</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                                        No blog posts found.
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {post.coverImage && (
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-white line-clamp-1">{post.title}</div>
                                                    <div className="text-white/40 text-xs line-clamp-1">{post.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70 text-sm">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4" />
                                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/50 text-sm">
                                            {post.views || 0} views
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(post.id, post.isVisible)}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-colors",
                                                    post.isVisible
                                                        ? "bg-lime/10 text-lime hover:bg-lime/20"
                                                        : "bg-white/5 text-white/30 hover:bg-white/10"
                                                )}
                                                title={post.isVisible ? "Hide post" : "Show post"}
                                            >
                                                {post.isVisible ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/letmein/sections/blogs/${post.id}`}
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
