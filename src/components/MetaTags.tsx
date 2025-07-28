
import React from "react";
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterHandle?: string;
  keywords?: string;
}

const MetaTags = ({
  title = "Mohamed Ali - Expert Media Buyer & Digital Marketing Specialist | 8x+ ROAS",
  description = "Mohamed Ali is a highly skilled media buyer with 6+ years of experience driving exceptional results across 10+ countries. Specializing in Meta Ads, Google Ads, TikTok, and Snapchat with proven ROAS of 8x+ and 95K+ orders generated. Available for remote consultation and campaign management.",
  imageUrl = "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png",
  url = "https://mediamojomarketing.com",
  type = "website",
  author = "Mohamed Ali",
  twitterHandle = "@mohamedali_ads",
  keywords = "media buying expert, digital marketing specialist, Meta Ads manager, Google Ads expert, TikTok advertising, Snapchat Ads, ROAS optimization, e-commerce marketing, performance marketing, conversion optimization, media buyer Egypt, digital advertising consultant, remote media buyer, campaign management, ad spend optimization, social media advertising"
}: MetaTagsProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mohamed Ali Media Buyer" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={twitterHandle} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Enhanced SEO Tags */}
      <meta name="geo.region" content="EG-C" />
      <meta name="geo.placename" content="Cairo" />
      <meta name="geo.position" content="30.0444;31.2357" />
      <meta name="ICBM" content="30.0444, 31.2357" />
      <meta name="rating" content="General" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Business & Contact Information */}
      <meta name="contact" content="mhmd167ali@gmail.com" />
      <meta name="copyright" content="© 2024 Mohamed Ali Media Buyer" />
      <meta name="distribution" content="global" />
      <meta name="target" content="all" />
      
      {/* Performance & Technical SEO */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      
      {/* Rich Snippets Support */}
      <meta name="application-name" content="Mohamed Ali - Media Buyer" />
      <meta name="msapplication-tooltip" content="Expert Media Buyer & Digital Marketing Specialist" />
      <meta name="msapplication-starturl" content="/" />
    </Helmet>
  );
};

export default MetaTags;
