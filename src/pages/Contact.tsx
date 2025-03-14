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
        <p className="mt-2 text-gray-600">For any queries, reach us at: <a href={EMAILURL}>{EMAIL}</a></p>
     </div>   
     </div>
      <div className="flex-grow">
         <Footer />
      </div>  
  </div>
  );
};

export default Contact;
