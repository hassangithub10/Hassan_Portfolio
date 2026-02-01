"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addSkill, updateSkill } from "@/lib/actions";
import { clsx } from "clsx";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface SkillFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const categories = ["Frontend", "Backend", "Tools", "DevOps", "Design"] as const;

export default function SkillForm({ initialData, isEditing = false }: SkillFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        category: initialData?.category || "Frontend",
        logoSvgOrUrl: initialData?.logoSvgOrUrl || "",
        proficiencyLevel: initialData?.proficiencyLevel || 80,
        isFeatured: initialData?.isFeatured !== undefined ? initialData.isFeatured : true,
        sortOrder: initialData?.sortOrder || 0,
        isVisible: initialData?.isVisible !== undefined ? initialData.isVisible : true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            proficiencyLevel: Number(formData.proficiencyLevel),
            sortOrder: Number(formData.sortOrder),
        };

        const res = isEditing
            ? await updateSkill(initialData.id, payload)
            : await addSkill(payload);

        if (res.success) {
            router.push("/letmein/sections/skills");
            router.refresh();
        } else {
            alert(res.message);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <GlassCard className="p-8 space-y-6">
                <h3 className="text-xl font-heading text-white">Skill Details</h3>

                <div>
                    <label className="block text-sm text-white/60 mb-2">Skill Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                        placeholder="e.g. Next.js"
                    />
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all appearance-none"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-2">Proficiency Level (0-100)</label>
                    <input
                        type="number"
                        name="proficiencyLevel"
                        value={formData.proficiencyLevel}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-2">Skill Logo (Preferably WebP)</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="relative group/logo">
                            {formData.logoSvgOrUrl ? (
                                <div className="p-3 bg-black/40 rounded-xl border border-white/10 group-hover/logo:border-primary-500 transition-colors">
                                    <img
                                        src={formData.logoSvgOrUrl}
                                        alt="Logo Preview"
                                        className="h-12 w-12 object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center text-white/20">
                                    <SparklesIcon className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 w-full">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData(prev => ({ ...prev, logoSvgOrUrl: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                className="block w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500 cursor-pointer"
                            />
                            <p className="mt-2 text-[10px] text-white/40 uppercase tracking-widest">Supports PNG, JPG, SVG, WebP</p>
                        </div>
                    </div>
                    <div className="mt-2 text-right">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, logoSvgOrUrl: "" }))}
                            className="text-[10px] text-red-500 hover:underline uppercase tracking-widest"
                        >
                            Reset Logo
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-2">Sort Order</label>
                    <input
                        type="number"
                        name="sortOrder"
                        value={formData.sortOrder}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div className={clsx(
                                "w-12 h-6 rounded-full transition-colors duration-300",
                                formData.isFeatured ? "bg-lime" : "bg-white/10"
                            )}></div>
                            <div className={clsx(
                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                                formData.isFeatured && "translate-x-6"
                            )}></div>
                        </div>
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors">Featured Skill</span>
                    </label>
                </div>

                <div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="isVisible"
                                checked={formData.isVisible}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div className={clsx(
                                "w-12 h-6 rounded-full transition-colors duration-300",
                                formData.isVisible ? "bg-cyan-400" : "bg-white/10"
                            )}></div>
                            <div className={clsx(
                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                                formData.isVisible && "translate-x-6"
                            )}></div>
                        </div>
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors">Display on Portfolio</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-glow"
                    >
                        {loading ? "Saving..." : isEditing ? "Update Skill" : "Add Skill"}
                    </button>
                </div>
            </GlassCard>
        </form>
    );
}
