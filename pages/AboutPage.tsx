import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import type { Experience } from '../types';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, LoaderCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const TimelineItem: React.FC<{ item: Experience; icon: React.ReactNode; isLast: boolean }> = ({ item, icon, isLast }) => (
    <div className="relative pl-10">
        <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-secondary-light dark:bg-secondary-dark ring-4 ring-primary-light dark:ring-primary-dark">
            {icon}
        </div>
        {!isLast && <div className="absolute left-4 top-10 h-full w-0.5 bg-secondary-light dark:bg-secondary-dark"></div>}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <div className="flex items-baseline gap-2">
                <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{item.role}</h3>
                <p className="text-sm text-text-light/60 dark:text-text-dark/60">@ {item.company}</p>
            </div>
            <p className="text-sm font-medium text-accent-light dark:text-accent-dark mb-2">{item.period}</p>
            <p className="text-text-light/80 dark:text-text-dark/80">{item.description}</p>
        </motion.div>
    </div>
);

const AboutPage: React.FC = () => {
    const resumeUrl = "/mock-resume.pdf";
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExperiences = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('experiences')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (error) throw error;
                setExperiences(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    const workExperience = experiences.filter(item => item.type === 'Work');
    const educationExperience = experiences.filter(item => item.type === 'Education');

    const renderTimeline = (data: Experience[], type: 'Work' | 'Education') => {
        if (isLoading) return <LoaderCircle className="w-8 h-8 animate-spin" />;
        if (error) return <AlertTriangle className="w-8 h-8 text-red-500" />;
        if (data.length === 0) return <p>No {type.toLowerCase()} experience added yet.</p>;

        return data.map((item, index) => (
            <TimelineItem
                key={item.id}
                item={item}
                icon={type === 'Work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                isLast={index === data.length - 1}
            />
        ));
    };

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-4">About Me</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
                    A brief story of my journey in the world of technology and design.
                </p>

                {error && <p className="text-red-500 mb-4">Error fetching data: {error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Briefcase /> Work Experience</h2>
                        <div>{renderTimeline(workExperience, 'Work')}</div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><GraduationCap /> Education</h2>
                        <div>{renderTimeline(educationExperience, 'Education')}</div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-4">My Resume</h2>
                            <p className="text-text-light/80 dark:text-text-dark/80 mb-4">
                                For a more detailed look at my skills and experience, feel free to download my resume.
                            </p>
                            <a
                                href={resumeUrl}
                                download="My_Resume.pdf"
                                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-lg shadow-lg transition-all transform hover:scale-105"
                            >
                                <Download size={20} />
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default AboutPage;