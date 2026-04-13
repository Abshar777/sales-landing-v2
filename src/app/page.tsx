"use client"
import Nav from "@/components/layout/nav";
import Hero from "@/components/page-sections/hero";
import FeaturesSection from "@/components/page-sections/featureScetion";
import TradingTeamSection from "@/components/page-sections/aboutus";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { useEffect, useState } from "react";
import PricingSection from "@/components/page-sections/pricing";
import TestimonialsSection from "@/components/page-sections/testimonials";
import FAQSection from "@/components/page-sections/faq";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/layout/preloader";


export default function Home() {
  const [init, setInit] = useState(false);
  // heroReady: true when preloader exit wipe STARTS — mounts Hero so its animation plays during the wipe
  const [heroReady, setHeroReady] = useState(false);
  // preloaderGone: true when wipe fully completes — unmounts preloader from DOM
  const [preloaderGone, setPreloaderGone] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  return (
    <>
      {!preloaderGone && (
        <Preloader
          onExitStart={() => setHeroReady(true)}
          onComplete={() => setPreloaderGone(true)}
        />
      )}
      {heroReady && <Hero />}
      {heroReady && <Nav />}
      {heroReady && <div className="relative">
          <FeaturesSection />
          <TradingTeamSection />
          <PricingSection />
          <TestimonialsSection/>
          <FAQSection />
          {init && (
            <Particles
              id="tsparticles"
              className="absolute inset-0 pointer-events-none z-0 opacity-50"
              options={{
                fpsLimit: 120,
                particles: {
                  color: {
                    value: "#3b82f6",
                  },
                  move: {
                    direction: "right",
                    enable: true,
                    outModes: {
                      default: "out",
                    },
                    random: true,
                    speed: { min: 1, max: 3 },
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                    },
                    value: 80,
                  },
                  opacity: {
                    value: { min: 0.1, max: 0.5 },
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 3 },
                  },
                },
                detectRetina: true,
                fullScreen: { enable: false },
              }}
            />
          )}
        </div>}
      {heroReady && <Footer />}
      </>
    );
  }
