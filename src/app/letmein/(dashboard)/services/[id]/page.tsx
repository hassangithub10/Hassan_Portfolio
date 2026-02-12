import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { getServiceById } from "@/lib/actions";
import { notFound } from "next/navigation";

interface EditServicePageProps {
    params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
    const { id } = await params;
    const service = await getServiceById(Number(id));

    if (!service) {
        notFound();
    }

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
                    <h1 className="heading-lg">Edit Service</h1>
                    <p className="text-white/60 text-sm">Update your service details.</p>
                </div>
            </div>

            <ServiceForm initialData={service} isEditMode />
        </div>
    );
}
