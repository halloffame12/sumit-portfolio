import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { Skill, SkillCategory } from '../types';
import { X, LoaderCircle, Save } from 'lucide-react';

interface SkillFormProps {
    skillToEdit: Skill | null;
    categories: SkillCategory[];
    onClose: () => void;
    onSave: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skillToEdit, categories, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        level: 50,
        icon_name: '',
        category_id: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (skillToEdit) {
            setFormData({
                name: skillToEdit.name,
                level: skillToEdit.level,
                icon_name: skillToEdit.icon_name,
                category_id: skillToEdit.category_id,
            });
        } else {
            setFormData({ name: '', level: 50, icon_name: '', category_id: categories[0]?.id || '' });
        }
    }, [skillToEdit, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'level' ? parseInt(value) : value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!formData.category_id) {
            setError('Please select a category.');
            setIsSubmitting(false);
            return;
        }

        try {
            let response;
            if (skillToEdit) {
                response = await supabase.from('skills').update(formData).eq('id', skillToEdit.id);
            } else {
                response = await supabase.from('skills').insert([formData]);
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
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-secondary-light dark:bg-secondary-dark w-full max-w-lg rounded-lg shadow-xl relative" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{skillToEdit ? 'Edit Skill' : 'Create New Skill'}</h2>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="category_id" className="block text-sm font-medium mb-1">Category</label>
                                <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20">
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <InputField name="name" label="Skill Name" value={formData.name} onChange={handleChange} required />
                            <InputField name="icon_name" label="Icon Name (e.g., 'Code')" value={formData.icon_name} onChange={handleChange} required />
                            <div>
                                <label htmlFor="level" className="block text-sm font-medium mb-1">Proficiency Level: {formData.level}%</label>
                                <input type="range" id="level" name="level" min="0" max="100" value={formData.level} onChange={handleChange} className="w-full" />
                            </div>
                            
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to flex items-center gap-2 disabled:opacity-70">
                                    {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Save />} {isSubmitting ? 'Saving...' : 'Save Skill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const InputField: React.FC<{name: string, label: string, value: string, onChange: any, required?: boolean}> = 
({ name, label, value, onChange, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <input type="text" id={name} name={name} value={value} onChange={onChange} required={required} className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20" />
    </div>
);

export default SkillForm;