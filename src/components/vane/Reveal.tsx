import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealTag = "div" | "p" | "li" | "article" | "span";

interface RevealProps {
    as?: RevealTag;
    /** Start offset in px (slides up into place). */
    y?: number;
    /** ms */
    delay?: number;
    /** ms */
    duration?: number;
    className?: string;
    children: ReactNode;
}

/** Fade + slide-up block. Triggered once by the shared IntersectionObserver in VaneApp. */
export function Reveal({ as = "div", y = 40, delay = 0, duration = 560, className, children }: RevealProps) {
    const Tag = as as ElementType;
    const style = { "--ry": `${y}px`, "--rd": `${delay}ms`, "--rdur": `${duration}ms` } as CSSProperties;
    return (
        <Tag data-reveal="" className={className} style={style}>
            {children}
        </Tag>
    );
}

type TextTag = "h1" | "h2" | "h3" | "p";

interface RevealTextProps {
    as?: TextTag;
    text: string;
    className?: string;
    /** ms */
    delay?: number;
}

/**
 * Line-by-line masked reveal. Words are wrapped in clipping spans; VaneApp measures which visual
 * line each word landed on and staggers by line (90ms).
 */
export function RevealText({ as = "h2", text, className, delay = 0 }: RevealTextProps) {
    const Tag = as as ElementType;
    const words = text.split(" ");
    return (
        <Tag data-split="" className={className} style={{ "--rt-delay": `${delay}ms` } as CSSProperties}>
            <span className="v-sr">{text}</span>
            {words.map((w, i) => (
                <span key={i} aria-hidden="true">
                    <span className="rt-w">
                        <span className="rt-i">{w}</span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                </span>
            ))}
        </Tag>
    );
}

export function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {children}
        </p>
    );
}
