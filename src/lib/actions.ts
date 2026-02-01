"use server";

import bcrypt from "bcryptjs";

import { revalidatePath } from "next/cache";
import db from "@/db";
import {
    personalInfo,
    education,
    experience,
    projects,
    skills,
    services,
    contactSubmissions,
    blogPosts,
    seoDefaults,
    admins,
    siteSettings,
    sectionContent, // Import sectionContent
    navigationItems, // Import navigationItems
    type NewBlogPost,
    type NewProject,
    type NewService,
    type NewEducation,
    type NewExperience,
    type NewSkill,
    type NewNavigationItem, // Import NewNavigationItem type
} from "@/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";

// Fetch personal info
export async function getPersonalInfo() {
    try {
        const result = await db.select().from(personalInfo).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching personal info:", error);
        return null;
    }
}

// Update personal info
export async function updatePersonalInfo(data: any) {
    try {
        await db.update(personalInfo).set(data).where(eq(personalInfo.id, 1));
        revalidatePath("/");
        return { success: true, message: "Personal info updated!" };
    } catch (error) {
        console.error("Error updating personal info:", error);
        return { success: false, message: "Failed to update info." };
    }
}

// Fetch education list (Admin version - all)
export async function getEducation() {
    try {
        const result = await db
            .select()
            .from(education)
            .orderBy(asc(education.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching education:", error);
        return [];
    }
}

// Fetch visible education (Frontend)
export async function getVisibleEducation() {
    try {
        const result = await db
            .select()
            .from(education)
            .where(eq(education.isVisible, true))
            .orderBy(asc(education.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching visible education:", error);
        return [];
    }
}

// Fetch experience list (Admin version - all)
export async function getExperience() {
    try {
        const result = await db
            .select()
            .from(experience)
            .orderBy(asc(experience.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching experience:", error);
        return [];
    }
}

// Fetch visible experience (Frontend)
export async function getVisibleExperience() {
    try {
        const result = await db
            .select()
            .from(experience)
            .where(eq(experience.isVisible, true))
            .orderBy(asc(experience.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching visible experience:", error);
        return [];
    }
}

// Fetch all projects (Admin)
export async function getProjects() {
    try {
        const result = await db
            .select()
            .from(projects)
            .orderBy(asc(projects.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

// Fetch visible projects (Frontend)
export async function getVisibleProjects() {
    try {
        const result = await db
            .select()
            .from(projects)
            .where(eq(projects.isVisible, true))
            .orderBy(asc(projects.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching visible projects:", error);
        return [];
    }
}

// Fetch single project by ID
export async function getProjectById(id: number) {
    try {
        const result = await db
            .select()
            .from(projects)
            .where(eq(projects.id, id))
            .limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
}

// Fetch featured projects
export async function getFeaturedProjects() {
    try {
        const result = await db
            .select()
            .from(projects)
            .where(sql`${projects.featured} = true AND ${projects.isVisible} = true`)
            .orderBy(asc(projects.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching featured projects:", error);
        return [];
    }
}

// Fetch skills
export async function getSkills() {
    try {
        const result = await db
            .select()
            .from(skills)
            .orderBy(asc(skills.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching skills:", error);
        return [];
    }
}

// Fetch featured skills for ticker
export async function getFeaturedSkills() {
    try {
        const result = await db
            .select()
            .from(skills)
            .where(sql`${skills.isFeatured} = true AND ${skills.isVisible} = true`)
            .orderBy(asc(skills.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching featured skills:", error);
        return [];
    }
}

// Fetch visible skills (all)
export async function getVisibleSkills() {
    try {
        const result = await db
            .select()
            .from(skills)
            .where(eq(skills.isVisible, true))
            .orderBy(asc(skills.sortOrder));
        return result;
    } catch (error) {
        console.error("Error fetching visible skills:", error);
        return [];
    }
}


// Fetch single skill by ID
export async function getSkillById(id: number) {
    try {
        const result = await db.select().from(skills).where(eq(skills.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching skill:", error);
        return null;
    }
}

// Fetch single education by ID
export async function getEducationById(id: number) {
    try {
        const result = await db.select().from(education).where(eq(education.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching education:", error);
        return null;
    }
}

// Fetch single experience by ID
export async function getExperienceById(id: number) {
    try {
        const result = await db.select().from(experience).where(eq(experience.id, id)).limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching experience:", error);
        return null;
    }
}

// Fetch services (Admin version)
export async function getServices() {
    try {
        const result = await db
            .select()
            .from(services)
            .orderBy(desc(services.isRecommended));
        return result;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
}

// Fetch visible services (Frontend)
export async function getVisibleServices() {
    try {
        const result = await db
            .select()
            .from(services)
            .where(eq(services.isVisible, true))
            .orderBy(desc(services.isRecommended));
        return result;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
}

// Fetch single service by ID
export async function getServiceById(id: number) {
    try {
        const result = await db
            .select()
            .from(services)
            .where(eq(services.id, id))
            .limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching service:", error);
        return null;
    }
}

// Submit contact form
export async function submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    ipAddress?: string;
}) {
    try {
        await db.insert(contactSubmissions).values({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            ipAddress: formData.ipAddress || null,
        });
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return { success: false, message: "Failed to send message. Please try again." };
    }
}

// Fetch all site settings
export async function getSiteSettings() {
    try {
        const result = await db.select().from(siteSettings);
        return result;
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return [];
    }
}

// Update a site setting
// Update site settings (Batch)
export async function updateSiteSettings(settings: { settingKey: string; settingValue: string }[]) {
    try {
        const promises = settings.map(s =>
            db.insert(siteSettings)
                .values(s)
                .onDuplicateKeyUpdate({ set: { settingValue: s.settingValue } })
        );
        await Promise.all(promises);
        revalidatePath("/");
        return { success: true, message: "Settings updated successfully!" };
    } catch (error) {
        console.error("Error updating site settings:", error);
        return { success: false, message: "Failed to update settings." };
    }
}

// Fetch Recent Activity Feed
export async function getRecentActivity() {
    try {
        const [posts, newProjects, messages] = await Promise.all([
            db.select({
                id: blogPosts.id,
                title: blogPosts.title,
                createdAt: blogPosts.publishedAt,
                type: sql<string>`'blog'`
            }).from(blogPosts).orderBy(desc(blogPosts.publishedAt)).limit(5),

            db.select({
                id: projects.id,
                title: projects.title,
                createdAt: projects.createdAt,
                type: sql<string>`'project'`
            }).from(projects).orderBy(desc(projects.createdAt)).limit(5),

            db.select({
                id: contactSubmissions.id,
                title: contactSubmissions.subject,
                createdAt: contactSubmissions.createdAt,
                type: sql<string>`'message'`
            }).from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(5)
        ]);

        // Combine and sort
        const activity = [...posts, ...newProjects, ...messages]
            .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
            .slice(0, 10); // Top 10 recent events

        return activity;
    } catch (error) {
        console.error("Error fetching recent activity:", error);
        return [];
    }
}

// Fetch blog posts (Admin version)
export async function getBlogPosts() {
    try {
        const result = await db
            .select()
            .from(blogPosts)
            .orderBy(desc(blogPosts.publishedAt));
        return result;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

// Fetch visible blog posts (Frontend)
export async function getVisibleBlogPosts() {
    try {
        const result = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.isVisible, true))
            .orderBy(desc(blogPosts.publishedAt));
        return result;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string) {
    try {
        const result = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.slug, slug))
            .limit(1);
        return result[0] || null;
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return null;
    }
}

// Fetch all SEO defaults
export async function getSeoDefaults() {
    try {
        const result = await db.select().from(seoDefaults);
        return result;
    } catch (error) {
        console.error("Error fetching SEO defaults:", error);
        return [];
    }
}

// Update SEO default for a route
export async function updateSeoDefault(data: {
    route: string;
    title: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}) {
    try {
        await db
            .insert(seoDefaults)
            .values({
                route: data.route,
                title: data.title,
                description: data.description,
                keywords: data.keywords,
                ogImage: data.ogImage,
            })
            .onDuplicateKeyUpdate({
                set: {
                    title: data.title,
                    description: data.description,
                    keywords: data.keywords,
                    ogImage: data.ogImage,
                },
            });
        revalidatePath("/");
        revalidatePath(data.route);
        return { success: true, message: "SEO settings updated!" };
    } catch (error) {
        console.error("Error updating SEO defaults:", error);
        return { success: false, message: "Failed to update SEO settings." };
    }
}
// Delete blog post
export async function deleteBlogPost(id: number) {
    try {
        await db.delete(blogPosts).where(eq(blogPosts.id, id));
        revalidatePath("/blog");
        revalidatePath("/");
        return { success: true, message: "Post deleted successfully!" };
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return { success: false, message: "Failed to delete post." };
    }
}

// Add new blog post
export async function addBlogPost(post: NewBlogPost) {
    try {
        await db.insert(blogPosts).values(post);
        revalidatePath("/blog");
        revalidatePath("/");
        return { success: true, message: "Post created successfully!" };
    } catch (error) {
        console.error("Error adding blog post:", error);
        return { success: false, message: "Failed to add post." };
    }
}

// Update existing blog post
export async function updateBlogPost(id: number, post: Partial<NewBlogPost>) {
    try {
        await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
        revalidatePath("/blog");
        revalidatePath("/");
        return { success: true, message: "Post updated successfully!" };
    } catch (error) {
        console.error("Error updating blog post:", error);
        return { success: false, message: "Failed to update post." };
    }
}

// Add new project
export async function addProject(project: NewProject) {
    try {
        await db.insert(projects).values(project);
        revalidatePath("/");
        return { success: true, message: "Project created successfully!" };
    } catch (error) {
        console.error("Error adding project:", error);
        return { success: false, message: "Failed to add project." };
    }
}

// Update project
export async function updateProject(id: number, project: Partial<NewProject>) {
    try {
        await db.update(projects).set(project).where(eq(projects.id, id));
        revalidatePath("/");
        return { success: true, message: "Project updated successfully!" };
    } catch (error) {
        console.error("Error updating project:", error);
        return { success: false, message: "Failed to update project." };
    }
}

// Delete project
export async function deleteProject(id: number) {
    try {
        await db.delete(projects).where(eq(projects.id, id));
        revalidatePath("/");
        return { success: true, message: "Project deleted successfully!" };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, message: "Failed to delete project." };
    }
}

// Add new service
export async function addService(service: NewService) {
    try {
        await db.insert(services).values(service);
        revalidatePath("/");
        return { success: true, message: "Service created successfully!" };
    } catch (error) {
        console.error("Error adding service:", error);
        return { success: false, message: "Failed to add service." };
    }
}

// Update service
export async function updateService(id: number, service: Partial<NewService>) {
    try {
        await db.update(services).set(service).where(eq(services.id, id));
        revalidatePath("/");
        return { success: true, message: "Service updated successfully!" };
    } catch (error) {
        console.error("Error updating service:", error);
        return { success: false, message: "Failed to update service." };
    }
}

// Delete service
export async function deleteService(id: number) {
    try {
        await db.delete(services).where(eq(services.id, id));
        revalidatePath("/");
        return { success: true, message: "Service deleted successfully!" };
    } catch (error) {
        console.error("Error deleting service:", error);
        return { success: false, message: "Failed to delete service." };
    }
}

// Add new education
export async function addEducation(data: NewEducation) {
    try {
        await db.insert(education).values(data);
        revalidatePath("/");
        return { success: true, message: "Education added successfully!" };
    } catch (error) {
        console.error("Error adding education:", error);
        return { success: false, message: "Failed to add education." };
    }
}

// Update education
export async function updateEducation(id: number, data: Partial<NewEducation>) {
    try {
        await db.update(education).set(data).where(eq(education.id, id));
        revalidatePath("/");
        return { success: true, message: "Education updated successfully!" };
    } catch (error) {
        console.error("Error updating education:", error);
        return { success: false, message: "Failed to update education." };
    }
}

// Delete education
export async function deleteEducation(id: number) {
    try {
        await db.delete(education).where(eq(education.id, id));
        revalidatePath("/");
        return { success: true, message: "Education deleted successfully!" };
    } catch (error) {
        console.error("Error deleting education:", error);
        return { success: false, message: "Failed to delete education." };
    }
}

// Add new experience
export async function addExperience(data: NewExperience) {
    try {
        await db.insert(experience).values(data);
        revalidatePath("/");
        return { success: true, message: "Experience added successfully!" };
    } catch (error) {
        console.error("Error adding experience:", error);
        return { success: false, message: "Failed to add experience." };
    }
}

// Update experience
export async function updateExperience(id: number, data: Partial<NewExperience>) {
    try {
        await db.update(experience).set(data).where(eq(experience.id, id));
        revalidatePath("/");
        return { success: true, message: "Experience updated successfully!" };
    } catch (error) {
        console.error("Error updating experience:", error);
        return { success: false, message: "Failed to update experience." };
    }
}

// Delete experience
export async function deleteExperience(id: number) {
    try {
        await db.delete(experience).where(eq(experience.id, id));
        revalidatePath("/");
        return { success: true, message: "Experience deleted successfully!" };
    } catch (error) {
        console.error("Error deleting experience:", error);
        return { success: false, message: "Failed to delete experience." };
    }
}

// Add new skill
export async function addSkill(data: NewSkill) {
    try {
        await db.insert(skills).values(data);
        revalidatePath("/");
        return { success: true, message: "Skill added successfully!" };
    } catch (error) {
        console.error("Error adding skill:", error);
        return { success: false, message: "Failed to add skill." };
    }
}

// Update skill
export async function updateSkill(id: number, data: Partial<NewSkill>) {
    try {
        await db.update(skills).set(data).where(eq(skills.id, id));
        revalidatePath("/");
        return { success: true, message: "Skill updated successfully!" };
    } catch (error) {
        console.error("Error updating skill:", error);
        return { success: false, message: "Failed to update skill." };
    }
}

// Delete skill
export async function deleteSkill(id: number) {
    try {
        await db.delete(skills).where(eq(skills.id, id));
        revalidatePath("/");
        return { success: true, message: "Skill deleted successfully!" };
    } catch (error) {
        console.error("Error deleting skill:", error);
        return { success: false, message: "Failed to delete skill." };
    }
}

// Generic toggle visibility action
export async function toggleItemVisibility(table: string, id: number, currentStatus: boolean) {
    try {
        let tableObj: any;
        switch (table) {
            case 'projects': tableObj = projects; break;
            case 'services': tableObj = services; break;
            case 'education': tableObj = education; break;
            case 'experience': tableObj = experience; break;
            case 'skills': tableObj = skills; break;
            case 'blog_posts': tableObj = blogPosts; break;
            case 'navigation_items': tableObj = navigationItems; break; // Add navigation_items toggling support
            default: throw new Error("Invalid table");
        }

        await db.update(tableObj)
            .set({ isVisible: !currentStatus })
            .where(eq(tableObj.id, id));

        revalidatePath("/");
        if (table === 'blog_posts') revalidatePath("/blog");

        return { success: true, message: `Visibility updated to ${!currentStatus ? 'Visible' : 'Hidden'}` };
    } catch (error) {
        console.error("Error toggling visibility:", error);
        return { success: false, message: "Failed to update visibility." };
    }
}

// Seed default navigation items
export async function seedNavigationItems() {
    try {
        const count = await db.select({ count: sql<number>`count(*)` }).from(navigationItems);
        if (count[0].count > 0) return { success: false, message: "Menu items already exist." };

        const defaults: NewNavigationItem[] = [
            { label: "About", path: "#about", location: "header", sortOrder: 0, isVisible: true },
            { label: "Education", path: "#education", location: "header", sortOrder: 1, isVisible: true },
            { label: "Experience", path: "#experience", location: "header", sortOrder: 2, isVisible: true },
            { label: "Projects", path: "#projects", location: "header", sortOrder: 3, isVisible: true },
            { label: "Services", path: "#services", location: "header", sortOrder: 4, isVisible: true },
            { label: "Blogs", path: "#blogs", location: "header", sortOrder: 5, isVisible: true },
            { label: "Contact", path: "#contact", location: "header", sortOrder: 6, isVisible: true },
        ];

        await db.insert(navigationItems).values(defaults);
        return { success: true, message: "Default menu items added!" };
    } catch (error) {
        console.error("Error seeding navigation:", error);
        return { success: false, message: "Failed to seed menu items." };
    }
}

// Seed default section visibility
export async function seedSectionVisibility() {
    const sections = [
        'hero', 'about', 'education', 'experience', 'projects', 'services', 'blogs', 'contact'
    ];

    try {
        for (const section of sections) {
            const key = `section_${section}_visible`;
            // Check if exists first
            const exists = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
            if (exists.length === 0) {
                await db.insert(siteSettings).values({
                    settingKey: key,
                    settingValue: "true"
                });
            }
        }
        return { success: true };
    } catch (error) {
        console.error("Error Seeding Section Visibility:", error);
        return { success: false };
    }
}
// Seed default Google settings
export async function seedGoogleSettings() {
    const settings = [
        { key: 'google_ga4_property_id', value: '' },
        { key: 'google_gsc_site_url', value: '' },
        { key: 'google_service_account_email', value: '' },
        { key: 'google_service_account_key', value: '' }
    ];

    try {
        for (const s of settings) {
            const exists = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, s.key)).limit(1);
            if (exists.length === 0) {
                await db.insert(siteSettings).values({
                    settingKey: s.key,
                    settingValue: s.value
                });
            }
        }
        return { success: true };
    } catch (error) {
        console.error("Error Seeding Google Settings:", error);
        return { success: false };
    }
}

// Admin Management

// Fetch all admins
export async function getAdmins() {
    try {
        const result = await db.select().from(admins).orderBy(desc(admins.createdAt));
        return result;
    } catch (error) {
        console.error("Error Fetching Admins:", error);
        return [];
    }
}

// Add new admin
export async function addAdmin(data: { username: string; email?: string; password: string; permissions?: string[] }) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await db.insert(admins).values({
            username: data.username,
            email: data.email,
            passwordHash: hashedPassword,
            permissions: data.permissions,
        });
        return { success: true, message: "Admin User Created!" };
    } catch (error) {
        console.error("Error Adding Admin:", error);
        return { success: false, message: "Failed to Add Admin." };
    }
}

// Delete admin
export async function deleteAdmin(id: number) {
    try {
        await db.delete(admins).where(eq(admins.id, id));
        return { success: true, message: "Admin Deleted!" };
    } catch (error) {
        console.error("Error Deleting Admin:", error);
        return { success: false, message: "Failed to Delete Admin." };
    }
}

// Update admin permissions/role
export async function updateAdmin(id: number, data: { permissions: string[] }) {
    try {
        await db.update(admins).set({ permissions: data.permissions }).where(eq(admins.id, id));
        return { success: true, message: "Admin Updated!" };
    } catch (error) {
        console.error("Error Updating Admin:", error);
        return { success: false, message: "Failed to Update Admin." };
    }
}


// --- Navigation Management ---

// Fetch all navigation items (Admin)
export async function getNavigationItems() {
    try {
        const result = await db
            .select()
            .from(navigationItems)
            .orderBy(asc(navigationItems.sortOrder));
        return result;
    } catch (error) {
        console.error("Error Fetching Navigation Items:", error);
        return [];
    }
}

// Fetch Visible Navigation Items (Frontend)
export async function getVisibleNavigationItems(location?: "header" | "footer") {
    try {
        let query = db
            .select()
            .from(navigationItems)
            .where(eq(navigationItems.isVisible, true))
            .orderBy(asc(navigationItems.sortOrder));

        if (location) {
            // Logic: if requesting 'header', fetch where location is 'header' OR 'both'. Same for footer.
            // Using raw SQL for flexibility or simple filter.
            const allItems = await query;
            return allItems.filter(item => item.location === location || item.location === 'both');
        }

        return await query;
    } catch (error) {
        console.error("Error Fetching Visible Navigation Items:", error);
        return [];
    }
}

// Add Navigation Item
export async function addNavigationItem(item: NewNavigationItem) {
    try {
        await db.insert(navigationItems).values(item);
        revalidatePath("/");
        return { success: true, message: "Menu Item Added Successfully!" };
    } catch (error) {
        console.error("Error Adding Navigation Item:", error);
        return { success: false, message: "Failed to Add Menu Item." };
    }
}

// Update Navigation Item
export async function updateNavigationItem(id: number, item: Partial<NewNavigationItem>) {
    try {
        await db.update(navigationItems).set(item).where(eq(navigationItems.id, id));
        revalidatePath("/");
        return { success: true, message: "Menu Item Updated Successfully!" };
    } catch (error) {
        console.error("Error Updating Navigation Item:", error);
        return { success: false, message: "Failed to Update Menu Item." };
    }
}

// Delete navigation item
export async function deleteNavigationItem(id: number) {
    try {
        await db.delete(navigationItems).where(eq(navigationItems.id, id));
        revalidatePath("/");
        return { success: true, message: "Menu Item Deleted Successfully!" };
    } catch (error) {
        console.error("Error Deleting Navigation Item:", error);
        return { success: false, message: "Failed to Delete Menu Item." };
    }
}

// --- Section Content Actions ---

export async function getSectionContent(sectionKey: string) {
    try {
        const result = await db
            .select()
            .from(sectionContent)
            .where(eq(sectionContent.sectionKey, sectionKey))
            .limit(1);
        return result[0] || null;
    } catch (error) {
        console.error(`Error Fetching Content for Section ${sectionKey}:`, error);
        return null;
    }
}

export async function getAllSectionContent() {
    try {
        const result = await db.select().from(sectionContent);
        return result;
    } catch (error) {
        console.error("Error Fetching All Section Content:", error);
        return [];
    }
}

export async function updateSectionContent(sectionKey: string, data: any) {
    try {
        // Check if exists
        const existing = await getSectionContent(sectionKey);

        if (existing) {
            await db
                .update(sectionContent)
                .set({ ...data, updatedAt: new Date() })
                .where(eq(sectionContent.sectionKey, sectionKey));
        } else {
            await db.insert(sectionContent).values({
                sectionKey,
                ...data,
            });
        }

        revalidatePath("/");
        return { success: true, message: "Section Content Updated!" };
    } catch (error) {
        console.error(`Error Updating Content for Section ${sectionKey}:`, error);
        return { success: false, message: "Failed to Update Section Content." };
    }
}

export async function seedSectionContent() {
    try {
        const count = await db.select({ count: sql`count(*)` }).from(sectionContent);
        // @ts-ignore
        if (count[0].count > 0) return { success: true, message: "Already seeded" };

        const defaults = [
            { sectionKey: 'hero', title: "Hi, I'm", badgeText: "Available for Projects", badgeColor: "#00f0ff" },
            { sectionKey: 'about', title: "Passionate About Creating", subtitle: "Digital Excellence", description: "With years of experience in full-stack development...", badgeText: "About Me", badgeColor: "#00f0ff" },
            { sectionKey: 'education', title: "Academic", subtitle: "Journey", badgeText: "Education", badgeColor: "#b026ff" },
            { sectionKey: 'experience', title: "Professional", subtitle: "Journey", badgeText: "Experience", badgeColor: "#ff6b35" },
            { sectionKey: 'projects', title: "Featured", subtitle: "Projects", description: "A showcase of my recent work including commercial projects and open source contributions.", badgeText: "Portfolio", badgeColor: "#b026ff" },
            { sectionKey: 'services', title: "What I", subtitle: "Offer", badgeText: "Services", badgeColor: "#00f0ff" },
            { sectionKey: 'technologies', title: "Technologies", subtitle: "I Work With", description: "Dynamically updated tech stack ensuring modern and performant solutions." },
            { sectionKey: 'blog', title: "From the", subtitle: "Blog", badgeText: "Latest Insights", badgeColor: "#00f0ff" },
            { sectionKey: 'contact', title: "Let's", subtitle: "Connect", description: "Have a project in mind? Let's discuss how we can bring your vision to life.", badgeText: "Contact", badgeColor: "#00f0ff" },
        ];

        for (const item of defaults) {
            await db.insert(sectionContent).values(item);
        }

        return { success: true, message: "Section Content Seeded Successfully" };
    } catch (error) {
        console.error("Error Seeding Section Content:", error);
        return { success: false, message: "Failed to Seed Section Content" };
    }
}


