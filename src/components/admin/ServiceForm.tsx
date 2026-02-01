"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addService, updateService } from "@/lib/actions";
import { clsx } from "clsx";

interface ServiceFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const serviceTypes = [
    { value: "web_development", label: "Web Development" },
    { value: "app_development", label: "App Development" },
    { value: "uiux_design", label: "UI/UX Design" },
    { value: "seo", label: "SEO" },
    { value: "other", label: "Other" },
];

export default function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        serviceType: initialData?.serviceType || "web_development",
        priceText: initialData?.priceText || "",
        isRecommended: initialData?.isRecommended || false,
        features: Array.isArray(initialData?.features) ? initialData.features.join("\n") : "",
        techFocus: Array.isArray(initialData?.techFocus) ? initialData.techFocus.join(", ") : "",
        isVisible: initialData?.isVisible !== undefined ? initialData.isVisible : true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            features: formData.features.split("\n").map((f: string) => f.trim()).filter((f: string) => f !== ""),
            techFocus: formData.techFocus.split(",").map((t: string) => t.trim()).filter((t: string) => t !== ""),
        };

        const res = isEditing
            ? await updateService(initialData.id, payload)
            : await addService(payload);

        if (res.success) {
            router.push("/letmein/services");
            router.refresh();
        } else {
            alert(res.message);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Service Details</h3>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Service Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="e.g. Premium Web Development"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Describe what this service offers..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Features (One per line)</label>
                            <textarea
                                name="features"
                                value={formData.features}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                            />
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <GlassCard className="p-8 space-y-6">
                        <h3 className="text-xl font-heading text-white">Configuration</h3>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Service Type</label>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all appearance-none"
                            >
                                {serviceTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Price Text</label>
                            <input
                                type="text"
                                name="priceText"
                                value={formData.priceText}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="e.g. Starting at $999"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Tech Focus (comma separated)</label>
                            <input
                                type="text"
                                name="techFocus"
                                value={formData.techFocus}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                                placeholder="React, Next.js, Node.js"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="isRecommended"
                                        checked={formData.isRecommended}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={clsx(
                                        "w-12 h-6 rounded-full transition-colors duration-300",
                                        formData.isRecommended ? "bg-lime" : "bg-white/10"
                                    )}></div>
                                    <div className={clsx(
                                        "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm",
                                        formData.isRecommended && "translate-x-6"
                                    )}></div>
                                </div>
                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">Recommended</span>
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
                                {loading ? "Saving..." : isEditing ? "Update Service" : "Add Service"}
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </form>
    );
}
