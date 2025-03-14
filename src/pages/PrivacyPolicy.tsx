import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WEBSITENAME, EMAIL, EMAILURL } from "@/constants/constants";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-gray-600">Last updated: March 14, 2025</p>

        <p className="mt-4">
          At {WEBSITENAME}, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and disclose information about you when you visit our website.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li><strong>Personal Data:</strong> When you contact us, subscribe to a newsletter, or use our services, we may collect your name, email address, and other details.</li>
          <li><strong>Usage Data:</strong> We automatically collect information on how you interact with our website, including IP addresses, browser type, and pages visited.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website performance.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6">
          <li>Provide, operate, and maintain our website.</li>
          <li>Improve and personalize user experience.</li>
          <li>Send updates, marketing communications, or important notices.</li>
          <li>Analyze website performance and detect security risks.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Sharing of Information</h2>
        <p>We do not sell, trade, or rent your personal information. However, we may share data with:</p>
        <ul className="list-disc pl-6">
          <li>Trusted third-party service providers for website operations.</li>
          <li>Law enforcement if required by law.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6">
          <li>Access, correct, or delete your personal data.</li>
          <li>Opt-out of marketing emails at any time.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Security</h2>
        <p>We take reasonable measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>

        <h2 className="mt-6 text-xl font-semibold">Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>

        <h2 className="mt-6 text-xl font-semibold">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, contact us at <a href={EMAILURL} className="text-blue-500 underline">{EMAIL}</a>.</p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
