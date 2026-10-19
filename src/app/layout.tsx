import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Anton, Onest } from "next/font/google";
import "./globals.css";
import "./vane.css";
import ReCaptchaLoader from "@/components/seo/ReCaptchaLoader";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, DEFAULT_KEYWORDS, SITE_URL, OG_IMAGE } from "@/lib/seo";

const anton = Anton({
    variable: "--font-anton",
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const onest = Onest({
    variable: "--font-onest",
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: "#fff8f0",
    colorScheme: "light",
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: "Hassan Sarfraz", url: SITE_URL }],
    creator: "Hassan Sarfraz",
    publisher: "Hassan Sarfraz",
    alternates: { canonical: SITE_URL },
    icons: { icon: "/logo.svg", apple: "/logo.svg" },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: "Hassan Sarfraz",
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hassan Sarfraz: websites that bring you customers" }],
    },
    twitter: {
        card: "summary_large_image",
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        creator: "@hassansarfraz",
        images: [OG_IMAGE],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    return (
        <html lang="en" className={`light vane-root ${anton.variable} ${onest.variable}`} suppressHydrationWarning>
            <body className="antialiased">
                <noscript>
                    <style>{`.preloader{display:none!important}html.is-loading,html.is-loading body{overflow:auto!important}`}</style>
                </noscript>

                <Script src="https://www.googletagmanager.com/gtag/js?id=G-B6P9KW8X46" strategy="afterInteractive" />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-B6P9KW8X46');
                    `}
                </Script>

                {recaptchaSiteKey && (
                    <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
                )}

                {children}

                <ReCaptchaLoader />
            </body>
        </html>
    );
}
