
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Home, User, Code, Briefcase, Mic, Award, Star, Mail, Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', text: 'Home', icon: <Home /> },
  { to: '/about', text: 'About', icon: <User /> },
  { to: '/skills', text: 'Skills', icon: <Code /> },
  { to: '/projects', text: 'Projects', icon: <Briefcase /> },
  { to: '/blog', text: 'Blog', icon: <Mic /> },
  { to: '/achievements', text: 'Achievements', icon: <Award /> },
  { to: '/testimonials', text: 'Testimonials', icon: <Star /> },
  { to: '/contact', text: 'Contact', icon: <Mail /> },
  { to: '/admin', text: 'Admin', icon: <Shield /> },
];

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = "flex items-center p-3 my-1 rounded-lg transition-all duration-300";
  const activeLinkClass = "bg-brand-gradient-from/20 text-accent-dark font-semibold";
  const inactiveLinkClass = "hover:bg-secondary-light dark:hover:bg-secondary-dark/50";

  const SidebarContent = () => (
    <>
      <div className="p-4 mb-4">
        <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to">
          My Portfolio
        </h1>
        <p className="text-xs text-text-light/70 dark:text-text-dark/70">Creative Frontend Engineer</p>
      </div>
      <nav className="flex-1 px-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <span className="mr-3">{link.icon}</span>
            <span>{link.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4">
        <button
          onClick={toggleTheme}
          className="w-full flex justify-center items-center p-3 rounded-lg bg-secondary-light dark:bg-secondary-dark/50 hover:bg-gray-200 dark:hover:bg-secondary-dark transition-colors duration-300"
        >
          {theme === 'light' ? <Moon className="text-indigo-500" /> : <Sun className="text-yellow-400" />}
          <span className="ml-2">Switch Theme</span>
        </button>
      </div>
    </>
  );

  return (
    <>
        {/* Mobile Menu Button */}
        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-secondary-light/80 dark:bg-secondary-dark/80 backdrop-blur-sm"
            aria-label="Toggle menu"
        >
            {isOpen ? <X/> : <Menu/>}
        </button>

        {/* Mobile Sidebar */}
         <div 
            className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 ease-in-out lg:hidden
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            bg-primary-light/95 dark:bg-primary-dark/95 backdrop-blur-lg flex flex-col shadow-2xl`}>
            <SidebarContent/>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 bg-primary-light dark:bg-primary-dark border-r border-secondary-light dark:border-secondary-dark/30 shadow-lg">
            <SidebarContent/>
        </aside>
    </>
  );
};

export default Sidebar;
