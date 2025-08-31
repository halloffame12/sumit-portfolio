import React from 'react';
import type { SkillCategory, Experience, Project, BlogPost, Achievement, Testimonial } from '../types';
// FIX: Replaced non-existent 'Tool' icon with 'Wrench' from lucide-react.
import { Code, Database, Cpu, Wrench, PenTool, Award, Star, BookOpen, Briefcase } from 'lucide-react';

// FIX: Updated skillData to conform to SkillCategory and Skill types.
// Added 'id' to categories and 'id', 'category_id', and 'icon_name' to skills, replacing the invalid 'icon' property.
export const skillData: SkillCategory[] = [
  {
    id: 'cat-1',
    name: 'Frontend',
    skills: [
      { id: 'skill-1', name: 'React & Next.js', level: 95, icon_name: 'Code', category_id: 'cat-1' },
      { id: 'skill-2', name: 'TypeScript', level: 90, icon_name: 'Code', category_id: 'cat-1' },
      { id: 'skill-3', name: 'Tailwind CSS', level: 98, icon_name: 'PenTool', category_id: 'cat-1' },
      { id: 'skill-4', name: 'Framer Motion', level: 85, icon_name: 'Star', category_id: 'cat-1' },
    ],
  },
  {
    id: 'cat-2',
    name: 'Backend',
    skills: [
      { id: 'skill-5', name: 'Node.js & Express', level: 90, icon_name: 'Database', category_id: 'cat-2' },
      { id: 'skill-6', name: 'Python (Django/FastAPI)', level: 80, icon_name: 'Database', category_id: 'cat-2' },
      { id: 'skill-7', name: 'PostgreSQL & MongoDB', level: 88, icon_name: 'Database', category_id: 'cat-2' },
    ],
  },
  {
    id: 'cat-3',
    name: 'AI/ML',
    skills: [
      { id: 'skill-8', name: 'Gemini API', level: 92, icon_name: 'Cpu', category_id: 'cat-3' },
      { id: 'skill-9', name: 'LangChain', level: 80, icon_name: 'Cpu', category_id: 'cat-3' },
      { id: 'skill-10', name: 'Vector Databases', level: 75, icon_name: 'Cpu', category_id: 'cat-3' },
    ],
  },
  {
    id: 'cat-4',
    name: 'Tools',
    skills: [
      { id: 'skill-11', name: 'Docker & K8s', level: 85, icon_name: 'Wrench', category_id: 'cat-4' },
      { id: 'skill-12', name: 'Git & GitHub', level: 95, icon_name: 'Wrench', category_id: 'cat-4' },
      { id: 'skill-13', name: 'Figma', level: 90, icon_name: 'PenTool', category_id: 'cat-4' },
    ],
  },
];

// FIX: Added 'id' and 'type' to conform to the Experience type.
export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    type: 'Work',
    role: 'Senior Frontend Engineer',
    company: 'Tech Innovators Inc.',
    period: '2021 - Present',
    description: 'Leading the development of a complex, data-driven web application using React, TypeScript, and Gemini API. Responsible for architecture, UI/UX design implementation, and mentoring junior developers.'
  },
  {
    id: 'exp-2',
    type: 'Work',
    role: 'Full-Stack Developer',
    company: 'Creative Solutions LLC',
    period: '2018 - 2021',
    description: 'Developed and maintained various client websites and applications using the MERN stack. Gained extensive experience in both frontend and backend development, including API design and database management.'
  },
  {
    id: 'exp-3',
    type: 'Work',
    role: 'Web Developer Intern',
    company: 'Digital Startups Co.',
    period: '2017 - 2018',
    description: 'Assisted the development team in building responsive websites using HTML, CSS, and JavaScript. Learned the fundamentals of web development and agile methodologies.'
  }
];

// FIX: Added 'id' and 'type' to conform to the Experience type.
export const educationData: Experience[] = [
  {
    id: 'edu-1',
    type: 'Education',
    role: 'M.S. in Computer Science',
    company: 'Stanford University',
    period: '2016 - 2018',
    description: 'Specialized in Human-Computer Interaction and Artificial Intelligence. Graduated with honors.'
  },
  {
    id: 'edu-2',
    type: 'Education',
    role: 'B.S. in Software Engineering',
    company: 'University of California, Berkeley',
    period: '2012 - 2016',
    description: 'Completed a comprehensive curriculum covering data structures, algorithms, and software design principles.'
  }
];


export const projectData: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Content Generator',
    category: 'Web App',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    techStack: ['Next.js', 'Gemini API', 'Tailwind CSS', 'Vercel'],
    description: 'A SaaS platform that leverages the Gemini API to generate high-quality marketing copy, blog posts, and social media content.',
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: '2',
    title: 'Interactive Data Dashboard',
    category: 'Data Visualization',
    imageUrl: 'https://picsum.photos/seed/project2/600/800',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    description: 'A real-time analytics dashboard for businesses to visualize their key metrics with interactive charts and graphs.',
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    category: 'Web App',
    imageUrl: 'https://picsum.photos/seed/project3/800/600',
    techStack: ['React', 'Redux', 'Express', 'MongoDB', 'Stripe API'],
    description: 'A full-featured e-commerce website with product management, shopping cart, and secure payment processing.',
    demoLink: '#',
  },
  {
    id: '4',
    title: 'Mobile Fitness Tracker',
    category: 'Mobile App',
    imageUrl: 'https://picsum.photos/seed/project4/600/600',
    techStack: ['React Native', 'Firebase', 'Framer Motion'],
    description: 'A cross-platform mobile app to track workouts, set goals, and visualize progress with a focus on a fluid and engaging user experience.',
    githubLink: '#',
  },
];

// FIX: Added 'id' to conform to the BlogPost type.
export const blogData: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'mastering-gemini-api',
    title: 'Mastering the Gemini API for Modern Web Apps',
    excerpt: 'A deep dive into using Google\'s Gemini API to build intelligent, next-generation applications. We cover setup, best practices...',
    imageUrl: 'https://picsum.photos/seed/blog1/800/450',
    readingTime: 12,
    content: `
## Introduction
Google's Gemini API represents a significant leap forward in large language models, offering developers unprecedented power to build sophisticated AI-driven features. This post will guide you through the essentials of integrating the Gemini API into your web applications, focusing on practical examples and best practices.

## Setting Up Your Environment
Before you can make your first API call, you need to set up your project. This involves obtaining an API key from the Google AI Studio and installing the necessary SDK. For a JavaScript project, you'll use the \`@google/genai\` package.

\`\`\`javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
\`\`\`

## Core Concepts: Models and Prompts
The power of Gemini lies in its models. For most text-based tasks, you'll use models like 'gemini-2.5-flash'. The key to getting great results is crafting effective prompts. A prompt is more than just a question; it's a set of instructions that guides the model's response. Be clear, concise, and provide context.

## Generating Content
The most common use case is generating text. The \`generateContent\` method is your primary tool. You can send a simple string or a more complex object with multiple parts.

\`\`\`javascript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Write a short story about a robot who discovers music.',
});

console.log(response.text);
\`\`\`

## Conclusion
The Gemini API is a versatile and powerful tool that can elevate your applications. By understanding the core concepts of models, prompts, and the available methods, you can unlock a new world of possibilities. Experiment, iterate, and see what amazing things you can build.
`
  },
  {
    id: 'blog-2',
    slug: 'asymmetric-design-layouts',
    title: 'Why Asymmetric Layouts are the Future of Web Design',
    excerpt: 'Breaking away from the grid. A look into how asymmetric and unconventional layouts can create more dynamic and engaging user experiences.',
    imageUrl: 'https://picsum.photos/seed/blog2/800/450',
    readingTime: 7,
    content: `
## The Problem with Perfect Symmetry
For years, web design has been dominated by grid-based, symmetrical layouts. They're balanced, predictable, and safe. However, they can also be monotonous and fail to guide the user's eye effectively. Asymmetry, when used correctly, introduces visual tension and dynamism that can make a design more memorable and engaging.

## Principles of Asymmetric Balance
Asymmetry doesn't mean a lack of balance. Instead of mirroring elements, it involves balancing objects of different visual weights. A large, vibrant image on one side can be balanced by a smaller block of heavy text and some negative space on the other. This creates a more complex and interesting visual hierarchy.

## Creating Visual Flow
Asymmetric layouts are excellent for storytelling and guiding users through a page. By strategically placing elements, you can create a natural flow that directs attention to key calls-to-action or important pieces of information. This is much harder to achieve in a rigid, symmetrical grid.

## Practical Examples
Consider a hero section with a large product image on the right, taking up 60% of the width. On the left, a bold headline, a short paragraph of text, and a call-to-action button can balance it out. The negative space around the text elements is crucial for achieving this balance. This approach immediately draws the eye to the product and then guides it to the value proposition and action.
`
  },
  {
    id: 'blog-3',
    slug: 'tailwind-framer-motion',
    title: 'Creating Stunning Animations with Tailwind and Framer Motion',
    excerpt: 'Learn how to combine the power of Tailwind CSS utility classes with the flexibility of Framer Motion to build complex animations with ease.',
    imageUrl: 'https://picsum.photos/seed/blog3/800/450',
    readingTime: 9,
    content: `
## The Perfect Combination
Tailwind CSS provides an incredibly fast way to style your components without writing custom CSS. Framer Motion is a production-ready animation library for React that makes creating complex animations declarative and simple. When you combine them, you get the best of both worlds: rapid styling and powerful, easy-to-implement animations.

## Getting Started
First, ensure you have both libraries installed in your React project.
\`\`\`bash
npm install tailwindcss framer-motion
\`\`\`
The key is to apply Tailwind classes directly to \`motion\` components. Framer Motion's components, like \`<motion.div>\`, accept all standard HTML attributes, including \`className\`.

## Example: An Animated Card
Let's create a card that fades in and scales up when it enters the viewport.

\`\`\`jsx
import { motion } from "framer-motion";

const Card = () => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-bold">Animated Card</h3>
    <p>This card is animated with Framer Motion and styled with Tailwind CSS.</p>
  </motion.div>
);
\`\`\`

## Hover and Tap Gestures
Framer Motion makes it trivial to add animations for user interactions. You can use the \`whileHover\` and \`whileTap\` props to define animations that run on hover or click.

\`\`\`jsx
<motion.button
  className="px-4 py-2 bg-blue-500 text-white rounded"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
\`\`\`
This combination allows you to build beautiful, interactive, and highly performant user interfaces with minimal effort.
`
  }
];

export const achievementData: Achievement[] = [
  {
    title: 'Testathon Winner',
    issuer: 'Browserstack Testathon',
    type: 'Competition',
    imageUrl: 'https://picsum.photos/seed/achieve1/400/300'
  },
  {
    title: 'Webby Award Honoree',
    issuer: 'The Webby Awards',
    type: 'Award',
    imageUrl: 'https://picsum.photos/seed/achieve2/400/300'
  },
  {
    title: 'Hackathon Winner',
    issuer: 'AI for Good Hackathon',
    type: 'Competition',
    imageUrl: 'https://picsum.photos/seed/achieve3/400/300'
  },
  {
    title: 'Full-Stack Nanodegree',
    issuer: 'Intellus',
    type: 'Course',
    imageUrl: 'https://picsum.photos/seed/achieve4/400/300'
  }
];

export const testimonialData: Testimonial[] = [
  {
    name: 'Jane Doe',
    role: 'CEO, Tech Innovators Inc.',
    quote: 'An exceptional engineer with a keen eye for design and user experience. Consistently delivers high-quality work that exceeds expectations.',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100'
  },
  {
    name: 'John Smith',
    role: 'Lead Designer, Creative Solutions',
    quote: 'One of the best developers I\'ve had the pleasure of working with. Translates complex designs into pixel-perfect, performant code effortlessly.',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100'
  },
  {
    name: 'Emily White',
    role: 'Product Manager',
    quote: 'A true team player who is not only technically brilliant but also an excellent communicator. A huge asset to any project.',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100'
  }
];