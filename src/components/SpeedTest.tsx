
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Play, Wifi, Upload, Clock, RefreshCw, Info } from 'lucide-react';
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
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
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
      setHasError(false);
      
      // Show a toast to let the user know the test is starting
      toast.info("Starting speed test...");
      
      // Run the speed test
      const result = await runSpeedTest({
        onProgress: (progressValue, phase) => {
          setProgress(progressValue);
          setProgressPhase(phase);
        }
      });
      
      setTestResult(result);
      setTestComplete(true);
      toast.success("Speed test completed!");
    } catch (error) {
      console.error("Speed test error:", error);
      setHasError(true);
      toast.error('An error occurred during the speed test. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
        {/* Main Speed Display */}
        <div className="text-center space-y-2">
          {isLoading && (
            <div className="animate-pulse">
              <div className="text-6xl md:text-8xl font-bold mb-2">
                {Math.round(progress)}
              </div>
              <div className="text-xl text-foreground/70">
                {progressPhase === 'download' ? 'DOWNLOAD' : 
                 progressPhase === 'upload' ? 'UPLOAD' : 'PING'}
              </div>
            </div>
          )}
          
          {!isLoading && !testComplete && !hasError && (
            <div className="text-center animate-pulse">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Wifi className="w-16 h-16 text-primary" />
              </div>
              <p className="mt-4 text-foreground/70">
                Initializing speed test...
              </p>
            </div>
          )}
          
          {hasError && (
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
                <Wifi className="w-16 h-16 text-destructive" />
              </div>
              <p className="mt-4 text-destructive">
                Connection error. Please try again.
              </p>
              <Button 
                onClick={handleStartTest}
                className="mt-6 flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="mr-2" size={16} />
                Try Again
              </Button>
            </div>
          )}
          
          {testComplete && testResult && !showMoreDetails && (
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold mb-2">
                {Math.round(testResult.downloadSpeed)}
              </div>
              <div className="text-xl text-foreground/70 mb-8">MBPS</div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowMoreDetails(true)}
                className="flex items-center"
              >
                <Info className="mr-2" size={16} />
                Show more info
              </Button>
            </div>
          )}
        </div>
        
        {/* Detailed Results */}
        {testComplete && testResult && showMoreDetails && (
          <div className="w-full animate-fade-in">
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
                Test Again
              </Button>
            </div>
          </div>
        )}
        
        {/* Test Again Button */}
        {testComplete && !showMoreDetails && (
          <Button
            onClick={handleStartTest}
            className="mt-4 flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="mr-2" size={16} />
            Test Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;
