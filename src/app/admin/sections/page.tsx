import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import {
    UserIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    CommandLineIcon,
    PuzzlePieceIcon,
    EyeIcon
} from "@heroicons/react/24/outline";

const sections = [
    { name: "Hero Section", description: "Edit title, subtitle, and bio.", href: "/admin/sections/hero", icon: UserIcon },
    { name: "About Me", description: "Manage your profile details and skills overview.", href: "/admin/sections/about", icon: PuzzlePieceIcon },
    { name: "Education", description: "Add or update your academic history.", href: "/admin/sections/education", icon: AcademicCapIcon },
    { name: "Experience", description: "Manage your professional career timeline.", href: "/admin/sections/experience", icon: BriefcaseIcon },
    { name: "Skills", description: "Update your technical expertise and tools.", href: "/admin/sections/skills", icon: CommandLineIcon },
    { name: "Visibility Control", description: "Show or hide entire sections from the homepage.", href: "/admin/sections/visibility", icon: EyeIcon },
];

export default function SectionsPage() {
    return (
        <div>
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Website Sections</h1>
                <p className="text-white/60">Manage the content for each part of your portfolio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <Link key={section.name} href={section.href}>
                        <GlassCard className="p-8 h-full hover:border-lime/30 transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-lime/10 text-lime group-hover:bg-lime group-hover:text-charcoal transition-colors">
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-heading text-white">{section.name}</h3>
                            </div>
                            <p className="text-white/50 text-sm">{section.description}</p>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
