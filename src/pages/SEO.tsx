import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeywordDetail from "@/components/KeywordDetail";

const SEO: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold">Welcome to Our Speed Test Blog</h1>
        <p>Explore various articles on speed tests, internet performance, and more.</p>
        <KeywordDetail />
      </main>
    </div>
  );
};

export default SEO;
