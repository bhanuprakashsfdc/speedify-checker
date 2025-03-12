
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

// Function to get client's IP and location info
export async function detectISP(): Promise<{ isp: string; location: string }> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      isp: data.org || 'Unknown Provider',
      location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
    };
  } catch (error) {
    console.error("Error detecting ISP:", error);
    return {
      isp: "Unknown Provider",
      location: "Unknown Location",
    };
  }
}

// Function to measure actual ping
export async function testPing(): Promise<{ ping: number; jitter: number }> {
  const pingUrl = 'https://www.google.com'; // A reliable server to ping
  const pingTimes: number[] = [];
  const attempts = 5;
  
  for (let i = 0; i < attempts; i++) {
    const start = performance.now();
    try {
      await fetch(pingUrl, { 
        method: 'HEAD',
        cache: 'no-store',
        mode: 'no-cors'
      });
      const end = performance.now();
      pingTimes.push(end - start);
    } catch (error) {
      console.error("Ping test error:", error);
      // If fetch fails, use a higher value to indicate poor connection
      pingTimes.push(300);
    }
  }
  
  // Calculate average ping (excluding the highest value)
  pingTimes.sort((a, b) => a - b);
  const validPings = pingTimes.slice(0, pingTimes.length - 1);
  const avgPing = validPings.reduce((a, b) => a + b, 0) / validPings.length;
  
  // Calculate jitter (variation in ping)
  let jitterSum = 0;
  for (let i = 1; i < validPings.length; i++) {
    jitterSum += Math.abs(validPings[i] - validPings[i - 1]);
  }
  const jitter = validPings.length > 1 ? jitterSum / (validPings.length - 1) : 0;
  
  return { 
    ping: Math.round(avgPing), 
    jitter: Math.round(jitter)
  };
}

// Function to test actual download speed
export async function testDownloadSpeed(options?: SpeedTestOptions): Promise<number> {
  const fileSizes = [1, 2, 5, 10, 20]; // MB sizes for testing
  const downloadUrl = 'https://speed.cloudflare.com/__down?bytes=';
  
  let totalSpeed = 0;
  let testsCompleted = 0;
  const maxTests = fileSizes.length;
  
  for (let i = 0; i < maxTests; i++) {
    const fileSizeMB = fileSizes[i];
    const fileSizeBytes = fileSizeMB * 1024 * 1024;
    
    try {
      const startTime = performance.now();
      
      // Request the file with cache-busting
      const response = await fetch(`${downloadUrl}${fileSizeBytes}&cachebust=${Date.now()}`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`Download failed with status: ${response.status}`);
      }
      
      await response.arrayBuffer(); // Read the entire response
      
      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = (fileSizeMB * 8) / durationSeconds; // Convert to Mbps
      
      totalSpeed += speedMbps;
      testsCompleted++;
      
      if (options?.onProgress) {
        options.onProgress((i + 1) / maxTests * 100, 'download');
      }
      
    } catch (error) {
      console.error("Download test error:", error);
    }
  }
  
  if (testsCompleted === 0) {
    return 0; // No successful tests
  }
  
  return totalSpeed / testsCompleted; // Return average speed
}

// Function to test actual upload speed (simplified)
export async function testUploadSpeed(options?: SpeedTestOptions): Promise<number> {
  const uploadSizes = [1, 2, 3]; // MB sizes for testing
  const uploadUrl = 'https://speed.cloudflare.com/__up';
  
  let totalSpeed = 0;
  let testsCompleted = 0;
  const maxTests = uploadSizes.length;
  
  for (let i = 0; i < maxTests; i++) {
    const sizeMB = uploadSizes[i];
    const sizeBytes = sizeMB * 1024 * 1024;
    
    // Create payload of specified size
    const payload = new ArrayBuffer(sizeBytes);
    
    try {
      const startTime = performance.now();
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: payload,
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = (sizeMB * 8) / durationSeconds; // Convert to Mbps
      
      totalSpeed += speedMbps;
      testsCompleted++;
      
      if (options?.onProgress) {
        options.onProgress((i + 1) / maxTests * 100, 'upload');
      }
      
    } catch (error) {
      console.error("Upload test error:", error);
    }
  }
  
  if (testsCompleted === 0) {
    return 0; // No successful tests
  }
  
  return totalSpeed / testsCompleted; // Return average speed
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
