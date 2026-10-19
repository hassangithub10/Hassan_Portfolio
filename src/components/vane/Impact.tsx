import { Eyebrow, Reveal, RevealText } from "./Reveal";
import { IMPACT } from "./content";

export default function Impact() {
    return (
        <section id="impact" data-scene="proof" className="section">
            <Eyebrow>{IMPACT.eyebrow}</Eyebrow>
            <RevealText as="h2" text={IMPACT.heading} className="h-plain" />
            <dl className="stats">
                {IMPACT.stats.map((s, i) => (
                    <Reveal key={s.label} y={32} duration={560} delay={i * 110} className="stat">
                        <dd className="stat-fig">{s.value}</dd>
                        <dt className="stat-label">{s.label}</dt>
                    </Reveal>
                ))}
            </dl>
        </section>
    );
}
