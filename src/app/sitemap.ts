import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hassansarfraz.online';

    // 1. Static Routes
    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date('2026-04-22T04:47:38.685Z'), // Your specific timestamp
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        // Add more static routes here when needed:
        // {
        //     url: `${baseUrl}/about`,
        //     lastModified: new Date(),
        //     changeFrequency: 'monthly' as const,
        //     priority: 0.8,
        // },
    ];

    return [...staticRoutes];
}