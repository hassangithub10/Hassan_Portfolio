"use client";

import { useState, useEffect } from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/actions";
import { useParams } from "next/navigation";

export default function EditProjectPage() {
    const params = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (params.id) {
                const data = await getProjectById(Number(params.id));
                setProject(data);
            }
            setLoading(false);
        }
        load();
    }, [params.id]);

    if (loading) return <div className="text-white">Loading project...</div>;
    if (!project) return <div className="text-white">Project not found</div>;

    return <ProjectForm initialData={project} isEditMode={true} />;
}
