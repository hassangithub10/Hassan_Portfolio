-- ============================================
-- Hassan Sarfraz Portfolio Database Schema
-- Database: hassanport_db
-- MySQL 8.0+ compatible
-- ============================================

CREATE DATABASE IF NOT EXISTS hassanport_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE hassanport_db;

-- ============================================
-- 1. Personal Information (Hero + Intro)
-- ============================================
CREATE TABLE personal_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL DEFAULT 'Hassan Sarfraz',
    title VARCHAR(100) NOT NULL DEFAULT 'Frontend Developer',
    bio TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 2. Education Background
-- ============================================
CREATE TABLE education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution VARCHAR(150) NOT NULL,
    degree VARCHAR(150) NOT NULL,
    field_of_study VARCHAR(150),
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    sort_order INT DEFAULT 0
);

-- ============================================
-- 3. Projects Showcase
-- ============================================
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    short_description VARCHAR(255),
    long_description TEXT,
    tech_stack JSON,
    live_url VARCHAR(255),
    github_url VARCHAR(255),
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. Professional Experience
-- ============================================
CREATE TABLE experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    responsibilities TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- ============================================
-- 5. Skills
-- ============================================
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category ENUM('Frontend', 'Backend', 'Tools', 'DevOps', 'Design') NOT NULL,
    logo_svg_or_url VARCHAR(255),
    proficiency_level TINYINT CHECK (proficiency_level BETWEEN 1 AND 5),
    is_featured BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- ============================================
-- 6. Services (Pricing)
-- ============================================
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_type ENUM('web_development', 'seo') NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    features JSON NOT NULL,
    price_text VARCHAR(100) NOT NULL,
    is_recommended BOOLEAN DEFAULT FALSE,
    tech_focus JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. Contact Form Submissions
-- ============================================
CREATE TABLE contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. Site Settings
-- ============================================
CREATE TABLE site_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT NOT NULL
);
