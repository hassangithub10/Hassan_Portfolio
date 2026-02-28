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
        image?: string | null
    }
): Promise<Metadata> {

    // 1. Check if dynamic data is provided (e.g. from a blog post)
    if (dynamicData?.title) {
        return {
            title: `${dynamicData.title} | Hassan Sarfraz`,
            description: dynamicData.description || fallbackDesc,
            keywords: dynamicData.keywords ? dynamicData.keywords.split(',').map(k => k.trim()) : [],
            openGraph: {
                title: dynamicData.title,
                description: dynamicData.description || fallbackDesc,
                images: dynamicData.image ? [{ url: dynamicData.image }] : [],
            }
        };
    }

    // 2. Fallback
    return {
        title: `${fallbackTitle} | Hassan Sarfraz`,
        description: fallbackDesc,
    };
}
