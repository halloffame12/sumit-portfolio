import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, LoaderCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types';

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                setPosts(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-64"><LoaderCircle className="w-12 h-12 animate-spin" /></div>;
        }
        if (error) {
            return <div className="flex flex-col items-center justify-center h-64 text-red-500"><AlertTriangle className="w-12 h-12 mb-4" /> {error}</div>;
        }
        if (posts.length === 0) {
            return <div className="text-center h-64 flex items-center justify-center"><p>No blog posts have been added yet.</p></div>;
        }
        return (
            <div className="space-y-12">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-secondary-light dark:bg-secondary-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
                        <div className="p-8">
                            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
                                <Link to={`/blog/${post.slug}`} className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-text-light/80 dark:text-text-dark/80 mb-4">
                                {post.excerpt}
                            </p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-text-light/60 dark:text-text-dark/60">
                                    <Clock size={16} />
                                    <span>{post.readingTime} min read</span>
                                </div>
                                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-semibold text-accent-light dark:text-accent-dark">
                                    Read More <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-4">From My Blog</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
                    Thoughts on technology, design, and everything in between.
                </p>
                {renderContent()}
            </div>
        </AnimatedPage>
    );
};

export default BlogPage;