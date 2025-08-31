
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, LogIn, LoaderCircle } from 'lucide-react';

const AdminPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <AnimatedPage>
            <div className="max-w-md mx-auto text-center h-full flex flex-col justify-center items-center">
                <ShieldCheck className="w-20 h-20 text-accent-light dark:text-accent-dark mb-6" />
                <h1 className="text-4xl font-display font-bold mb-4">Admin Login</h1>
                <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-8">
                    Please enter your credentials to access the dashboard.
                </p>

                <form onSubmit={handleSubmit} className="w-full bg-secondary-light dark:bg-secondary-dark p-8 rounded-lg shadow-xl space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-left">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="w-full px-4 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1 text-left">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="w-full px-4 py-2 rounded-lg bg-primary-light dark:bg-primary-dark border border-secondary-dark/20 focus:ring-accent-light focus:border-accent-light" 
                        />
                    </div>
                    
                    {error && (
                        <div className="text-red-500 dark:text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <LoaderCircle className="animate-spin" size={20} />
                        ) : (
                            <LogIn size={20} />
                        )}
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </AnimatedPage>
    );
};

export default AdminPage;