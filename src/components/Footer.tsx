
import React from 'react';
import { WEBSITENAME } from '../constants/constants';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 border-t border-border mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium">
              <span className="text-primary font-bold">{WEBSITENAME}</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Fast and accurate internet speed testing
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><a href="/about.html">About us</a> | <a href="/contact.html">Contact</a> | <a href="/privacy-policy.html">Privacy policy</a> | <a href="/terms.html">Terms & conditions </a></p> 
            © {currentYear} {WEBSITENAME}. All rights reserved and Build by <a href="https://bhanuprakashsfdc.com">Bhanu Prakash</a>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
