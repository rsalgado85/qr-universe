import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de — QR Universe",
  description:
    "Conoce al creador de QR Universe, Robinson Salgado. Descubre la historia, stack tecnológico y logros detrás de esta plataforma de códigos QR.",
  openGraph: {
    title: "Acerca de — QR Universe",
    description:
      "Conoce al creador de QR Universe, Robinson Salgado. Descubre la historia, stack tecnológico y logros detrás de esta plataforma de códigos QR.",
    url: "https://qr-universe.vercel.app/about",
    siteName: "QR Universe",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acerca de — QR Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acerca de — QR Universe",
    description:
      "Conoce al creador de QR Universe, Robinson Salgado. Descubre la historia, stack tecnológico y logros detrás de esta plataforma de códigos QR.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
