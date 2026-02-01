import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dynamic Theme Variables
                primary: {
                    DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
                    50: "rgb(var(--color-primary-50) / <alpha-value>)",
                    100: "rgb(var(--color-primary-100) / <alpha-value>)",
                    200: "rgb(var(--color-primary-200) / <alpha-value>)",
                    300: "rgb(var(--color-primary-300) / <alpha-value>)",
                    400: "rgb(var(--color-primary-400) / <alpha-value>)",
                    500: "rgb(var(--color-primary-500) / <alpha-value>)", // Base
                    600: "rgb(var(--color-primary-600) / <alpha-value>)",
                    700: "rgb(var(--color-primary-700) / <alpha-value>)",
                    800: "rgb(var(--color-primary-800) / <alpha-value>)",
                    900: "rgb(var(--color-primary-900) / <alpha-value>)",
                },
                dark: {
                    DEFAULT: "rgb(var(--color-bg-primary) / <alpha-value>)",
                    surface: "rgb(var(--color-bg-surface) / <alpha-value>)",
                    lighter: "rgb(var(--color-bg-lighter) / <alpha-value>)",
                    deep: "rgb(var(--color-bg-deep) / <alpha-value>)",
                },
                // Mappings
                charcoal: {
                    DEFAULT: "rgb(var(--color-bg-primary) / <alpha-value>)",
                    dark: "#ffffff",
                },
                lime: {
                    DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
                    300: "rgb(var(--color-primary-300) / <alpha-value>)",
                },
                teal: {
                    DEFAULT: "#64748b",
                    accent: "rgb(var(--color-accent) / <alpha-value>)",
                }
            },
            fontFamily: {
                heading: ["var(--font-chakra-petch)", "sans-serif"],
                body: ["var(--font-mulish)", "sans-serif"],
            },
            animation: {
                "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glitch": "glitch 1s linear infinite",
                "border-flow": "border-flow 4s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                glitch: {
                    "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
                    "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
                    "62%": { transform: "translate(0,0) skew(5deg)" },
                },
                "border-flow": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "100% 50%" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" }
                }
            },
            backgroundImage: {
                "gradient-crimson": "linear-gradient(135deg, rgb(var(--color-bg-primary)) 0%, rgb(var(--color-primary-800)) 100%)",
                "gradient-elite": "linear-gradient(180deg, rgba(var(--color-primary), 0.1) 0%, rgba(var(--color-bg-primary), 0) 100%)",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            boxShadow: {
                "neon-crimson": "0 0 10px rgb(var(--color-primary)), 0 0 20px rgba(var(--color-primary), 0.5)",
                "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            },
        },
    },
    plugins: [],
};

export default config;
