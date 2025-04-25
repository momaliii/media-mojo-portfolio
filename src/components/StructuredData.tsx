
import React from 'react';

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Mohamed Ali - Media Buyer",
    "description": "Senior Media Buyer with 5+ years of experience optimizing campaigns across Meta, LinkedIn, TikTok, Snapchat, Twitter, and Google Ads.",
    "image": "https://lovable.dev/opengraph-image-p98pqg.png",
    "url": "https://mediamojomarketing.com/",
    "telephone": "+201060098267",
    "email": "mhmd167ali@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "addressCountry": "Egypt"
    },
    "priceRange": "$$",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00",
    "keywords": "media buyer, digital marketing, ad campaigns, Meta ads, LinkedIn ads, TikTok ads, performance marketing",
    "sameAs": [
      "https://www.linkedin.com/in/mhmdali02/"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 30.0444,
        "longitude": 31.2357
      },
      "geoRadius": "10000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Media Buying & Strategy",
          "description": "Strategic campaign management across multiple platforms"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Performance Optimization",
          "description": "Advanced targeting strategies and funnel optimization"
        }
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
