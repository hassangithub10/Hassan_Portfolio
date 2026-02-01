"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { BlogPost } from "@/db/schema";
import { ArrowLeftIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface BlogDetailProps {
    post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Reading progress bar
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0f] to-black">
            {/* Reading Progress Bar */}
            <motion.div
                style={{ width: progressWidth }}
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#ff6b35] z-50"
            />

            {/* Hero Banner */}
            <div className="relative h-[65vh] md:h-[75vh] min-h-[500px] overflow-hidden">
                {post.coverImage ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 10, ease: "linear" }}
                            src={post.coverImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Cinematic Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-[#0a0a0f] to-[#b026ff]/30">
                        {/* Abstract Decorative Elements for No-Image state */}
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px]" />
                    </div>
                )}

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-8"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </motion.div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="container max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-4">
                                {post.author && <span className="font-medium text-[#00f0ff]">{post.author}</span>}
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    {new Date(post.publishedAt || new Date()).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                {post.readTime && (
                                    <span className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-black font-heading text-white leading-tight mb-4">
                                {post.title}
                            </h1>

                            {/* Excerpt */}
                            {post.excerpt && (
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
                                    {post.excerpt}
                                </p>
                            )}

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {post.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container max-w-4xl py-16 px-6">
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none"
                    style={{
                        //@apply prose-headings:text-white prose-headings:font-heading prose-h2:text-3xl prose-h3:text-2xl
                        //@apply prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-lg
                        //@apply prose-a:text-[#00f0ff] prose-a:no-underline hover:prose-a:underline
                        //@apply prose-strong:text-white prose-strong:font-bold
                        //@apply prose-code:text-[#b026ff] prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
                        //@apply prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                        //@apply prose-blockquote:border-l-4 prose-blockquote:border-[#00f0ff] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/60
                        //@apply prose-img:rounded-2xl prose-img:shadow-2xl
                        //@apply prose-ul:text-white/70 prose-li:marker:text-[#00f0ff]
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Gallery */}
                {post.gallery && post.gallery.length > 0 && (
                    <div className="mt-12 space-y-4">
                        <h3 className="text-2xl font-bold text-white font-heading mb-6">Gallery</h3>
                        <div className="flex flex-wrap gap-4">
                            {post.gallery.map((image, i) => (
                                <div key={i} className="flex-1 min-w-[280px]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={image}
                                        alt={`Gallery ${i + 1}`}
                                        className="w-full h-64 object-cover rounded-2xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
