
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Services', href: '#services' },
    { text: 'Portfolio', href: '#portfolio' },
    { text: 'About', href: '#about' },
    { text: 'Contact', href: '#contact' },
    { text: 'Dashboard', href: '/dashboard' },
  ];
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-media-purple">
              MediaBuyerPro
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.href}
                  className="text-gray-600 hover:text-media-purple transition-colors duration-200"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden p-1"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3 mt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.href}
                  className="text-gray-600 hover:text-media-purple transition-colors duration-200 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
