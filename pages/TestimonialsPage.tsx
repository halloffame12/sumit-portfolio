
import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { testimonialData } from '../data/mockData';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialsPage: React.FC = () => {
    return (
        <AnimatedPage>
            <div className="w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">What Others Say</h1>
                    <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
                        Testimonials from colleagues and clients I've had the pleasure to work with.
                    </p>
                </div>

                <div className="flex overflow-x-auto space-x-8 pb-8 scrollbar-thin scrollbar-thumb-accent-light dark:scrollbar-thumb-accent-dark scrollbar-track-secondary-light dark:scrollbar-track-secondary-dark">
                    {testimonialData.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex-shrink-0 w-80 md:w-96 p-8 bg-secondary-light dark:bg-secondary-dark rounded-2xl shadow-lg relative"
                        >
                            <Quote className="absolute top-4 right-4 w-12 h-12 text-primary-light dark:text-primary-dark opacity-20" />
                            <p className="relative z-10 text-text-light/90 dark:text-text-dark/90 italic mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4">
                                <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default TestimonialsPage;
