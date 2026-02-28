import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AvailabilityFloatingBadge from "@/components/ui/AvailabilityFloatingBadge";
// Removed dynamic imports
import Script from "next/script";
import SchemaGenerator from "@/components/seo/SchemaGenerator";

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
    title: "Hassan Sarfraz | Frontend Developer & AI Enthusiast",
    description:
        "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies. Specializing in React, Next.js, and responsive web design.",
    keywords: [
        "Frontend Developer & AI Enthusiast",
        "React Developer",
        "Next.js",
        "Web Development",
        "Hassan Sarfraz",
        "Portfolio",
    ],
    authors: [{ name: "Hassan Sarfraz" }],
    openGraph: {
        title: "Hassan Sarfraz | Frontend Developer & AI Enthusiast",
        description:
            "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies.",
        type: "website",
        locale: "en_US",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const measurementId = process.env.NEXT_PUBLIC_GA_ID; // Or keep it undefined
    const siteFavicon = "/logo.svg";

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

                <div className="scanlines" />

                {/* Header */}
                <Header />

                {/* Main content */}
                <main>{children}</main>

                {/* Footer */}
                <Footer />

                {/* Floating Availability Badge */}
                <AvailabilityFloatingBadge />

                {/* AEO: Global Schema */}
                <SchemaGenerator
                    type="Organization"
                    data={{
                        name: "Hassan Sarfraz",
                        url: "https://hassanport.com",
                        logo: siteFavicon
                    }}
                />
            </body>
        </html>
    );
}
