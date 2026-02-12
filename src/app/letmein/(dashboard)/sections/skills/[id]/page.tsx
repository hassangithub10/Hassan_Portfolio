"use client";

import { useState, useEffect } from "react";
import SkillForm from "@/components/admin/SkillForm";
import { getSkillById } from "@/lib/actions";
import { useParams } from "next/navigation";

export default function EditSkillPage() {
    const params = useParams();
    const [skill, setSkill] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (params.id) {
                const data = await getSkillById(Number(params.id));
                setSkill(data);
            }
            setLoading(false);
        }
        load();
    }, [params.id]);

    if (loading) return <div className="text-white">Loading skill...</div>;
    if (!skill) return <div className="text-white">Skill not found</div>;

    return <SkillForm initialData={skill} isEditMode={true} />;
}
