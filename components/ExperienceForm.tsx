import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { Experience } from '../types';
import { X, LoaderCircle, Save } from 'lucide-react';

interface ExperienceFormProps {
    experienceToEdit: Experience | null;
    onClose: () => void;
    onSave: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experienceToEdit, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: 'Work' as 'Work' | 'Education',
        role: '',
        company: '',
        period: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (experienceToEdit) {
            setFormData(experienceToEdit);
        } else {
            setFormData({ type: 'Work', role: '', company: '', period: '', description: '' });
        }
    }, [experienceToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            let response;
            if (experienceToEdit) {
                response = await supabase.from('experiences').update(formData).eq('id', experienceToEdit.id);
            } else {
                response = await supabase.from('experiences').insert([formData]);
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
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-secondary-light dark:bg-secondary-dark w-full max-w-lg rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{experienceToEdit ? 'Edit Entry' : 'Create New Entry'}</h2>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-primary-light dark:hover:bg-primary-dark"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                                <select id="type" name="type" value={formData.type} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20">
                                    <option value="Work">Work Experience</option>
                                    <option value="Education">Education</option>
                                </select>
                            </div>
                            <InputField name="role" label={formData.type === 'Work' ? 'Role / Title' : 'Degree / Field of Study'} value={formData.role} onChange={handleChange} required />
                            <InputField name="company" label={formData.type === 'Work' ? 'Company' : 'Institution'} value={formData.company} onChange={handleChange} required />
                            <InputField name="period" label="Period (e.g., 2021 - Present)" value={formData.period} onChange={handleChange} required />
                            <TextareaField name="description" label="Description" value={formData.description} onChange={handleChange} required />
                            
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to flex items-center gap-2 disabled:opacity-70">
                                    {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Save />} {isSubmitting ? 'Saving...' : 'Save Entry'}
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
const TextareaField: React.FC<{name: string, label: string, value: string, onChange: any, required?: boolean}> = 
({ name, label, value, onChange, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} required={required} rows={3} className="w-full px-3 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20" />
    </div>
);

export default ExperienceForm;