
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Download, Upload, Wifi, Globe, Building, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestResult, getSpeedQuality, getRecommendations } from '@/lib/speedtest';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ResultsCardProps {
  result: TestResult;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ result }) => {
  const downloadQuality = getSpeedQuality(result.downloadSpeed);
  const uploadQuality = getSpeedQuality(result.uploadSpeed);
  
  const recommendations = getRecommendations(result.downloadSpeed);
  
  const formattedDate = new Date(result.timestamp).toLocaleString();
  
  const handleShare = async () => {
    const shareText = `My internet speed: Download: ${result.downloadSpeed} Mbps, Upload: ${result.uploadSpeed} Mbps, Ping: ${result.ping} ms | Tested with Interent Speed Test`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Internet Speed Test Results',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success('Results copied to clipboard!');
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  return (
    <Card className="w-full overflow-hidden glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Speed Test Results</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-xs" 
            onClick={handleShare}
          >
            <Share2 className="mr-1" size={14} />
            Share
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="mr-3 p-2 bg-secondary rounded-md">
                <Download size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Download</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{result.downloadSpeed.toFixed(1)}</span>
                  <span className="ml-1 text-sm text-muted-foreground">Mbps</span>
                  <Badge 
                    className={cn(
                      "ml-2", 
                      {
                        "bg-speed-slow text-white": downloadQuality === "slow",
                        "bg-speed-medium text-white": downloadQuality === "medium",
                        "bg-speed-fast text-white": downloadQuality === "fast",
                      }
                    )}
                  >
                    {downloadQuality === "slow" ? "Slow" : downloadQuality === "medium" ? "Good" : "Fast"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 p-2 bg-secondary rounded-md">
                <Upload size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upload</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{result.uploadSpeed.toFixed(1)}</span>
                  <span className="ml-1 text-sm text-muted-foreground">Mbps</span>
                  <Badge 
                    className={cn(
                      "ml-2", 
                      {
                        "bg-speed-slow text-white": uploadQuality === "slow",
                        "bg-speed-medium text-white": uploadQuality === "medium",
                        "bg-speed-fast text-white": uploadQuality === "fast",
                      }
                    )}
                  >
                    {uploadQuality === "slow" ? "Slow" : uploadQuality === "medium" ? "Good" : "Fast"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 p-2 bg-secondary rounded-md">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ping / Jitter</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{result.ping}</span>
                  <span className="ml-1 text-sm text-muted-foreground">ms</span>
                  <span className="mx-2 text-muted-foreground">/</span>
                  <span className="text-2xl font-bold">{result.jitter}</span>
                  <span className="ml-1 text-sm text-muted-foreground">ms</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="mr-3 p-2 bg-secondary rounded-md">
                <Building size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Internet Service Provider</p>
                <p className="font-medium">{result.isp}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 p-2 bg-secondary rounded-md">
                <Globe size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-medium">{result.location}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Recommended for:</h4>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((rec, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/50">
                {rec}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
