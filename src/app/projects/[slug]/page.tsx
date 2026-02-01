import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/sections/ProjectDetail";
import { getDynamicSEO } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const project = await db.query.projects.findFirst({
        where: eq(projects.slug, params.slug),
    });

    if (!project) return { title: "Project Not Found" };

    return await getDynamicSEO(
        `/projects/${params.slug}`,
        project.title,
        project.shortDescription || "",
        {
            title: project.title,
            description: project.shortDescription,
            image: project.imageUrl
        }
    );
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = await db.query.projects.findFirst({
        where: eq(projects.slug, params.slug),
    });

    if (!project || !project.isVisible) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}
