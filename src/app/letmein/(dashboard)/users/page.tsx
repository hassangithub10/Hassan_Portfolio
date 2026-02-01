"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { getAdmins, deleteAdmin } from "@/lib/actions";
import { UserPlusIcon, TrashIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getAdmins();
        setUsers(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const res = await deleteAdmin(id);
        if (res.success) {
            loadUsers();
        } else {
            alert(res.message);
        }
    };

    if (loading) return <div className="text-white">Loading users...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-lg mb-2">User Management</h1>
                    <p className="text-white/60">Manage admin access and permissions.</p>
                </div>
                <Link
                    href="/letmein/users/new"
                    className="flex items-center gap-2 px-4 py-2 bg-lime text-charcoal rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Add User</span>
                </Link>
            </div>

            <div className="grid gap-4">
                {users.map((user) => (
                    <GlassCard key={user.id} className="p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-heading font-bold text-white">
                                {user.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{user.username}</h3>
                                <p className="text-sm text-white/50">{user.email || 'No email set'}</p>
                                <div className="flex gap-2 mt-2">
                                    {user.permissions && Array.isArray(user.permissions) && user.permissions.map((perm: string) => (
                                        <span key={perm} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-lime/10 text-lime border border-lime/20">
                                            {perm}
                                        </span>
                                    ))}
                                    {(!user.permissions || user.permissions.length === 0) && (
                                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-white/40">
                                            Full Access (Super Admin)
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                                title="Delete User"
                            >
                                <TrashIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </GlassCard>
                ))}

                {users.length === 0 && (
                    <div className="text-center py-12 text-white/40 border-2 border-dashed border-white/5 rounded-2xl">
                        No users found. Create the first admin.
                    </div>
                )}
            </div>
        </div>
    );
}
