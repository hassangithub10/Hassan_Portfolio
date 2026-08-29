import type { Metadata } from "next";
import Script from "next/script";
import { Chakra_Petch, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AvailabilityFloatingBadge from "@/components/ui/AvailabilityFloatingBadge";
import CinematicBackground from "@/components/ui/CinematicBackground";

const chakraPetch = Chakra_Petch({
    variable: "--font-chakra-petch",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const mulish = Mulish({
    variable: "--font-mulish",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://hassansarfraz.online"),
    title: "Hassan Sarfraz | Frontend Developer & AI Specialist",
    description:
        "Portfolio of Hassan Sarfraz, a passionate Frontend Developer and AI Enthusiast crafting high-performance, cinematic web experiences with React, Next.js, and modern technologies.",
    keywords: [
        "Frontend Developer",
        "AI Specialist",
        "React Developer",
        "Next.js Developer",
        "TypeScript",
        "Web Development",
        "Hassan Sarfraz",
        "Portfolio",
        "UI/UX Engineering",
        "Software Engineer",
    ],
    authors: [{ name: "Hassan Sarfraz", url: "https://hassansarfraz.online" }],
    creator: "Hassan Sarfraz",
    publisher: "Hassan Sarfraz",
    alternates: {
        canonical: "https://hassansarfraz.online",
    },
    icons: {
        icon: "/logo.svg",
        apple: "/logo.svg",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Hassan Sarfraz | Frontend Developer & AI Specialist",
        description:
            "Portfolio of Hassan Sarfraz, a passionate Frontend Developer and AI Enthusiast crafting high-performance, cinematic web experiences with React, Next.js, and modern technologies.",
        type: "website",
        locale: "en_US",
        url: "https://hassansarfraz.online",
        siteName: "Hassan Sarfraz Portfolio",
        images: [
            {
                url: "https://hassansarfraz.online/logo.svg",
                width: 1200,
                height: 630,
                alt: "Hassan Sarfraz - Frontend Developer & AI Specialist",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hassan Sarfraz | Frontend Developer & AI Specialist",
        description:
            "Portfolio of Hassan Sarfraz, a passionate Frontend Developer and AI Enthusiast crafting high-performance, cinematic web experiences with React, Next.js, and modern technologies.",
        creator: "@hassansarfraz",
        images: ["https://hassansarfraz.online/logo.svg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${chakraPetch.variable} ${mulish.variable} antialiased`}
            >
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-B6P9KW8X46"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-B6P9KW8X46');
                    `}
                </Script>

                {/* Google reCAPTCHA v3 */}
                {recaptchaSiteKey && (
                    <Script
                        src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
                        strategy="afterInteractive"
                    />
                )}


                <CinematicBackground />

                {/* Header */}

                <Header />

                {/* Main content */}
                <main id="main-content">{children}</main>

                {/* Footer */}
                <Footer />

                {/* Floating Availability Badge */}
                <AvailabilityFloatingBadge />
            </body>
        </html>
    );
}

