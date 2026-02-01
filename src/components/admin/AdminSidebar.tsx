"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
    HomeIcon,
    DocumentTextIcon,
    BriefcaseIcon,
    WrenchScrewdriverIcon,
    Square2StackIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    Bars3Icon,
    WindowIcon,
    UserIcon,
    PowerIcon
} from "@heroicons/react/24/outline";
import { logout } from "@/lib/auth-actions";

const navigation = [
    { name: "Dashboard", href: "/letmein/dashboard", icon: HomeIcon },
    { name: "Blog Posts", href: "/letmein/blog", icon: DocumentTextIcon },
    { name: "Projects", href: "/letmein/projects", icon: BriefcaseIcon },
    { name: "Services", href: "/letmein/services", icon: WrenchScrewdriverIcon },
    { name: "Sections", href: "/letmein/sections", icon: Square2StackIcon },
    { name: "Menu", href: "/letmein/menu", icon: Bars3Icon },
    { name: "Header & Footer", href: "/letmein/header-footer", icon: WindowIcon },
    { name: "SEO Manager", href: "/letmein/seo", icon: ChartBarIcon },
    { name: "Users", href: "/letmein/users", icon: UserGroupIcon },
    { name: "Profile", href: "/letmein/profile", icon: UserIcon },
    { name: "Settings", href: "/letmein/settings", icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 bg-charcoal/80 backdrop-blur-xl border-r border-white/10">
            <div className="flex items-center justify-center h-20 border-b border-white/10 flex-shrink-0">
                <Link href="/" className="text-2xl font-bold font-heading text-white">
                    Hassan<span className="text-primary-500">.</span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-primary-600/20 shadow-neon-crimson border border-primary-500/30"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-y-0 left-0 w-1 bg-primary-500 rounded-r-full" />
                            )}
                            <item.icon
                                className={clsx(
                                    "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                                    isActive ? "text-primary-500" : "text-white/40 group-hover:text-white"
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 flex-shrink-0 bg-charcoal/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-500 font-bold text-xs ring-1 ring-primary-500/50">
                        AD
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-white/40">admin@hassanport.com</p>
                    </div>
                </div>
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition-all"
                >
                    <PowerIcon className="w-4 h-4" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
