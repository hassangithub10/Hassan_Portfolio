import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Hassan Sarfraz - Frontend Developer & AI Enthusiast",
        short_name: "Hassan Sarfraz",
        description: "Portfolio of Hassan Sarfraz - Frontend Developer and AI Enthusiast specializing in React, Next.js, and high-performance digital experiences.",
        start_url: "/",
        display: "standalone",
        background_color: "#030712",
        theme_color: "#0ea5e9",
        icons: [
            {
                src: "/logo.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
