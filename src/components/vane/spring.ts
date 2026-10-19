/**
 * Tiny critically-aware spring integrator (no dependencies).
 * Drives imperative values (SVG filter attributes) without React re-renders.
 */
export interface SpringOptions {
    tension: number;
    friction: number;
    mass?: number;
    onUpdate: (value: number) => void;
    onRest?: (value: number) => void;
}

export function createSpring({ tension, friction, mass = 1, onUpdate, onRest }: SpringOptions) {
    let x = 0;
    let v = 0;
    let target = 0;
    let raf = 0;
    let last = 0;

    const step = (now: number) => {
        const dt = Math.min((now - last) / 1000, 1 / 30);
        last = now;
        const sub = 4;
        const h = dt / sub;
        for (let i = 0; i < sub; i++) {
            const a = (-tension * (x - target) - friction * v) / mass;
            v += a * h;
            x += v * h;
        }
        if (Math.abs(v) < 0.002 && Math.abs(x - target) < 0.002) {
            x = target;
            v = 0;
            raf = 0;
            onUpdate(x);
            onRest?.(x);
            return;
        }
        onUpdate(x);
        raf = requestAnimationFrame(step);
    };

    return {
        to(next: number) {
            target = next;
            if (!raf) {
                last = performance.now();
                raf = requestAnimationFrame(step);
            }
        },
        stop() {
            cancelAnimationFrame(raf);
            raf = 0;
        },
    };
}
