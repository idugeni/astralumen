"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GetStartedSection } from "@/components/sections/GetStartedSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { FaqSection } from "@/components/sections/FaqSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PricingSection } from "@/components/sections/PricingSection";

export default function Home() {

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted dark:from-zinc-900 dark:to-background">
      <Header />
      
      <main className="mx-auto px-4 pt-32 pb-16 flex-grow">
        <HeroSection />
        <FeaturesSection />
        <FeatureShowcase />
        <GetStartedSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}