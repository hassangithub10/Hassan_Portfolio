import { getBlogPostBySlug } from "@/lib/actions";
import BlogDetail from "@/components/sections/BlogDetail";
import StructuredData from "@/components/seo/StructuredData";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post || !post.isVisible) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.metaTitle || `${post.title} | Hassan Sarfraz`,
        description: post.metaDescription || post.excerpt || "Read this article on Hassan Sarfraz's blog.",
        keywords: post.keywords ? post.keywords.split(',').map(k => k.trim()) : [],
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post || !post.isVisible) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.coverImage ? [post.coverImage] : [],
        "datePublished": post.publishedAt,
        "author": {
            "@type": "Person",
            "name": post.author || "Hassan Sarfraz"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Hassan Sarfraz",
            "logo": {
                "@type": "ImageObject",
                "url": "https://hassansarfraz.com/logo.png" // Placeholder
            }
        }
    };

    return (
        <>
            <StructuredData data={jsonLd} />
            <BlogDetail post={post} />
        </>
    );
}
