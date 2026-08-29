
import type { Person, WithContext, BlogPosting, Organization } from "schema-dts";

interface PersonData {
    name?: string;
    url?: string;
    socialLinks?: string[];
    jobTitle?: string;
    company?: string;
}

interface BlogPostingData {
    title: string;
    description?: string;
    image?: string;
    publishedAt?: string;
    authorName?: string;
}

interface OrganizationData {
    name?: string;
    url?: string;
    logo?: string;
}

type SchemaGeneratorProps =
    | { type: "Person"; data: PersonData }
    | { type: "BlogPosting"; data: BlogPostingData }
    | { type: "Organization"; data: OrganizationData };

export default function SchemaGenerator(props: SchemaGeneratorProps) {
    if (props.type === "Person") {
        const personSchema: WithContext<Person> = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: props.data.name || "Hassan Sarfraz",
            url: props.data.url || "https://hassansarfraz.online",
            sameAs: props.data.socialLinks || [],
            jobTitle: props.data.jobTitle || "Frontend Developer & AI Enthusiast",
            worksFor: {
                "@type": "Organization",
                name: props.data.company || "Digital Konnector Systems (DKS)",
            },
        };
        return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />;
    }

    if (props.type === "BlogPosting") {
        const blogSchema: WithContext<BlogPosting> = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: props.data.title,
            description: props.data.description,
            image: props.data.image ? [props.data.image] : [],
            datePublished: props.data.publishedAt,
            author: {
                "@type": "Person",
                name: props.data.authorName || "Hassan Sarfraz",
            },
        };
        return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />;
    }

    const orgSchema: WithContext<Organization> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: props.data.name || "Hassan Sarfraz Portfolio",
        url: props.data.url || "https://hassansarfraz.online",
        logo: props.data.logo,
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />;
}

