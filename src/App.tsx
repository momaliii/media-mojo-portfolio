
import React, { useEffect, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { HelmetProvider } from "react-helmet-async";
import { TopProgressBar } from "@/components/ui/progress-bar";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import SkipToContent from "@/components/SkipToContent";
import UnderDevelopmentNotice from "@/components/UnderDevelopmentNotice";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const CaseStudyDetail = React.lazy(() => import("./pages/CaseStudyDetail"));
const CaseStudies = React.lazy(() => import("./pages/CaseStudies"));
const Auth = React.lazy(() => import("./pages/Auth"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const IndexV2 = React.lazy(() => import("./pages/v2/Index"));
const CaseStudiesV2 = React.lazy(() => import("./pages/v2/CaseStudies"));
const CaseStudyDetailV2 = React.lazy(() => import("./pages/v2/CaseStudyDetail"));
const IndexV3 = React.lazy(() => import("./pages/v3/Index"));
const CaseStudiesV3 = React.lazy(() => import("./pages/v3/CaseStudies"));
const CaseStudyDetailV3 = React.lazy(() => import("./pages/v3/CaseStudyDetail"));
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./hooks/use-auth";
import { trackPageView } from "./utils/analytics";
import { trackPageViewToSupabase } from "./utils/visitor-analytics";
import AdminRoute from "./components/AdminRoute";
const AdminCaseStudies = React.lazy(() => import("./pages/AdminCaseStudies"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
import ProtectedRoute from "./components/ProtectedRoute";
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminSubmissions = React.lazy(() => import("./pages/AdminSubmissions"));
const AdminAnalytics = React.lazy(() => import("./pages/AdminAnalytics"));
const AdminClientLogos = React.lazy(() => import("./pages/AdminClientLogos"));
const AdminAdScreenshots = React.lazy(() => import("./pages/AdminAdScreenshots"));
const AdminAdScreenshotEditor = React.lazy(() => import("./pages/AdminAdScreenshotEditor"));
import { ReducedMotionProvider } from "./hooks/use-reduced-motion-pref";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Analytics Route Tracker Component
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change (Google Analytics)
    trackPageView(location.pathname, document.title);
    
    // Track page view to Supabase (visitor analytics)
    trackPageViewToSupabase(location.pathname, location.search);
    
    // Handle hash scrolling after route change
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Focus management for accessibility
          const focusableElement = element.querySelector('button, a, input, textarea, select') as HTMLElement;
          if (focusableElement) {
            focusableElement.focus();
          } else {
            element.setAttribute('tabindex', '-1');
            (element as HTMLElement).focus();
            element.removeAttribute('tabindex');
          }
        }
      }, 100);
    }
  }, [location]);
  
  return null;
};

// Lazy loaded components
const LazyComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSkeleton type="card" count={3} className="max-w-md" />
      </div>
    }>
      {children}
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ReducedMotionProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <TopProgressBar />
            <ScrollToTopButton />
            <SkipToContent />
            <BrowserRouter>
              <AuthProvider>
                <RouteTracker />
                <UnderDevelopmentNotice />
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/analytics"
                    element={
                      <AdminRoute>
                        <AdminAnalytics />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/submissions"
                    element={
                      <AdminRoute>
                        <AdminSubmissions />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/case-studies"
                    element={
                      <AdminRoute>
                        <AdminCaseStudies />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/client-logos"
                    element={
                      <AdminRoute>
                        <AdminClientLogos />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/ad-screenshots"
                    element={
                      <AdminRoute>
                        <AdminAdScreenshots />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/ad-screenshots/:id"
                    element={
                      <AdminRoute>
                        <AdminAdScreenshotEditor />
                      </AdminRoute>
                    }
                  />
                  <Route path="/" element={
                    <LazyComponent>
                      <Index />
                    </LazyComponent>
                  } />
                  <Route path="/case-studies" element={
                    <LazyComponent>
                      <CaseStudies />
                    </LazyComponent>
                  } />
                  <Route path="/case-study/:slug" element={
                    <LazyComponent>
                      <CaseStudyDetail />
                    </LazyComponent>
                  } />
                  {/* v2 — Dark luxury edition */}
                  <Route path="/v2" element={
                    <LazyComponent>
                      <IndexV2 />
                    </LazyComponent>
                  } />
                  <Route path="/v2/case-studies" element={
                    <LazyComponent>
                      <CaseStudiesV2 />
                    </LazyComponent>
                  } />
                  <Route path="/v2/case-study/:slug" element={
                    <LazyComponent>
                      <CaseStudyDetailV2 />
                    </LazyComponent>
                  } />
                  {/* v3 — Editorial paper & ink edition */}
                  <Route path="/v3" element={
                    <LazyComponent>
                      <IndexV3 />
                    </LazyComponent>
                  } />
                  <Route path="/v3/case-studies" element={
                    <LazyComponent>
                      <CaseStudiesV3 />
                    </LazyComponent>
                  } />
                  <Route path="/v3/case-study/:slug" element={
                    <LazyComponent>
                      <CaseStudyDetailV3 />
                    </LazyComponent>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </ErrorBoundary>
          </ReducedMotionProvider>
        </TooltipProvider>
      </QueryClientProvider>
  </HelmetProvider>
);

export default App;
