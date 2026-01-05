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
          These Terms and Conditions ("Terms") govern your access to and use of <strong>interentspeedtest.com</strong> and
          any content, features, or services provided by {WEBSITENAME}. By using the Service, you agree to be bound by these
          Terms. If you do not agree, you should not use the Service.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Definitions</h2>
        <ul className="list-disc pl-6">
          <li><strong>Service</strong>: The website, content, tools, and related functionality provided by {WEBSITENAME}.</li>
          <li><strong>Device</strong>: Any device capable of accessing the Service, including computers, phones, or tablets.</li>
          <li><strong>User</strong> ("you"): Any individual or entity that accesses or uses the Service.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Acceptable Use</h2>
        <ul className="list-disc pl-6">
          <li>Do not interfere with the proper operation of the Service or attempt to access it using automated means beyond normal browsing.</li>
          <li>Do not introduce malware, attempt to breach security, or engage in any activity that could harm the Service or other users.</li>
          <li>Do not use the Service to violate any applicable laws or regulations.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Intellectual Property</h2>
        <p>
          The content, design, and functionality of the Service are owned by or licensed to {WEBSITENAME}. You may not copy,
          distribute, modify, or create derivative works without written permission, except as permitted by applicable law.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Links to Other Websites</h2>
        <p>
          The Service may include links to third-party websites. We are not responsible for their content, policies, or
          practices. Visiting those sites is at your own risk.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Availability and Changes</h2>
        <p>
          We may update, modify, or suspend parts of the Service at any time, including for maintenance or improvements.
          We make reasonable efforts to provide a reliable experience but do not guarantee uninterrupted availability.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Disclaimer</h2>
        <p>
          The Service is provided on an "as is" and "as available" basis. While we aim for accurate measurements, results
          can vary due to factors outside our control (device, network conditions, routing, congestion). Use the results
          as a practical guide rather than a guarantee.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, {WEBSITENAME} is not liable for indirect, incidental, special, or
          consequential damages arising from your use of the Service. Our total liability for any claim is limited to the
          amount (if any) you paid to use the Service.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Governing Law</h2>
        <p>
          These Terms are governed by the laws of India, without regard to conflict of law rules. Disputes shall be
          resolved in the courts of the jurisdiction where {WEBSITENAME} operates.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Changes to These Terms</h2>
        <p>
          We may revise these Terms from time to time. The most current version will be posted on the Service with the
          effective date. Continued use after changes indicates acceptance of the updated Terms.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Contact Us</h2>
        <p>
          For questions about these Terms, contact us at <a href={EMAILURL} className="text-blue-500 underline">{EMAIL}</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
