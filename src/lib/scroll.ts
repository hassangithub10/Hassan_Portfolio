import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
    instance = l;
};

export function scrollToTarget(target: string | HTMLElement | number) {
    if (instance) {
        instance.scrollTo(target, {
            duration: 1.7,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
        return;
    }
    if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
    else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: "smooth" });
    }
}

export function prefillProject(type: string) {
    window.dispatchEvent(new CustomEvent("prefill-project", { detail: type }));
    scrollToTarget("#contact");
}

export const getLenis = () => instance;
