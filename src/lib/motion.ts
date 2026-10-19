/** Shared real-time motion state, written by SmoothScroll and read by the WebGL scene and marquee. */
export const motionState = {
    velocity: 0, // smoothed scroll velocity in px/s (signed)
    scrollY: 0,
    mouseX: 0, // -1..1
    mouseY: 0, // -1..1
};

export const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
