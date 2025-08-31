import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types';
import { X, LoaderCircle, Save } from 'lucide-react';

interface BlogFormProps {
    postToEdit: BlogPost | null;
    onClose: () => void;
    onSave: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ postToEdit, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        imageUrl: '',
        readingTime: 0,
        content: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (postToEdit) {
            setFormData({
                title: postToEdit.title,
                slug: postToEdit.slug,
                excerpt: postToEdit.excerpt,
                imageUrl: postToEdit.imageUrl,
                readingTime: postToEdit.readingTime,
                content: postToEdit.content,
            });
        } else {
            setFormData({ title: '', slug: '', excerpt: '', imageUrl: '', readingTime: 0, content: '' });
        }
    }, [postToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'readingTime') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            let response;
            if (postToEdit) {
                response = await supabase.from('blog_posts').update(formData).eq('id', postToEdit.id);
            } else {
                response = await supabase.from('blog_posts').insert([formData]);
            }
            if (response.error) throw response.error;
            onSave();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-secondary-light dark:bg-secondary-dark w-full max-w-2xl rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{postToEdit ? 'Edit Blog Post' : 'Create New Post'}</h2>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField name="title" label="Title" value={formData.title} onChange={handleChange} required />
                            <InputField name="slug" label="URL Slug (e.g., my-first-post)" value={formData.slug} onChange={handleChange} required />
                            <InputField name="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleChange} required />
                            <InputField name="readingTime" label="Reading Time (minutes)" type="number" value={formData.readingTime.toString()} onChange={handleChange} required />
                            <TextareaField name="excerpt" label="Excerpt" value={formData.excerpt} onChange={handleChange} required rows={3} />
                            <TextareaField name="content" label="Full Content" value={formData.content} onChange={handleChange} required rows={10} />
                            
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to flex items-center gap-2 disabled:opacity-70">
                                    {isSubmitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
                                    {isSubmitting ? 'Saving...' : 'Save Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Reusing helper components from ProjectForm
const InputField: React.FC<{name: string, label: string, value: string, onChange: any, required?: boolean, type?: string}> = 
({ name, label, value, onChange, required = false, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light" />
    </div>
);
const TextareaField: React.FC<{name: string, label: string, value: string, onChange: any, required?: boolean, rows?: number}> = 
({ name, label, value, onChange, required = false, rows = 4 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} required={required} rows={rows} className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light" />
    </div>
);

export default BlogForm;