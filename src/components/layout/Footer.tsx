import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { QuizButton } from '@/components/ui/quiz-button';

interface FooterProps {
  showSocialLinks?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  showSocialLinks = false,
  className = '' 
}) => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/imudaynigam', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/imudaynigam/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:udaynigam8574@gmail.com', label: 'Email' },
  ];

  return (
    <footer className={`relative overflow-hidden shadow-2xl ${className}`}>
      {/* Background with gradient and glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/90 via-card/95 to-muted/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-quiz-secondary/8" />
      <div className="border-t border-border/50" />
      
      <div className="relative z-10 py-12 backdrop-blur-sm">
        <div className="container mx-auto px-4">
        <div className="text-center">
          {showSocialLinks && (
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((link) => (
                <QuizButton
                  key={link.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-quiz-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-110 rounded-full backdrop-blur-sm border border-border/20 hover:border-primary/40"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                </QuizButton>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <span className="text-lg">Developed</span>
            <span className="text-lg">by</span>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-quiz-secondary bg-clip-text text-transparent">
              Uday Nigam
            </span>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-quiz-secondary/10 border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-sm font-medium text-foreground/80">
                &copy; {new Date().getFullYear()} QuizWiz. All rights reserved.
              </p>
              <div className="w-2 h-2 bg-quiz-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};