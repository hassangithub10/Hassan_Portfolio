"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import type { BlogPost } from "@/db/schema";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface BlogCarouselProps {
    posts: BlogPost[];
    content: any;
}

export default function BlogCarousel({ posts, content }: BlogCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Dynamic Content Defaults
    const title = content?.title || "From the";
    const subtitle = content?.subtitle || "Blog";
    const badgeText = content?.badgeText || "Latest Insights";
    const badgeColor = content?.badgeColor || "#00f0ff";

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
    };

    if (!posts || posts.length === 0) {
        return null; // Don't show section if no posts
    }

    return (
        <section className="section relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-0 w-[500px] h-[500px] opacity-10 rounded-full blur-[100px]"
                    style={{
                        background: "radial-gradient(circle, #B0FC51 0%, transparent 70%)",
                        transform: "translate(-30%, -50%)",
                    }}
                />
            </div>

            <div className="container relative z-10 max-w-[1240px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 mx-auto"
                >
                    <span className="badge-premium mb-6">
                        {badgeText}
                    </span>
                    <h2 className="heading-lg mb-8">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>

                    <div className="flex justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollLeft}
                            className="p-4 rounded-2xl border border-white/10 bg-white/5 text-white hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                            aria-label="Previous"
                        >
                            <ArrowLeftIcon className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollRight}
                            className="p-4 rounded-2xl border border-white/10 bg-white/5 text-white hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                            aria-label="Next"
                        >
                            <ArrowRightIcon className="w-6 h-6" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {posts.map((post, index) => {
                        // Generate a unique gradient for posts without images
                        const colors = [
                            ["from-primary-500", "to-primary-900"],
                            ["from-primary-400", "to-[#b026ff]"],
                            ["from-[#FEC107]", "to-primary-600"],
                        ];
                        const colorPair = colors[index % colors.length];

                        return (
                            <div
                                key={post.id}
                                className="min-w-[320px] md:min-w-[420px] snap-center h-full"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <GlassCard className="h-full group relative overflow-hidden flex flex-col border-[#FDDFCC]/10 hover:border-primary-500/30 transition-all duration-500">
                                        {/* Image Area */}
                                        <div className="h-64 w-full relative overflow-hidden flex-shrink-0">
                                            {post.coverImage ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                    style={{ backgroundImage: `url(${post.coverImage})` }}
                                                />
                                            ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br ${colorPair[0]} ${colorPair[1]} opacity-20 transition-all duration-700 group-hover:scale-110`} />
                                            )}

                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags && post.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {post.readTime && (
                                                    <span className="text-[10px] text-white/40 uppercase tracking-widest ml-auto">
                                                        {post.readTime}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary-400 transition-colors line-clamp-2 font-heading tracking-tight">
                                                {post.title}
                                            </h3>

                                            <p className="text-white/60 text-sm md:text-base line-clamp-3 mb-8 flex-1 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-3 text-primary-400 text-sm font-bold uppercase tracking-widest mt-auto">
                                                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary-400 after:transition-all group-hover:after:w-full">
                                                    Read Full Story
                                                </span>
                                                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-12 mb-4">
                    <Link href="/blog">
                        <motion.button className="btn-premium">
                            View All Posts
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
