import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Templates } from "@/components/landing/Templates";
import { AnalyticsShowcase } from "@/components/landing/AnalyticsShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Templates />
      <AnalyticsShowcase />
      <Testimonials />
      <FAQ />
      <Pricing />
      <CTA />
    </>
  );
}
