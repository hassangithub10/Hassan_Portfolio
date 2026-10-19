"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BUDGETS, PROJECT_TYPES, SITE } from "@/lib/site";
import Magnetic from "./Magnetic";

type Status = "idle" | "sending" | "sent" | "mail" | "error";

export default function Contact() {
    const [type, setType] = useState(PROJECT_TYPES[0]);
    const [budget, setBudget] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    useEffect(() => {
        const onPrefill = (e: Event) => setType((e as CustomEvent<string>).detail);
        window.addEventListener("prefill-project", onPrefill);
        return () => window.removeEventListener("prefill-project", onPrefill);
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const payload = {
            name: String(f.get("name") ?? ""),
            email: String(f.get("email") ?? ""),
            type,
            budget: budget || "Not specified",
            message: String(f.get("message") ?? ""),
        };
        setStatus("sending");
        if (SITE.formEndpoint) {
            try {
                const res = await fetch(SITE.formEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(payload),
                });
                setStatus(res.ok ? "sent" : "error");
            } catch {
                setStatus("error");
            }
            return;
        }
        const subject = `${payload.type} enquiry from ${payload.name}`;
        const body = `${payload.message}\n\n---\nName: ${payload.name}\nEmail: ${payload.email}\nProject: ${payload.type}\nBudget: ${payload.budget}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("mail");
    };

    const wa = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Hassan, I'd like to talk about a website project.")}` : "";

    return (
        <section id="contact" data-scene="contact" className="relative pb-10 pt-[16vh]">
            <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr]">
                <div>
                    <h2 className="font-display text-[clamp(2.6rem,6.6vw,6rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-bone">Tell me about your project.</h2>
                    <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mist">
                        A few lines is enough. I read every message myself and reply {SITE.replyTime}, with honest advice and a fixed quote.
                    </p>

                    <ul className="mt-10 space-y-4 text-bone">
                        <li>
                            <a href={`mailto:${SITE.email}`} className="link-underline font-display text-xl font-semibold md:text-2xl" data-cursor="Email">
                                {SITE.email}
                            </a>
                        </li>
                        {wa && (
                            <li>
                                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !border-lagoon/50 text-lagoon">
                                    Chat on WhatsApp
                                </a>
                            </li>
                        )}
                        <li className="text-mist">{SITE.location}, working with clients worldwide</li>
                    </ul>
                </div>

                <form onSubmit={onSubmit} className="rounded-3xl border border-bone/15 bg-night/80 p-6 backdrop-blur-md md:p-10" noValidate={false}>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <label className="field">
                            <span>Your name</span>
                            <input name="name" required autoComplete="name" />
                        </label>
                        <label className="field">
                            <span>Email</span>
                            <input name="email" type="email" required autoComplete="email" />
                        </label>
                    </div>

                    <fieldset className="mt-8">
                        <legend className="mb-3 text-sm text-mist">What do you need?</legend>
                        <div className="flex flex-wrap gap-2">
                            {PROJECT_TYPES.map((t) => (
                                <label key={t} className="chip">
                                    <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                                    <span>{t}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="mt-8">
                        <legend className="mb-3 text-sm text-mist">Budget (optional)</legend>
                        <div className="flex flex-wrap gap-2">
                            {BUDGETS.map((b) => (
                                <label key={b} className="chip">
                                    <input type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)} className="peer sr-only" />
                                    <span>{b}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <label className="field mt-8">
                        <span>What should the site do for your business?</span>
                        <textarea name="message" required rows={4} />
                    </label>

                    <div className="mt-8 flex flex-wrap items-center gap-5">
                        <Magnetic strength={0.2}>
                            <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
                                {status === "sending" ? "Sending" : "Send project details"}
                            </button>
                        </Magnetic>
                        <p role="status" aria-live="polite" className="text-sm text-mist">
                            {status === "sent" && `Thanks, your message is in. I'll reply ${SITE.replyTime}.`}
                            {status === "mail" && "Your email app should open with the details filled in. Press send there to finish."}
                            {status === "error" && `That didn't send. Please email ${SITE.email} directly.`}
                        </p>
                    </div>
                </form>
            </div>

            <footer className="mx-auto mt-[14vh] flex w-full max-w-[1320px] flex-col items-start justify-between gap-6 border-t border-bone/15 px-6 pt-8 text-sm text-mist md:flex-row md:items-center md:px-10">
                <p>
                    © {new Date().getFullYear()} {SITE.name}. Web design and development, {SITE.location}.
                </p>
                <div className="flex gap-6">
                    <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-bone">
                        LinkedIn
                    </a>
                    <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-bone">
                        GitHub
                    </a>
                    <a href={`mailto:${SITE.email}`} className="link-underline hover:text-bone">
                        Email
                    </a>
                </div>
            </footer>
        </section>
    );
}
