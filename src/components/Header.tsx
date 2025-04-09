
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled ? 'glass shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-medium">
            <span className="text-primary font-bold">Interent Speed Test</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
           <a href='/'> Home</a> 
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <a href='index.html#how-it-works'> How It Works</a> 
          </button>
          <button 
            onClick={() => scrollToSection('history')}
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <a href='index.html#history'> History</a> 
          </button>
          <button 
            onClick={() => scrollToSection('history')}
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <a href='index.html#history'> Blog</a> 
          </button>
          <button 
            onClick={() => scrollToSection('history')}
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <a href='index.html#history'> Contact</a> 
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-background/50 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-transform duration-300 transform md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('history')}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            History
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
