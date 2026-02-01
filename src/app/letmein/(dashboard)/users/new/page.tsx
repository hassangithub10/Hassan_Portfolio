"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import { addAdmin } from "@/lib/actions";
import { clsx } from "clsx";

const PERMISSIONS = [
    { id: "blog", label: "Blog Management" },
    { id: "projects", label: "Project Management" },
    { id: "services", label: "Services" },
    { id: "sections", label: "Section Content" },
    { id: "seo", label: "SEO Manager" },
    { id: "settings", label: "Global Settings" },
    { id: "users", label: "User Management" },
];

export default function NewUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        permissions: [] as string[]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // If no permissions selected, maybe default to empty (or handle as Super Admin in logic, but explicit is better)
        // Here we send what's selected. 

        const res = await addAdmin(formData);

        if (res.success) {
            router.push("/letmein/users");
            router.refresh();
        } else {
            alert(res.message);
            setLoading(false);
        }
    };

    const togglePermission = (id: string) => {
        setFormData(prev => {
            const exists = prev.permissions.includes(id);
            if (exists) {
                return { ...prev, permissions: prev.permissions.filter(p => p !== id) };
            } else {
                return { ...prev, permissions: [...prev.permissions, id] };
            }
        });
    };

    const handleSelectAll = () => {
        if (formData.permissions.length === PERMISSIONS.length) {
            setFormData(prev => ({ ...prev, permissions: [] }));
        } else {
            setFormData(prev => ({ ...prev, permissions: PERMISSIONS.map(p => p.id) }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-10">
                <h1 className="heading-lg mb-2">Add New User</h1>
                <p className="text-white/60">Create a new admin account and assign permissions.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <GlassCard className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm text-white/60 mb-2">Username</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="johndoe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/60 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime transition-all"
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm text-white/60">Permissions</label>
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="text-xs text-lime font-bold hover:underline"
                            >
                                {formData.permissions.length === PERMISSIONS.length ? "Deselect All" : "Select All"}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {PERMISSIONS.map((perm) => {
                                const isSelected = formData.permissions.includes(perm.id);
                                return (
                                    <div
                                        key={perm.id}
                                        onClick={() => togglePermission(perm.id)}
                                        className={clsx(
                                            "cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3",
                                            isSelected
                                                ? "bg-lime/10 border-lime text-white"
                                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                                            isSelected ? "bg-lime border-lime" : "border-white/30"
                                        )}>
                                            {isSelected && (
                                                <svg className="w-3.5 h-3.5 text-charcoal font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm font-medium">{perm.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-lime text-charcoal rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-glow"
                        >
                            {loading ? "Creating User..." : "Create Admin User"}
                        </button>
                    </div>
                </GlassCard>
            </form>
        </div>
    );
}
