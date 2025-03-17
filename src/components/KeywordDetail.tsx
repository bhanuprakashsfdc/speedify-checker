import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const generateBlogContent = (keyword: string) => {
  return `
  ## Introduction
  In today's digital age, ${keyword} plays a crucial role in optimizing internet performance.

  ## What is ${keyword}?
  ${keyword} is a method used to analyze and measure the speed of internet connections. It ensures users get the bandwidth they pay for.

  ## Importance of ${keyword}
  - Ensures stable connectivity
  - Identifies slow network issues
  - Helps in upgrading plans for better performance

  ## How to Perform a ${keyword}?
  1. Use online ${keyword} tools.
  2. Check both download and upload speeds.
  3. Compare results with ISP promises.

  ## Best Tools for ${keyword}
  - Speedtest.net by Ookla
  - Fast.com by Netflix
  - Google Internet Speed Test

  ## Conclusion
  ${keyword} helps users diagnose internet issues effectively. It’s recommended to perform regular tests to ensure a seamless experience.

  ---  
  _For more insights on ${keyword}, stay tuned!_
  `;
};

const parseKeywordFromUrl = (keyword: string | undefined) => {
  if (!keyword) return "";
  return keyword.replace(/-/g, " ").replace(/\.html$/, "");
};

const KeywordDetail: React.FC = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const decodedKeyword = parseKeywordFromUrl(keyword);
  const blogContent = generateBlogContent(decodedKeyword);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-4">{decodedKeyword}</h1>
        <article className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: blogContent }} />
      </main>
      <Footer />
    </div>
  );
};

export default KeywordDetail;
