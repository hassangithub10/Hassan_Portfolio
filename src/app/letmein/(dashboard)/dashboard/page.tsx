import GlassCard from "@/components/ui/GlassCard";
import {
    DocumentTextIcon,
    BriefcaseIcon,
    WrenchScrewdriverIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";
import { db } from "@/db";
import { blogPosts, projects, services, contactSubmissions } from "@/db/schema";
import { count } from "drizzle-orm";
import { getGA4RealTimeData, getGSCPerformanceData } from "@/lib/google-api";
import QuickSettings from "@/components/admin/QuickSettings";
import { getSiteSettings } from "@/lib/actions";
import { RealTimeChart, PerformanceChart } from "@/components/admin/AnalyticsCharts";

export default async function AdminDashboard() {
    // Fetch counts - simple aggregation
    const [postsCount, projectsCount, servicesCount, messagesCount, realTimeTraffic, gscPerformance, settings] = await Promise.all([
        db.select({ count: count() }).from(blogPosts),
        db.select({ count: count() }).from(projects),
        db.select({ count: count() }).from(services),
        db.select({ count: count() }).from(contactSubmissions),
        getGA4RealTimeData(),
        getGSCPerformanceData(7),
        getSiteSettings()
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
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Dashboard</h1>
                <p className="text-white/60">Overview of your portfolio content and activity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activity Placeholder */}
                <GlassCard className="p-8 min-h-[300px]">
                    <h3 className="heading-md mb-6">Recent Activity</h3>
                    <div className="flex items-center justify-center h-48 text-white/30 text-sm border-2 border-dashed border-white/5 rounded-xl">
                        Activity log coming soon
                    </div>
                </GlassCard>

                {/* Quick Actions & Settings */}
                <div className="space-y-8">
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
        </div>
    );
}
