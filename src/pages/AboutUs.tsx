import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WEBSITENAME } from "@/constants/constants";
import { DynamicSEO } from '@/pages/SEO';

const AboutUs: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <DynamicSEO
        title={`About Us - ${WEBSITENAME}`}
        description={`Learn more about ${WEBSITENAME}, our mission to provide accurate internet speed tests, and our commitment to transparency and user education.`}
        canonicalUrl="https://www.interentspeedtest.com/about-us.html"
        ogUrl="https://www.interentspeedtest.com/about-us.html"
        ogImage="https://www.interentspeedtest.com/og-image.png"
        twitterUrl="https://www.interentspeedtest.com/about-us.html"
        twitterTitle={`About Us - ${WEBSITENAME}`}
        twitterDescription={`Learn more about ${WEBSITENAME}, our mission to provide accurate internet speed tests, and our commitment to transparency and user education.`}
        twitterImage="https://www.interentspeedtest.com/og-image.png"
        twitterCreator="@SpeedifyChecker"
        twitterSite="@SpeedifyChecker"
      />
      <Header />

      <div className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold text-center">About Us</h1>

        <p className="mt-4 text-gray-600 text-center">
          {WEBSITENAME} helps people understand and improve their internet performance. We build clear,
          reliable speed testing and educational resources so anyone—on any device—can measure download,
          upload, and ping and make informed decisions about their home or mobile connection.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-gray-600">
            Provide accurate, easy‑to‑read speed measurements and practical, unbiased guidance. We believe
            better transparency about network performance leads to better online experiences for everyone.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="mt-2 text-gray-600">
            We are engineers and content strategists focused on utility‑first tools. Our approach blends
            careful measurement, accessible explanations, and user‑centric design—so the data makes sense,
            not just numbers on a screen.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <ul className="mt-2 text-gray-600 list-disc list-inside space-y-2">
            <li><strong>Speed Testing:</strong> Download, upload, and ping results captured with practical methodology.</li>
            <li><strong>Educational Content:</strong> Clear guidance on interpreting results and improving performance.</li>
            <li><strong>Device Agnostic:</strong> Works on desktop, mobile, and tablet environments.</li>
            <li><strong>Privacy‑Aware:</strong> Sensible data practices with straightforward policy and controls.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Editorial Standards</h2>
          <p className="mt-2 text-gray-600">
            Content is written for global audiences, reviewed for clarity, and kept free of sales language.
            We focus on practical explanations and actionable steps that work in real homes and offices.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Independence</h2>
          <p className="mt-2 text-gray-600">
            {WEBSITENAME} is a publisher and tool provider. Any advertising placements follow platform policies
            and do not influence how we measure or present speed test results.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-gray-600">
            Questions, feedback, or suggestions? Visit our Contact page or email the team—your input helps
            us improve the experience for everyone.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
