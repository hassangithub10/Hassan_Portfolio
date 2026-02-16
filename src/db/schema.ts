// Clean Schema
import {
    mysqlTable,
    int,
    varchar,
    text,
    timestamp,
    date,
    boolean,
    json,
    tinyint,
    mysqlEnum,
    mediumtext,
} from "drizzle-orm/mysql-core";

export const personalInfo = mysqlTable("personal_info", {
    id: int("id").primaryKey().autoincrement(),
    fullName: varchar("full_name", { length: 100 }).notNull().default("Hassan Sarfraz"),
    title: varchar("title", { length: 100 }).notNull().default("Frontend Developer & AI Enthusiast"),
    bio: text("bio").notNull(),
    email: varchar("email", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    location: varchar("location", { length: 100 }),
    currentFocus: text("current_focus"), // New field for Hero section
    availabilityStatus: varchar("availability_status", { length: 20 }).default("available"),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const education = mysqlTable("education", {
    id: int("id").primaryKey().autoincrement(),
    institution: varchar("institution", { length: 150 }).notNull(),
    degree: varchar("degree", { length: 150 }).notNull(),
    fieldOfStudy: varchar("field_of_study", { length: 150 }),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    description: text("description"),
    sortOrder: int("sort_order").default(0),
    isVisible: boolean("is_visible").default(true),
});

export const projects = mysqlTable("projects", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 191 }).unique().notNull(),
    shortDescription: varchar("short_description", { length: 255 }),
    longDescription: text("long_description"),
    techStack: json("tech_stack").$type<string[]>(),
    liveUrl: varchar("live_url", { length: 255 }),
    githubUrl: varchar("github_url", { length: 255 }),
    imageUrl: varchar("image_url", { length: 255 }),
    featured: boolean("featured").default(false),
    category: varchar("category", { length: 100 }).notNull().default("Web Development"),
    sortOrder: int("sort_order").default(0),
    isVisible: boolean("is_visible").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    keywords: text("keywords"),
    gallery: json("gallery").$type<string[]>(),
    collaborators: json("collaborators").$type<{ name: string; url?: string }[]>(),
});

export const experience = mysqlTable("experience", {
    id: int("id").primaryKey().autoincrement(),
    company: varchar("company", { length: 150 }).notNull(),
    position: varchar("position", { length: 150 }).notNull(),
    location: varchar("location", { length: 100 }),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    responsibilities: text("responsibilities").notNull(),
    sortOrder: int("sort_order").default(0),
    isVisible: boolean("is_visible").default(true),
});

export const skills = mysqlTable("skills", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    category: mysqlEnum("category", ["Frontend", "Backend", "Tools", "DevOps", "Design"]).notNull(),
    logoSvgOrUrl: mediumtext("logo_svg_or_url"),
    proficiencyLevel: tinyint("proficiency_level"),
    isFeatured: boolean("is_featured").default(true),
    sortOrder: int("sort_order").default(0),
    isVisible: boolean("is_visible").default(true),
});

export const services = mysqlTable("services", {
    id: int("id").primaryKey().autoincrement(),
    serviceType: mysqlEnum("service_type", ["web_development", "seo"]).notNull(),
    title: varchar("title", { length: 150 }).notNull(),
    description: text("description").notNull(),
    features: json("features").$type<string[]>().notNull(),
    priceText: varchar("price_text", { length: 100 }).notNull(),
    isRecommended: boolean("is_recommended").default(false),
    techFocus: json("tech_focus").$type<string[] | null>(),
    isVisible: boolean("is_visible").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    keywords: text("keywords"),
});

export const contactSubmissions = mysqlTable("contact_submissions", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 150 }).notNull(),
    subject: varchar("subject", { length: 200 }).notNull(),
    message: text("message").notNull(),
    ipAddress: varchar("ip_address", { length: 45 }),
    submittedAt: timestamp("submitted_at").defaultNow(),
});

export const siteSettings = mysqlTable("site_settings", {
    settingKey: varchar("setting_key", { length: 50 }).primaryKey(),
    settingValue: mediumtext("setting_value").notNull(),
});

export const sectionContent = mysqlTable("section_content", {
    sectionKey: varchar("section_key", { length: 50 }).primaryKey(),
    title: varchar("title", { length: 255 }),
    subtitle: varchar("subtitle", { length: 255 }),
    description: text("description"),
    badgeText: varchar("badge_text", { length: 100 }),
    badgeColor: varchar("badge_color", { length: 20 }),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const blogPosts = mysqlTable("blog_posts", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 191 }).unique().notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImage: varchar("cover_image", { length: 255 }),
    publishedAt: timestamp("published_at").defaultNow(),
    isVisible: boolean("is_visible").default(true),
    author: varchar("author", { length: 100 }).default("Hassan Sarfraz"),
    tags: json("tags").$type<string[]>(),
    readTime: varchar("read_time", { length: 50 }),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    keywords: text("keywords"),
    gallery: json("gallery").$type<string[]>(),
});

export const admins = mysqlTable("admins", {
    id: int("id").primaryKey().autoincrement(),
    username: varchar("username", { length: 50 }).unique().notNull(),
    email: varchar("email", { length: 150 }).unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    permissions: json("permissions").$type<string[]>(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const seoDefaults = mysqlTable("seo_defaults", {
    route: varchar("route", { length: 100 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    keywords: text("keywords"),
    ogImage: varchar("og_image", { length: 255 }),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const navigationItems = mysqlTable("navigation_items", {
    id: int("id").primaryKey().autoincrement(),
    label: varchar("label", { length: 100 }).notNull(),
    path: varchar("path", { length: 255 }).notNull(),
    location: mysqlEnum("location", ["header", "footer", "both"]).notNull().default("header"),
    sortOrder: int("sort_order").default(0),
    isVisible: boolean("is_visible").default(true),
    parentId: int("parent_id"), // Nullable for flat structure, allow nesting if needed
});

// Type exports
export type PersonalInfo = typeof personalInfo.$inferSelect;
export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
export type Experience = typeof experience.$inferSelect;
export type NewExperience = typeof experience.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type NavigationItem = typeof navigationItems.$inferSelect;
export type NewNavigationItem = typeof navigationItems.$inferInsert;
