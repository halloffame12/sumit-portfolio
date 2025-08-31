import React, { useState, useEffect, useCallback } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import type { Project, BlogPost, Skill, Experience, SkillCategory } from '../types';
import { LayoutDashboard, LogOut, Plus, Edit, Trash2, LoaderCircle, AlertTriangle, FileText, Sparkles, User } from 'lucide-react';
import ProjectForm from '../components/ProjectForm';
import BlogForm from '../components/BlogForm';
import SkillForm from '../components/SkillForm';
import ExperienceForm from '../components/ExperienceForm';

type ModalType = 'PROJECT' | 'BLOG' | 'SKILL' | 'EXPERIENCE' | null;

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    
    // State for data
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    // Generic state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Modal and editing state
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [editingItem, setEditingItem] = useState<any | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [projRes, blogRes, skillRes, catRes, expRes] = await Promise.all([
                supabase.from('projects').select('*').order('created_at', { ascending: false }),
                supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
                supabase.from('skills').select('*, skill_categories(name)').order('name'),
                supabase.from('skill_categories').select('*').order('name'),
                supabase.from('experiences').select('*').order('created_at', { ascending: false }),
            ]);

            if (projRes.error) throw projRes.error;
            setProjects(projRes.data || []);
            if (blogRes.error) throw blogRes.error;
            setBlogPosts(blogRes.data || []);
            if (skillRes.error) throw skillRes.error;
            setSkills(skillRes.data || []);
            if (catRes.error) throw catRes.error;
            setSkillCategories(catRes.data || []);
            if (expRes.error) throw expRes.error;
            setExperiences(expRes.data || []);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openModal = (type: ModalType, item: any | null = null) => {
        setEditingItem(item);
        setActiveModal(type);
    };

    const closeModal = () => {
        setEditingItem(null);
        setActiveModal(null);
    };

    const handleSave = () => {
        closeModal();
        fetchData();
    };

    const handleDelete = async (table: string, id: string) => {
        if (window.confirm(`Are you sure you want to delete this item?`)) {
            try {
                const { error } = await supabase.from(table).delete().eq('id', id);
                if (error) throw error;
                fetchData();
            } catch (err) {
                alert(`Error deleting item: ${err instanceof Error ? err.message : 'Unknown error'}`);
            }
        }
    };
    
    return (
        <AnimatedPage>
            <div className="max-w-5xl mx-auto pb-12">
                {activeModal === 'PROJECT' && <ProjectForm projectToEdit={editingItem} onClose={closeModal} onSave={handleSave} />}
                {activeModal === 'BLOG' && <BlogForm postToEdit={editingItem} onClose={closeModal} onSave={handleSave} />}
                {activeModal === 'SKILL' && <SkillForm skillToEdit={editingItem} categories={skillCategories} onClose={closeModal} onSave={handleSave} />}
                {activeModal === 'EXPERIENCE' && <ExperienceForm experienceToEdit={editingItem} onClose={closeModal} onSave={handleSave} />}

                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold">Dashboard</h1>
                        <p className="text-lg text-text-light/80 dark:text-text-dark/80">Welcome, {user?.email || 'Admin'}!</p>
                    </div>
                    <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-all transform hover:scale-105"><LogOut size={18} /> Logout</button>
                </div>

                {isLoading ? <div className="flex justify-center items-center py-12"><LoaderCircle className="animate-spin w-10 h-10" /></div>
                : error ? <div className="text-red-500 bg-red-500/10 p-4 rounded-lg flex items-center gap-3"><AlertTriangle /> {error}</div>
                : (
                    <div className="space-y-8">
                        {/* Projects Section */}
                        <DashboardSection title="Projects" icon={<LayoutDashboard />} onAddNew={() => openModal('PROJECT')}>
                            {projects.map(item => (
                                <ListItem key={item.id} title={item.title} subtitle={item.category} onEdit={() => openModal('PROJECT', item)} onDelete={() => handleDelete('projects', item.id)} />
                            ))}
                        </DashboardSection>

                        {/* Blog Posts Section */}
                        <DashboardSection title="Blog Posts" icon={<FileText />} onAddNew={() => openModal('BLOG')}>
                            {blogPosts.map(item => (
                                <ListItem key={item.id} title={item.title} subtitle={item.slug} onEdit={() => openModal('BLOG', item)} onDelete={() => handleDelete('blog_posts', item.id)} />
                            ))}
                        </DashboardSection>

                        {/* Skills Section */}
                        <DashboardSection title="Skills" icon={<Sparkles />} onAddNew={() => openModal('SKILL')}>
                            {skills.map(item => (
                                <ListItem key={item.id} title={item.name} subtitle={item.skill_categories?.name || 'Uncategorized'} onEdit={() => openModal('SKILL', item)} onDelete={() => handleDelete('skills', item.id)} />
                            ))}
                        </DashboardSection>

                        {/* Experience Section */}
                        <DashboardSection title="About (Experience & Education)" icon={<User />} onAddNew={() => openModal('EXPERIENCE')}>
                            {experiences.map(item => (
                                <ListItem key={item.id} title={item.role} subtitle={`${item.type} at ${item.company}`} onEdit={() => openModal('EXPERIENCE', item)} onDelete={() => handleDelete('experiences', item.id)} />
                            ))}
                        </DashboardSection>
                    </div>
                )}
            </div>
        </AnimatedPage>
    );
};

// Reusable component for dashboard sections
const DashboardSection: React.FC<{ title: string; icon: React.ReactNode; onAddNew: () => void; children: React.ReactNode }> = ({ title, icon, onAddNew, children }) => (
    <div className="bg-secondary-light dark:bg-secondary-dark p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">{icon} {title}</h2>
            <button onClick={onAddNew} className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-lg shadow-md transition-all transform hover:scale-105"><Plus size={18} /> Create New</button>
        </div>
        <div className="space-y-4">
            {React.Children.count(children) > 0 ? children : <p className="text-center py-8">No items found. Click "Create New" to add one.</p>}
        </div>
    </div>
);

// Reusable component for list items
const ListItem: React.FC<{ title: string; subtitle: string; onEdit: () => void; onDelete: () => void; }> = ({ title, subtitle, onEdit, onDelete }) => (
    <div className="flex items-center justify-between p-4 bg-primary-light dark:bg-primary-dark rounded-lg">
        <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-text-light/70 dark:text-text-dark/70">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={onEdit} className="p-2 hover:text-accent-light dark:hover:text-accent-dark transition-colors"><Edit size={18}/></button>
            <button onClick={onDelete} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
        </div>
    </div>
);

export default AdminDashboard;