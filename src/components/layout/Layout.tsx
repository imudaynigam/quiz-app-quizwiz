import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showSocialLinks?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSocialLinks = false,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-background flex flex-col ${className}`}>
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer showSocialLinks={showSocialLinks} />
    </div>
  );
};