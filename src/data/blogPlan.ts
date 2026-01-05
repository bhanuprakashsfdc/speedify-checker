export interface BlogPlanItem {
  title: string;
  intent: string;
  keyword: string;
  wordCount: number;
}

export const blogPlan: BlogPlanItem[] = [
  {
    title: "How to Optimize Home Wi‑Fi for Stable Speeds",
    intent: "Informational – practical setup tips",
    keyword: "optimize home wifi speed",
    wordCount: 1400,
  },
  {
    title: "Mobile Data vs Wi‑Fi: When Each Performs Better",
    intent: "Comparative – choose the right connection",
    keyword: "wifi vs mobile data speed",
    wordCount: 1300,
  },
  {
    title: "5G vs Fiber: Which Is Right for Your Needs?",
    intent: "Comparative – technology selection",
    keyword: "5g vs fiber internet",
    wordCount: 1500,
  },
  {
    title: "Understanding Ping, Jitter, and Latency",
    intent: "Educational – explain metrics and impact",
    keyword: "ping jitter latency explained",
    wordCount: 1200,
  },
  {
    title: "ISP Troubleshooting: Steps Before You Call Support",
    intent: "Transactional – problem solving checklist",
    keyword: "isp troubleshooting steps",
    wordCount: 1200,
  },
  {
    title: "Speed Test Accuracy: Methods and Common Pitfalls",
    intent: "Educational – testing methodology",
    keyword: "speed test accuracy",
    wordCount: 1300,
  },
  {
    title: "Router Placement and Channel Selection Best Practices",
    intent: "Informational – wifi setup guide",
    keyword: "router placement best channel",
    wordCount: 1200,
  },
  {
    title: "How to Diagnose Evening Slowdowns and Congestion",
    intent: "Informational – network congestion analysis",
    keyword: "internet slow evening congestion",
    wordCount: 1200,
  },
  {
    title: "Upload Speed Matters: Workflows That Need More Upstream",
    intent: "Informational – use cases for high upload",
    keyword: "why upload speed matters",
    wordCount: 1100,
  },
  {
    title: "Gaming Network Setup: Low Ping Without Overkill",
    intent: "Transactional – setup guide",
    keyword: "reduce ping for gaming",
    wordCount: 1300,
  },
  {
    title: "Interpreting Speed Test Variability Over Time",
    intent: "Educational – time‑based analysis",
    keyword: "speed test variability",
    wordCount: 1200,
  },
  {
    title: "Fixing Packet Loss: Practical Tips for Home Networks",
    intent: "Transactional – fixes and prevention",
    keyword: "fix packet loss home network",
    wordCount: 1300,
  },
];