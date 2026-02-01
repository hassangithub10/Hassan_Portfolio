import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";

export const metadata = {
    title: "Edit Blog Post | Admin",
};

interface EditPageProps {
    params: { id: string };
}

export default async function EditBlogPost({ params }: EditPageProps) {
    const { id } = await params;

    // Explicitly fetch by ID
    const posts = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id))).limit(1);

    if (posts.length === 0) {
        notFound();
    }

    const post = posts[0];

    return (
        <div>
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Edit Post</h1>
                <p className="text-white/60">Update your article content and SEO settings.</p>
            </div>

            <BlogForm initialData={post} isEditing={true} />
        </div>
    );
}
