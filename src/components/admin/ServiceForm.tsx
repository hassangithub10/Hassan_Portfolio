"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addService, updateService } from "@/lib/actions";
import { Service, NewService } from "@/db/schema";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ServiceFormProps {
    initialData?: Service;
    isEditMode?: boolean;
}

export default function ServiceForm({ initialData, isEditMode = false }: ServiceFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<NewService>>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        serviceType: initialData?.serviceType || "web_development",
        priceText: initialData?.priceText || "",
        features: initialData?.features || [],
        isRecommended: initialData?.isRecommended || false,
        techFocus: initialData?.techFocus || [],
        isVisible: initialData?.isVisible ?? true,
    });

    const [newFeature, setNewFeature] = useState("");
    const [newTech, setNewTech] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddFeature = () => {
        if (!newFeature.trim()) return;
        const currentFeatures = formData.features as string[] || [];
        setFormData({ ...formData, features: [...currentFeatures, newFeature.trim()] });
        setNewFeature("");
    };

    const handleRemoveFeature = (index: number) => {
        const currentFeatures = formData.features as string[] || [];
        setFormData({ ...formData, features: currentFeatures.filter((_, i) => i !== index) });
    };

    const handleAddTech = () => {
        if (!newTech.trim()) return;
        const currentTech = formData.techFocus as string[] || [];
        setFormData({ ...formData, techFocus: [...currentTech, newTech.trim()] });
        setNewTech("");
    };

    const handleRemoveTech = (index: number) => {
        const currentTech = formData.techFocus as string[] || [];
        setFormData({ ...formData, techFocus: currentTech.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Basic validation
        if (!formData.title || !formData.description) {
            alert("Title and Description are required");
            setSaving(false);
            return;
        }

        let res;
        if (isEditMode && initialData?.id) {
            res = await updateService(initialData.id, formData);
        } else {
            res = await addService(formData as NewService);
        }

        if (res.success) {
            router.push("/letmein/sections/services");
            router.refresh();
        } else {
            alert(res.message);
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/letmein/sections/services"
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="heading-lg mb-1">{isEditMode ? "Edit Service" : "Add New Service"}</h1>
                    <p className="text-white/60">Define your service offerings.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <GlassCard className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Service Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Service Type</label>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            >
                                <option value="web_development" className="bg-charcoal">Web Development</option>
                                <option value="seo" className="bg-charcoal">SEO & Optimization</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Price Text</label>
                            <input
                                type="text"
                                name="priceText"
                                value={formData.priceText}
                                onChange={handleChange}
                                placeholder="e.g. Starting at $500"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Features List</label>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                placeholder="Add feature point"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                            />
                            <button type="button" onClick={handleAddFeature} className="px-4 py-2 bg-lime/20 text-lime rounded-xl hover:bg-lime/30">Add</button>
                        </div>
                        <ul className="space-y-2">
                            {(formData.features as string[])?.map((feature, idx) => (
                                <li key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-sm text-white/80">
                                    <span>{feature}</span>
                                    <button type="button" onClick={() => handleRemoveFeature(idx)} className="hover:text-red-400">
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Tech Focus (Optional)</label>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                placeholder="Add tech"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime text-sm"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                            />
                            <button type="button" onClick={handleAddTech} className="px-4 py-2 bg-lime/20 text-lime rounded-xl hover:bg-lime/30">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(formData.techFocus as string[])?.map((tech, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                                    {tech}
                                    <button type="button" onClick={() => handleRemoveTech(idx)} className="hover:text-red-400">
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-6 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isRecommended"
                                name="isRecommended"
                                checked={formData.isRecommended || false}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 bg-white/5 text-lime focus:ring-lime"
                            />
                            <label htmlFor="isRecommended" className="text-white select-none cursor-pointer">Recommended / Popular</label>
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
                        {saving ? "Saving..." : isEditMode ? "Update Service" : "Create Service"}
                    </button>
                </div>
            </form>
        </div>
    );
}
