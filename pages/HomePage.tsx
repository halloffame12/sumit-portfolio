
import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const previewCards = [
    { to: '/projects', title: 'View My Work', description: 'Explore a curated selection of my projects.', bg: 'bg-blue-500' },
    { to: '/blog', title: 'Read My Blog', description: 'Insights on tech, design, and development.', bg: 'bg-purple-500' },
    { to: '/contact', title: 'Get In Touch', description: 'Let\'s collaborate on something amazing.', bg: 'bg-green-500' },
  ];

  return (
    <AnimatedPage>
      <div className="h-full flex flex-col justify-center">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-[70vh]">
          <motion.div
            className="lg:col-span-3 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to leading-tight">
              Crafting Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto lg:mx-0">
              I'm a passionate frontend engineer specializing in React, TypeScript, and modern web technologies. I build beautiful, functional, and user-centric applications that solve real-world problems.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-brand-gradient-from hover:bg-brand-gradient-to rounded-lg shadow-lg transition-all transform hover:scale-105">
              More About Me <ArrowRight size={20} />
            </Link>
          </motion.div>
          <motion.div
            className="lg:col-span-2 relative h-64 lg:h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl transform -rotate-6"></div>
            <img src="./img/sumitc.png" alt="Profile" className="relative w-48 h-48 lg:w-72 lg:h-72 object-cover rounded-full border-4 border-secondary-light dark:border-secondary-dark shadow-2xl" />
          </motion.div>
        </div>

        {/* Preview Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {previewCards.map((card, index) => (
            <motion.div
              key={card.to}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link to={card.to} className={`block p-8 rounded-2xl text-white ${card.bg} shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2`}>
                <h3 className="text-2xl font-bold font-display">{card.title}</h3>
                <p className="mt-2 opacity-90">{card.description}</p>
                <ArrowRight className="mt-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;
