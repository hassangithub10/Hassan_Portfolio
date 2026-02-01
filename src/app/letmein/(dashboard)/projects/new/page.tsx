"use client";

import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function NewProjectPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/projects"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg">Add New Project</h1>
                    <p className="text-white/60 text-sm">Create a new masterpiece to showcase.</p>
                </div>
            </div>

            <ProjectForm />
        </div>
    );
}
