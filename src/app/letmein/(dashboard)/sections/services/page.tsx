"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getServices, deleteService, toggleItemVisibility } from "@/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon, ChevronLeftIcon, EyeIcon, EyeSlashIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { usePopup } from "@/components/admin/PopupProvider";

export default function ServicesPage() {
    const popup = usePopup();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        setLoading(true);
        const data = await getServices();
        setServices(data);
        setLoading(false);
    };

    const handleDelete = (id: number, title: string) => {
        popup.confirm({
            title: "Delete Item?",
            message: "This service will be permanently removed.",
            onConfirm: async () => {
                const res = await deleteService(id);
                if (res.success) {
                    setServices(services.filter(s => s.id !== id));
                    popup.deleted("Item Deleted", "The item has been removed.");
                } else {
                    popup.error("Deletion Failed", res.message);
                }
            },
        });
    };

    const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
        const res = await toggleItemVisibility('services', id, currentStatus);
        if (res.success) {
            setServices(services.map(s => s.id === id ? { ...s, isVisible: !currentStatus } : s));
        } else {
            popup.error("Update Failed", res.message);
        }
    };

    if (loading) return <div className="text-white">Loading services...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link
                        href="/letmein/sections"
                        className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="heading-lg mb-2">Services</h1>
                        <p className="text-white/60">Manage your service offerings.</p>
                    </div>
                </div>
                <Link
                    href="/letmein/sections/services/new"
                    className="flex items-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Service
                </Link>
            </div>

            <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/50 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Service</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Recommended</th>
                                <th className="px-6 py-4 font-medium">Visible</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                                        No services found.
                                    </td>
                                </tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{service.title}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white/70 uppercase text-xs tracking-wider">
                                            {service.serviceType?.replace('_', ' ')}
                                        </td>
                                        <td className="px-6 py-4 text-white/70">{service.priceText}</td>
                                        <td className="px-6 py-4">
                                            {service.isRecommended ? (
                                                <StarIconSolid className="w-5 h-5 text-lime" />
                                            ) : (
                                                <StarIcon className="w-5 h-5 text-white/20" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleVisibility(service.id, service.isVisible)}
                                                className={clsx(
                                                    "p-2 rounded-lg transition-colors",
                                                    service.isVisible
                                                        ? "bg-lime/10 text-lime hover:bg-lime/20"
                                                        : "bg-white/5 text-white/30 hover:bg-white/10"
                                                )}
                                                title={service.isVisible ? "Hide service" : "Show service"}
                                            >
                                                {service.isVisible ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/letmein/sections/services/${service.id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(service.id, service.title)}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
