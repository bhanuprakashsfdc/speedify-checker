
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Play, Wifi, Upload, Clock, RefreshCw, Check, Info } from 'lucide-react';
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
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  
  useEffect(() => {
    // Start stagger animation on first render
    setTimeout(() => {
      setStaggerAnimation(true);
    }, 100);
    
    // Auto-start the test when component mounts
    handleStartTest();
  }, []);

  const handleStartTest = async () => {
    try {
      setIsLoading(true);
      setTestComplete(false);
      setTestResult(null);
      setProgress(0);
      setShowMoreDetails(false);
      
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
        <div className="text-center space-y-2 stagger-visible">
          <h2 className="text-3xl md:text-5xl font-bold">
            {!isLoading && !testComplete && 'Your Internet Speed Test'}
            {isLoading && (
              <div className="flex justify-center items-center">
                <span className="mr-2">{getProgressText()}</span>
              </div>
            )}
            {testComplete && testResult && (
              <div className="flex justify-center items-center flex-col">
                <span>{Math.round(testResult.downloadSpeed)} Mbps</span>
                <p className="text-base font-normal text-foreground/70 mt-1">Download Speed</p>
              </div>
            )}
          </h2>
        </div>
        
        {/* Main display - always visible */}
        <div className={cn(
          'flex flex-col items-center justify-center w-full transition-all duration-300',
          staggerAnimation ? 'stagger-visible' : ''
        )}>
          {isLoading && (
            <div className="w-full flex justify-center items-center flex-col">
              <div className="relative w-48 h-48 animate-pulse-slow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-bold">{Math.round(progress * 100)}</p>
                    <p className="text-xl mt-2 text-foreground/70">Mbps</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!isLoading && !testComplete && (
            <div className="text-center animate-pulse">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Wifi className="w-16 h-16 text-primary" />
              </div>
              <p className="mt-4 text-foreground/70">
                Starting speed test automatically...
              </p>
            </div>
          )}
          
          {/* Simple result view (FAST.com style) */}
          {testComplete && testResult && !showMoreDetails && (
            <div className="w-full animate-fade-in">
              <div className="flex flex-col items-center">
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowMoreDetails(true)}
                    className="flex items-center mt-6"
                  >
                    <Info className="mr-2" size={16} />
                    Show More Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-8 w-full max-w-md mx-auto">
                  <div className="flex flex-col items-center">
                    <p className="text-foreground/70 mb-2">Upload</p>
                    <p className="text-2xl font-bold">{Math.round(testResult.uploadSpeed)} Mbps</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-foreground/70 mb-2">Ping</p>
                    <p className="text-2xl font-bold">{testResult.ping} ms</p>
                  </div>
                </div>
                
                <Button
                  onClick={handleStartTest}
                  className="mt-12 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <RefreshCw className="mr-2" size={16} />
                  Run Test Again
                </Button>
              </div>
            </div>
          )}
          
          {/* Detailed results view */}
          {testComplete && testResult && showMoreDetails && (
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
              
              <div className="flex justify-center mt-8 gap-4">
                <Button
                  onClick={() => setShowMoreDetails(false)}
                  variant="outline"
                  className="flex items-center"
                >
                  Back to Simple View
                </Button>
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
    </div>
  );
};

export default SpeedTest;
