"use client";

import { useState, useRef } from "react";
import { CloudArrowUpIcon, XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { clsx } from "clsx";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    minWidth?: number;
    minHeight?: number;
    className?: string;
    type?: "project" | "blog" | "general";
}

export default function ImageUpload({
    value,
    onChange,
    minWidth = 700,
    minHeight = 326,
    className,
    type = "general"
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setError(null);

        // 1. Basic Validation
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file.");
            return;
        }

        // 2. Dimension Validation
        try {
            await validateDimensions(file, minWidth, minHeight);
        } catch (err: any) {
            setError(err.message);
            return;
        }

        // 3. Upload
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Upload failed");
            }

            const data = await res.json();
            onChange(data.url);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Failed to upload image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const validateDimensions = (file: File, minW: number, minH: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            const objectUrl = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                if (img.width < minW || img.height < minH) {
                    reject(new Error(`Image must be at least ${minW}x${minH}px. Uploaded: ${img.width}x${img.height}px.`));
                } else {
                    resolve();
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Failed to load image for validation."));
            };

            img.src = objectUrl;
        });
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={clsx("w-full", className)}>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*" // Accept all images, server converts to webp
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            {value ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-black/50 aspect-video">
                    <Image
                        src={value}
                        alt="Uploaded content"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={onClick}
                            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            title="Change Image"
                        >
                            <PhotoIcon className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="p-2 bg-red-500/20 rounded-full text-red-500 hover:bg-red-500/30 transition-colors"
                            title="Remove Image"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={onClick}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    className={clsx(
                        "relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-center min-h-[200px]",
                        isDragging ? "border-lime bg-lime/5" : "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
                        error ? "border-red-500/50" : ""
                    )}
                >
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-3 text-white/50">
                            <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm">Uploading & Converting...</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-3 rounded-full bg-white/5">
                                <CloudArrowUpIcon className="w-8 h-8 text-white/40" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Click to upload or drag and drop</p>
                                <p className="text-white/40 text-xs mt-1">
                                    Min {minWidth}x{minHeight}px • WebP Optimized
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="text-red-400 text-xs mt-2 pl-1 animate-pulse">{error}</p>
            )}
        </div>
    );
}
