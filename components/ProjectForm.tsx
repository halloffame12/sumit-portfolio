import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { Project } from '../types';
import { X, LoaderCircle, Save } from 'lucide-react';

interface ProjectFormProps {
    projectToEdit: Project | null;
    onClose: () => void;
    onSave: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectToEdit, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        imageUrl: '',
        description: '',
        techStack: '', // Will be handled as comma-separated string
        demoLink: '',
        githubLink: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (projectToEdit) {
            setFormData({
                title: projectToEdit.title,
                category: projectToEdit.category,
                imageUrl: projectToEdit.imageUrl,
                description: projectToEdit.description,
                techStack: projectToEdit.techStack.join(', '),
                demoLink: projectToEdit.demoLink || '',
                githubLink: projectToEdit.githubLink || '',
            });
        } else {
            // Reset form for new project
            setFormData({ title: '', category: '', imageUrl: '', description: '', techStack: '', demoLink: '', githubLink: '' });
        }
    }, [projectToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const projectData = {
            title: formData.title,
            category: formData.category,
            imageUrl: formData.imageUrl,
            description: formData.description,
            techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
            demoLink: formData.demoLink,
            githubLink: formData.githubLink,
        };

        try {
            let response;
            if (projectToEdit) {
                // Update existing project
                response = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', projectToEdit.id);
            } else {
                // Create new project
                response = await supabase
                    .from('projects')
                    .insert([projectData]);
            }

            if (response.error) {
                throw response.error;
            }

            onSave();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-secondary-light dark:bg-secondary-dark w-full max-w-lg rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{projectToEdit ? 'Edit Project' : 'Create New Project'}</h2>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField name="title" label="Title" value={formData.title} onChange={handleChange} required />
                            <InputField name="category" label="Category" value={formData.category} onChange={handleChange} required />
                            <InputField name="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleChange} required />
                            <InputField name="demoLink" label="Demo Link" value={formData.demoLink} onChange={handleChange} />
                            <InputField name="githubLink" label="GitHub Link" value={formData.githubLink} onChange={handleChange} />
                            <TextareaField name="description" label="Description" value={formData.description} onChange={handleChange} required />
                            <InputField name="techStack" label="Tech Stack (comma-separated)" value={formData.techStack} onChange={handleChange} required />
                            
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 rounded-lg font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isSubmitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
                                    {isSubmitting ? 'Saving...' : 'Save Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Helper components for form fields
const InputField: React.FC<{name: string, label: string, value: string, onChange: any, required?: boolean, type?: string}> = 
({ name, label, value, onChange, required = false, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light"
        />
    </div>
);

const TextareaField: React.FC<{name: string, label: string, value: string, onChange: any, required?: boolean}> = 
({ name, label, value, onChange, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light"
        />
    </div>
);


export default ProjectForm;