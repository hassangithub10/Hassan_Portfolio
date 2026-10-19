import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Hassan Sarfraz - Web Designer & Developer",
        short_name: "Hassan Sarfraz",
        description: "Fast, good-looking business websites that bring in customers.",
        start_url: "/",
        display: "standalone",
        background_color: "#070A10",
        theme_color: "#070A10",

        icons: [
            {
                src: "/logo.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
