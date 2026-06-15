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
  title: "QR Universe — Create QR Codes That Stand Out",
  description:
    "QR Universe is a visual platform to create, customize, manage, and share professional QR codes. Create beautiful QR experiences with analytics, templates, and more.",
  keywords: ["QR codes", "QR generator", "custom QR", "QR analytics", "QR templates"],
  openGraph: {
    title: "QR Universe — Create QR Codes That Stand Out",
    description:
      "Create beautiful, professional QR codes with real-time preview, templates, and powerful analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
