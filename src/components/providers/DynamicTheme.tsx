import { getSiteSettings } from "@/lib/actions";

function hexToRgb(hex: string) {
    // Remove hash
    hex = hex.replace('#', '');

    // Parse
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r} ${g} ${b}`;
}

export default async function DynamicTheme() {
    const settings = await getSiteSettings();

    // Helper to get setting or null
    const getVal = (key: string) => settings.find(s => s.settingKey === key)?.settingValue;

    const primaryHex = getVal("theme_primary");
    const bgHex = getVal("theme_background");
    const accentHex = getVal("theme_accent");

    if (!primaryHex && !bgHex && !accentHex) return null;

    let css = ":root {";

    if (primaryHex) {
        const rgb = hexToRgb(primaryHex);
        css += `
            --color-primary: ${rgb};
            --color-primary-500: ${rgb};
            /* Auto-generated shades would ideally go here, but for now we map main to 500/DEFAULT */
        `;
    }

    if (bgHex) {
        const rgb = hexToRgb(bgHex);
        css += `
            --color-bg-primary: ${rgb};
        `;
    }

    if (accentHex) {
        const rgb = hexToRgb(accentHex);
        css += `--color-accent: ${rgb};`;
    }

    css += "}";

    return (
        <style dangerouslySetInnerHTML={{ __html: css }} />
    );
}
