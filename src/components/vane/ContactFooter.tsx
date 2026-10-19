import { Eyebrow, Reveal, RevealText } from "./Reveal";
import { BRAND, CONTACT } from "./content";

export default function ContactFooter() {
    return (
        <footer id="contact" data-scene="contact" className="contact">
            <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
            <RevealText as="h2" text={CONTACT.heading} className="h-contact" />
            <Reveal as="p" y={16} duration={520} className="lead contact-body">
                {CONTACT.body}
            </Reveal>
            <a className="mail" href={`mailto:${CONTACT.email}`}>
                <span className="mail-t">{CONTACT.email}</span>
                <span className="mail-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="foot">
                <div className="foot-sig">
                    <p className="foot-name">{BRAND.full}</p>
                    <p className="label foot-tag">{CONTACT.tagline}</p>
                </div>
                <nav aria-label="Social" className="foot-social">
                    <ul>
                        {CONTACT.socials.map((s) => (
                            <li key={s.label}>
                                <a href={s.href} target="_blank" rel="noreferrer noopener">
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className="label foot-copy">© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</p>
            </div>
        </footer>
    );
}
