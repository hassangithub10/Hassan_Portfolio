"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { getSeoDefaults, updateSeoDefault, getBlogPosts, getProjects } from "@/lib/actions";
import { getPageKPIs } from "@/lib/google-api";
import { ChartBarIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

type SeoRecord = {
    route: string;
    title: string;
    description: string | null;
    keywords: string | null;
    ogImage: string | null;
};

const STATIC_ROUTES = ["/", "/about", "/projects", "/services", "/blog", "/contact"];

export default function SeoManager() {
    const [records, setRecords] = useState<Record<string, SeoRecord>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [stats, setStats] = useState<any>({ blog: {}, projects: {} });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getSeoDefaults();
            const map: Record<string, SeoRecord> = {};
            data.forEach((item: any) => {
                map[item.route] = item;
            });
            setRecords(map);

            // Fetch KPIs
            const [blogKPIs, projectKPIs] = await Promise.all([
                getPageKPIs('/blog'),
                getPageKPIs('/projects')
            ]);
            setStats({ blog: blogKPIs || {}, projects: projectKPIs || {} });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent, route: string) => {
        e.preventDefault();
        setSaving(true);
        const record = records[route];

        if (!record) return;

        try {
            await updateSeoDefault({
                route,
                title: record.title || "",
                description: record.description || "",
                keywords: record.keywords || "",
                ogImage: record.ogImage || ""
            });
            alert("Saved!");
        } catch (error) {
            alert("Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (route: string, field: keyof SeoRecord, value: string) => {
        setRecords(prev => ({
            ...prev,
            [route]: {
                ...prev[route],
                route, // ensure route exists
                [field]: value
            }
        }));
    };

    if (loading) return <div className="text-white">Loading SEO settings...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center text-white">
                <div>
                    <h1 className="heading-lg mb-2">SEO Manager</h1>
                    <p className="text-white/60">Configure meta tags and track content performance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <ChartBarIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="font-heading text-white">Blog Performance (30d)</h3>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(stats.blog).length === 0 ? (
                            <p className="text-white/20 text-sm">No data available</p>
                        ) : (
                            Object.entries(stats.blog)
                                .sort((a: any, b: any) => b[1] - a[1])
                                .slice(0, 3)
                                .map(([path, views]: any) => (
                                    <div key={path} className="flex justify-between items-center text-sm">
                                        <span className="text-white/60 truncate mr-4">{path}</span>
                                        <span className="text-blue-400 font-bold">{views} views</span>
                                    </div>
                                ))
                        )}
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <ArrowTrendingUpIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="font-heading text-white">Project Reach (30d)</h3>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(stats.projects).length === 0 ? (
                            <p className="text-white/20 text-sm">No data available</p>
                        ) : (
                            Object.entries(stats.projects)
                                .sort((a: any, b: any) => b[1] - a[1])
                                .slice(0, 3)
                                .map(([path, views]: any) => (
                                    <div key={path} className="flex justify-between items-center text-sm">
                                        <span className="text-white/60 truncate mr-4">{path}</span>
                                        <span className="text-purple-400 font-bold">{views} views</span>
                                    </div>
                                ))
                        )}
                    </div>
                </GlassCard>
            </div>

            <div className="space-y-6">
                {STATIC_ROUTES.map(route => {
                    const record = records[route] || { route, title: "", description: "", keywords: "", ogImage: "" };

                    return (
                        <GlassCard key={route} className="p-6">
                            <h3 className="text-xl font-heading text-lime mb-4 border-b border-white/10 pb-2">
                                Route: <span className="text-white font-mono text-base ml-2">{route}</span>
                            </h3>

                            <form onSubmit={(e) => handleSave(e, route)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-1">Meta Title</label>
                                        <input
                                            type="text"
                                            value={record.title || ""}
                                            onChange={e => handleChange(route, "title", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                            placeholder="Page Title | Hassan Sarfraz"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/60 mb-1">Keywords</label>
                                        <input
                                            type="text"
                                            value={record.keywords || ""}
                                            onChange={e => handleChange(route, "keywords", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                            placeholder="web development, seo, next.js"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-white/60 mb-1">Meta Description</label>
                                        <textarea
                                            value={record.description || ""}
                                            onChange={e => handleChange(route, "description", e.target.value)}
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                                            placeholder="Brief description of the page content..."
                                        />
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="px-6 py-2 bg-lime/10 text-lime border border-lime/50 rounded-lg hover:bg-lime/20 transition-colors disabled:opacity-50"
                                        >
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
