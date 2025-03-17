import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TestResult, getSavedTestResults, getSpeedQuality } from "@/lib/speedtest";
import { cn } from "@/lib/utils";

const TestHistory: React.FC = () => {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Load history on mount and listen for storage updates
  useEffect(() => {
    const loadHistory = () => {
      const results = getSavedTestResults() || [];
      setHistory(results.sort((a, b) => b.timestamp - a.timestamp));
    };

    loadHistory();

    // Fallback method: Check storage every 5 seconds
    const interval = setInterval(loadHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for visibility animation
  useEffect(() => {
    const element = document.getElementById("history-section");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("speedTestResults");
    setHistory([]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Test History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No test history available yet. Run a speed test to see your results here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all duration-500 glass-card",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test History</CardTitle>
        <Button variant="outline" size="sm" onClick={clearHistory} className="text-xs flex items-center">
          <Trash2 className="mr-1" size={14} />
          Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Download</TableHead>
                <TableHead>Upload</TableHead>
                <TableHead>Ping</TableHead>
                <TableHead>ISP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((result) => (
                <TableRow key={result.id || result.timestamp}>
                  <TableCell className="font-medium">{formatDate(result.timestamp)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{result.downloadSpeed.toFixed(1)} Mbps</span>
                      <Badge
                        className={cn("ml-2", {
                          "bg-speed-slow text-white": getSpeedQuality(result.downloadSpeed) === "slow",
                          "bg-speed-medium text-white": getSpeedQuality(result.downloadSpeed) === "medium",
                          "bg-speed-fast text-white": getSpeedQuality(result.downloadSpeed) === "fast",
                        })}
                      >
                        {getSpeedQuality(result.downloadSpeed) === "slow"
                          ? "Slow"
                          : getSpeedQuality(result.downloadSpeed) === "medium"
                          ? "Good"
                          : "Fast"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{result.uploadSpeed.toFixed(1)} Mbps</TableCell>
                  <TableCell>{result.ping} ms</TableCell>
                  <TableCell>{result.isp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestHistory;
