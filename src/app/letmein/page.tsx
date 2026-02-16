"use client";

import { useFormStatus } from "react-dom";
import { login } from "@/lib/auth-actions";
import { useState } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-neon-blue text-sm font-medium text-black bg-primary-500 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed font-heading tracking-wide uppercase"
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                </span>
            ) : "Access System"}
        </button>
    );
}

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");

    async function clientAction(formData: FormData) {
        const res = await login(formData);
        if (res?.success === false) {
            setErrorMessage(res.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-500/5 blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-[120px]" />
                <div className="scanlines opacity-20" />
            </div>

            <div className="max-w-md w-full p-8 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-heading text-white mb-2">
                        Hassan<span className="text-primary-500">.</span> Admin
                    </h1>
                    <p className="text-white/40">Secure Access Gateway</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <form action={clientAction} className="space-y-6">
                        {errorMessage && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">Identifier</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-white/30" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 bg-black/50 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all sm:text-sm"
                                    placeholder="Username/Email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-2">Passkey</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-white/30" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 bg-black/50 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <SubmitButton />
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-white/20">
                    <p>Protected by 12h Session Timeout</p>
                    <p>Authorized Personnel Only</p>
                </div>
            </div>
        </div>
    );
}
