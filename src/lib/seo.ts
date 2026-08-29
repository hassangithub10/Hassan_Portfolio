import type { Metadata } from "next";

export const SITE_URL = "https://hassansarfraz.online";
export const SITE_NAME = "Hassan Sarfraz Portfolio";
export const DEFAULT_TITLE = "Hassan Sarfraz | Frontend Developer & AI Specialist";
export const DEFAULT_DESCRIPTION =
    "Portfolio of Hassan Sarfraz, a passionate Frontend Developer and AI Enthusiast crafting high-performance, cinematic web experiences with React, Next.js, and modern technologies.";

export function getDynamicSEO(
    route: string = "/",
    fallbackTitle: string = DEFAULT_TITLE,
    fallbackDesc: string = DEFAULT_DESCRIPTION,
    dynamicData?: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        image?: string | null;
        url?: string | null;
    }
): Metadata {
    const canonicalPath = dynamicData?.url ?? route;
    const canonicalUrl = canonicalPath === "/" ? SITE_URL : `${SITE_URL}${canonicalPath}`;
    const title = dynamicData?.title || fallbackTitle;

    const description = dynamicData?.description || fallbackDesc;
    const ogImage = dynamicData?.image || `${SITE_URL}/logo.svg`;

    const keywords = dynamicData?.keywords
        ? dynamicData.keywords.split(",").map((k) => k.trim())
        : [
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
        ];

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        keywords,
        authors: [{ name: "Hassan Sarfraz", url: SITE_URL }],
        creator: "Hassan Sarfraz",
        publisher: "Hassan Sarfraz",
        alternates: {
            canonical: canonicalUrl,
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
            title,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Hassan Sarfraz - Frontend Developer & AI Specialist",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            creator: "@hassansarfraz",
            images: [ogImage],
        },
    };
}

