import type { Metadata } from "next";
import Link from "next/link";
import { Chakra_Petch, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AvailabilityFloatingBadge from "@/components/ui/AvailabilityFloatingBadge";
// Removed dynamic imports
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://hassanport.com"),
    title: "Hassan Sarfraz | Frontend Developer & AI Enthusiast",
    description:
        "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies. Specializing in React, Next.js, and responsive web design.",
    keywords: [
        "Frontend Developer",
        "AI Enthusiast",
        "React Developer",
        "Next.js Developer",
        "TypeScript",
        "Web Development",
        "Hassan Sarfraz",
        "Portfolio",
        "UI/UX",
        "Software Engineer"
    ],
    authors: [{ name: "Hassan Sarfraz", url: "https://hassanport.com" }],
    creator: "Hassan Sarfraz",
    publisher: "Hassan Sarfraz",
    alternates: {
        canonical: "/",
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
        title: "Hassan Sarfraz | Frontend Developer & AI Enthusiast",
        description:
            "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies.",
        type: "website",
        locale: "en_US",
        url: "https://hassanport.com",
        siteName: "Hassan Sarfraz Portfolio",
        images: [
            {
                url: "/logo.svg", // Replace with a high-res OG image if you have one
                width: 1200,
                height: 630,
                alt: "Hassan Sarfraz Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hassan Sarfraz | Frontend Developer & AI Enthusiast",
        description:
            "Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies.",
        creator: "@hassansarfraz",
        images: ["/logo.svg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const siteFavicon = "/logo.svg";

    return (
        <html lang="en" className="scroll-smooth">
            <head>
                {/* Google tag (gtag.js) */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-B6P9KW8X46"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B6P9KW8X46');
`
                    }}
                />
                {siteFavicon && <link rel="icon" href={siteFavicon} />}
            </head>
            <body
                className={`${chakraPetch.variable} ${mulish.variable} antialiased`}
            >

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
                        name: "Hassan Sarfraz Portfolio",
                        url: "https://hassanport.com",
                        logo: "https://hassanport.com/logo.svg"
                    }}
                />
            </body>
        </html>
    );
}
