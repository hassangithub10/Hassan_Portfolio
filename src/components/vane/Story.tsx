import { Eyebrow, Reveal, RevealText } from "./Reveal";
import { STORY } from "./content";

export default function Story() {
    return (
        <section id="story" data-scene="promise" className="section">
            <div className="grid12">
                <div className="col-6">
                    <Eyebrow>{STORY.eyebrow}</Eyebrow>
                    <RevealText as="h2" text={STORY.heading} className="h-story" />
                    <Reveal as="p" y={16} duration={520} className="lead story-body">
                        {STORY.body}
                    </Reveal>
                </div>
                <div className="col-6 story-list-wrap">
                    <ul className="principles">
                        {STORY.principles.map((p, i) => (
                            <Reveal as="li" key={p.title} y={32} duration={560} delay={i * 90} className="principle">
                                <span className="principle-n">{String(i + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3 className="principle-t">{p.title}</h3>
                                    <p className="principle-p">{p.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
