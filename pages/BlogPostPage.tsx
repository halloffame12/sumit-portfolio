import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { Clock, ArrowLeft, LoaderCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types';

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);

            } catch (err) {
                 setError(err instanceof Error ? err.message : 'Failed to fetch post');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [slug]);


    if (isLoading) {
        return <AnimatedPage><div className="flex justify-center items-center h-96"><LoaderCircle className="animate-spin w-12 h-12"/></div></AnimatedPage>
    }
    
    if (error || !post) {
        return (
            <AnimatedPage>
                <div className="text-center py-20">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-4">{error ? 'An Error Occurred' : 'Post Not Found'}</h1>
                    <p className="text-red-500 mb-6">{error}</p>
                    <Link to="/blog" className="text-accent-light dark:text-accent-dark hover:underline">
                        Return to Blog
                    </Link>
                </div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage>
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-accent-light dark:text-accent-dark hover:underline mb-4">
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>
                </div>
                <article>
                    <motion.img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                    <motion.h1 
                        className="text-4xl md:text-5xl font-display font-bold mb-4 text-text-light dark:text-text-dark"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div 
                        className="flex items-center gap-4 text-text-light/60 dark:text-text-dark/60 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{post.readingTime} min read</span>
                        </div>
                         {post.created_at && (
                            <>
                                <span>•</span>
                                <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> 
                            </>
                        )}
                    </motion.div>

                    <motion.div 
                        className="prose prose-lg dark:prose-invert max-w-none text-text-light/80 dark:text-text-dark/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className="lead text-xl font-semibold">{post.excerpt}</p>
                         <div className="whitespace-pre-wrap font-sans text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                    </motion.div>
                </article>
            </div>
        </AnimatedPage>
    );
};

export default BlogPostPage;