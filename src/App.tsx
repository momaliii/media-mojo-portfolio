
import React, { useEffect, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { TopProgressBar } from "@/components/ui/progress-bar";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import SkipToContent from "@/components/SkipToContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { trackPageView } from "./utils/analytics";

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
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <TopProgressBar />
            <ScrollToTopButton />
            <SkipToContent />
            <BrowserRouter>
              <RouteTracker />
              <Routes>
                <Route path="/" element={
                  <LazyComponent>
                    <Index />
                  </LazyComponent>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
