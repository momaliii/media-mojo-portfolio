import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Globe, Target, TrendingUp, Users, Award, Zap, BarChart3, Share2, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useCaseStudyBySlug, usePublishedCaseStudies } from "@/hooks/use-case-studies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LazyImage from "@/components/ui/lazy-image";
import MetaTags from "@/components/MetaTags";
import { Loader2 } from "lucide-react";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: caseStudy, isLoading } = useCaseStudyBySlug(slug);
  const { data: allCaseStudies = [] } = usePublishedCaseStudies();
  
  // Convert title to slug format for matching
  const titleToSlug = (title: string) => 
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-background via-muted/40 to-background">
        <Loader2 className="h-8 w-8 animate-spin text-media-purple" />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case study not found</h1>
          <p className="text-muted-foreground mb-6">The case study you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate('/')} className="bg-media-purple hover:bg-media-darkpurple text-white">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Get related case studies (same category, excluding current)
  const relatedCaseStudies = allCaseStudies.filter(study => 
    study.category === caseStudy.category && (study.slug || titleToSlug(study.title)) !== slug
  ).slice(0, 2);

  // Share functionality
  const shareUrl = window.location.href;
  const shareText = `Check out this case study: ${caseStudy.title}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: caseStudy.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareUrl);
    }
  };

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

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "headline": caseStudy.title,
    "name": caseStudy.title,
    "description": caseStudy.description,
    "image": caseStudy.screenshot,
    "author": { "@type": "Person", "name": "Mohamed Ali" },
    "creator": { "@type": "Person", "name": "Mohamed Ali" },
    "about": caseStudy.industry || caseStudy.category,
    "url": `https://media-mojo-portfolio.lovable.app/case-study/${slug}`,
  };

  return (
    <>
      <MetaTags 
        title={`${caseStudy.title} - Case Study | Mohamed Ali`}
        description={caseStudy.description}
        url={`/case-study/${slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <div className="min-h-dvh bg-gradient-to-b from-background via-muted/40 to-background">
        <Navigation />
        
        
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb & Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">Home</button>
                <span>/</span>
                <button onClick={() => navigate('/#portfolio')} className="hover:text-foreground transition-colors">Portfolio</button>
                <span>/</span>
                <span className="text-foreground truncate max-w-[180px] md:max-w-none">{caseStudy.title}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:border-media-purple/50 hover:bg-media-purple/10 hover:text-media-purple transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
                Share
              </Button>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Back to Portfolio
              </Button>
            </motion.div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge className="bg-media-purple/10 text-media-purple border border-media-purple/20 hover:bg-media-purple/15">
                  {getCategoryName(caseStudy.category)}
                </Badge>
                {caseStudy.industry && (
                  <Badge variant="outline">{caseStudy.industry}</Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.05]">
                {caseStudy.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                {caseStudy.description}
              </p>

              <div className="flex items-center gap-5 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span>Client: <span className="text-foreground font-medium">{caseStudy.client}</span></span>
                </div>
                {caseStudy.budgetRange && (
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4" aria-hidden="true" />
                    <span>Budget: <span className="text-foreground font-medium">{caseStudy.budgetRange}</span></span>
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
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
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
                    <Card className="text-center p-6 bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-0">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${getGradientClass(caseStudy.category)} mb-4`}>
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {metric.value}
                        </div>
                        <div className="text-muted-foreground font-medium">
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
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-media-purple" />
                Project Overview
              </h2>
              <Card className="p-8 bg-card border border-border shadow-lg">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-media-purple" />
                        Client Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-muted-foreground">Client:</span>
                          <span className="ml-2 text-foreground">{caseStudy.client}</span>
                        </div>
                        {caseStudy.industry && (
                          <div>
                            <span className="font-medium text-muted-foreground">Industry:</span>
                            <span className="ml-2 text-foreground">{caseStudy.industry}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-muted-foreground">Category:</span>
                          <span className="ml-2 text-foreground">{getCategoryName(caseStudy.category)}</span>
                        </div>
                        {caseStudy.budgetRange && (
                          <div>
                            <span className="font-medium text-muted-foreground">Budget Range:</span>
                            <Badge variant="outline" className="ml-2">
                              {caseStudy.budgetRange.charAt(0).toUpperCase() + caseStudy.budgetRange.slice(1)}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-media-purple" />
                        Campaign Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-muted-foreground">Challenge:</span>
                          <p className="text-foreground mt-1 leading-relaxed">{caseStudy.description}</p>
                        </div>
                        {caseStudy.platforms && caseStudy.platforms.length > 0 && (
                          <div>
                            <span className="font-medium text-muted-foreground block mb-2">Platforms Used:</span>
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
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">Additional Campaign Materials</h3>
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
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-media-purple" />
                Success Factors
              </h2>
              <Card className="p-8 bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40 border-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">What Made This Campaign Successful</h3>
                      <ul className="space-y-3 text-foreground/90">
                        {caseStudy.strategy ? (
                          <>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                              <span><strong>Strategy:</strong> {caseStudy.strategy}</span>
                            </li>
                            {caseStudy.challenge && (
                              <li className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                                <span><strong>Challenge:</strong> {caseStudy.challenge}</span>
                              </li>
                            )}
                            {caseStudy.results && (
                              <li className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                                <span><strong>Results:</strong> {caseStudy.results}</span>
                              </li>
                            )}
                            {caseStudy.tools && caseStudy.tools.length > 0 && (
                              <li className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-media-purple mt-2 flex-shrink-0"></div>
                                <span><strong>Tools:</strong> {caseStudy.tools.join(", ")}</span>
                              </li>
                            )}
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Key Achievements</h3>
                      <div className="space-y-4">
                        {caseStudy.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg shadow-sm">
                            <span className="text-muted-foreground">{metric.label}</span>
                            <span className="font-bold text-media-purple">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Case Studies */}
            {relatedCaseStudies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-media-purple" />
                  Related Case Studies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedCaseStudies.map((study, index) => (
                    <motion.div
                      key={study.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Card 
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-border bg-card"
                        onClick={() => navigate(`/case-study/${study.slug || titleToSlug(study.title)}`)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-muted text-foreground text-xs">
                              {getCategoryName(study.category)}
                            </Badge>
                            {study.industry && (
                              <Badge variant="outline" className="text-xs">{study.industry}</Badge>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-media-purple transition-colors">
                            {study.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {study.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{study.client}</span>
                            <ChevronRight className="w-4 h-4 text-media-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
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
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-gray-900 hover:bg-white/90"
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
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                      onClick={() => navigate('/#portfolio')}
                    >
                      View More Case Studies
                    </Button>
                  </div>
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