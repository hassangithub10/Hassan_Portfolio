"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addEducation, updateEducation } from "@/lib/actions";
import { clsx } from "clsx";

interface EducationFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function EducationForm({ initialData, isEditing = false }: EducationFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        institution: initialData?.institution || "",
        degree: initialData?.degree || "",
        fieldOfStudy: initialData?.fieldOfStudy || "",
        startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
        endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "",
        description: initialData?.description || "",
        sortOrder: initialData?.sortOrder || 0,
        isVisible: initialData?.isVisible !== undefined ? initialData.isVisible : true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            sortOrder: Number(formData.sortOrder),
            startDate: new Date(formData.startDate),
            endDate: formData.endDate ? new Date(formData.endDate) : null,
        };

        const res = isEditing
            ? await updateEducation(initialData.id, payload)
            : await addEducation(payload);

        if (res.success) {
            router.push("/letmein/sections/education");
            router.refresh();
        } else {
            alert(res.message);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <GlassCard className="p-8 space-y-6">
                <h3 className="text-xl font-heading text-white">Academic Details</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm text-white/60 mb-2">Institution</label>
                        <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="e.g. Stanford University"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Degree</label>
                        <input
                            type="text"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="e.g. Bachelor of Science"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Field of Study</label>
                        <input
                            type="text"
                            name="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="e.g. Computer Science"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">End Date (Optional)</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-white/60 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                        placeholder="Key highlights from your time here..."
                    />
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
                        {loading ? "Saving..." : isEditing ? "Update Education" : "Add Education"}
                    </button>
                </div>
            </GlassCard>
        </form>
    );
}
