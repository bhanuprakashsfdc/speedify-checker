import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeywordDetail from "@/components/KeywordDetail";

const SEO: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Internet Speed Test Guides - Learn About Network Performance</title>
        <meta name="description" content="Comprehensive collection of internet speed test guides. Learn about network performance, troubleshooting, and optimization techniques." />
        <meta property="og:title" content="Internet Speed Test Guides - Learn About Network Performance" />
        <meta property="og:description" content="Comprehensive collection of internet speed test guides. Learn about network performance, troubleshooting, and optimization techniques." />
        <link rel="canonical" href="https://interentspeedtest.com/guides" />
      </Helmet>
      <Header />
      <main className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold mb-6">Internet Speed Test Guides</h1>
        <p className="text-lg mb-8">Explore our comprehensive collection of guides about internet speed testing, network performance, and connection optimization.</p>
        <KeywordDetail />
      </main>
      <Footer />
    </div>
  );
};


export default SEO;
