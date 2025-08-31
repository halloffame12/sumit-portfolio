
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark font-sans">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
