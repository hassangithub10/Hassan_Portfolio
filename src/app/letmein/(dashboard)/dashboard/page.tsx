import GlassCard from "@/components/ui/GlassCard";
import {
    DocumentTextIcon,
    BriefcaseIcon,
    WrenchScrewdriverIcon,
    EnvelopeIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ClockIcon
} from "@heroicons/react/24/outline";
import { db } from "@/db";
import { blogPosts, projects, services, contactSubmissions } from "@/db/schema";
import { count } from "drizzle-orm";
import { getGA4RealTimeData, getGSCPerformanceData, getPageSpeedStats } from "@/lib/google-api";
import QuickSettings from "@/components/admin/QuickSettings";
import { getSiteSettings, getRecentActivity } from "@/lib/actions";
import { RealTimeChart, PerformanceChart } from "@/components/admin/AnalyticsCharts";

// Helper for Radial Progress
function RadialProgress({ score, label, color }: { score: number; label: string; color: string }) {
    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff10" strokeWidth="8" />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-bold font-heading`} style={{ color }}>{score}</span>
                </div>
            </div>
            <span className="text-xs uppercase font-bold text-white/50 tracking-wider">{label}</span>
        </div>
    );
}

// Activity Item Component
function ActivityItem({ item }: { item: any }) {
    const iconMap: any = {
        blog: <DocumentTextIcon className="w-4 h-4 text-blue-400" />,
        project: <BriefcaseIcon className="w-4 h-4 text-purple-400" />,
        message: <EnvelopeIcon className="w-4 h-4 text-pink-400" />,
    };

    const colorMap: any = {
        blog: "bg-blue-400/10 border-blue-400/20",
        project: "bg-purple-400/10 border-purple-400/20",
        message: "bg-pink-400/10 border-pink-400/20",
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className={`p-2 rounded-lg border ${colorMap[item.type] || 'bg-white/10'}`}>
                {iconMap[item.type] || <ClockIcon className="w-4 h-4 text-white" />}
            </div>
            <div>
                <p className="text-sm text-white font-medium line-clamp-1">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">{item.type}</span>
                    <span className="text-[10px] text-white/20">•</span>
                    <span className="text-[10px] text-white/40">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

export default async function AdminDashboard() {
    // 1. Fetch Basic Counts
    const [postsCount, projectsCount, servicesCount, messagesCount] = await Promise.all([
        db.select({ count: count() }).from(blogPosts),
        db.select({ count: count() }).from(projects),
        db.select({ count: count() }).from(services),
        db.select({ count: count() }).from(contactSubmissions),
    ]);

    // 2. Fetch Performance & Settings
    // Note: getPageSpeedStats might be slow, so ideally this is cached or client-loaded. 
    // For now server-side is fine but might delay dashboard load slightly.
    const [realTimeTraffic, gscPerformance, settings, activityFeed, auditStats] = await Promise.all([
        getGA4RealTimeData(),
        getGSCPerformanceData(7),
        getSiteSettings(),
        getRecentActivity(),
        getPageSpeedStats("https://hassanport.com") // Make dynamic if possible via ENV
    ]);

    const getField = (key: string, fallback: string) => {
        return settings.find(s => s.settingKey === key)?.settingValue || fallback;
    };

    const stats = [
        { name: "Total Blog Posts", value: postsCount[0].count, icon: DocumentTextIcon, color: "text-blue-400" },
        { name: "Projects Showcased", value: projectsCount[0].count, icon: BriefcaseIcon, color: "text-purple-400" },
        { name: "Active Services", value: servicesCount[0].count, icon: WrenchScrewdriverIcon, color: "text-lime" },
        { name: "Messages Received", value: messagesCount[0].count, icon: EnvelopeIcon, color: "text-pink-400" },
    ];

    return (
        <div>
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="heading-lg mb-2">Dashboard</h1>
                    <p className="text-white/60">Overview of your portfolio content and activity.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <div className={`w-2 h-2 rounded-full ${realTimeTraffic ? 'bg-lime animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                        System {realTimeTraffic ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <GlassCard key={stat.name} className="p-6" hover={true}>
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                            <span className="text-4xl font-heading font-bold text-white">
                                {stat.value}
                            </span>
                        </div>
                        <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider">
                            {stat.name}
                        </h3>
                    </GlassCard>
                ))}
            </div>

            {/* Audit Report Section */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <GlassCard className="p-8 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="heading-md">Audit Report</h3>
                                <p className="text-white/40 text-sm mt-1">PageSpeed Insights (Mobile Strategy)</p>
                            </div>
                            <div className="px-3 py-1 bg-white/5 rounded text-xs text-white/40 font-mono">
                                Cached Result
                            </div>
                        </div>

                        {auditStats ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <RadialProgress
                                    score={auditStats.performance}
                                    label="Performance"
                                    color={auditStats.performance >= 90 ? '#B0FC51' : auditStats.performance >= 50 ? '#F75D00' : '#EF4444'}
                                />
                                <RadialProgress
                                    score={auditStats.accessibility}
                                    label="Accessibility"
                                    color={auditStats.accessibility >= 90 ? '#B0FC51' : '#F75D00'}
                                />
                                <RadialProgress
                                    score={auditStats.bestPractices}
                                    label="Best Practices"
                                    color={auditStats.bestPractices >= 90 ? '#B0FC51' : '#F75D00'}
                                />
                                <RadialProgress
                                    score={auditStats.seo}
                                    label="SEO"
                                    color={auditStats.seo >= 90 ? '#B0FC51' : '#F75D00'}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-center">
                                <ExclamationCircleIcon className="w-10 h-10 text-white/20 mb-3" />
                                <p className="text-white/40 text-sm">Audit data unavailable.</p>
                                <p className="text-white/20 text-xs mt-1">Check API limits or Configuration.</p>
                            </div>
                        )}

                        {auditStats?.coreWebVitals && (
                            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(auditStats.coreWebVitals || {}).map(([key, val]: any) => (
                                    <div key={key} className="bg-white/5 rounded-lg p-3 text-center">
                                        <div className="text-xs uppercase font-bold text-white/30 mb-1">{key}</div>
                                        <div className="text-lg font-bold text-white">{val || 'N/A'}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>
                </div>

                <div className="lg:col-span-1">
                    <GlassCard className="p-8 h-full flex flex-col">
                        <h3 className="heading-md mb-6">Recent Activity</h3>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[400px] scrollbar-hide">
                            {activityFeed.length > 0 ? (
                                activityFeed.map((item: any) => (
                                    <ActivityItem key={`${item.type}-${item.id}`} item={item} />
                                ))
                            ) : (
                                <p className="text-white/40 text-sm italic">No recent activity.</p>
                            )}
                        </div>
                    </GlassCard>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <GlassCard className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="heading-md">Real-time Traffic</h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-lime/10 border border-lime/20 rounded-full">
                            <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                            <span className="text-[10px] text-lime uppercase font-bold tracking-widest">Live Now</span>
                        </div>
                    </div>
                    <RealTimeChart data={realTimeTraffic || []} />
                </GlassCard>

                <GlassCard className="p-8">
                    <h3 className="heading-md mb-6">Search Performance (7d)</h3>
                    <PerformanceChart data={gscPerformance || []} />
                </GlassCard>
            </div>

            {/* Quick Actions & Settings */}
            <div className="grid lg:grid-cols-2 gap-8">
                <GlassCard className="p-8">
                    <h3 className="heading-md mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/letmein/blog/new" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-left group block">
                            <span className="block text-lime font-bold mb-1 group-hover:translate-x-1 transition-transform">+ New Post</span>
                            <span className="text-xs text-white/40">Write a blog article</span>
                        </a>
                        <a href="/letmein/projects/new" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-left group block">
                            <span className="block text-blue-400 font-bold mb-1 group-hover:translate-x-1 transition-transform">+ Add Project</span>
                            <span className="text-xs text-white/40">Showcase new work</span>
                        </a>
                    </div>
                </GlassCard>

                <GlassCard className="p-8">
                    <h3 className="heading-md mb-6">Floating Badge</h3>
                    <QuickSettings
                        initialVisible={getField('floating_badge_visible', 'true') === 'true'}
                        initialText={getField('floating_badge_text', 'Available for Projects')}
                        initialLink={getField('floating_badge_link', '#contact')}
                    />
                </GlassCard>
            </div>
        </div>
    );
}
