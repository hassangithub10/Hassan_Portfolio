import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://hassansarfraz.online";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: [
                    "Googlebot",
                    "Bingbot",
                    "Applebot",
                    "DuckDuckBot",
                    "Slurp",
                    "Yandex",
                ],
                allow: "/",
            },
            {
                // Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO) Crawlers
                userAgent: [
                    "Google-Extended",
                    "GPTBot",
                    "ChatGPT-User",
                    "ClaudeBot",
                    "Claude-Web",
                    "PerplexityBot",
                    "anthropic-ai",
                    "Bytespider",
                    "cohere-ai",
                ],
                allow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}


