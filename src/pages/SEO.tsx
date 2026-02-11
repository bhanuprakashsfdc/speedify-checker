import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import KeywordDetail from "@/components/KeywordDetail";

interface DynamicSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterCreator?: string;
  twitterSite?: string;
  twitterUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: Record<string, any>[];
}

export const DynamicSEO: React.FC<DynamicSEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogUrl,
  ogImage,
  twitterCard = "summary_large_image",
  twitterCreator,
  twitterSite,
  twitterUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      {twitterUrl && <meta property="twitter:url" content={twitterUrl} />}
      <meta property="twitter:title" content={twitterTitle || title} />
      <meta property="twitter:description" content={twitterDescription || description} />
      {twitterImage && <meta property="twitter:image" content={twitterImage} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {/* JSON-LD */}
      {jsonLd &&
        jsonLd.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Helmet>
  );
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Internet Speed Test",
  "url": "https://www.interentspeedtest.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.interentspeedtest.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "operatingSystem": "Any",
  "applicationCategory": "Utilities",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an internet speed test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An internet speed test measures the connection speed and quality of your connected device to the internet. It typically measures your download speed, upload speed, and ping (latency)."
      }
    },
    {
      "@type": "Question",
      "name": "How does an internet speed test work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Speed tests work by downloading and uploading small files to and from a nearby server. By measuring the time it takes to transfer these files, the test can calculate your download and upload speeds."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good internet speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good internet speed depends on your usage. For basic browsing and email, 10-25 Mbps is sufficient. For streaming HD video, 25-50 Mbps is recommended. For 4K streaming, online gaming, or multiple users, 50-100+ Mbps is ideal."
      }
    }
  ]
};

export const breadcrumbListSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.interentspeedtest.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Guides",
      "item": "https://www.interentspeedtest.com/guides"
    }
  ]
};

const SEO: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <DynamicSEO
        title="Internet Speed Test Guides - Learn About Network Performance"
        description="Comprehensive collection of internet speed test guides. Learn about network performance, troubleshooting, and optimization techniques."
        canonicalUrl="https://www.interentspeedtest.com/guides"
        ogUrl="https://www.interentspeedtest.com/guides"
        twitterUrl="https://www.interentspeedtest.com/guides"
        twitterTitle="Internet Speed Test Guides - Learn About Network Performance"
        twitterDescription="Comprehensive collection of internet speed test guides. Learn about network performance, troubleshooting, and optimization techniques."
        twitterCreator="@SpeedifyChecker"
        twitterSite="@SpeedifyChecker"
        jsonLd={[webApplicationSchema, faqPageSchema, breadcrumbListSchema]}
      />
      <Header />
      <main className="container mx-auto p-6 flex-grow checkview">
        <h1 className="text-3xl font-bold mb-6">Internet Speed Test Guides</h1>
        <p className="text-lg mb-8">Explore our comprehensive collection of guides about internet speed testing, network performance, and connection optimization.</p>
        <KeywordDetail />
      </main>
    </div>
  );
};

export default SEO;

export const runSeoAudit = () => {
  const issues: string[] = [];

  // Check for title tag
  if (!document.title || document.title.length === 0) {
    issues.push("Missing or empty title tag.");
  }

  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.getAttribute("content") || metaDescription.getAttribute("content")?.length === 0) {
    issues.push("Missing or empty meta description.");
  }

  // Check for canonical tag
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink || !canonicalLink.getAttribute("href") || canonicalLink.getAttribute("href")?.length === 0) {
    issues.push("Missing or empty canonical tag.");
  }

  // Check for H1 tag
  const h1Tag = document.querySelector('h1');
  if (!h1Tag || h1Tag.textContent?.length === 0) {
    issues.push("Missing or empty H1 tag.");
  }

  // Check for image alt attributes (basic check)
  document.querySelectorAll('img').forEach((img, index) => {
    if (!img.getAttribute('alt') || img.getAttribute('alt')?.length === 0) {
      issues.push(`Image at index ${index} is missing an alt attribute.`);
    }
  });

  if (issues.length === 0) {
    console.log("SEO Audit: No major issues found.");
  } else {
    console.warn("SEO Audit: Found issues:", issues);
  }
  return issues;
};

