"use client";

import { useState, useEffect } from "react";
import { getSectionContent, updateSectionContent, getAllSectionContent, seedSectionContent } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { Tab } from "@headlessui/react";
import {
    HomeIcon,
    UserIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    CodeBracketIcon,
    SparklesIcon,
    WrenchScrewdriverIcon,
    PencilSquareIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function SectionContentPage() {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const sectionConfig = [
        { key: 'hero', name: 'Hero', icon: HomeIcon },
        { key: 'about', name: 'About', icon: UserIcon },
        { key: 'education', name: 'Education', icon: AcademicCapIcon },
        { key: 'experience', name: 'Experience', icon: BriefcaseIcon },
        { key: 'projects', name: 'Projects', icon: CodeBracketIcon },
        { key: 'services', name: 'Services', icon: SparklesIcon },
        { key: 'technologies', name: 'Technologies', icon: WrenchScrewdriverIcon },
        { key: 'blog', name: 'Blog', icon: PencilSquareIcon },
        { key: 'contact', name: 'Contact', icon: EnvelopeIcon },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // First try to seed if empty
            await seedSectionContent();
            const data = await getAllSectionContent();
            setSections(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load section content");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (sectionKey: string, data: any) => {
        setSaving(true);
        try {
            const res = await updateSectionContent(sectionKey, data);
            if (res.success) {
                toast.success(`${sectionKey} section updated!`);
                fetchData(); // Refresh to get latest
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    const getSectionData = (key: string) => sections.find(s => s.sectionKey === key) || {};

    return (
        <div className="p-6 max-w-6xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <SparklesIcon className="w-8 h-8 text-primary-500" />
                Section Content Manager
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <Tab.Group vertical>
                    <Tab.List className="flex flex-col gap-2 min-w-[200px]">
                        {sectionConfig.map((section) => (
                            <Tab
                                key={section.key}
                                className={({ selected }) =>
                                    classNames(
                                        'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all',
                                        selected
                                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    )
                                }
                            >
                                <section.icon className="w-5 h-5" />
                                {section.name}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className="flex-1">
                        {sectionConfig.map((section) => {
                            const data = getSectionData(section.key);
                            return (
                                <Tab.Panel key={section.key} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary-500">
                                        <section.icon className="w-6 h-6" />
                                        Edit {section.name} Section
                                    </h2>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            handleSave(section.key, {
                                                title: formData.get('title'),
                                                subtitle: formData.get('subtitle'),
                                                description: formData.get('description'),
                                                badgeText: formData.get('badgeText'),
                                                badgeColor: formData.get('badgeColor'),
                                            });
                                        }}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Badge Settings */}
                                            <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Badge Settings</h3>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Badge Text</label>
                                                    <input
                                                        type="text"
                                                        name="badgeText"
                                                        defaultValue={data.badgeText}
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                                                        placeholder="e.g. Available for Projects"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Badge Color (Hex)</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="color"
                                                            name="badgeColor"
                                                            defaultValue={data.badgeColor || '#00f0ff'}
                                                            className="h-10 w-10 bg-transparent border-0 rounded cursor-pointer"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="badgeColor"
                                                            defaultValue={data.badgeColor || '#00f0ff'}
                                                            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 font-mono"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Main Content */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        defaultValue={data.title}
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                                                        placeholder="Main Heading"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Subtitle / Highlight</label>
                                                    <input
                                                        type="text"
                                                        name="subtitle"
                                                        defaultValue={data.subtitle}
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                                                        placeholder="Gradient Text Part"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                            <textarea
                                                name="description"
                                                defaultValue={data.description}
                                                rows={4}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                                                placeholder="Section description text..."
                                            />
                                        </div>

                                        {section.key === 'technologies' && (
                                            <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-primary-500">Individual Skills</h4>
                                                    <p className="text-sm text-gray-400">Add logos, names, and proficiency levels for your tech stack.</p>
                                                </div>
                                                <a
                                                    href="/letmein/sections/skills"
                                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-bold hover:bg-primary-600 transition-colors"
                                                >
                                                    Manage Skills
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex justify-end pt-4 border-t border-white/10">
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-6 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {saving ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <SparklesIcon className="w-4 h-4" />
                                                )}
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </Tab.Panel>
                            );
                        })}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}
