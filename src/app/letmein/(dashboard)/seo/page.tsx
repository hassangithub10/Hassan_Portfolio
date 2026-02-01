"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
    getSeoDefaults,
    updateSeoDefault,
    getSiteSettings,
    updateSiteSetting
} from "@/lib/actions";
import {
    getGA4RealTimeData,
    getGSCPerformanceData,
    getPageKPIs
} from "@/lib/google-api";
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    LinkIcon,
    ArrowPathIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

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

    // Google Analytics and Search Console Data
    const [realtimeData, setRealtimeData] = useState<any[]>([]);
    const [gscData, setGscData] = useState<any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Google Integration Settings
    const [integrationSettings, setIntegrationSettings] = useState<Record<string, string>>({
        google_service_account_email: "",
        google_service_account_key: "",
        google_ga4_property_id: "",
        google_ga4_measurement_id: "",
        google_gsc_site_url: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [seoData, settingsData] = await Promise.all([
                getSeoDefaults(),
                getSiteSettings()
            ]);

            const map: Record<string, SeoRecord> = {};
            seoData.forEach((item: any) => {
                map[item.route] = item;
            });
            setRecords(map);

            const sMap: Record<string, string> = {};
            settingsData.forEach(s => {
                sMap[s.settingKey] = s.settingValue;
            });
            setIntegrationSettings(prev => ({
                ...prev,
                ...sMap
            }));

            // Fetch Live Stats
            await fetchLiveStats();

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

    const fetchLiveStats = async () => {
        setIsRefreshing(true);
        try {
            const [rt, gsc] = await Promise.all([
                getGA4RealTimeData(),
                getGSCPerformanceData(7)
            ]);
            if (rt) setRealtimeData(rt);
            if (gsc) setGscData(gsc);
        } catch (error) {
            console.error(error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleSaveSeo = async (e: React.FormEvent, route: string) => {
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
            // Show custom toast or alert
        } catch (error) {
            alert("Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveIntegration = async () => {
        setSaving(true);
        try {
            const promises = Object.entries(integrationSettings).map(([key, value]) =>
                updateSiteSetting(key, value)
            );
            await Promise.all(promises);
            await fetchLiveStats();
            alert("Integration Settings Updated!");
        } catch (error) {
            alert("Failed to save integration settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleSeoChange = (route: string, field: keyof SeoRecord, value: string) => {
        setRecords(prev => ({
            ...prev,
            [route]: { ...prev[route], route, [field]: value }
        }));
    };

    if (loading) return <div className="text-white p-20 text-center font-heading">Initializing SEO Engine...</div>;

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black font-heading text-white tracking-tight">SEO <span className="text-primary-500">Command Center</span></h1>
                    <p className="text-white/40 mt-2">Manage your global reach and real-time performance tracking.</p>
                </div>
                <button
                    onClick={fetchLiveStats}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
                >
                    <ArrowPathIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Syncing...' : 'Refresh Data'}
                </button>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Real-time Graph */}
                <GlassCard className="p-8 group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-500/10 rounded-2xl border border-primary-500/20 group-hover:scale-110 transition-transform">
                                <LinkIcon className="w-6 h-6 text-primary-500" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-white uppercase tracking-wider">Live Traffic</h3>
                                <p className="text-white/40 text-xs">Active users (Past 30m)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                            <span className="text-xs font-bold text-primary-400 uppercase tracking-tighter">Real-time</span>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        {realtimeData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={realtimeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                    <XAxis dataKey="minute" hide />
                                    <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                                        itemStyle={{ color: '#F75D00' }}
                                    />
                                    <Line type="monotone" dataKey="users" stroke="#F75D00" strokeWidth={3} dot={false} animationDuration={2000} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center border border-white/5 bg-white/[0.02] rounded-2xl border-dashed">
                                <p className="text-white/20 text-sm font-heading">Waiting for Analytics connection...</p>
                            </div>
                        )}
                    </div>
                </GlassCard>

                {/* GSC Performance Graph */}
                <GlassCard className="p-8 group relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform">
                            <ArrowTrendingUpIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-white uppercase tracking-wider">Search Performance</h3>
                            <p className="text-white/40 text-xs">Clicks & Impressions (7 Days)</p>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        {gscData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={gscData}>
                                    <defs>
                                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F75D00" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F75D00" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                    <XAxis dataKey="date" stroke="#444" fontSize={8} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                                    <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                                    />
                                    <Area type="monotone" dataKey="clicks" stroke="#F75D00" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="impressions" stroke="#3B82F6" strokeDasharray="5 5" fill="transparent" strokeWidth={1} />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center border border-white/5 bg-white/[0.02] rounded-2xl border-dashed">
                                <p className="text-white/20 text-sm font-heading">Waiting for GSC connection...</p>
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* Blog & Project Performance Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-sm font-bold text-white/60 mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary-500 rounded-full" />
                        TOP BLOG POSTS (30D)
                    </h3>
                    <div className="space-y-4">
                        {Object.keys(stats.blog).length > 0 ? (
                            Object.entries(stats.blog).sort((a: any, b: any) => b[1] - a[1]).slice(0, 3).map(([path, val]: any) => (
                                <div key={path} className="flex justify-between items-center group/item cursor-pointer">
                                    <span className="text-sm text-white/50 group-hover/item:text-white transition-colors truncate max-w-[200px]">{path}</span>
                                    <span className="text-sm font-bold text-primary-400">{val} views</span>
                                </div>
                            ))
                        ) : <p className="text-xs text-white/20 italic">No historical data found.</p>}
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <h3 className="text-sm font-bold text-white/60 mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-500 rounded-full" />
                        TOP PROJECTS (30D)
                    </h3>
                    <div className="space-y-4">
                        {Object.keys(stats.projects).length > 0 ? (
                            Object.entries(stats.projects).sort((a: any, b: any) => b[1] - a[1]).slice(0, 3).map(([path, val]: any) => (
                                <div key={path} className="flex justify-between items-center group/item cursor-pointer">
                                    <span className="text-sm text-white/50 group-hover/item:text-white transition-colors truncate max-w-[200px]">{path}</span>
                                    <span className="text-sm font-bold text-blue-400">{val} views</span>
                                </div>
                            ))
                        ) : <p className="text-xs text-white/20 italic">No historical data found.</p>}
                    </div>
                </GlassCard>
            </div>

            {/* Google Integration Settings */}
            <GlassCard className="p-8 border-primary-500/20 bg-primary-500/[0.02]">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary-500 text-black rounded-2xl shadow-lg shadow-primary-500/20">
                        <ShieldCheckIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-heading font-black text-white text-xl">Integration Settings</h3>
                        <p className="text-white/40 text-sm">Link your Google Service Account to enable real-time tracking.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Service Account Email</label>
                            <input
                                type="text"
                                value={integrationSettings.google_service_account_email}
                                onChange={e => setIntegrationSettings({ ...integrationSettings, google_service_account_email: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm font-mono"
                                placeholder="client-id@project.iam.gserviceaccount.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">GA4 Property ID</label>
                            <input
                                type="text"
                                value={integrationSettings.google_ga4_property_id}
                                onChange={e => setIntegrationSettings({ ...integrationSettings, google_ga4_property_id: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm font-mono"
                                placeholder="e.g. 123456789"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">GA4 Measurement ID</label>
                            <input
                                type="text"
                                value={integrationSettings.google_ga4_measurement_id}
                                onChange={e => setIntegrationSettings({ ...integrationSettings, google_ga4_measurement_id: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm font-mono"
                                placeholder="e.g. G-XXXXXXXXXX"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Private Key (JSON Value)</label>
                            <textarea
                                value={integrationSettings.google_service_account_key}
                                onChange={e => setIntegrationSettings({ ...integrationSettings, google_service_account_key: e.target.value })}
                                rows={1}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm font-mono"
                                placeholder="-----BEGIN PRIVATE KEY-----..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Search Console Site URL</label>
                            <input
                                type="text"
                                value={integrationSettings.google_gsc_site_url}
                                onChange={e => setIntegrationSettings({ ...integrationSettings, google_gsc_site_url: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm font-mono"
                                placeholder="https://yourdomain.com/"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleSaveIntegration}
                        disabled={saving}
                        className="px-10 py-4 bg-primary-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-500/20 disabled:opacity-50"
                    >
                        {saving ? "Updating Integrations..." : "Save Google Configuration"}
                    </button>
                </div>
            </GlassCard>

            {/* Static Route SEO Settings */}
            <div className="space-y-6">
                <h3 className="text-xl font-black font-heading text-white tracking-tight pt-10 border-t border-white/10">Page Meta <span className="text-primary-500">Overrides</span></h3>
                {STATIC_ROUTES.map(route => {
                    const record = records[route] || { route, title: "", description: "", keywords: "", ogImage: "" };
                    return (
                        <GlassCard key={route} className="p-8 group">
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="md:w-1/3">
                                    <div className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-2">Route Endpoint</div>
                                    <h4 className="text-2xl font-black text-white font-heading truncate">{route === '/' ? 'Home Page' : route.slice(1).charAt(0).toUpperCase() + route.slice(2)}</h4>
                                    <p className="text-white/20 font-mono text-xs mt-1">{route}</p>
                                </div>

                                <form onSubmit={(e) => handleSaveSeo(e, route)} className="flex-1 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Meta Title</label>
                                            <input
                                                type="text"
                                                value={record.title || ""}
                                                onChange={e => handleSeoChange(route, "title", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm"
                                                placeholder="Page Title | Hassan Sarfraz"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Focus Keywords</label>
                                            <input
                                                type="text"
                                                value={record.keywords || ""}
                                                onChange={e => handleSeoChange(route, "keywords", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm"
                                                placeholder="keyword1, keyword2, keyword3"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Dynamic Meta Description</label>
                                        <textarea
                                            value={record.description || ""}
                                            onChange={e => handleSeoChange(route, "description", e.target.value)}
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all text-sm"
                                            placeholder="Enter a compelling description for search engine results..."
                                        />
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="px-8 py-3 bg-white/5 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 border border-white/10 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {saving ? "Saving..." : "Update Route Metadata"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
