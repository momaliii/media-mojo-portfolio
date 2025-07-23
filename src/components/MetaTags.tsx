
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
  title = "Mohamed Ali - Expert Media Buyer & Digital Marketing Specialist",
  description = "Mohamed Ali is a highly skilled media buyer with 6+ years of experience driving exceptional results across 10+ countries. Specializing in Meta Ads, Google Ads, TikTok, and Snapchat with proven ROAS of 8x+ and 95K+ orders generated.",
  imageUrl = "/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png",
  url = "https://media-mojo-portfolio.lovableproject.com",
  type = "website",
  author = "Mohamed Ali",
  twitterHandle = "@mohamedali_ads",
  keywords = "media buying, digital marketing, Meta Ads, Google Ads, TikTok Ads, Snapchat Ads, ROAS optimization, e-commerce marketing, performance marketing, conversion optimization, media buyer Egypt, digital advertising specialist"
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
    </Helmet>
  );
};

export default MetaTags;
