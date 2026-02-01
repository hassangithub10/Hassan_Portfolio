
import { Person, WithContext, BlogPosting, Organization } from "schema-dts";

interface SchemaGeneratorProps {
    type: "Person" | "BlogPosting" | "Organization";
    data: any;
}

export default function SchemaGenerator({ type, data }: SchemaGeneratorProps) {
    if (type === "Person") {
        const personSchema: WithContext<Person> = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: data.name || "Hassan Sarfraz",
            url: data.url || "https://hassanport.com",
            sameAs: data.socialLinks || [],
            jobTitle: data.jobTitle || "Full Stack Developer",
            worksFor: {
                "@type": "Organization",
                name: data.company || "Freelance",
            },
        };
        return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />;
    }

    if (type === "BlogPosting") {
        const blogSchema: WithContext<BlogPosting> = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: data.title,
            description: data.description,
            image: data.image ? [data.image] : [],
            datePublished: data.publishedAt,
            author: {
                "@type": "Person",
                name: "Hassan Sarfraz", // Could be dynamic
            },
        };
        return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />;
    }

    // Default or Organization
    const orgSchema: WithContext<Organization> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: data.name || "Hassan",
        url: data.url || "https://hassanport.com",
        logo: data.logo,
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />;
}
