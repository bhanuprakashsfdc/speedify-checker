
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Play, Wifi, Upload, Clock, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SpeedMeter from './SpeedMeter';
import ResultsCard from './ResultsCard';
import { runSpeedTest, TestResult, getSpeedQuality } from '@/lib/speedtest';

const SpeedTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressPhase, setProgressPhase] = useState<'download' | 'upload' | 'ping'>('download');
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [staggerAnimation, setStaggerAnimation] = useState(false);
  
  useEffect(() => {
    // Start stagger animation on first render
    setTimeout(() => {
      setStaggerAnimation(true);
    }, 100);
  }, []);

  const handleStartTest = async () => {
    try {
      setIsLoading(true);
      setTestComplete(false);
      setTestResult(null);
      setProgress(0);
      
      // Ripple effect on button
      const rippleElement = document.querySelector('.speed-test-btn-ripple');
      if (rippleElement) {
        rippleElement.classList.add('visible');
        setTimeout(() => {
          rippleElement.classList.remove('visible');
        }, 600);
      }
      
      // Run the speed test
      const result = await runSpeedTest({
        onProgress: (progressValue, phase) => {
          setProgress(progressValue);
          setProgressPhase(phase);
        }
      });
      
      // Set the test result
      setTestResult(result);
      setTestComplete(true);
      toast.success('Speed test completed successfully!');
    } catch (error) {
      console.error("Speed test error:", error);
      toast.error('An error occurred during the speed test');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getProgressText = () => {
    if (progressPhase === 'download') {
      return 'Testing download speed...';
    } else if (progressPhase === 'upload') {
      return 'Testing upload speed...';
    } else {
      return 'Testing ping...';
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="stagger-children flex flex-col items-center justify-center space-y-6 md:space-y-8 transition-all duration-300">
        <div className="text-center space-y-4 stagger-visible">
          <h2 className="text-3xl md:text-4xl font-bold">Test Your Internet Speed</h2>
          <p className="text-foreground/70 max-w-xl">
            Get an accurate measurement of your connection's download speed, upload speed, and latency.
          </p>
        </div>
        
        {/* Start Test Button - Always visible */}
        <div className={cn(
          'flex flex-col items-center justify-center',
          staggerAnimation ? 'stagger-visible' : '',
          isLoading || testComplete ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        )}>
          <button
            onClick={handleStartTest}
            disabled={isLoading}
            className="speed-test-btn group mt-6 animate-pulse-scale hover:scale-105 transition-transform"
          >
            <span className="relative z-10 flex items-center">
              <Play className="mr-2" size={20} fill="white" />
              Start Speed Test
            </span>
            <span className="speed-test-btn-ripple"></span>
          </button>
          <p className="text-sm text-foreground/60 mt-4">
            The test will take about 30 seconds to complete
          </p>
        </div>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            <div className="relative w-48 h-48 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                style={{ 
                  animation: 'spin 1.5s linear infinite',
                  transform: 'rotate(0deg)'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold">{Math.round(progress * 100)}%</p>
                  <p className="text-sm text-foreground/70">{getProgressText()}</p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Cancel
            </Button>
          </div>
        )}
        
        {testComplete && testResult && (
          <div className="w-full animate-fade-in stagger-children stagger-visible">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 my-8">
              <SpeedMeter 
                value={testResult.downloadSpeed}
                label="Download"
                unit="Mbps"
                size="md"
              />
              <SpeedMeter 
                value={testResult.uploadSpeed}
                label="Upload"
                unit="Mbps"
                size="md"
              />
              <SpeedMeter 
                value={testResult.ping}
                label="Ping"
                unit="ms"
                maxValue={100}
                size="md"
              />
            </div>
            
            <ResultsCard result={testResult} />
            
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleStartTest}
                className="flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="mr-2" size={16} />
                Run Test Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;
