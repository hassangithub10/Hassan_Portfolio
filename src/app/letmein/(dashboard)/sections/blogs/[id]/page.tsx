"use client";

import { useState, useEffect } from "react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { getBlogPostById } from "@/lib/actions"; // Need to check if this exists, actually getBlogPostBySlug exists, but ID?
// actions.ts had getBlogPostBySlug. I might need getBlogPostById for admin edit by ID properly.
// Or I can add it, or use getBlogPostBySlug if I pass slug in URL, but standard is ID for admin.
// Let me quickly check if I have getBlogPostById in actions.ts by memory or previous view_file.
// I saw getBlogPostBySlug. I don't recall getBlogPostById. I should probably add it.
// Wait, I can use a server action directly here if I adding it.
// I will assume I need to add it.

// For now, I'll write the file assuming getBlogPostById exists, and then I'll add it to actions.ts if missing.
import { useParams } from "next/navigation";
import { getBlogPostById } from "@/lib/actions";

export default function EditBlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (params.id) {
                // If getBlogPostById is missing, this will fail build.
                // I will add it in the next step.
                const data = await getBlogPostById(Number(params.id));
                setPost(data);
            }
            setLoading(false);
        }
        load();
    }, [params.id]);

    if (loading) return <div className="text-white">Loading post...</div>;
    if (!post) return <div className="text-white">Post not found</div>;

    return <BlogPostForm initialData={post} isEditMode={true} />;
}
