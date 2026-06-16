import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qr-universe.vercel.app"),
  title: "QR Universe — Crea Códigos QR que Destacan",
  description:
    "QR Universe es una plataforma visual para crear, personalizar, gestionar y compartir códigos QR profesionales. Crea experiencias QR hermosas con analíticas, plantillas y más.",
  keywords: ["QR codes", "generador QR", "QR personalizado", "analíticas QR", "plantillas QR"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QR Universe — Crea Códigos QR que Destacan",
    description:
      "Crea códigos QR profesionales y hermosos con vista previa en tiempo real, plantillas y analíticas potentes.",
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
      "Crea códigos QR profesionales y hermosos con vista previa en tiempo real, plantillas y analíticas potentes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "QR Universe",
              url: "https://qr-universe.vercel.app",
              description:
                "QR Universe es una plataforma visual para crear, personalizar, gestionar y compartir códigos QR profesionales.",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <TooltipProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
