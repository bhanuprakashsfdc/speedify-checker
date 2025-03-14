import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WEBSITENAME } from "@/constants/constants";
const AboutUs: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold text-center">About Us</h1>

        <p className="mt-4 text-gray-600 text-center">
          Welcome to { WEBSITENAME }, your trusted internet speed testing platform. At { WEBSITENAME }, we are 
          dedicated to providing accurate and reliable speed test results to help you understand and 
          optimize your internet connection.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-gray-600">
            Our mission is simple: to empower individuals and businesses with precise 
            internet speed analysis. We believe that by providing transparent and detailed 
            insights, users can make informed decisions about their connectivity and network performance.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="mt-2 text-gray-600">
            Founded in 2024, { WEBSITENAME } was created by a team of network professionals and tech enthusiasts 
            who understand the importance of a  fast, stable, and reliable internet connection . Whether 
            you're a gamer, streamer, remote worker, or business owner, we provide the tools you need to 
            assess and enhance your internet performance.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <ul className="mt-2 text-gray-600 list-disc list-inside space-y-2">
            <li>
              <strong>Accurate Speed Tests:</strong> Measure your  download, upload, ping, and jitter  with real-time results.
            </li>
            <li>
              <strong>Performance Insights:</strong> Get a detailed breakdown of your network stability and speed trends.
            </li>
            <li>
              <strong>Device Compatibility:</strong> Access { WEBSITENAME } from  any device —desktop, mobile, or tablet.
            </li>
            <li>
              <strong>ISP Comparisons:</strong> Compare your internet speed with national and global averages to evaluate performance.
            </li>
            <li>
              <strong>Network Optimization Tips:</strong> Receive personalized recommendations to  improve your connection .
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <ul className="mt-2 text-gray-600 list-disc list-inside space-y-2">
            <li>
              <strong>Accuracy:</strong> We ensure precise speed test results with  real-time data processing .
            </li>
            <li>
              <strong>Transparency:</strong> No hidden metrics—just  clear, honest  insights into your internet performance.
            </li>
            <li>
              <strong>User Focus:</strong> We continuously improve our platform based on  user feedback and emerging technologies .
            </li>
            <li>
              <strong>Innovation:</strong> We leverage the latest technology to  deliver fast and reliable speed analysis .
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Join Us on Our Journey</h2>
          <p className="mt-2 text-gray-600">
            We are thrilled to have you on this journey toward better internet performance. Whether 
            you're troubleshooting slow speeds or optimizing your network for peak efficiency, 
            { WEBSITENAME } is here to help. Thank you for choosing us!
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
