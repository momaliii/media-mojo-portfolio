
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
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import CaseStudies from "./pages/CaseStudies";
import Auth from "./pages/Auth";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./hooks/use-auth";
import { trackPageView } from "./utils/analytics";
import AdminRoute from "./components/AdminRoute";
import AdminCaseStudies from "./pages/AdminCaseStudies";

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
    // Track page view on route change
    trackPageView(location.pathname, document.title);
    
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
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <TopProgressBar />
            <ScrollToTopButton />
            <SkipToContent />
            <BrowserRouter>
              <AuthProvider>
                <RouteTracker />
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/admin/case-studies"
                    element={
                      <AdminRoute>
                        <AdminCaseStudies />
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
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
  </HelmetProvider>
);

export default App;
