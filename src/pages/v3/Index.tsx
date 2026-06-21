import React, { lazy, Suspense, useEffect } from "react";
import Navigation from "@/components/v3/Navigation";
import Hero from "@/components/v3/Hero";
import ClientLogos from "@/components/v3/ClientLogos";
import Work from "@/components/v3/Work";
import Services from "@/components/v3/Services";
import About from "@/components/v3/About";
import Contact from "@/components/v3/Contact";
import Footer from "@/components/v3/Footer";
import AdCampaignShowcase from "@/components/v3/AdCampaignShowcase";
import ProofDeck from "@/components/v3/ProofDeck";
import ErrorBoundary from "@/components/ErrorBoundary";
import Reveal from "@/components/v3/Reveal";
import MetaTags from "@/components/MetaTags";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";
import "@/styles/v3/v3-theme.css";

const ElevenLabsWidget = lazy(() => import("@/components/voice-agent/ElevenLabsWidget"));

const IndexV3 = () => {
  const { activeSection } = useScrollObserver();
  useEffect(() => {
    trackPageView("/v3", "Mohamed Ali — Senior Media Buyer · Editorial Edition");
  }, []);


  return (
    <div className="v3-theme min-h-screen overflow-x-clip">
      <Navigation activeSection={activeSection} />
      <main id="main-content" tabIndex={-1} aria-label="Main content">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <Reveal><ErrorBoundary><ClientLogos /></ErrorBoundary></Reveal>
        <Reveal delay={0.05}><ErrorBoundary><Work /></ErrorBoundary></Reveal>
        <Reveal delay={0.05}><ErrorBoundary><AdCampaignShowcase /></ErrorBoundary></Reveal>
        <Reveal delay={0.05}><ErrorBoundary><ProofDeck /></ErrorBoundary></Reveal>
        <Reveal delay={0.05}><ErrorBoundary><Services /></ErrorBoundary></Reveal>
        <Reveal delay={0.05}><ErrorBoundary><About /></ErrorBoundary></Reveal>
        <Reveal delay={0.05}><ErrorBoundary><Contact /></ErrorBoundary></Reveal>
      </main>
      <Footer />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ElevenLabsWidget />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default IndexV3;
