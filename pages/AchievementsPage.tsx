import React, { useState, useMemo } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { achievementData } from '../data/mockData';
// FIX: Imported 'AnimatePresence' from 'framer-motion' to fix reference errors.
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../types';

const achievementTypes: Array<Achievement['type'] | 'All'> = ['All', 'Course', 'Award', 'Competition'];

const AchievementsPage: React.FC = () => {
    const [filter, setFilter] = useState<Achievement['type'] | 'All'>('All');

    const filteredAchievements = useMemo(() => {
        if (filter === 'All') return achievementData;
        return achievementData.filter(ach => ach.type === filter);
    }, [filter]);

    return (
        <AnimatedPage>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-4">Achievements & Awards</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-8">
                    A collection of my certifications, awards, and recognitions.
                </p>

                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    {achievementTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                filter === type
                                    ? 'bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-white shadow-md'
                                    : 'bg-secondary-light dark:bg-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredAchievements.map((ach, index) => (
                            <motion.div
                                key={`${ach.title}-${ach.issuer}`}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-secondary-light dark:bg-secondary-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="overflow-hidden">
                                    <img src={ach.imageUrl} alt={ach.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs font-bold uppercase text-accent-light dark:text-accent-dark">{ach.type}</span>
                                    <h3 className="font-bold text-lg mt-1">{ach.title}</h3>
                                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">Issued by {ach.issuer}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default AchievementsPage;