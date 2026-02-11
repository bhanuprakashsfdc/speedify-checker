import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAIL, EMAILURL } from "@/constants/constants";

const Contact: React.FC = () => {
  return (
    <div>
    <div className="flex min-h-screen flex-col">
      <Header /> 
    </div>
    <div>
     <div className="container mx-auto p-6 checkview">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-gray-600">We’re here to help with questions about speed tests, site content, or general feedback.</p>
        <div className="mt-4 space-y-3 text-gray-700">
          <p>
            Email: <a className="text-blue-600 underline" href={EMAILURL}>{EMAIL}</a>
          </p>
          <p>
            Please include details about your device, connection type (Wi‑Fi or Ethernet), and a brief description of your
            speed test results if you’re asking about performance.
          </p>
          <p>
            We aim to respond within a reasonable timeframe. Your feedback helps us improve {"interentspeedtest.com"} for everyone.
          </p>
        </div>
     </div>   
     </div>
      <div className="flex-grow">
         <Footer />
      </div>  
  </div>
  );
};

export default Contact;
