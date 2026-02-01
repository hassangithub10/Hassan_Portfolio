"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function NewServicePage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/services"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg">Add New Service</h1>
                    <p className="text-white/60 text-sm">Create a new service offering.</p>
                </div>
            </div>

            <ServiceForm />
        </div>
    );
}
