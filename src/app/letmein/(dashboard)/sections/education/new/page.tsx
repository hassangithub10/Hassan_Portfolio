"use client";

import EducationForm from "@/components/admin/EducationForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function NewEducationPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/sections/education"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg">Add Education</h1>
                    <p className="text-white/60 text-sm">Add a new milestone to your academic journey.</p>
                </div>
            </div>

            <EducationForm />
        </div>
    );
}
