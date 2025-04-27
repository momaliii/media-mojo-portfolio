
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
}

const MetaTags = ({
  title = "Mohamed Ali | Senior Media Buyer",
  description = "Senior Media Buyer with 5+ years experience optimizing campaigns across Meta, LinkedIn, TikTok, and more. Delivering exceptional results and measurable ROI.",
  imageUrl = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://mediamojomarketing.com/",
  type = "website",
  author = "Mohamed Ali",
  twitterHandle = "@lovable_dev"
}: MetaTagsProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Media Mojo Marketing" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={twitterHandle} />
    </Helmet>
  );
};

export default MetaTags;
