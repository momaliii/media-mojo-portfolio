import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Globe, Target, TrendingUp, Users, Award, Zap, BarChart3 } from "lucide-react";
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-media-purple" />
                Key Results & Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudy.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Card className="text-center p-6 bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-0">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${getGradientClass(caseStudy.category)} mb-4`}>
                          <TrendingUp className="w-8 h-8 text-white" />
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

            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-media-purple" />
                Project Overview
              </h2>
              <Card className="p-8 bg-white border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-media-purple" />
                        Client Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-gray-600">Client:</span>
                          <span className="ml-2 text-gray-900">{caseStudy.client}</span>
                        </div>
                        {caseStudy.industry && (
                          <div>
                            <span className="font-medium text-gray-600">Industry:</span>
                            <span className="ml-2 text-gray-900">{caseStudy.industry}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-600">Category:</span>
                          <span className="ml-2 text-gray-900">{getCategoryName(caseStudy.category)}</span>
                        </div>
                        {caseStudy.budgetRange && (
                          <div>
                            <span className="font-medium text-gray-600">Budget Range:</span>
                            <Badge variant="outline" className="ml-2">
                              {caseStudy.budgetRange.charAt(0).toUpperCase() + caseStudy.budgetRange.slice(1)}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-media-purple" />
                        Campaign Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-gray-600">Challenge:</span>
                          <p className="text-gray-900 mt-1 leading-relaxed">{caseStudy.description}</p>
                        </div>
                        {caseStudy.platforms && caseStudy.platforms.length > 0 && (
                          <div>
                            <span className="font-medium text-gray-600 block mb-2">Platforms Used:</span>
                            <div className="flex flex-wrap gap-2">
                              {caseStudy.platforms.map((platform, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Screenshots Gallery */}
            {caseStudy.screenshot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-media-purple" />
                  Campaign Gallery
                </h2>
                
                {/* Main Screenshot */}
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
                  <LazyImage
                    src={caseStudy.screenshot}
                    alt={`${caseStudy.title} main campaign screenshot`}
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Additional Screenshots */}
                {caseStudy.additionalScreenshots && caseStudy.additionalScreenshots.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Campaign Materials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {caseStudy.additionalScreenshots.map((screenshot, index) => (
                        <motion.div 
                          key={index} 
                          className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <LazyImage
                            src={screenshot}
                            alt={`${caseStudy.title} additional material ${index + 1}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Success Factors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-media-purple" />
                Success Factors
              </h2>
              <Card className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 border-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">What Made This Campaign Successful</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                          <span>Strategic audience targeting and segmentation</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                          <span>Data-driven optimization and continuous testing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                          <span>Creative messaging aligned with brand values</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                          <span>Multi-platform integrated approach</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
                      <div className="space-y-4">
                        {caseStudy.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                            <span className="text-gray-600">{metric.label}</span>
                            <span className="font-bold text-media-purple">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

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