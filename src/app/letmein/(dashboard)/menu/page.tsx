"use client";

import { useState, useEffect } from "react";
import {
    getNavigationItems,
    addNavigationItem,
    updateNavigationItem,
    deleteNavigationItem,
    seedNavigationItems
} from "@/lib/actions";
import { NavigationItem } from "@/db/schema";
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from "@heroicons/react/24/outline";

export default function MenuPage() {
    const [items, setItems] = useState<NavigationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<NavigationItem | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        label: "",
        path: "",
        location: "header" as "header" | "footer" | "both",
        sortOrder: 0,
        isVisible: true
    });

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        setIsLoading(true);
        const data = await getNavigationItems();
        setItems(data);
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateNavigationItem(isEditing.id, formData);
            } else {
                // Auto-set sort order to last
                const maxSort = Math.max(...items.map(i => i.sortOrder || 0), 0);
                await addNavigationItem({ ...formData, sortOrder: maxSort + 1 });
            }
            setShowForm(false);
            setIsEditing(null);
            resetForm();
            loadItems();
        } catch (error) {
            console.error(error);
            alert("Failed to save item");
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteNavigationItem(id);
            loadItems();
        } catch (error) {
            console.error(error);
            alert("Failed to delete item");
        }
    }

    async function moveItem(index: number, direction: 'up' | 'down') {
        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newItems.length) return;

        // Swap locally for visual snap
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

        // Update sort orders based on new index
        const updates = newItems.map((item, idx) => ({
            id: item.id,
            sortOrder: idx
        }));

        setItems(newItems); // Optimistic update

        // Persist
        try {
            await Promise.all(updates.map(u => updateNavigationItem(u.id, { sortOrder: u.sortOrder })));
        } catch (error) {
            console.error(error);
            alert("Failed to reorder");
            loadItems(); // Revert on error
        }
    }

    function resetForm() {
        setFormData({
            label: "",
            path: "",
            location: "header",
            sortOrder: 0,
            isVisible: true
        });
    }

    function handleEdit(item: NavigationItem) {
        setIsEditing(item);
        setFormData({
            label: item.label,
            path: item.path,
            location: item.location || "header",
            sortOrder: item.sortOrder || 0,
            isVisible: item.isVisible ?? true
        });
        setShowForm(true);
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Menu Management</h1>
                    <p className="text-white/60">Manage your website's navigation links.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Item</span>
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-white/60">Loading items...</div>
                ) : items.length === 0 ? (
                    <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center gap-4">
                        <p className="text-white/40">No menu items found. You can creating them manually or load the defaults.</p>
                        <button
                            onClick={async () => {
                                setIsLoading(true);
                                await seedNavigationItems();
                                loadItems();
                            }}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium"
                        >
                            Load Default Links
                        </button>
                    </div>
                ) : (
                    items.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary-500/30 transition-colors group">
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => moveItem(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                                >
                                    <ArrowUpIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => moveItem(index, 'down')}
                                    disabled={index === items.length - 1}
                                    className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                                >
                                    <ArrowDownIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-white">{item.label}</h3>
                                <div className="flex items-center gap-3 text-sm text-white/50">
                                    <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-xs">{item.path}</span>
                                    <span className="uppercase text-xs tracking-wider border border-white/10 px-2 py-0.5 rounded-full">{item.location}</span>
                                    {!item.isVisible && <span className="text-red-400 text-xs">Hidden</span>}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 text-white/60 hover:text-primary-500 transition-colors"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-white/60 hover:text-red-500 transition-colors"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Modal (Simple inline for now) */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-charcoal border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6">
                            {isEditing ? "Edit Menu Item" : "New Menu Item"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Label</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Path (URL)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="/ or #section"
                                    value={formData.path}
                                    onChange={e => setFormData({ ...formData, path: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-1">Location</label>
                                <select
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value as any })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 outline-none"
                                >
                                    <option value="header">Header Only</option>
                                    <option value="footer">Footer Only</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isVisible"
                                    checked={formData.isVisible}
                                    onChange={e => setFormData({ ...formData, isVisible: e.target.checked })}
                                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-primary-500"
                                />
                                <label htmlFor="isVisible" className="text-white/80 select-none">Visible</label>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-4 py-2 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
