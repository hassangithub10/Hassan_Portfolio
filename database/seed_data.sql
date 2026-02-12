-- ============================================
-- Seed Data for Hassan Sarfraz Portfolio
-- ============================================

USE hassanport_db;

-- ============================================
-- Personal Information
-- ============================================
INSERT INTO personal_info (full_name, title, bio, email, phone, location) VALUES
('Hassan Sarfraz', 'Frontend Developer', 
'Passionate Frontend Developer crafting exceptional digital experiences with modern web technologies. I specialize in building responsive, performant, and visually stunning web applications that leave lasting impressions.',
'hassan@example.com', '+92 300 1234567', 'Lahore, Pakistan');

-- ============================================
-- Education
-- ============================================
INSERT INTO education (institution, degree, field_of_study, start_date, end_date, description, sort_order) VALUES
('University of Engineering & Technology', 'Bachelor of Science', 'Computer Science', '2018-09-01', '2022-06-30', 'Graduated with honors. Focused on web development and software engineering principles.', 1),
('Punjab College', 'Intermediate', 'Pre-Engineering', '2016-09-01', '2018-06-30', 'Completed FSc with distinction in Mathematics and Physics.', 2);

-- ============================================
-- Projects
-- ============================================
INSERT INTO projects (title, slug, short_description, long_description, tech_stack, live_url, github_url, image_url, featured, sort_order) VALUES
('E-Commerce Platform', 'ecommerce-platform', 'Modern shopping experience with real-time updates', 'A full-featured e-commerce platform with cart management, payment integration, and admin dashboard.', '["Next.js", "React", "Tailwind CSS", "Stripe", "PostgreSQL"]', 'https://example.com', 'https://github.com/hassan', '/images/projects/ecommerce.webp', TRUE, 1),
('Portfolio Dashboard', 'portfolio-dashboard', 'Analytics and content management system', 'A comprehensive dashboard for managing portfolio content with real-time analytics.', '["React", "TypeScript", "Chart.js", "Node.js"]', 'https://example.com', 'https://github.com/hassan', '/images/projects/dashboard.webp', TRUE, 2),
('Task Management App', 'task-management', 'Collaborative project management tool', 'A Kanban-style task management application with team collaboration features.', '["Vue.js", "Vuex", "Firebase", "Tailwind CSS"]', 'https://example.com', 'https://github.com/hassan', '/images/projects/tasks.webp', TRUE, 3),
('Weather Application', 'weather-app', 'Real-time weather forecasting', 'A beautiful weather app with location-based forecasts and animated backgrounds.', '["React", "OpenWeather API", "Framer Motion"]', 'https://example.com', 'https://github.com/hassan', '/images/projects/weather.webp', FALSE, 4);

-- ============================================
-- Experience
-- ============================================
INSERT INTO experience (company, position, location, start_date, end_date, responsibilities, sort_order) VALUES
('TechVision Labs', 'Frontend Developer & UI Designer', 'Remote', '2023-01-01', NULL, 'Leading frontend architecture decisions, mentoring junior developers, implementing design systems, and optimizing web performance.', 1),
('Digital Innovations', 'Frontend Developer', 'Lahore, Pakistan', '2021-06-01', '2022-12-31', 'Developed responsive web applications using React and Next.js, collaborated with designers to implement pixel-perfect UI components.', 2),
('StartupHub', 'Junior Developer', 'Lahore, Pakistan', '2020-01-01', '2021-05-31', 'Built landing pages and marketing websites, learned modern JavaScript frameworks, participated in code reviews.', 3);

-- ============================================
-- Skills
-- ============================================
INSERT INTO skills (name, category, logo_svg_or_url, proficiency_level, is_featured, sort_order) VALUES
('React', 'Frontend', '/icons/react.svg', 5, TRUE, 1),
('Next.js', 'Frontend', '/icons/nextjs.svg', 5, TRUE, 2),
('TypeScript', 'Frontend', '/icons/typescript.svg', 4, TRUE, 3),
('Tailwind CSS', 'Frontend', '/icons/tailwind.svg', 5, TRUE, 4),
('Framer Motion', 'Frontend', '/icons/framer.svg', 4, TRUE, 5),
('Node.js', 'Backend', '/icons/nodejs.svg', 4, TRUE, 6),
('MySQL', 'Backend', '/icons/mysql.svg', 4, TRUE, 7),
('Git', 'Tools', '/icons/git.svg', 5, TRUE, 8),
('Figma', 'Design', '/icons/figma.svg', 4, TRUE, 9),
('Docker', 'DevOps', '/icons/docker.svg', 3, TRUE, 10);

-- ============================================
-- Services
-- ============================================
INSERT INTO services (service_type, title, description, features, price_text, is_recommended, tech_focus) VALUES
('web_development', 'WordPress Development', 'Custom WordPress themes and plugins tailored to your business needs.', '["Custom Theme Development", "Plugin Customization", "WooCommerce Integration", "SEO Optimization", "Responsive Design"]', 'Starting at $499', FALSE, '["WordPress", "PHP", "MySQL"]'),
('web_development', 'React.js Development', 'Modern single-page applications with seamless user experiences.', '["Component-Based Architecture", "State Management", "API Integration", "Performance Optimization", "Testing"]', 'Starting at $799', FALSE, '["React.js", "Redux", "REST API"]'),
('web_development', 'Next.js Dynamic Solutions', 'Full-stack applications with server-side rendering and optimal performance.', '["Server-Side Rendering", "API Routes", "Database Integration", "Authentication", "SEO Optimized", "Real-time Features"]', 'Starting at $1,299', TRUE, '["Next.js", "TypeScript", "PostgreSQL"]'),
('seo', 'Comprehensive SEO Optimization', 'Boost your online visibility with data-driven SEO strategies.', '["Technical SEO Audit", "Core Web Vitals Optimization", "Keyword Research", "On-Page SEO", "Link Building Strategy", "Monthly Reports"]', 'Starting at $299/month', TRUE, NULL);

-- ============================================
-- Site Settings
-- ============================================
INSERT INTO site_settings (setting_key, setting_value) VALUES
('theme_default', 'dark'),
('cursor_effect_enabled', 'true'),
('analytics_enabled', 'true');
