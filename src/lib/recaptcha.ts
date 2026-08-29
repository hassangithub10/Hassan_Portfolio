// Google reCAPTCHA v3 Integration Helper

export const RECAPTCHA_SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Ld_placeholder_recaptcha_v3_key";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

/**
 * Execute Google reCAPTCHA v3 verification for a given user action.
 * Returns the reCAPTCHA token if available.
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
    if (typeof window === "undefined") return null;

    try {
        if (window.grecaptcha) {
            return new Promise((resolve) => {
                window.grecaptcha?.ready(async () => {
                    try {
                        const token = await window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, {
                            action,
                        });
                        resolve(token || null);
                    } catch (err) {
                        console.warn("[reCAPTCHA v3] Execution warning:", err);
                        resolve(null);
                    }
                });
            });
        }
    } catch {
        // Fallback gracefully without interrupting user experience
        return null;
    }

    return null;
}
