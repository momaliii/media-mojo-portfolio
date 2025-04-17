
import React from "react";
import { Separator } from "@/components/ui/separator";
import { 
  Linkedin, 
  ArrowUp 
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <div className="text-xl font-bold mb-4">
              <span className="gradient-text">Mohamed Ali</span>
            </div>
            <p className="text-gray-600 mb-6">
              Strategic media buying for businesses seeking exceptional results and maximum ROI.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/in/mhmdali02/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 hover:bg-gray-300 transition-colors p-2 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-gray-700" />
              </a>
              <a 
                href="https://wa.me/+201060098267" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 hover:bg-gray-300 transition-colors p-2 rounded-full"
                aria-label="WhatsApp"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-700"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M12 14a2 2 0 0 0 2-2v-2a2 2 0 1 0-4 0v2a2 2 0 0 0 2 2Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-media-purple transition-colors text-sm">
                  Paid Social Media
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-media-purple transition-colors text-sm">
                  Search Engine Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-media-purple transition-colors text-sm">
                  Programmatic Display
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-media-purple transition-colors text-sm">
                  Performance Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-media-purple transition-colors text-sm">
                  Media Planning
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
                  }}
                  className="text-gray-600 hover:text-media-purple transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});
                  }}
                  className="text-gray-600 hover:text-media-purple transition-colors text-sm"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'});
                  }}
                  className="text-gray-600 hover:text-media-purple transition-colors text-sm"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                  }}
                  className="text-gray-600 hover:text-media-purple transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-media-purple transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                mhmd167ali@gmail.com
              </li>
              <li className="text-gray-600 text-sm">
                <a href="https://wa.me/+201060098267" className="hover:text-media-purple transition-colors">
                  Schedule a consultation call
                </a>
              </li>
              <li className="text-gray-600 text-sm">
                Sunday - Thursday: 9am - 5pm
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MDZ. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-500 hover:text-media-purple text-sm mt-4 md:mt-0 group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="bg-gray-200 group-hover:bg-media-purple/20 p-1 rounded-full transition-colors">
              <ArrowUp className="h-4 w-4 group-hover:text-media-purple transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
