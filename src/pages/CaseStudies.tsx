import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, Download, Briefcase, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EnhancedFilterTabs from "@/components/portfolio/EnhancedFilterTabs";
import { usePublishedCaseStudies } from "@/hooks/use-case-studies";
import { trackPageView, trackEvent } from "@/utils/analytics";
import { usePerformanceMonitor } from "@/hooks/use-performance-monitor";

const CaseStudies = () => {
  const [filter, setFilter] = useState("all");
  const { logMetric } = usePerformanceMonitor('CaseStudies');
  const { data: caseStudies = [] } = usePublishedCaseStudies();

  useEffect(() => {
    trackPageView('/case-studies', 'Case Studies - Mohamed Ali');
    const startTime = performance.now();
    const endTime = performance.now();
    logMetric('case-studies-load', endTime - startTime);
  }, [logMetric]);

  // Calculate portfolio statistics
  const totalProjects = caseStudies.length;
  const totalClients = new Set(caseStudies.map(study => study.client)).size;
  const totalIndustries = new Set(caseStudies.map(study => study.industry).filter(Boolean)).size;

  const handleDownloadPortfolio = () => {
    trackEvent('download_portfolio', { 
      source: 'case_studies_page',
      total_projects: totalProjects 
    });
  };

  return (
    <>
      <Helmet>
        <title>Case Studies - Mohamed Ali | Digital Marketing Portfolio</title>
        <meta 
          name="description" 
          content={`Explore ${totalProjects} successful digital marketing case studies across e-commerce, F&B, NGO, and branding campaigns. See proven results and strategies.`}
        />
        <meta name="keywords" content="case studies, digital marketing portfolio, campaign results, e-commerce marketing, social media campaigns" />
        <link rel="canonical" href={`${typeof window !== 'undefined' ? window.location.origin : 'https://mediamojomarketing.com'}/case-studies`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Case Studies - Mohamed Ali | Digital Marketing Portfolio" />
        <meta property="og:description" content={`Explore ${totalProjects} successful digital marketing case studies with proven results`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${typeof window !== 'undefined' ? window.location.origin : 'https://mediamojomarketing.com'}/case-studies`} />
        <meta property="og:image" content={`${typeof window !== 'undefined' ? window.location.origin : 'https://mediamojomarketing.com'}/lovable-uploads/e7da6e3c-66cf-4166-9955-98eb4097a88f.png`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Digital Marketing Case Studies",
            "description": `Portfolio of ${totalProjects} successful digital marketing campaigns`,
            "url": "/case-studies",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": totalProjects,
              "itemListElement": caseStudies.map((study, index) => ({
                "@type": "CreativeWork",
                "position": index + 1,
                "name": study.title,
                "description": study.description,
                "category": study.category,
                "author": {
                  "@type": "Person",
                  "name": "Mohamed Ali"
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          <div className="container mx-auto px-4 md:px-6 relative">
            {/* Breadcrumb */}
            <motion.nav 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8"
              aria-label="Breadcrumb"
            >
              <Link 
                to="/" 
                className="hover:text-media-purple dark:hover:text-media-blue transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 dark:text-gray-100">Case Studies</span>
            </motion.nav>

            {/* Header Content */}
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">Case Studies</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Explore proven digital marketing strategies and campaign results across diverse industries
                </p>
              </motion.div>

              {/* Portfolio Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Briefcase className="h-8 w-8 text-media-purple dark:text-media-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalProjects}+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Successful Projects</p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-media-purple dark:text-media-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalClients}+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="h-8 w-8 text-media-purple dark:text-media-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalIndustries}+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Industries Served</p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/#portfolio">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 hover:bg-media-purple/10 dark:hover:bg-media-blue/10 transition-all duration-300 rounded-xl py-6 px-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    <span className="text-base">Back to Portfolio</span>
                  </Button>
                </Link>
                
                <a 
                  href="/Mohamed_Ali_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownloadPortfolio}
                >
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="inline-flex items-center bg-media-purple dark:bg-media-blue hover:bg-media-darkpurple dark:hover:bg-blue-600 text-white transition-all duration-300 rounded-xl py-6 px-8 shadow-md hover:shadow-lg"
                  >
                    <span className="text-base">Download Full Portfolio</span>
                    <Download className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EnhancedFilterTabs
                filter={filter}
                setFilter={setFilter}
                caseStudies={caseStudies}
              />
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudies;