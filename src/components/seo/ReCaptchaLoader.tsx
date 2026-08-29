"use client";

import { useEffect } from "react";

export default function ReCaptchaLoader() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        if (!siteKey) return;

        // Check if script is already present
        const existingScript = document.getElementById("google-recaptcha-v3-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "google-recaptcha-v3-script";
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    }, [siteKey]);

    return null;
}
