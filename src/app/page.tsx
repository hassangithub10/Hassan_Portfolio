import VaneApp from "@/components/vane/VaneApp";
import StructuredData from "@/components/seo/StructuredData";
import { getDynamicSEO } from "@/lib/seo";
import { FAQS, SERVICES, SITE } from "@/lib/site";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
    return getDynamicSEO("/");
}

export default function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${SITE.url}/#website`,
                url: SITE.url,
                name: "Hassan Sarfraz",
                description: "Web designer and developer building business websites that bring in customers.",
                inLanguage: "en-US",
            },
            {
                "@type": "Person",
                "@id": `${SITE.url}/#person`,
                name: SITE.name,
                url: SITE.url,
                jobTitle: "Web Designer & Developer",
                email: `mailto:${SITE.email}`,
                address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
                sameAs: [SITE.github, SITE.linkedin],
                knowsAbout: ["Web design", "Web development", "Next.js", "React", "WordPress", "Technical SEO", "Website performance"],
                alumniOf: { "@type": "CollegeOrUniversity", name: "Government College University Faisalabad" },
            },
            {
                "@type": "ProfessionalService",
                "@id": `${SITE.url}/#service`,
                name: "Hassan Sarfraz Web Design & Development",
                url: SITE.url,
                image: `${SITE.url}/og.png`,
                email: SITE.email,
                founder: { "@id": `${SITE.url}/#person` },
                address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
                areaServed: ["US", "PK", "Worldwide"],
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Web services",
                    itemListElement: SERVICES.map((s) => ({
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: s.title, description: s.text },
                    })),
                },
            },
            {
                "@type": "FAQPage",
                "@id": `${SITE.url}/#faq`,
                mainEntity: FAQS.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
        ],
    };

    return (
        <>
            <StructuredData data={jsonLd} />
            <VaneApp />
        </>
    );
}
