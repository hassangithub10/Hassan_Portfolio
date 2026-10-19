import type { Config } from "tailwindcss";

// Your zip had no tailwind config. If you already have one, merge only the `colors` block.
const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#1e1e24",
                night: "#26262d",
                slate2: "#2f2f38",
                bone: "#fff8f0",
                mist: "#b9b0a8",
                tungsten: "#92140c",
                ember: "#e4513d",
                lagoon: "#e4513d",
            },
            fontFamily: {
                display: ["var(--font-display)", "system-ui", "sans-serif"],
                body: ["var(--font-body)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
