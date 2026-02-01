"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { updateSiteSettings } from "@/lib/actions";

interface QuickSettingsProps {
    initialVisible: boolean;
    initialText: string;
    initialLink: string;
}

export default function QuickSettings({ initialVisible, initialText, initialLink }: QuickSettingsProps) {
    const [visible, setVisible] = useState(initialVisible);
    const [text, setText] = useState(initialText);
    const [link, setLink] = useState(initialLink);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const settings = [
                { settingKey: "floating_badge_visible", settingValue: visible.toString() },
                { settingKey: "floating_badge_text", settingValue: text },
                { settingKey: "floating_badge_link", settingValue: link },
            ];

            const result = await updateSiteSettings(settings);
            if (result.success) {
                toast.success("Settings updated! Refresh main site to see changes.");
            } else {
                toast.error("Failed to update.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update settings");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-white font-medium mb-1">Show Badge</h4>
                    <p className="text-xs text-white/50">Toggle visibility on frontend</p>
                </div>
                <Switch
                    checked={visible}
                    onChange={setVisible}
                    className={`${visible ? 'bg-lime' : 'bg-white/10'}
          relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${visible ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>

            <div>
                <label className="block text-xs uppercase text-white/50 font-bold mb-2">Badge Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs uppercase text-white/50 font-bold mb-2">Badge Link</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime transition-colors"
                    placeholder="#contact"
                />
            </div>

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-2 bg-lime text-black font-bold uppercase tracking-wider rounded-lg hover:bg-lime/90 transition-colors disabled:opacity-50"
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}
