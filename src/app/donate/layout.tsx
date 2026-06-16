import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donar — Apoya QR Universe",
  description:
    "Apoya el desarrollo de QR Universe con una donación vía PayPal. Tu contribución ayuda a mantener la plataforma gratuita y en mejora continua.",
  openGraph: {
    title: "Donar — Apoya QR Universe",
    description:
      "Apoya el desarrollo de QR Universe con una donación vía PayPal. Tu contribución ayuda a mantener la plataforma gratuita y en mejora continua.",
    url: "https://qr-universe.vercel.app/donate",
    siteName: "QR Universe",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Donar — Apoya QR Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donar — Apoya QR Universe",
    description:
      "Apoya el desarrollo de QR Universe con una donación vía PayPal. Tu contribución ayuda a mantener la plataforma gratuita y en mejora continua.",
    images: ["/og-image.png"],
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
