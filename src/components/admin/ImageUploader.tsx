"use client";

import { useState, useRef } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    type?: "project" | "blog" | "general";
    label?: string;
    aspectRatio?: string; // e.g. "2.18:1" for display info
}

export default function ImageUploader({
    value,
    onChange,
    type = "general",
    label = "Upload Image",
    aspectRatio
}: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                onChange(data.url);
            } else {
                alert("Upload failed: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleRemove = () => {
        onChange("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-white/70 mb-2">
                {label} {aspectRatio && <span className="text-white/40 text-xs">({aspectRatio})</span>}
            </label>

            {value ? (
                <div className="relative group w-full overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    {/* Aspect ratio control for preview if possible, but standard block is fine */}
                    <div className="relative w-full h-[200px]">
                        <Image
                            src={value}
                            alt="Uploaded"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <button
                        onClick={handleRemove}
                        type="button"
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white/80 backdrop-blur-sm">
                        WebP
                    </div>
                </div>
            ) : (
                <div
                    className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all cursor-pointer
                        ${dragActive
                            ? "border-blue-400 bg-blue-400/10"
                            : "border-white/10 hover:border-white/20 hover:bg-white/5"
                        }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                    />

                    {isUploading ? (
                        <div className="flex flex-col items-center text-white/70">
                            <div className="w-6 h-6 border-2 border-t-blue-400 border-white/20 rounded-full animate-spin mb-2" />
                            <span className="text-sm">Processing...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-white/40 group-hover:text-white/60 transition-colors">
                            <PhotoIcon className="w-8 h-8 mb-2" />
                            <span className="text-sm font-medium">Click to upload or drag & drop</span>
                            <span className="text-xs mt-1">Supports JPG, PNG, WEBP</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
