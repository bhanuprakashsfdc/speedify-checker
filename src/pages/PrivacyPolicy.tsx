import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WEBSITENAME, EMAIL, EMAILURL } from "@/constants/constants";
import { DynamicSEO } from '@/pages/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DynamicSEO
        title={`Privacy Policy - ${WEBSITENAME}`}
        description={`Read the privacy policy for ${WEBSITENAME} to understand how we collect, use, and protect your information when you use our internet speed test services.`}
        canonicalUrl="https://www.interentspeedtest.com/privacy-policy.html"
        ogUrl="https://www.interentspeedtest.com/privacy-policy.html"
        ogImage="https://www.interentspeedtest.com/og-image.png"
        twitterUrl="https://www.interentspeedtest.com/privacy-policy.html"
        twitterTitle={`Privacy Policy - ${WEBSITENAME}`}
        twitterDescription={`Read the privacy policy for ${WEBSITENAME} to understand how we collect, use, and protect your information when you use our internet speed test services.`}
        twitterImage="https://www.interentspeedtest.com/og-image.png"
        twitterCreator="@SpeedifyChecker"
        twitterSite="@SpeedifyChecker"
      />
      <Header />
      <div className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-gray-600">Last updated: March 14, 2025</p>

        <p className="mt-4">
          This Privacy Policy describes how {WEBSITENAME} ("we", "us", or "our") collects, uses, and shares
          information when you visit <strong>interentspeedtest.com</strong> or use our services. We are committed to
          handling data responsibly, transparently, and in compliance with applicable laws.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Personal Information:</strong> If you contact us (e.g., via email), we may collect your name,
            email address, and the content of your message.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect non-identifying information about your interactions with our site,
            such as IP address, device type, browser version, pages visited, and referring/exit pages.
          </li>
          <li>
            <strong>Cookies and Similar Technologies:</strong> We and our partners use cookies to maintain site
            functionality, remember preferences, measure performance, and, where applicable, serve relevant ads.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">How We Use Your Information</h2>
        <ul className="list-disc pl-6">
          <li>Operate, maintain, and improve site functionality and user experience.</li>
          <li>Respond to inquiries and provide customer support.</li>
          <li>Analyze aggregate usage to understand performance and reliability.</li>
          <li>Comply with legal obligations and enforce our policies.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Advertising and Google AdSense</h2>
        <p>
          We may use <strong>Google AdSense</strong> to display ads. Google, as a third-party vendor, uses cookies to serve
          ads on our site. Google’s use of advertising cookies enables it and its partners to serve ads to users based on
          their visits to this and other websites. You can opt out of personalized advertising by visiting Google’s Ads
          Settings or <a href="https://www.aboutads.info/choices" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">AboutAds</a>.
        </p>
        <ul className="list-disc pl-6">
          <li>
            Third-party vendors, including Google, may use cookies to serve ads based on your prior visits.
          </li>
          <li>
            You may opt out of personalized ads from some third-party vendors via the <a href="https://www.aboutads.info/choices" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">AboutAds</a> page.
          </li>
          <li>
            For more information, review <a href="https://policies.google.com/technologies/ads" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Google’s Advertising Policies</a>.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Cookies and Controls</h2>
        <p>
          Cookies are small files stored on your device. We use them to remember preferences, improve performance, and
          support essential features. You can manage cookies through your browser settings and, where available, through
          consent tools displayed on the site. Disabling cookies may affect certain functionalities.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Data Sharing</h2>
        <p>
          We do not sell personal information. We may share limited data with service providers who help operate our
          website (e.g., hosting, security, analytics) under confidentiality obligations. We may also share information
          if required by law or to protect our rights and users.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Your Rights</h2>
        <ul className="list-disc pl-6">
          <li>Access, correct, or delete personal information you have provided.</li>
          <li>Opt out of certain processing, including personalized advertising, where applicable.</li>
          <li>
            For residents of regions with specific privacy laws (e.g., GDPR, CCPA/CPRA), additional rights may apply.
            Contact us to exercise these rights.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Data Retention and Security</h2>
        <p>
          We retain personal information only as long as necessary for the purposes described in this policy or as
          required by law. We use reasonable safeguards to protect data; however, no method of transmission or storage is
          completely secure.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Children’s Privacy</h2>
        <p>
          Our services are not directed to children under 13. We do not knowingly collect personal information from
          children. If you believe a child has provided us with personal data, please contact us so we can delete it.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Links to Other Websites</h2>
        <p>
          Our site may contain links to external websites. We are not responsible for the privacy practices or content of
          those sites. Please review their policies before providing any information.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes to our practices. Updates will be posted on this page
          with a new effective date.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Contact Us</h2>
        <p>
          If you have questions or requests related to privacy, contact us at
          <a href={EMAILURL} className="text-blue-500 underline"> {EMAIL}</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
