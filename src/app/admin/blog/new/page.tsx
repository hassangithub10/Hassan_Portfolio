import BlogForm from "@/components/admin/BlogForm";

export const metadata = {
    title: "New Blog Post | Admin",
};

export default function NewBlogPost() {
    return (
        <div>
            <div className="mb-10">
                <h1 className="heading-lg mb-2">New Blog Post</h1>
                <p className="text-white/60">Create a compelling new article for your audience.</p>
            </div>

            <BlogForm />
        </div>
    );
}
