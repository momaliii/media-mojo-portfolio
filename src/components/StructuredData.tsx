
import React from 'react';

const StructuredData = () => {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : "https://mediamojomarketing.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Mohamed Ali",
        "alternateName": "Mohamed Ali Media Buyer",
        "description": "Senior Media Buyer with 6+ years of experience driving exceptional results across 10+ countries. Specializing in Meta Ads, Google Ads, TikTok, and Snapchat with proven ROAS of 8x+ and 95K+ orders generated.",
        "image": `${baseUrl}/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png`,
        "url": baseUrl,
        "telephone": "+201060098267",
        "email": "mhmd167ali@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Cairo",
          "addressRegion": "Cairo Governorate",
          "addressCountry": "EG"
        },
        "sameAs": [
          "https://www.linkedin.com/in/mhmdali02/"
        ],
        "knowsAbout": [
          "Digital Marketing",
          "Media Buying",
          "Performance Marketing",
          "E-commerce Advertising",
          "Social Media Marketing",
          "Conversion Optimization",
          "Campaign Management"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "name": "6+ Years Media Buying Experience",
          "description": "Proven track record with 8x+ ROAS and 95K+ orders generated"
        },
        "jobTitle": "Senior Media Buyer",
        "worksFor": {
          "@id": `${baseUrl}/#organization`
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Mohamed Ali Media Buying Services",
        "description": "Expert media buying and digital marketing services specializing in Meta Ads, Google Ads, TikTok, and Snapchat advertising.",
        "provider": {
          "@id": `${baseUrl}/#person`
        },
        "areaServed": {
          "@type": "Country",
          "name": "Worldwide"
        },
        "serviceType": "Digital Marketing",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Media Buying Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Meta Ads Management",
                "description": "Strategic Facebook and Instagram advertising campaigns with advanced targeting and optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Google Ads Optimization",
                "description": "Search and display advertising with conversion-focused strategies"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "TikTok & Snapchat Advertising",
                "description": "Social media advertising for younger demographics with creative optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Performance Marketing Consulting",
                "description": "Complete campaign strategy, optimization, and performance analysis"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "name": "Mohamed Ali - Media Buyer",
        "url": baseUrl,
        "description": "Senior Media Buyer portfolio showcasing digital marketing expertise and case studies",
        "publisher": {
          "@id": `${baseUrl}/#person`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/case-studies?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+201060098267",
        "contactType": "Customer Service",
        "email": "mhmd167ali@gmail.com",
        "availableLanguage": ["English", "Arabic"],
        "areaServed": "Worldwide"
      }
    ]
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default StructuredData;
