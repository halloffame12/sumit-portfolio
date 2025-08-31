import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import type { Skill, SkillCategory } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Code, Database, Cpu, Wrench, PenTool, Star, LoaderCircle, AlertTriangle } from 'lucide-react';

const icons: { [key: string]: React.FC<any> } = {
  Code, Database, Cpu, Wrench, PenTool, Star,
};

const SkillIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6 text-sky-500" }) => {
    const IconComponent = icons[name];
    return IconComponent ? <IconComponent className={className} /> : null;
};

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                    <SkillIcon name={skill.icon_name} />
                    <span className="font-medium text-text-light dark:text-text-dark">{skill.name}</span>
                </div>
                <span className="text-sm font-medium text-accent-light dark:text-accent-dark">{skill.level}%</span>
            </div>
            <div className="w-full bg-secondary-light dark:bg-secondary-dark rounded-full h-2.5">
                <motion.div
                    className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

const SkillsPage: React.FC = () => {
    const [skillData, setSkillData] = useState<SkillCategory[]>([]);
    const [activeTab, setActiveTab] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            setIsLoading(true);
            try {
                const { data: categories, error: catError } = await supabase.from('skill_categories').select('*');
                if (catError) throw catError;

                const { data: skills, error: skillError } = await supabase.from('skills').select('*');
                if (skillError) throw skillError;

                const combinedData = categories.map(cat => ({
                    ...cat,
                    skills: skills.filter(skill => skill.category_id === cat.id)
                }));

                setSkillData(combinedData);
                if (combinedData.length > 0) {
                    setActiveTab(combinedData[0].name);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch skills');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="w-12 h-12 animate-spin" /></div>;
    }
    if (error) {
        return <div className="flex justify-center items-center h-64 text-red-500"><AlertTriangle className="w-12 h-12 mr-4"/> {error}</div>;
    }

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-4">My Technical Skills</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
                    A showcase of the technologies and tools I'm proficient in.
                </p>

                <div className="flex flex-wrap gap-2 mb-8 border-b border-secondary-light dark:border-secondary-dark">
                    {skillData.map(category => (
                        <button
                            key={category.name}
                            onClick={() => setActiveTab(category.name)}
                            className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-300 ${
                                activeTab === category.name
                                    ? 'bg-secondary-light dark:bg-secondary-dark text-accent-light dark:text-accent-dark border-b-2 border-accent-light dark:border-accent-dark'
                                    : 'text-text-light/70 dark:text-text-dark/70 hover:bg-secondary-light/50 dark:hover:bg-secondary-dark/50'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div>
                    {skillData.map(category => (
                        activeTab === category.name && (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {category.skills?.map((skill) => (
                                    <SkillBar key={skill.id} skill={skill} />
                                ))}
                            </motion.div>
                        )
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default SkillsPage;