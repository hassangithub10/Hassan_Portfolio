"use client";

import SkillForm from "@/components/admin/SkillForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function NewSkillPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/letmein/sections/skills"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg">Add New Skill</h1>
                    <p className="text-white/60 text-sm">Add a new expertise to your toolkit.</p>
                </div>
            </div>

            <SkillForm />
        </div>
    );
}
