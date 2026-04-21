"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/types";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Experience() {
    // Static Content
    const experience = [
        {
            id: 1,
            company: "Digital Konnector Systems (DKS)",
            position: "Frontend Developer",
            location: "Lahore",
            startDate: "Nov 2023",
            endDate: "Present",
            responsibilities: "As a versatile Full-Stack Web Developer, I specialize in architecting and deploying scalable digital platforms across a diverse range of industries, including e-commerce, healthcare, NGOs, automotive, and corporate enterprise. Leveraging modern frameworks such as Next.js, React, and Node.js, alongside extensive expertise in WordPress, I engineer robust, custom-tailored web solutions. My experience ranges from developing dynamic, data-rich e-commerce dashboards to executing seamless architectural migrations from legacy systems to modern, high-performance environments.\nBeyond core development, I bring a rigorous focus to technical performance and search visibility. I provide comprehensive site maintenance and optimization services, consistently achieving PageSpeed Insights scores of 90+ to guarantee lightning-fast, highly responsive user experiences. By implementing meticulous On-Page SEO and forward-looking Answer Engine Optimization (AEO) strategies, I ensure that digital assets not only operate flawlessly but also rank competitively and meet the evolving technical demands of modern search algorithms.\nTo maximize efficiency and deliver cutting-edge solutions, I actively integrate AI-driven development tools and streamlined workflows into my engineering process. Whether collaborating on clean, minimalist UI/UX designs or accelerating project timelines with advanced coding assistants, I am committed to writing clean, maintainable code. My ultimate objective is to build reliable, high-performing web applications that drive measurable business growth and provide exceptional, user-centric digital experiences.\nAs a strategic Frontend Developer and AI Enthusiast, I operate at the intersection of modern web engineering and generative technology. I have conducted extensive research into the evolving landscape of Coding and agentic development tools, integrating them into my workflow to accelerate the transition from conceptual design to production-ready code. By maintaining a deep technical curiosity, I stay at the forefront of the industry, consistently exploring the capabilities of emerging Chinese LLMs alongside established industry leaders.\nMy development philosophy centers on leveraging the most sophisticated tools available to deliver superior digital products. I have found that while various models offer unique strengths, the reasoning capabilities of Gemini 3.1 Pro and Claude 4.5 Models provide an unparalleled 'out-of-the-box' experience for complex architectural planning and creative problem-solving. This fusion of AI-assisted efficiency with traditional full-stack expertise allows me to bridge the gap between aesthetic design and high-performance engineering. My goal is to create web applications that not only meet but exceed user expectations, driving business growth and delivering exceptional digital experiences.",
        },
        {
            id: 2,
            position: "Freelancer",
            location: "(Part Time)",
            startDate: "2025",
            endDate: "Present",
            responsibilities: "As a versatile Full-Stack Web Developer, I specialize in architecting and deploying scalable digital platforms across a diverse range of industries, including e-commerce, healthcare, NGOs, automotive, and corporate enterprise. Leveraging modern frameworks such as Next.js, React, and Node.js, alongside extensive expertise in WordPress, I engineer robust, custom-tailored web solutions. My experience ranges from developing dynamic, data-rich e-commerce dashboards to executing seamless architectural migrations from legacy WordPress systems to modern, high-performance React environments.\nBeyond core development, I bring a rigorous focus to technical performance and search visibility. I provide comprehensive site maintenance and optimization services, consistently achieving PageSpeed Insights scores of 90+ to guarantee lightning-fast, highly responsive user experiences. By implementing meticulous On-Page SEO and forward-looking Answer Engine Optimization (AEO) strategies, I ensure that digital assets not only operate flawlessly but also rank competitively and meet the evolving technical demands of modern search algorithms.\nTo maximize efficiency and deliver cutting-edge solutions, I actively integrate AI-driven development tools and streamlined workflows into my engineering process. Whether collaborating on clean, minimalist UI/UX designs or accelerating project timelines with advanced coding assistants, I am committed to writing clean, maintainable code. My ultimate objective is to build reliable, high-performing web applications that drive measurable business growth and provide exceptional, user-centric digital experiences.",
        },
        {
            id: 3,
            company: "Pseudosquare",
            position: "Internship",
            location: "Lahore",
            startDate: "Jan 2023",
            endDate: "Apr 2024",
            responsibilities: "Build a clean, user-friendly web application that allows individuals or teams to track what tasks they are currently working on. The app should make it easy to see, at a glance, which task is active, who is working on it, and for how long.\nThis lightweight, responsive task tracker—built with plain HTML, CSS, and vanilla JS gives you a real time dashboard to see exactly who is working on what. With simple one-click controls, you can start, stop, or switch tasks effortlessly; the app automatically logs your previous task when a new one begins so only one is active at a time. A live timer tracks your ongoing progress, and everything is instantly saved to your browser's local storage, meaning your active tasks and completed history remain perfectly intact even if you refresh or close the page.\nThis project was a great opportunity to demonstrate my ability to create a functional, user-friendly web application from scratch using core web technologies. It also showcased my skills in designing intuitive interfaces and implementing efficient task management features without relying on external libraries or frameworks.",
        }
    ];

    // Static Content
    const title = "Professional";
    const subtitle = "Journey";
    const badgeText = "Experience";
    const badgeColor = "#ff6b35";

    return (
        <section id="experience" className="section relative overflow-hidden" aria-labelledby="experience-heading">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/5 to-transparent rounded-full blur-[120px]" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 mx-auto"
                >
                    <span className="badge-premium mb-3 mt-6">
                        <BriefcaseIcon className="w-6 h-6 text-primary-400" />
                        {badgeText}
                    </span>
                    <h2 id="experience-heading" className="heading-lg text-gray-900">
                        {title} <span className="text-gradient-primary">{subtitle}</span>
                    </h2>
                </motion.div>

                {/* Experience Cards */}
                <div className="max-w-6xl mx-auto space-y-12 md:space-y-16 px-4 sm:px-0">
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative group lg:px-6"
                        >
                            {/* Left Border Accent */}
                            <div className="absolute left-0 lg:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full" />

                            {/* Card */}
                            <article className="relative p-8 md:p-12 ml-6 bg-white/40 backdrop-blur-xl rounded-3xl border border-primary-500/5 overflow-hidden shadow-2xl shadow-primary-500/5">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                        <div className="max-w-xl">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-2 font-heading tracking-tight">
                                                {item.position}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {item.company && (
                                                    <p className="text-primary-400 font-bold text-lg md:text-xl lg:text-2xl font-heading">
                                                        {item.company}
                                                    </p>
                                                )}
                                                {item.location && (
                                                    <span className="text-gray-900/30 text-xs md:text-sm uppercase tracking-widest font-bold flex items-center gap-1.5">
                                                        <MapPinIcon className="w-3.5 h-3.5" />
                                                        {item.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary-500/5 border border-primary-500/10 text-sm md:text-base font-mono font-bold text-gray-900/60 whitespace-nowrap">
                                            <CalendarIcon className="w-6 h-6 text-primary-500" />
                                            <span>
                                                {item.startDate} - {item.endDate}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Responsibilities */}
                                    <div className="grid grid-cols-1 gap-4">
                                        {item.responsibilities.split("\n").map((line, i) => (
                                            <motion.p
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.05 }}
                                                className="flex items-start gap-4 text-gray-600 text-base md:text-lg leading-relaxed"
                                            >
                                                <span className="text-primary-500 mt-2 flex-shrink-0 text-xl leading-none">●</span>
                                                <span className="flex-1 text-[14px] leading-normal">
                                                    {line}
                                                </span>
                                            </motion.p>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}