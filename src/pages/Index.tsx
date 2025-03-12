
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import SpeedTest from '@/components/SpeedTest';
import TestHistory from '@/components/TestHistory';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Add a class to body for global styles
    document.body.classList.add('antialiased');
    
    return () => {
      document.body.classList.remove('antialiased');
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        id="home"
        className="pt-32 pb-20 px-4 md:px-6"
      >
        <div className="container mx-auto">
          <SpeedTest />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section 
        id="how-it-works"
        className="py-16 px-4 md:px-6 bg-secondary/30"
      >
        <div className="container mx-auto">
          <HowItWorks />
        </div>
      </section>
      
      {/* History Section */}
      <section 
        id="history"
        className="py-16 px-4 md:px-6"
      >
        <div className="container mx-auto">
          <TestHistory />
        </div>
      </section>
      
      <div className="flex-grow" />
      
      <Footer />
    </div>
  );
};

export default Index;
