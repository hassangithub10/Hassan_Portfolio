"use client";

import { useState, useEffect } from "react";
import ServiceForm from "@/components/admin/ServiceForm";
import { getServiceById } from "@/lib/actions";
import { useParams } from "next/navigation";

export default function EditServicePage() {
    const params = useParams();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (params.id) {
                const data = await getServiceById(Number(params.id));
                setService(data);
            }
            setLoading(false);
        }
        load();
    }, [params.id]);

    if (loading) return <div className="text-white">Loading service...</div>;
    if (!service) return <div className="text-white">Service not found</div>;

    return <ServiceForm initialData={service} isEditMode={true} />;
}
