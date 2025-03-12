
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 border-t border-border mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium">
              <span className="text-primary font-bold">Speedify</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Fast and accurate internet speed testing
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {currentYear} Speedify. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
