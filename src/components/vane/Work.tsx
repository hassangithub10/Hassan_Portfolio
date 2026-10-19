import LiquidImage from "./LiquidImage";
import { Eyebrow, Reveal, RevealText } from "./Reveal";
import { WORK_SECTION } from "./content";

export default function Work() {
    const { items } = WORK_SECTION;
    return (
        <section id="work" data-scene="work" className="section">
            <div className="head-row">
                <div>
                    <Eyebrow>{WORK_SECTION.eyebrow}</Eyebrow>
                    <RevealText as="h2" text={WORK_SECTION.heading} className="h-work" />
                </div>
                <p className="label">{String(items.length).padStart(2, "0")} / Projects</p>
            </div>

            <ul className="work-grid">
                {items.map((w, i) => (
                    <Reveal as="li" key={w.name} y={60} duration={620} delay={i % 2 === 1 ? 120 : 0} className="work-li">
                        <article className="work-card">
                            <LiquidImage
                                src={w.image}
                                alt={`${w.name} website screenshot`}
                                ratio="16 / 9"
                                maxScale={28}
                                sizes="(min-width: 768px) 45vw, 100vw"
                                position="center top"
                            />
                            <div className="work-row">
                                <div>
                                    <h3 className="work-name">{w.name}</h3>
                                    <p className="work-sum">{w.summary}</p>
                                </div>
                                <div className="work-meta">
                                    <p className="label">{w.stack[0]}</p>
                                    <a className="work-visit" href={w.url} target="_blank" rel="noreferrer noopener">
                                        Visit site ↗
                                    </a>
                                </div>
                            </div>
                            <p className="label work-cat">{w.industry}</p>
                        </article>
                    </Reveal>
                ))}
            </ul>
        </section>
    );
}
