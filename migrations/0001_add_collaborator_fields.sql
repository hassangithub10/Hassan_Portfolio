CREATE TABLE `navigation_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label` varchar(100) NOT NULL,
	`path` varchar(255) NOT NULL,
	`location` enum('header','footer','both') NOT NULL DEFAULT 'header',
	`sort_order` int DEFAULT 0,
	`is_visible` boolean DEFAULT true,
	`parent_id` int,
	CONSTRAINT `navigation_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `section_content` (
	`section_key` varchar(50) NOT NULL,
	`title` varchar(255),
	`subtitle` varchar(255),
	`description` text,
	`badge_text` varchar(100),
	`badge_color` varchar(20),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `section_content_section_key` PRIMARY KEY(`section_key`)
);
--> statement-breakpoint
ALTER TABLE `blog_posts` MODIFY COLUMN `slug` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `slug` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `admins` ADD `email` varchar(150);--> statement-breakpoint
ALTER TABLE `admins` ADD `permissions` json;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `gallery` json;--> statement-breakpoint
ALTER TABLE `education` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `experience` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `personal_info` ADD `current_focus` text;--> statement-breakpoint
ALTER TABLE `personal_info` ADD `availability_status` varchar(20) DEFAULT 'available';--> statement-breakpoint
ALTER TABLE `projects` ADD `category` enum('Web Development','Apps','Tools') DEFAULT 'Web Development' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `projects` ADD `gallery` json;--> statement-breakpoint
ALTER TABLE `projects` ADD `collaborator_name` varchar(150);--> statement-breakpoint
ALTER TABLE `projects` ADD `collaborator_linkedin` varchar(255);--> statement-breakpoint
ALTER TABLE `services` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `skills` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `admins` ADD CONSTRAINT `admins_email_unique` UNIQUE(`email`);