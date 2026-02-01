CREATE TABLE `admins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`cover_image` varchar(255),
	`published_at` timestamp DEFAULT (now()),
	`author` varchar(100) DEFAULT 'Hassan Sarfraz',
	`tags` json,
	`read_time` varchar(50),
	`meta_title` varchar(255),
	`meta_description` text,
	`keywords` text,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`subject` varchar(200) NOT NULL,
	`message` text NOT NULL,
	`ip_address` varchar(45),
	`submitted_at` timestamp DEFAULT (now()),
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` int AUTO_INCREMENT NOT NULL,
	`institution` varchar(150) NOT NULL,
	`degree` varchar(150) NOT NULL,
	`field_of_study` varchar(150),
	`start_date` date NOT NULL,
	`end_date` date,
	`description` text,
	`sort_order` int DEFAULT 0,
	CONSTRAINT `education_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experience` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company` varchar(150) NOT NULL,
	`position` varchar(150) NOT NULL,
	`location` varchar(100),
	`start_date` date NOT NULL,
	`end_date` date,
	`responsibilities` text NOT NULL,
	`sort_order` int DEFAULT 0,
	CONSTRAINT `experience_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personal_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(100) NOT NULL DEFAULT 'Hassan Sarfraz',
	`title` varchar(100) NOT NULL DEFAULT 'Frontend Developer',
	`bio` text NOT NULL,
	`email` varchar(150) NOT NULL,
	`phone` varchar(20),
	`location` varchar(100),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `personal_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(150) NOT NULL,
	`slug` varchar(150) NOT NULL,
	`short_description` varchar(255),
	`long_description` text,
	`tech_stack` json,
	`live_url` varchar(255),
	`github_url` varchar(255),
	`image_url` varchar(255),
	`featured` boolean DEFAULT false,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`meta_title` varchar(255),
	`meta_description` text,
	`keywords` text,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `seo_defaults` (
	`route` varchar(100) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`keywords` text,
	`og_image` varchar(255),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_defaults_route` PRIMARY KEY(`route`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_type` enum('web_development','seo') NOT NULL,
	`title` varchar(150) NOT NULL,
	`description` text NOT NULL,
	`features` json NOT NULL,
	`price_text` varchar(100) NOT NULL,
	`is_recommended` boolean DEFAULT false,
	`tech_focus` json,
	`created_at` timestamp DEFAULT (now()),
	`meta_title` varchar(255),
	`meta_description` text,
	`keywords` text,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`setting_key` varchar(50) NOT NULL,
	`setting_value` text NOT NULL,
	CONSTRAINT `site_settings_setting_key` PRIMARY KEY(`setting_key`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`category` enum('Frontend','Backend','Tools','DevOps','Design') NOT NULL,
	`logo_svg_or_url` varchar(255),
	`proficiency_level` tinyint,
	`is_featured` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	CONSTRAINT `skills_id` PRIMARY KEY(`id`)
);
