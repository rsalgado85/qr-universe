import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — QR Universe",
  description:
    "QR Universe no almacena tu contenido QR. Conoce cómo protegemos tu privacidad, qué datos recopilamos y tus derechos como usuario.",
  openGraph: {
    title: "Política de Privacidad — QR Universe",
    description:
      "QR Universe no almacena tu contenido QR. Conoce cómo protegemos tu privacidad, qué datos recopilamos y tus derechos como usuario.",
    url: "https://qr-universe.vercel.app/privacy",
    siteName: "QR Universe",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Política de Privacidad — QR Universe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidad — QR Universe",
    description:
      "QR Universe no almacena tu contenido QR. Conoce cómo protegemos tu privacidad, qué datos recopilamos y tus derechos como usuario.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
