import { getVisibleBlogPosts } from "@/lib/actions";
import BlogGrid from "@/components/sections/BlogGrid";

import { getDynamicSEO } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return await getDynamicSEO(
        "/blog",
        "Blog",
        "Insights on Web Development, SEO, and Technology."
    );
}

export default async function BlogPage() {
    const posts = await getVisibleBlogPosts();

    return (
        <main className="min-h-screen pt-32 pb-20 relative">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] opacity-10 rounded-full blur-[120px]"
                    style={{
                        background: "radial-gradient(circle, #B0FC51 0%, transparent 70%)",
                    }}
                />
            </div>

            <div className="container relative z-10 max-w-[1240px] mx-auto">
                <div className="text-center mb-16">
                    <h1 className="heading-lg mb-4">
                        Thinking <span className="text-gradient">Out Loud</span>
                    </h1>
                    <p className="body-lg text-white/60 max-w-2xl mx-auto">
                        Latest updates, tutorials, and insights on the world of web development.
                    </p>
                </div>

                <BlogGrid posts={posts} />
            </div>
        </main>
    );
}
