
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, Twitter } from 'lucide-react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, this would send data to a backend (e.g., using Nodemailer)
        console.log('Form submitted:', formData);
        setStatus('Thank you for your message! (Check console)');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
    };

    const socialLinks = [
        { icon: <Linkedin />, href: 'https://www.linkedin.com/in/sumit-chauhan-a4ba98325/', name: 'LinkedIn' },
        { icon: <Github />, href: 'https://github.com/halloffame12', name: 'GitHub' },
        { icon: <Twitter />, href: 'https://x.com/sumit_7678', name: 'Twitter' },
    ];

    return (
        <AnimatedPage>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-display font-bold mb-4">Get In Touch</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
                    Have a project in mind or just want to say hello? I'd love to hear from you.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-secondary-light dark:bg-secondary-dark p-8 rounded-2xl shadow-xl">
                    {/* Form Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-lg shadow-lg transition-all transform hover:scale-105">
                                    <Send size={20} /> Send Message
                                </button>
                            </div>
                            {status && <p className="text-center text-green-500">{status}</p>}
                        </form>
                    </div>

                    {/* Info & Socials Section */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-4 text-text-light/90 dark:text-text-dark/90">
                            <p><strong>Email:</strong> sumitchauhan10062004@gmail.com</p>
                            <p><strong>Location:</strong> India, Delhi</p>
                        </div>

                        <h3 className="text-xl font-bold mt-10 mb-4">Connect with me</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-primary-light dark:bg-primary-dark rounded-full shadow-md hover:text-accent-light dark:hover:text-accent-dark"
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ContactPage;
