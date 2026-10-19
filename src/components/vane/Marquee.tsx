import { MARQUEE_WORDS } from "./content";

export default function Marquee() {
    const track = (hidden: boolean) =>
        MARQUEE_WORDS.map((w) => (
            <span key={`${hidden}-${w}`} className="mq-item" aria-hidden={hidden || undefined}>
                <span className="mq-word">{w}</span>
                <span className="mq-dot" />
            </span>
        ));
    return (
        <section className="marquee" aria-label="Operating principles">
            <div className="mq-track">
                {track(false)}
                {track(true)}
            </div>
        </section>
    );
}
