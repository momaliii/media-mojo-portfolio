
import React from 'react';

const StructuredData = () => {
  const baseUrl = "https://media-mojo-portfolio.lovable.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Mohamed Ali",
        "alternateName": "Mohamed Ali Media Buyer",
        "description": "Senior Media Buyer with 7+ years of experience across MENA markets, specializing in Meta, Google, TikTok and Snapchat advertising, with $5M+ Snapchat spend managed and 2B+ impressions delivered.",
        "image": `${baseUrl}/lovable-uploads/900c6176-4030-4244-a97a-62a4c235d53f.png`,
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
        "jobTitle": "Senior Media Buyer",
        "worksFor": { "@id": `${baseUrl}/#organization` }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Mohamed Ali Media Buying Services",
        "description": "Expert media buying and digital marketing services specializing in Meta Ads, Google Ads, TikTok, and Snapchat advertising.",
        "url": baseUrl,
        "email": "mhmd167ali@gmail.com",
        "telephone": "+201060098267",
        "address": { "@type": "PostalAddress", "addressLocality": "Cairo", "addressCountry": "EG" },
        "areaServed": ["Egypt", "Saudi Arabia", "Oman", "Jordan"],
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
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+201060098267",
        "contactType": "Customer Service",
        "email": "mhmd167ali@gmail.com",
        "availableLanguage": ["English", "Arabic"],
        "areaServed": ["EG", "SA", "OM", "JO"]
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
