"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

// ─── Types ────────────────────────────────────────────────────────────────────

type PopupType = "success" | "error" | "info" | "warning" | "delete";

interface PopupMessage {
    id: string;
    type: PopupType;
    title: string;
    message?: string;
    duration?: number;
}

interface PopupContextValue {
    popup: (opts: Omit<PopupMessage, "id">) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    deleted: (title: string, message?: string) => void;
    confirm: (opts: { title: string; message?: string; onConfirm: () => void }) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const PopupContext = createContext<PopupContextValue | null>(null);

export function usePopup() {
    const ctx = useContext(PopupContext);
    if (!ctx) throw new Error("usePopup must be used inside <PopupProvider>");
    return ctx;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const CONFIG: Record<PopupType, { icon: React.ElementType; color: string; glow: string; border: string; badge: string }> = {
    success: {
        icon: CheckCircleIcon,
        color: "text-emerald-400",
        glow: "from-emerald-500/20 to-transparent",
        border: "border-emerald-500/30",
        badge: "bg-emerald-500/15",
    },
    error: {
        icon: XCircleIcon,
        color: "text-red-400",
        glow: "from-red-500/20 to-transparent",
        border: "border-red-500/30",
        badge: "bg-red-500/15",
    },
    info: {
        icon: InformationCircleIcon,
        color: "text-sky-400",
        glow: "from-sky-500/20 to-transparent",
        border: "border-sky-500/30",
        badge: "bg-sky-500/15",
    },
    warning: {
        icon: ExclamationTriangleIcon,
        color: "text-amber-400",
        glow: "from-amber-500/20 to-transparent",
        border: "border-amber-500/30",
        badge: "bg-amber-500/15",
    },
    delete: {
        icon: XCircleIcon,
        color: "text-red-400",
        glow: "from-red-500/20 to-transparent",
        border: "border-red-500/30",
        badge: "bg-red-500/15",
    },
};

// ─── Single Popup Card ────────────────────────────────────────────────────────

function PopupCard({ popup, onDismiss }: { popup: PopupMessage; onDismiss: (id: string) => void }) {
    const cfg = CONFIG[popup.type];
    const Icon = cfg.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -40, rotateX: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, rotateX: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{ perspective: 800 }}
            className={`relative w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border ${cfg.border} bg-[#0d0d14]/90 backdrop-blur-2xl shadow-2xl overflow-hidden`}
        >
            {/* Top glow bar */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cfg.glow}`} />

            {/* Background shimmer */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cfg.glow} opacity-30 pointer-events-none`} />

            <div className="relative flex items-start gap-4 p-5">
                {/* Icon badge */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${cfg.badge} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-white font-semibold text-sm leading-tight">{popup.title}</p>
                    {popup.message && (
                        <p className="text-white/50 text-xs mt-1 leading-relaxed">{popup.message}</p>
                    )}
                </div>

                {/* Close */}
                <button
                    onClick={() => onDismiss(popup.id)}
                    className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-white/30 hover:text-white/80 hover:bg-white/10 transition-colors"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Progress bar */}
            <motion.div
                className={`h-[2px] ${cfg.color.replace("text-", "bg-")}`}
                initial={{ scaleX: 1, transformOrigin: "left" }}
                animate={{ scaleX: 0 }}
                transition={{ duration: (popup.duration ?? 4000) / 1000, ease: "linear" }}
                onAnimationComplete={() => onDismiss(popup.id)}
            />
        </motion.div>
    );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

interface ConfirmState {
    title: string;
    message?: string;
    onConfirm: () => void;
}

function ConfirmDialog({ state, onClose }: { state: ConfirmState; onClose: () => void }) {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />

            {/* Dialog */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: -15, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotateX: 10, y: 20 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ perspective: 1000 }}
                className="relative z-10 w-full max-w-md mx-4 rounded-3xl border border-red-500/30 bg-[#0d0d14]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(239,68,68,0.15)] overflow-hidden"
            >
                {/* Top glow bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/8 to-transparent pointer-events-none" />

                <div className="relative p-8">
                    {/* Icon */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                                <TrashIconSvg />
                            </div>
                            {/* Pulsing ring */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl border border-red-500/40"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>

                    <h3 className="text-white text-xl font-bold text-center mb-2">{state.title}</h3>
                    {state.message && (
                        <p className="text-white/50 text-sm text-center leading-relaxed mb-8">{state.message}</p>
                    )}
                    {!state.message && <div className="mb-8" />}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                state.onConfirm();
                                onClose();
                            }}
                            className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:border-red-500/60 transition-all font-semibold text-sm"
                        >
                            Delete
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function TrashIconSvg() {
    return (
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
    );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function PopupProvider({ children }: { children: React.ReactNode }) {
    const [popups, setPopups] = useState<PopupMessage[]>([]);
    const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
    const counterRef = useRef(0);

    const dismiss = useCallback((id: string) => {
        setPopups(prev => prev.filter(p => p.id !== id));
    }, []);

    const popup = useCallback((opts: Omit<PopupMessage, "id">) => {
        const id = `popup-${++counterRef.current}`;
        setPopups(prev => [...prev.slice(-4), { ...opts, id }]);
    }, []);

    const success = useCallback((title: string, message?: string) => popup({ type: "success", title, message }), [popup]);
    const error = useCallback((title: string, message?: string) => popup({ type: "error", title, message }), [popup]);
    const info = useCallback((title: string, message?: string) => popup({ type: "info", title, message }), [popup]);
    const warning = useCallback((title: string, message?: string) => popup({ type: "warning", title, message }), [popup]);
    const deleted = useCallback((title: string, message?: string) => popup({ type: "delete", title, message }), [popup]);

    const confirm = useCallback((opts: { title: string; message?: string; onConfirm: () => void }) => {
        setConfirmState(opts);
    }, []);

    return (
        <PopupContext.Provider value={{ popup, success, error, info, warning, deleted, confirm }}>
            {children}

            {/* Popup stack - top-right */}
            <div className="fixed top-6 right-6 z-[9998] flex flex-col gap-3 items-end pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {popups.map(p => (
                        <div key={p.id} className="pointer-events-auto">
                            <PopupCard popup={p} onDismiss={dismiss} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Confirm Dialog */}
            <AnimatePresence>
                {confirmState && (
                    <ConfirmDialog
                        state={confirmState}
                        onClose={() => setConfirmState(null)}
                    />
                )}
            </AnimatePresence>
        </PopupContext.Provider>
    );
}
