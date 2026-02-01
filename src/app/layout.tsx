import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AvailabilityFloatingBadge from "@/components/ui/AvailabilityFloatingBadge";
import DynamicTheme from "@/components/providers/DynamicTheme";
import { getVisibleNavigationItems, getSiteSettings } from "@/lib/actions";
import Script from "next/script";

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
    title: "Hassan Sarfraz | Frontend Developer",
    description:
        "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies. Specializing in React, Next.js, and responsive web design.",
    keywords: [
        "Frontend Developer",
        "React Developer",
        "Next.js",
        "Web Development",
        "Hassan Sarfraz",
        "Portfolio",
    ],
    authors: [{ name: "Hassan Sarfraz" }],
    openGraph: {
        title: "Hassan Sarfraz | Frontend Developer",
        description:
            "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies.",
        type: "website",
        locale: "en_US",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [headerNavItems, footerNavItems, settings] = await Promise.all([
        getVisibleNavigationItems('header'),
        getVisibleNavigationItems('footer'),
        getSiteSettings(),
    ]);

    const measurementId = settings.find(s => s.settingKey === "google_ga4_measurement_id")?.settingValue;
    const siteFavicon = settings.find(s => s.settingKey === "site_favicon")?.settingValue;

    return (
        <html lang="en" className="scroll-smooth">
            <head>
                {siteFavicon && <link rel="icon" href={siteFavicon} />}
            </head>
            <body
                className={`${chakraPetch.variable} ${mulish.variable} antialiased`}
            >
                {/* Google Analytics */}
                {measurementId && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${measurementId}', {
                                    page_path: window.location.pathname,
                                });
                            `}
                        </Script>
                    </>
                )}

                {/* Dynamic Theme Injection */}
                <DynamicTheme />

                {/* Scanlines overlay */}
                <div className="scanlines" />

                {/* Header */}
                <Header navItems={headerNavItems} settings={settings} />

                {/* Main content */}
                <main>{children}</main>

                {/* Footer */}
                <Footer navItems={footerNavItems} settings={settings} />

                {/* Floating Availability Badge */}
                <AvailabilityFloatingBadge settings={settings} />
            </body>
        </html>
    );
}
