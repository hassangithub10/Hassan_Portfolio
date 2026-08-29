// Google reCAPTCHA v3 Integration Helper

export const RECAPTCHA_SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

/**
 * Execute Google reCAPTCHA v3 verification for a given user action on the client.
 * Returns the reCAPTCHA token if available.
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
    if (typeof window === "undefined") return null;

    try {
        if (!RECAPTCHA_SITE_KEY) {
            return null;
        }

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

export interface RecaptchaVerifyResponse {
    success: boolean;
    score?: number;
    action?: string;
    challenge_ts?: string;
    hostname?: string;
    "error-codes"?: string[];
}

/**
 * Server-side verification for Google reCAPTCHA v3 tokens.
 */
export async function verifyRecaptchaServer(token?: string | null): Promise<RecaptchaVerifyResponse> {
    if (!token) {
        return { success: false, "error-codes": ["missing-input-response"] };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        // If secret key is not set, allow graceful pass in development
        return { success: true, score: 1.0 };
    }

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }).toString(),
        });

        const data: RecaptchaVerifyResponse = await response.json();
        return data;
    } catch {
        return { success: false, "error-codes": ["network-error"] };
    }
}
