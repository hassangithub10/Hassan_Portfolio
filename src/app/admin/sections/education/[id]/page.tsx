import EducationForm from "@/components/admin/EducationForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { getEducationById } from "@/lib/actions";
import { notFound } from "next/navigation";

interface EditEducationPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditEducationPage({ params }: EditEducationPageProps) {
    const { id } = await params;
    const entry = await getEducationById(Number(id));

    if (!entry) {
        notFound();
    }

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
                    <h1 className="heading-lg">Edit Education</h1>
                    <p className="text-white/60 text-sm">Update your academic milestone.</p>
                </div>
            </div>

            <EducationForm initialData={entry} isEditing />
        </div>
    );
}
