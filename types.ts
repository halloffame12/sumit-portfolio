import React from 'react';

export interface Skill {
  id: string;
  name: string;
  level: number; // Percentage 0-100
  icon_name: string; // Storing the Lucide icon name as a string
  category_id: string;
  skill_categories?: { name: string }; // For Supabase joins
}

export interface SkillCategory {
  id: string;
  name: string;
  skills?: Skill[]; // Skills can be attached after client-side processing
}

export interface Experience {
  id: string;
  type: 'Work' | 'Education';
  role: string;
  company: string;
  period: string;
  description: string;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  techStack: string[];
  description: string;
  demoLink?: string;
  githubLink?: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  readingTime: number; // in minutes
  content: string;
  created_at?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  type: 'Course' | 'Award' | 'Competition';
  imageUrl: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}