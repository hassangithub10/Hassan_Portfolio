"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import type { BlogPost } from "@/db/schema";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface BlogGridProps {
    posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-white/50 text-lg">No updates yet. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post, index) => {
                // Generate a unique gradient for posts without images
                const colors = [
                    ["from-primary-500", "to-primary-900"],
                    ["from-primary-400", "to-[#b026ff]"],
                    ["from-[#FEC107]", "to-primary-600"],
                ];
                const colorPair = colors[index % colors.length];

                return (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="h-full"
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <GlassCard className="h-full group relative overflow-hidden flex flex-col border-[#FDDFCC]/10 hover:border-primary-500/30 transition-all duration-500" hover={true}>
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
                                        {post.tags && post.tags.slice(0, 3).map((tag, i) => (
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

                                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary-400 transition-colors font-heading tracking-tight leading-tight">
                                        {post.title}
                                    </h3>

                                    <p className="text-white/60 text-sm md:text-base line-clamp-3 mb-8 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-3 text-primary-400 text-sm font-bold uppercase tracking-widest mt-auto">
                                        <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary-400 after:transition-all group-hover:after:w-full">
                                            Read Full Post
                                        </span>
                                        <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
