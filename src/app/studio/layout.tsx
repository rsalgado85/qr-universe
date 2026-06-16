import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Studio — Crea y Personaliza Códigos QR",
  description:
    "Editor visual interactivo para crear códigos QR personalizados con vista previa en tiempo real, logo, colores degradados y formas personalizables.",
  openGraph: {
    title: "QR Studio — Crea y Personaliza Códigos QR",
    description:
      "Editor visual interactivo para crear códigos QR personalizados con vista previa en tiempo real, logo, colores degradados y formas personalizables.",
    url: "https://qr-universe.vercel.app/studio",
    siteName: "QR Universe",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Studio — Crea y Personaliza Códigos QR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Studio — Crea y Personaliza Códigos QR",
    description:
      "Editor visual interactivo para crear códigos QR personalizados con vista previa en tiempo real, logo, colores degradados y formas personalizables.",
    images: ["/og-image.png"],
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
