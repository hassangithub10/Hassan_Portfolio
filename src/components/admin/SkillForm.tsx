"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addSkill, updateSkill } from "@/lib/actions";
import { Skill, NewSkill } from "@/db/schema";
import { ChevronLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface SkillFormProps {
    initialData?: Skill;
    isEditMode?: boolean;
}

export default function SkillForm({ initialData, isEditMode = false }: SkillFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    // Corrected state initialization using logoSvgOrUrl and proficiencyLevel
    const [formData, setFormData] = useState<Partial<NewSkill>>({
        name: initialData?.name || "",
        category: initialData?.category || "Frontend",
        logoSvgOrUrl: initialData?.logoSvgOrUrl || "",
        proficiencyLevel: initialData?.proficiencyLevel || 50,
        sortOrder: initialData?.sortOrder || 0,
        isFeatured: initialData?.isFeatured || false,
        isVisible: initialData?.isVisible ?? true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number' || type === 'range') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (!formData.name) {
            alert("Skill name is required");
            setSaving(false);
            return;
        }

        let res;
        if (isEditMode && initialData?.id) {
            res = await updateSkill(initialData.id, formData);
        } else {
            res = await addSkill(formData as NewSkill);
        }

        if (res.success) {
            router.push("/letmein/sections/skills");
            router.refresh();
        } else {
            alert(res.message);
            setSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/letmein/sections/skills"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg mb-1">{isEditMode ? "Edit Skill" : "Add New Skill"}</h1>
                    <p className="text-white/60">Skills & Technologies.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <GlassCard className="p-8 space-y-6">
                    {/* Logo Upload / URL Section - Prioritized */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <label className="block text-sm text-lime font-bold mb-2 flex items-center gap-2">
                            <PhotoIcon className="w-5 h-5" />
                            Logo / Icon URL (Preferred)
                        </label>
                        <input
                            type="text"
                            name="logoSvgOrUrl"
                            value={formData.logoSvgOrUrl || ""}
                            onChange={handleChange}
                            placeholder="https://... (SVG/PNG/WebP)"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                        />
                        {formData.logoSvgOrUrl && (
                            <div className="mt-4 flex justify-center p-4 bg-white/5 rounded-lg">
                                <div className="relative w-16 h-16">
                                    <Image src={formData.logoSvgOrUrl} alt="Preview" fill className="object-contain" />
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-white/40 mt-2">
                            Providing a high-quality logo URL (SVG preferred) helps render the carousel beautifully.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Skill Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                        >
                            <option value="Frontend" className="bg-charcoal">Frontend</option>
                            <option value="Backend" className="bg-charcoal">Backend</option>
                            <option value="Tools" className="bg-charcoal">Tools & DevOps</option>
                            <option value="Design" className="bg-charcoal">Design</option>
                        </select>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-sm text-white/60">Proficiency</label>
                            <span className="text-sm text-lime">{formData.proficiencyLevel}%</span>
                        </div>
                        <input
                            type="range"
                            name="proficiencyLevel"
                            min="0"
                            max="100"
                            value={formData.proficiencyLevel}
                            onChange={handleChange}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Sort Order</label>
                        <input
                            type="number"
                            name="sortOrder"
                            value={formData.sortOrder}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                        />
                    </div>

                    <div className="flex gap-6 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                name="isFeatured"
                                checked={formData.isFeatured || false}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime focus:ring-lime"
                            />
                            <label htmlFor="isFeatured" className="text-white select-none cursor-pointer">Featured (Show in Ticker)</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isVisible"
                                name="isVisible"
                                checked={formData.isVisible ?? true}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime focus:ring-lime"
                            />
                            <label htmlFor="isVisible" className="text-white select-none cursor-pointer">Visible Publicly</label>
                        </div>
                    </div>
                </GlassCard>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {saving ? "Saving..." : isEditMode ? "Update Skill" : "Add Skill"}
                    </button>
                </div>
            </form>
        </div>
    );
}
