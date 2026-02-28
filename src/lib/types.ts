export interface PersonalInfo {
    id: number;
    fullName: string;
    title: string;
    bio: string;
    email: string;
    phone: string | null;
    location: string | null;
    currentFocus: string | null;
    availabilityStatus: string | null;
    updatedAt: Date | null;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    fieldOfStudy: string | null;
    startDate: string | Date;
    endDate: string | Date | null;
    description: string | null;
    sortOrder: number | null;
    isVisible: boolean | null;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    shortDescription: string | null;
    longDescription: string | null;
    techStack: string[] | null;
    liveUrl: string | null;
    githubUrl: string | null;
    imageUrl: string | null;
    featured: boolean | null;
    category: string;
    sortOrder: number | null;
    isVisible: boolean | null;
    createdAt: Date | null;
    metaTitle: string | null;
    metaDescription: string | null;
    keywords: string | null;
    gallery: string[] | null;
    collaborators: { name: string; url?: string }[] | null;
}

export interface Experience {
    id: number;
    company: string;
    position: string;
    location: string | null;
    startDate: string | Date;
    endDate: string | Date | null;
    responsibilities: string;
    sortOrder: number | null;
    isVisible: boolean | null;
}

export interface Skill {
    id: number;
    name: string;
    category: "Frontend" | "Backend" | "Tools" | "DevOps" | "Design";
    logoSvgOrUrl: string | null;
    proficiencyLevel: number | null;
    isFeatured: boolean | null;
    sortOrder: number | null;
    isVisible: boolean | null;
}

export interface Service {
    id: number;
    serviceType: "web_development" | "seo";
    title: string;
    description: string;
    features: string[];
    priceText: string;
    isRecommended: boolean | null;
    techFocus: string[] | null;
    isVisible: boolean | null;
    createdAt: Date | null;
    metaTitle: string | null;
    metaDescription: string | null;
    keywords: string | null;
}

export interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    ipAddress: string | null;
    submittedAt: Date | null;
}

export interface SiteSetting {
    settingKey: string;
    settingValue: string;
}

export interface SectionContent {
    sectionKey: string;
    title: string | null;
    subtitle: string | null;
    description: string | null;
    badgeText: string | null;
    badgeColor: string | null;
    updatedAt: Date | null;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    publishedAt: Date | null;
    isVisible: boolean | null;
    author: string | null;
    tags: string[] | null;
    readTime: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    keywords: string | null;
    gallery: string[] | null;
}

export interface NavigationItem {
    id: number;
    label: string;
    path: string;
    location: "header" | "footer" | "both";
    sortOrder: number | null;
    isVisible: boolean | null;
    parentId: number | null;
}

// Dummy types for Create inputs since they are not used dynamically anymore
export type NewEducation = Partial<Education>;
export type NewExperience = Partial<Experience>;
export type NewSkill = Partial<Skill>;
export type NewBlogPost = Partial<BlogPost>;
export type NewProject = Partial<Project>;
export type NewService = Partial<Service>;
export type NewNavigationItem = Partial<NavigationItem>;
