import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WEBSITENAME, EMAIL, EMAILURL } from "@/constants/constants";
import './pages.css';

const TermsConditions: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        <p className="mt-2 text-gray-600">Last updated: March 14, 2025</p>

        <p className="mt-4">
          Please read these terms and conditions carefully before using our service.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Interpretation and Definitions</h2>
        <p>
          The words with capitalized initial letters have defined meanings under the following conditions. The same definitions apply regardless of singular or plural usage.
        </p>

        <h3 className="mt-4 font-semibold">Definitions</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Company</strong> (referred to as "We", "Us", or "Our") refers to {WEBSITENAME}.
          </li>
          <li>
            <strong>Service</strong> refers to the website accessible from our domain.
          </li>
          <li>
            <strong>Device</strong> means any device such as a computer, mobile phone, or tablet that can access our Service.
          </li>
          <li>
            <strong>You</strong> means the individual accessing our Service or the company/legal entity on whose behalf such individual is using our Service.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Acknowledgment</h2>
        <p>
          These Terms govern the use of this Service and form a binding agreement between You and {WEBSITENAME}.
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you may not access the Service.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Links to Other Websites</h2>
        <p>
          Our Service may contain links to third-party websites that are not controlled by {WEBSITENAME}. We take no responsibility for their content or policies.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Termination</h2>
        <p>
          We may terminate or suspend your access to the Service without notice for any breach of these Terms.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {WEBSITENAME} shall not be liable for indirect, incidental, or consequential damages.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of India, without regard to conflict of law provisions.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Changes to These Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be posted on our website, and continued use of the Service after updates constitutes acceptance of the new terms.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, you can contact us at <a href={EMAILURL} className="text-blue-500 underline">{EMAIL}</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
