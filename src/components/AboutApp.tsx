import React from "react";
import { WEBSITENAME } from "@/constants/constants";

const AboutApp: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold">{WEBSITENAME} - How It Works</h2>
      <p className="mt-4 text-lg text-gray-700">
        {WEBSITENAME} is an online tool designed to test your internet speed instantly.
        It provides detailed insights into your download and upload speeds, latency, and connection stability.
      </p>

      <h2 className="mt-8 text-2xl font-bold">How to Use {WEBSITENAME}?</h2>
      <ol className="mt-4 list-decimal list-inside space-y-2 text-lg">
        <li>Click the "Start Speed Test" button.</li>
        <li>Wait a few seconds while we measure your internet speed.</li>
        <li>View detailed results including Download Speed, Upload Speed, and Ping.</li>
        <li>Compare your results with global averages.</li>
      </ol>

      <h2 className="mt-8 text-2xl font-bold">Key Features</h2>
      <ul className="mt-4 list-disc list-inside space-y-2 text-lg">
        <li>Real-time internet speed testing.</li>
        <li>Accurate measurement of download & upload speeds.</li>
        <li>Ping & latency tracking for gaming and streaming.</li>
        <li>Optimized for both desktop and mobile devices.</li>
      </ul>
    </div>
  );
};

export default AboutApp;
