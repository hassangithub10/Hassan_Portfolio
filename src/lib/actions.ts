import {
    personalInfoData,
    educationData,
    experienceData,
    skillsData,
    projectsData,
    servicesData,
    blogPostsData,
    siteSettingsData,
    sectionContentData,
    navigationItemsData
} from "./data";

// Fetch personal info
export async function getPersonalInfo() {
    return personalInfoData;
}

// Fetch education list (all)
export async function getEducation() {
    return educationData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch visible education (Frontend)
export async function getVisibleEducation() {
    return educationData.filter(e => e.isVisible).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch experience list (all)
export async function getExperience() {
    return experienceData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch visible experience (Frontend)
export async function getVisibleExperience() {
    return experienceData.filter(e => e.isVisible).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch all projects
export async function getProjects() {
    return projectsData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch visible projects (Frontend)
export async function getVisibleProjects() {
    return projectsData.filter(p => p.isVisible).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch single project by ID
export async function getProjectById(id: number) {
    return projectsData.find(p => p.id === id) || null;
}

// Fetch featured projects
export async function getFeaturedProjects() {
    return projectsData.filter(p => p.featured && p.isVisible).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch skills
export async function getSkills() {
    return skillsData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch featured skills for ticker
export async function getFeaturedSkills() {
    return skillsData.filter(s => s.isFeatured && s.isVisible).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch visible skills (all)
export async function getVisibleSkills() {
    return skillsData.filter(s => s.isVisible).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch single skill by ID
export async function getSkillById(id: number) {
    return skillsData.find(s => s.id === id) || null;
}

// Fetch single education by ID
export async function getEducationById(id: number) {
    return educationData.find(e => e.id === id) || null;
}

// Fetch single experience by ID
export async function getExperienceById(id: number) {
    return experienceData.find(e => e.id === id) || null;
}

// Fetch services
export async function getServices() {
    return servicesData.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));
}

// Fetch visible services (Frontend)
export async function getVisibleServices() {
    return servicesData.filter(s => s.isVisible).sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));
}

// Fetch single service by ID
export async function getServiceById(id: number) {
    return servicesData.find(s => s.id === id) || null;
}

// Submit contact form (Mock)
export async function submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    ipAddress?: string;
}) {
    console.log("Contact form submitted:", formData);
    return { success: true, message: "Message sent successfully!" };
}

// Fetch all site settings
export async function getSiteSettings() {
    return siteSettingsData;
}

// Fetch all section content
export async function getAllSectionContent() {
    return sectionContentData;
}

// Fetch all navigation items
export async function getVisibleNavigationItems(location?: "header" | "footer" | "both") {
    let items = navigationItemsData.filter(n => n.isVisible);
    if (location) {
        items = items.filter(n => n.location === location || n.location === 'both');
    }
    return items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// Fetch Recent Activity Feed (Mock)
export async function getRecentActivity() {
    return [];
}

// Fetch blog posts
export async function getBlogPosts() {
    return blogPostsData.sort((a, b) => {
        const dateA = a.publishedAt || new Date(0);
        const dateB = b.publishedAt || new Date(0);
        return dateB.getTime() - dateA.getTime();
    });
}

// Fetch visible blog posts (Frontend)
export async function getVisibleBlogPosts() {
    return blogPostsData.filter(bp => bp.isVisible).sort((a, b) => {
        const dateA = a.publishedAt || new Date(0);
        const dateB = b.publishedAt || new Date(0);
        return dateB.getTime() - dateA.getTime();
    });
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string) {
    return blogPostsData.find(bp => bp.slug === slug) || null;
}

// Fetch single blog post by ID
export async function getBlogPostById(id: number) {
    return blogPostsData.find(bp => bp.id === id) || null;
}

// Fetch all SEO defaults
export async function getSeoDefaults() {
    return [];
}
