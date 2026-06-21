import React, { lazy, Suspense, useEffect } from "react";
import Navigation from "@/components/v3/Navigation";
import Hero from "@/components/v3/Hero";
import ErrorBoundary from "@/components/ErrorBoundary";
import Reveal from "@/components/v3/Reveal";
import MetaTags from "@/components/MetaTags";
import { useScrollObserver } from "@/hooks/use-scroll-observer";
import { trackPageView } from "@/utils/analytics";
import "@/styles/v3/v3-theme.css";

// Below-the-fold sections — code-split to shrink initial JS for LCP/INP
const ClientLogos = lazy(() => import("@/components/v3/ClientLogos"));
const Work = lazy(() => import("@/components/v3/Work"));
const AdCampaignShowcase = lazy(() => import("@/components/v3/AdCampaignShowcase"));
const ProofDeck = lazy(() => import("@/components/v3/ProofDeck"));
const Services = lazy(() => import("@/components/v3/Services"));
const About = lazy(() => import("@/components/v3/About"));
const Contact = lazy(() => import("@/components/v3/Contact"));
const Footer = lazy(() => import("@/components/v3/Footer"));
const ElevenLabsWidget = lazy(() => import("@/components/voice-agent/ElevenLabsWidget"));

const SectionFallback = () => <div aria-hidden className="min-h-[40vh]" />;

// content-visibility:auto skips layout/paint for offscreen sections
const cvAuto: React.CSSProperties = {
  contentVisibility: "auto",
  containIntrinsicSize: "800px",
};

const IndexV3 = () => {
  const { activeSection } = useScrollObserver();
  useEffect(() => {
    trackPageView("/v3", "Mohamed Ali — Senior Media Buyer · Editorial Edition");
  }, []);

  return (
    <div className="v3-theme min-h-screen overflow-x-clip">
      <MetaTags
        title="Mohamed Ali — Senior Media Buyer | Editorial Edition"
        description="I don't pitch numbers. I screenshot them. Senior Media Buyer scaling brands across Meta, Google, TikTok and Snapchat with 8x+ ROAS and 95K+ orders."
        url="/v3"
        type="website"
      />
      <Navigation activeSection={activeSection} />
      <main id="main-content" tabIndex={-1} aria-label="Main content">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <div style={cvAuto}>
            <Reveal><ErrorBoundary><ClientLogos /></ErrorBoundary></Reveal>
          </div>
          <div style={cvAuto}>
            <Reveal delay={0.05}><ErrorBoundary><Work /></ErrorBoundary></Reveal>
          </div>
          <div style={cvAuto}>
            <Reveal delay={0.05}><ErrorBoundary><AdCampaignShowcase /></ErrorBoundary></Reveal>
          </div>
          <div style={cvAuto}>
            <Reveal delay={0.05}><ErrorBoundary><ProofDeck /></ErrorBoundary></Reveal>
          </div>
          <div style={cvAuto}>
            <Reveal delay={0.05}><ErrorBoundary><Services /></ErrorBoundary></Reveal>
          </div>
          <div style={cvAuto}>
            <Reveal delay={0.05}><ErrorBoundary><About /></ErrorBoundary></Reveal>
          </div>
          <div style={cvAuto}>
            <Reveal delay={0.05}><ErrorBoundary><Contact /></ErrorBoundary></Reveal>
          </div>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ElevenLabsWidget />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default IndexV3;
