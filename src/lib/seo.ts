import { Metadata } from "next";
import db from "@/db";
import { seoDefaults } from "@/db/schema";
import { eq } from "drizzle-orm";

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

    // 2. Fetch from seo_defaults table for this route
    try {
        const result = await db
            .select()
            .from(seoDefaults)
            .where(eq(seoDefaults.route, route))
            .limit(1);

        if (result && result.length > 0) {
            const seo = result[0];
            return {
                title: seo.title,
                description: seo.description || fallbackDesc,
                keywords: seo.keywords ? seo.keywords.split(',').map(k => k.trim()) : [],
                openGraph: {
                    title: seo.title,
                    description: seo.description || fallbackDesc,
                    images: seo.ogImage ? [{ url: seo.ogImage }] : [],
                }
            };
        }
    } catch (e) {
        console.error("Failed to fetch SEO defaults:", e);
    }

    // 3. Fallback
    return {
        title: `${fallbackTitle} | Hassan Sarfraz`,
        description: fallbackDesc,
    };
}
