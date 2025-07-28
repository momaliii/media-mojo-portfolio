
import React from 'react';

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Person", "Organization"],
    "name": "Mohamed Ali - Expert Media Buyer",
    "alternateName": "Mohamed Ali Media Buyer",
    "description": "Senior Media Buyer with 6+ years of experience driving exceptional results across 10+ countries. Specializing in Meta Ads, Google Ads, TikTok, and Snapchat with proven ROAS of 8x+ and 95K+ orders generated.",
    "image": [
      "https://mediamojomarketing.com/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png",
      "https://mediamojomarketing.com/favicon.ico"
    ],
    "logo": "https://mediamojomarketing.com/favicon.ico",
    "url": "https://mediamojomarketing.com/",
    "mainEntityOfPage": "https://mediamojomarketing.com/",
    "telephone": "+201060098267",
    "email": "mhmd167ali@gmail.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201060098267",
      "contactType": "Customer Service",
      "email": "mhmd167ali@gmail.com",
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "addressRegion": "Cairo Governorate",
      "addressCountry": "Egypt",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.0444,
        "longitude": 31.2357
      }
    },
    "priceRange": "$$",
    "openingHours": ["Mo-Fr 09:00-18:00"],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "keywords": [
      "media buyer expert",
      "digital marketing specialist", 
      "Meta Ads manager",
      "Google Ads expert",
      "TikTok advertising",
      "Snapchat Ads",
      "ROAS optimization",
      "e-commerce marketing",
      "performance marketing",
      "conversion optimization",
      "remote media buyer",
      "campaign management"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/mhmdali02/",
      "https://mediamojomarketing.com/"
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
    "serviceArea": [
      {
        "@type": "Country",
        "name": "Egypt"
      },
      {
        "@type": "Text",
        "name": "Global Remote Services"
      }
    ],
    "areaServed": "Worldwide",
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Meta Ads Management",
          "description": "Strategic Facebook and Instagram advertising campaigns with advanced targeting and optimization",
          "category": "Digital Marketing Service",
          "provider": {
            "@type": "Person",
            "name": "Mohamed Ali"
          }
        },
        "availability": "InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Ads Optimization",
          "description": "Search and display advertising with conversion-focused strategies",
          "category": "Digital Marketing Service",
          "provider": {
            "@type": "Person",
            "name": "Mohamed Ali"
          }
        },
        "availability": "InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TikTok & Snapchat Advertising",
          "description": "Social media advertising for younger demographics with creative optimization",
          "category": "Digital Marketing Service",
          "provider": {
            "@type": "Person",
            "name": "Mohamed Ali"
          }
        },
        "availability": "InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Performance Marketing Consulting",
          "description": "Complete campaign strategy, optimization, and performance analysis",
          "category": "Digital Marketing Service",
          "provider": {
            "@type": "Person",
            "name": "Mohamed Ali"
          }
        },
        "availability": "InStock"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "50+"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Client Testimonial"
        },
        "reviewBody": "Mohamed delivered exceptional results with 8x+ ROAS on our campaigns"
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
