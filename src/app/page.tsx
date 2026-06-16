import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Templates } from "@/components/landing/Templates";
import { AnalyticsShowcase } from "@/components/landing/AnalyticsShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export const metadata: Metadata = {
  title: "QR Universe — Crea Códigos QR que Destacan",
  description:
    "Plataforma visual para crear, personalizar, gestionar y compartir códigos QR profesionales. Analíticas, plantillas y más — todo gratis.",
  openGraph: {
    title: "QR Universe — Crea Códigos QR que Destacan",
    description:
      "Crea códigos QR profesionales con vista previa en tiempo real, plantillas personalizables y analíticas potentes. 100% gratis.",
    url: "https://qr-universe.vercel.app",
    siteName: "QR Universe",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Universe — Crea Códigos QR que Destacan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Universe — Crea Códigos QR que Destacan",
    description:
      "Crea códigos QR profesionales con vista previa en tiempo real, plantillas personalizables y analíticas potentes. 100% gratis.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Templates />
      <AnalyticsShowcase />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
