import { toast } from "sonner";

export interface TestResult {
  id: string;
  timestamp: number;
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  location: string;
  isp: string;
}

interface SpeedTestOptions {
  onProgress?: (progress: number, phase: 'download' | 'upload' | 'ping') => void;
}

// Function to simulate ISP detection (in a real application, you would use a geolocation API)
export function detectISP(): Promise<{ isp: string; location: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isp: "Example Internet Provider",
        location: "New York, US",
      });
    }, 500);
  });
}

// Function to simulate a ping test
export function testPing(): Promise<{ ping: number; jitter: number }> {
  return new Promise((resolve) => {
    const pingStart = performance.now();
    
    // Simulate network delay with random variation to mimic real-world conditions
    setTimeout(() => {
      const ping = Math.floor(Math.random() * 30) + 10; // Random ping between 10-40ms
      const jitter = Math.floor(Math.random() * 5) + 1; // Random jitter between 1-5ms
      
      resolve({ ping, jitter });
    }, Math.random() * 300 + 200);
  });
}

// Function to simulate download speed test
export function testDownloadSpeed(options?: SpeedTestOptions): Promise<number> {
  return new Promise((resolve) => {
    const totalSteps = 10;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      if (options?.onProgress) {
        options.onProgress(currentStep / totalSteps, 'download');
      }
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        
        // Simulated download speed between 10 and 150 Mbps
        const speed = Math.floor(Math.random() * 140) + 10;
        resolve(speed);
      }
    }, 300);
  });
}

// Function to simulate upload speed test
export function testUploadSpeed(options?: SpeedTestOptions): Promise<number> {
  return new Promise((resolve) => {
    const totalSteps = 8;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      
      if (options?.onProgress) {
        options.onProgress(currentStep / totalSteps, 'upload');
      }
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        
        // Simulated upload speed between 5 and 50 Mbps (typically lower than download)
        const speed = Math.floor(Math.random() * 45) + 5;
        resolve(speed);
      }
    }, 300);
  });
}

// Main function to run a complete speed test
export async function runSpeedTest(options?: SpeedTestOptions): Promise<TestResult> {
  try {
    // Detect ISP and location
    const { isp, location } = await detectISP();
    
    // Test ping
    const { ping, jitter } = await testPing();
    
    // Test download speed
    const downloadSpeed = await testDownloadSpeed(options);
    
    // Test upload speed
    const uploadSpeed = await testUploadSpeed(options);
    
    // Create and return the test result
    const result: TestResult = {
      id: generateTestId(),
      timestamp: Date.now(),
      downloadSpeed,
      uploadSpeed,
      ping,
      jitter,
      location,
      isp
    };
    
    // Save this result to local storage
    saveTestResult(result);
    
    return result;
  } catch (error) {
    console.error("Error running speed test:", error);
    toast.error("An error occurred while running the speed test. Please try again.");
    throw error;
  }
}

// Generate a unique ID for each test
function generateTestId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Save test result to localStorage
export function saveTestResult(result: TestResult): void {
  try {
    const savedResults = getSavedTestResults();
    savedResults.push(result);
    
    // Keep only the last 10 results
    if (savedResults.length > 10) {
      savedResults.shift();
    }
    
    localStorage.setItem('speedTestResults', JSON.stringify(savedResults));
  } catch (error) {
    console.error("Error saving test result:", error);
  }
}

// Get all saved test results from localStorage
export function getSavedTestResults(): TestResult[] {
  try {
    const savedResults = localStorage.getItem('speedTestResults');
    return savedResults ? JSON.parse(savedResults) : [];
  } catch (error) {
    console.error("Error getting saved test results:", error);
    return [];
  }
}

// Get speed quality label based on Mbps
export function getSpeedQuality(speedMbps: number): "slow" | "medium" | "fast" {
  if (speedMbps < 25) return "slow";
  if (speedMbps < 75) return "medium";
  return "fast";
}

// Get recommendations based on speed
export function getRecommendations(downloadSpeed: number): string[] {
  const recommendations: string[] = [];
  
  if (downloadSpeed < 10) {
    recommendations.push("Basic web browsing and email");
    recommendations.push("Standard definition video streaming (480p)");
  } else if (downloadSpeed < 25) {
    recommendations.push("HD video streaming (720p)");
    recommendations.push("Social media with photos and videos");
    recommendations.push("Video calls (1-to-1)");
  } else if (downloadSpeed < 50) {
    recommendations.push("Full HD video streaming (1080p)");
    recommendations.push("Online gaming (casual)");
    recommendations.push("Small file downloads");
    recommendations.push("Video calls (group)");
  } else if (downloadSpeed < 100) {
    recommendations.push("4K video streaming");
    recommendations.push("Online gaming (competitive)");
    recommendations.push("Medium-sized file downloads");
    recommendations.push("Multiple devices streaming simultaneously");
  } else {
    recommendations.push("4K/8K video streaming on multiple devices");
    recommendations.push("Competitive online gaming with low latency");
    recommendations.push("Large file downloads and uploads");
    recommendations.push("Cloud gaming services");
    recommendations.push("Supporting many connected devices simultaneously");
  }
  
  return recommendations;
}
