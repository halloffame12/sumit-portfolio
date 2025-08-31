import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { ExternalLink, LoaderCircle, AlertTriangle, Github } from 'lucide-react';
import type { Project } from '../types';
import { supabase } from '../lib/supabaseClient';

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            setError(null);
            
            if (!supabase) {
                setError("Supabase client is not available. Please check credentials.");
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }
                
                setProjects(data || []);

            } catch (err) {
                 if (err instanceof Error) {
                    setError(`Failed to fetch projects: ${err.message}`);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <LoaderCircle className="w-12 h-12 animate-spin text-accent-light" />
                    <p className="mt-4 text-lg">Loading Projects...</p>
                </div>
            );
        }

        if (error && projects.length === 0) {
             return (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                    <p className="mt-4 text-lg text-red-500">Could not load projects.</p>
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">{error}</p>
                </div>
            );
        }

        if (projects.length === 0) {
            return (
                 <div className="flex flex-col items-center justify-center h-64">
                    <p className="mt-4 text-lg">No projects have been added yet.</p>
                </div>
            )
        }


        return (
             <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="mb-8 break-inside-avoid group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-secondary-light dark:bg-secondary-dark"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="relative">
                            <img src={project.imageUrl} alt={project.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm font-medium text-accent-light dark:text-accent-dark mb-1">{project.category}</p>
                            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                            <p className="text-text-light/80 dark:text-text-dark/80 mb-4 text-sm">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-xs font-semibold px-2 py-1 bg-primary-light dark:bg-primary-dark rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                             <div className="flex items-center gap-4 mt-4">
                                {project.demoLink && (
                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-light dark:text-accent-dark hover:underline">
                                        <ExternalLink size={16} /> View Demo
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-text-light/80 dark:text-text-dark/80 hover:underline">
                                        <Github size={16} /> View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <AnimatedPage>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-4">My Projects</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
                    Here are some of the projects I'm proud to have worked on.
                </p>

                {error && projects.length > 0 && (
                    <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg flex items-center gap-3">
                        <AlertTriangle />
                        <span>{`Warning: ${error}`}</span>
                    </div>
                )}
                
                {renderContent()}
            </div>
        </AnimatedPage>
    );
};

export default ProjectsPage;