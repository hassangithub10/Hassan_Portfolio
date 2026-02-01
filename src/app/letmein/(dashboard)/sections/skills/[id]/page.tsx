import SkillForm from "@/components/admin/SkillForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { getSkillById } from "@/lib/actions";
import { notFound } from "next/navigation";

interface EditSkillPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
    const { id } = await params;
    const skill = await getSkillById(Number(id));

    if (!skill) {
        notFound();
    }

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
                    <h1 className="heading-lg">Edit Skill</h1>
                    <p className="text-white/60 text-sm">Update your skill details.</p>
                </div>
            </div>

            <SkillForm initialData={skill} isEditing />
        </div>
    );
}
