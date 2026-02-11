import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpeedTest from "@/components/SpeedTest";
import AboutApp from "@/components/AboutApp";
import { blogPosts } from "@/data/blogPosts";
import { formatBlogToUrl } from "@/lib/internalLinking";

const parseKeywordFromUrl = (keyword) => {
  if (!keyword) return "";
  return keyword.replace(/-/g, " ").replace(/\.html$/, "");
};

const KeywordDetail = () => {
  const { keyword } = useParams();
  const decodedKeyword = parseKeywordFromUrl(keyword);

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{`${decodedKeyword} Speed Test Guide - Internet Speed Test Tool`}</title>
        <meta name="description" content={`Comprehensive guide about ${decodedKeyword}. Learn how to measure internet speed, understand performance metrics, and optimize your connection for better results.`} />
        <meta name="author" content="Internet Speed Test" />
        <link rel="canonical" href={`https://www.interentspeedtest.com/guide/${keyword}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.interentspeedtest.com/guide/${keyword}`} />
        <meta property="og:title" content={`${decodedKeyword} Speed Test Guide - Internet Speed Test Tool`} />
        <meta property="og:description" content={`Comprehensive guide about ${decodedKeyword}. Learn how to measure internet speed, understand performance metrics, and optimize your connection for better results.`} />
        <meta property="og:image" content="https://interentspeedtest.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://www.interentspeedtest.com/guide/${keyword}`} />
        <meta name="twitter:title" content={`${decodedKeyword} Speed Test Guide - Internet Speed Test Tool`} />
        <meta name="twitter:description" content={`Comprehensive guide about ${decodedKeyword}. Learn how to measure internet speed, understand performance metrics, and optimize your connection for better results.`} />
        <meta name="twitter:image" content="https://interentspeedtest.com/og-image.png" />
        <meta name="twitter:creator" content="@SpeedifyChecker" />
        <meta name="twitter:site" content="@SpeedifyChecker" />
        <meta name="keywords" content={`${decodedKeyword}, internet speed test, bandwidth measurement, connection performance, download speed test, upload speed test, latency test, network diagnostics`} />
      </Helmet>
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <SpeedTest />
        <AboutApp />
      {/*  <h1 className="text-3xl font-bold mb-4">{decodedKeyword}</h1>
       <article className="prose lg:prose-lg" dangerouslySetInnerHTML={{ __html: blogContent }} />  */}       
      {/* Blog Post Code*/}
        <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          The Ultimate Guide to {decodedKeyword}: Everything You Need to Know
        </h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Introduction to {decodedKeyword}</h2>
          <p>
            In today's digital age, a fast and reliable internet connection is essential for work, entertainment, and communication.
            Whether you're streaming your favorite shows, attending virtual meetings, or gaming online, internet speed plays a crucial role in your experience.
            This is where speed tests come in. But how do they work? And how can you ensure accurate results?
          </p>
        </section>
        
        {/* Related Blog Posts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts
              .filter(post => post.keywords.some(k => 
                k.toLowerCase().includes(decodedKeyword.toLowerCase()) || 
                decodedKeyword.toLowerCase().includes(k.toLowerCase())
              ))
              .slice(0, 4)
              .map(post => (
                <Link 
                  key={post.id}
                  to={formatBlogToUrl(post.slug)}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt.substring(0, 100)}...</p>
                </Link>
              ))}
          </div>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">What is {decodedKeyword}?</h2>
          <p>
            An {decodedKeyword} is a tool that measures the performance of your internet connection.
            It evaluates various metrics, including:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Download Speed</strong> – The rate at which data is transferred from the internet to your device (measured in Mbps).</li>
            <li><strong>Upload Speed</strong> – The rate at which data is sent from your device to the internet (measured in Mbps).</li>
            <li><strong>Ping (Latency)</strong> – The time it takes for a data packet to travel to a server and back (measured in milliseconds).</li>
            <li><strong>Jitter</strong> – The variation in ping times, which affects stability.</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Why is {decodedKeyword} Important?</h2>
          <ul className="list-disc pl-6">
            <li>Verify your ISP’s promised speeds.</li>
            <li>Diagnose connection issues.</li>
            <li>Optimize performance by detecting network congestion, outdated hardware, or interference.</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Best Practices for Accurate {decodedKeyword} Results</h2>
          <ul className="list-disc pl-6">
            <li>Use a wired connection whenever possible.</li>
            <li>Close unnecessary applications and pause background downloads.</li>
            <li>Restart your router and modem before testing.</li>
            <li>Test multiple times at different times of the day to identify fluctuations.</li>
            <li>Choose a reliable {decodedKeyword} service like <a href="https://interentspeedtest.com" className="text-blue-500">InterentSpeedTest.com</a>.</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
          <p>
          {decodedKeyword} are valuable tools for assessing your connection quality and troubleshooting performance issues.
            Regularly testing and optimizing your internet can make a huge difference in speed and reliability.
          </p>
          <p>
            Test your internet speed now with <a href="https://interentspeedtest.com" className="text-blue-500">InterentSpeedTest.com</a> to see how your connection performs!
          </p>
        </section>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default KeywordDetail;
