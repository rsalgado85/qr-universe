import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos del Servicio — QR Universe",
  description:
    "Términos y condiciones de uso de QR Universe. Conoce tus derechos y responsabilidades al usar nuestra plataforma gratuita de códigos QR.",
  openGraph: {
    title: "Términos del Servicio — QR Universe",
    description:
      "Términos y condiciones de uso de QR Universe. Conoce tus derechos y responsabilidades al usar nuestra plataforma gratuita de códigos QR.",
    url: "https://qr-universe.vercel.app/terms",
    siteName: "QR Universe",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Términos del Servicio — QR Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos del Servicio — QR Universe",
    description:
      "Términos y condiciones de uso de QR Universe. Conoce tus derechos y responsabilidades al usar nuestra plataforma gratuita de códigos QR.",
    images: ["/og-image.png"],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
