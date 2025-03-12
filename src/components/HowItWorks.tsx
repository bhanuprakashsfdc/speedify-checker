
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ArrowDownToLine, ArrowUpToLine, Zap, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: Clock,
    title: 'Ping Test',
    description: 'Measures the latency of your connection by sending small data packets to a server and measuring how long it takes to receive a response.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Download Test',
    description: 'Tests your download bandwidth by transferring sample data from the server to your device and measuring the speed at which it arrives.',
  },
  {
    icon: ArrowUpToLine,
    title: 'Upload Test',
    description: 'Evaluates your upload bandwidth by sending data from your device to the server and measuring the transfer rate.',
  },
  {
    icon: Zap,
    title: 'Jitter Test',
    description: 'Checks the stability of your connection by measuring variations in ping times, which affects the consistency of your connection.',
  },
];

const factors = [
  {
    icon: Wifi,
    title: 'Internet Plan',
    description: 'Your ISP package determines your maximum possible speed. Higher-tier plans provide faster speeds.'
  },
  {
    icon: Zap,
    title: 'Network Congestion',
    description: 'Heavy usage by many users in your area or home can slow down your connection, especially during peak hours.'
  },
  {
    icon: Clock,
    title: 'Distance to Server',
    description: 'The physical distance to the test server can affect your results. Servers closer to you typically show better speeds.'
  },
  {
    icon: Wifi,
    title: 'Wi-Fi vs. Wired',
    description: 'Wired ethernet connections generally provide faster and more stable speeds than Wi-Fi connections.'
  }
];

const HowItWorks: React.FC = () => {
  const [activeSection, setActiveSection] = useState('how');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('how-it-works');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Card 
      className={cn(
        "w-full glass-card",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-500"
      )}
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl md:text-3xl">How Speed Tests Work</CardTitle>
        <CardDescription className="text-center max-w-2xl mx-auto">
          Understanding how internet speed testing works and what factors affect your results
        </CardDescription>
        
        {/* Tabs */}
        <div className="flex justify-center mt-4">
          <div className="flex p-1 bg-secondary rounded-lg">
            <button
              onClick={() => setActiveSection('how')}
              className={cn(
                "px-4 py-2 text-sm rounded-md transition-all",
                activeSection === 'how' 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Testing Process
            </button>
            <button
              onClick={() => setActiveSection('factors')}
              className={cn(
                "px-4 py-2 text-sm rounded-md transition-all",
                activeSection === 'factors' 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Affecting Factors
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeSection === 'how' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children stagger-visible">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 text-primary rounded-lg">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {activeSection === 'factors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children stagger-visible">
            {factors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="flex items-start">
                  <div className="mr-4 p-3 bg-primary/10 text-primary rounded-lg">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{factor.title}</h3>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-8 pt-4 border-t border-border">
          <h3 className="font-medium mb-2">For Most Accurate Results:</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Close other applications and browser tabs that might be using your connection</li>
            <li>Connect via ethernet cable instead of Wi-Fi when possible</li>
            <li>Run multiple tests at different times of day for comparison</li>
            <li>Try different server locations to find the optimal connection</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;
