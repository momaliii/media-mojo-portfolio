import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Globe, Target, TrendingUp } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LazyImage from "@/components/ui/lazy-image";
import MetaTags from "@/components/MetaTags";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Convert title to slug format for matching
  const titleToSlug = (title: string) => 
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const caseStudy = caseStudies.find(study => 
    titleToSlug(study.title) === slug
  );

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const getCategoryName = (category: string): string => {
    switch (category) {
      case "e-commerce": return "E-commerce";
      case "f&b": return "F&B";
      case "ngo": return "NGO";
      case "branding": return "Events & Branding";
      case "b2b": return "B2B";
      case "local": return "Local Business";
      case "apps": return "Mobile App";
      case "travel": return "Travel";
      default: return category;
    }
  };

  const getGradientClass = (category: string): string => {
    switch (category) {
      case "e-commerce": return "from-media-purple/90 to-media-pink/90";
      case "f&b": return "from-media-orange/90 to-media-pink/90";
      case "ngo": return "from-media-blue/90 to-media-oceanblue/90";
      case "branding": return "from-emerald-500/90 to-media-oceanblue/90";
      case "b2b": return "from-media-blue/90 to-media-oceanblue/90";
      case "local": return "from-indigo-500/90 to-media-vibrantpurple/90";
      case "apps": return "from-indigo-500/90 to-blue-500/90";
      case "travel": return "from-sky-500/90 to-media-blue/90";
      default: return "from-gray-500/90 to-gray-700/90";
    }
  };

  return (
    <>
      <MetaTags 
        title={`${caseStudy.title} - Case Study`}
        description={caseStudy.description}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-white/90 text-gray-800">
                  {getCategoryName(caseStudy.category)}
                </Badge>
                {caseStudy.industry && (
                  <Badge variant="outline">{caseStudy.industry}</Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {caseStudy.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>Client: {caseStudy.client}</span>
                </div>
                {caseStudy.budgetRange && (
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>Budget: {caseStudy.budgetRange}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudy.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Card className="text-center p-6 bg-white border-none shadow-lg">
                      <CardContent className="p-0">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getGradientClass(caseStudy.category)} mb-4`}>
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {metric.value}
                        </div>
                        <div className="text-gray-600 font-medium">
                          {metric.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Screenshots */}
            {caseStudy.screenshot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Screenshots</h2>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <LazyImage
                    src={caseStudy.screenshot}
                    alt={`${caseStudy.title} screenshot`}
                    className="w-full h-auto"
                  />
                </div>
                
                {caseStudy.additionalScreenshots && caseStudy.additionalScreenshots.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {caseStudy.additionalScreenshots.map((screenshot, index) => (
                      <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                        <LazyImage
                          src={screenshot}
                          alt={`${caseStudy.title} additional screenshot ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Platforms Used */}
            {caseStudy.platforms && caseStudy.platforms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Platforms Used</h2>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.platforms.map((platform, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Card className={`p-8 bg-gradient-to-br ${getGradientClass(caseStudy.category)} border-none`}>
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to achieve similar results?
                  </h3>
                  <p className="text-white/90 mb-6">
                    Let's discuss how we can help your business grow with strategic digital marketing.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => {
                      navigate('/');
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Started Today
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudyDetail;