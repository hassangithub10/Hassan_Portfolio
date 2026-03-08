import { Metadata } from "next";

// This function acts as a helper to generate metadata dynamically
// It can be used inside generateMetadata export of pages or directly
export async function getDynamicSEO(
    route: string, // e.g., "/" or "/about"
    fallbackTitle: string,
    fallbackDesc: string,
    dynamicData?: {
        title?: string | null;
        description?: string | null;
        keywords?: string | null;
        image?: string | null;
        url?: string | null;
    }
): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hassanport.com";
    const canonicalUrl = dynamicData?.url ? `${baseUrl}${dynamicData.url}` : baseUrl;

    const baseMetadata: Metadata = {
        title: dynamicData?.title
            ? `${dynamicData.title} | Hassan Sarfraz`
            : `${fallbackTitle} | Hassan Sarfraz`,
        description: dynamicData?.description || fallbackDesc,
        keywords: dynamicData?.keywords
            ? dynamicData.keywords.split(',').map(k => k.trim())
            : [
                "Frontend Developer",
                "React Developer",
                "Next.js Developer",
                "Hassan Sarfraz",
                "Portfolio",
                "Web Development",
                "Software Engineer"
            ],
        authors: [{ name: "Hassan Sarfraz", url: baseUrl }],
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
            title: dynamicData?.title || fallbackTitle,
            description: dynamicData?.description || fallbackDesc,
            url: canonicalUrl,
            siteName: "Hassan Sarfraz Portfolio",
            images: [
                {
                    url: dynamicData?.image || `${baseUrl}/logo.svg`,
                    width: 1200,
                    height: 630,
                    alt: "Hassan Sarfraz Portfolio",
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: dynamicData?.title || fallbackTitle,
            description: dynamicData?.description || fallbackDesc,
            creator: "@hassansarfraz", // Optional, change if applicable
            images: [dynamicData?.image || `${baseUrl}/logo.svg`],
        },
    };

    return baseMetadata;
}
