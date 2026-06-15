"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: June 15, 2026",
    backToHome: "Back to Home",
    sections: [
      {
        heading: "Information We Collect",
        subSections: [
          {
            subHeading: "QR Code Content",
            paragraphs: [
              "When you create a QR code, the content you encode (URLs, text, contact information) is processed client-side in your browser. We do not store, transmit, or have access to the content of your QR codes.",
            ],
          },
          {
            subHeading: "Usage Analytics",
            paragraphs: [
              "We collect anonymous usage data to improve our service, including:",
            ],
            bullets: [
              "Page views and feature usage",
              "Browser type and device category",
              "Geographic region (country level only)",
              "Performance metrics",
            ],
            afterBullets:
              "This data is aggregated and cannot be used to identify individual users.",
          },
          {
            subHeading: "Technical Data",
            paragraphs: [
              "Our servers automatically log standard technical information including IP addresses (temporarily), browser type, operating system, and referring URLs. These logs are used for security, debugging, and service optimization and are deleted within 30 days.",
            ],
          },
        ],
      },
      {
        heading: "How We Use Your Information",
        bullets: [
          "To provide and maintain the QR Universe service",
          "To analyze usage patterns and improve user experience",
          "To detect, prevent, and address technical issues",
          "To comply with legal obligations",
        ],
      },
      {
        heading: "Data Storage and Security",
        paragraphs: [
          "All QR code generation happens entirely in your browser. No QR content is ever uploaded to our servers. We implement industry-standard security measures including HTTPS encryption, secure infrastructure via Vercel, and regular security reviews.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "We use essential cookies for:",
        ],
        bullets: [
          "Theme preference (dark/light mode)",
          "Language preference (English/Spanish)",
        ],
        afterBullets:
          "We do not use tracking cookies, advertising cookies, or third-party analytics cookies.",
      },
      {
        heading: "Third-Party Services",
        paragraphs: [
          "QR Universe is hosted on Vercel, which may collect infrastructure-level logs for service operation. Vercel's privacy practices are governed by their own privacy policy.",
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          "QR Universe is not directed at children under 13. We do not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "Your Rights",
        paragraphs: [
          "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. Since we collect minimal anonymous data, there is typically no personal data to exercise these rights over. Contact us with any privacy concerns.",
        ],
      },
      {
        heading: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          "For privacy-related questions: ",
        ],
        contactEmail: "privacy@qruniverse.com",
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 15 de junio de 2026",
    backToHome: "Volver al Inicio",
    sections: [
      {
        heading: "Información que Recopilamos",
        subSections: [
          {
            subHeading: "Contenido de los Códigos QR",
            paragraphs: [
              "Cuando creas un código QR, el contenido que codificas (URLs, texto, información de contacto) se procesa del lado del cliente en tu navegador. No almacenamos, transmitimos ni tenemos acceso al contenido de tus códigos QR.",
            ],
          },
          {
            subHeading: "Analíticas de Uso",
            paragraphs: [
              "Recopilamos datos de uso anónimos para mejorar nuestro servicio, incluyendo:",
            ],
            bullets: [
              "Vistas de página y uso de funcionalidades",
              "Tipo de navegador y categoría de dispositivo",
              "Región geográfica (solo a nivel de país)",
              "Métricas de rendimiento",
            ],
            afterBullets:
              "Estos datos son agregados y no pueden usarse para identificar a usuarios individuales.",
          },
          {
            subHeading: "Datos Técnicos",
            paragraphs: [
              "Nuestros servidores registran automáticamente información técnica estándar incluyendo direcciones IP (temporalmente), tipo de navegador, sistema operativo y URLs de referencia. Estos registros se usan para seguridad, depuración y optimización del servicio, y se eliminan en un plazo de 30 días.",
            ],
          },
        ],
      },
      {
        heading: "Cómo Usamos Tu Información",
        bullets: [
          "Para proporcionar y mantener el servicio QR Universe",
          "Para analizar patrones de uso y mejorar la experiencia del usuario",
          "Para detectar, prevenir y resolver problemas técnicos",
          "Para cumplir con obligaciones legales",
        ],
      },
      {
        heading: "Almacenamiento y Seguridad de Datos",
        paragraphs: [
          "Toda la generación de códigos QR ocurre completamente en tu navegador. Ningún contenido QR se sube a nuestros servidores. Implementamos medidas de seguridad estándar de la industria incluyendo encriptación HTTPS, infraestructura segura a través de Vercel, y revisiones de seguridad periódicas.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Usamos cookies esenciales para:",
        ],
        bullets: [
          "Preferencia de tema (modo oscuro/claro)",
          "Preferencia de idioma (español/inglés)",
        ],
        afterBullets:
          "No usamos cookies de rastreo, cookies publicitarias ni cookies de analíticas de terceros.",
      },
      {
        heading: "Servicios de Terceros",
        paragraphs: [
          "QR Universe está alojado en Vercel, que puede recopilar registros a nivel de infraestructura para la operación del servicio. Las prácticas de privacidad de Vercel se rigen por su propia política de privacidad.",
        ],
      },
      {
        heading: "Privacidad Infantil",
        paragraphs: [
          "QR Universe no está dirigido a menores de 13 años. No recopilamos intencionalmente información personal de niños.",
        ],
      },
      {
        heading: "Tus Derechos",
        paragraphs: [
          "Dependiendo de tu jurisdicción, puedes tener derecho a acceder, corregir o eliminar tus datos personales. Dado que recopilamos datos anónimos mínimos, típicamente no hay datos personales sobre los cuales ejercer estos derechos. Contáctanos con cualquier inquietud de privacidad.",
        ],
      },
      {
        heading: "Cambios a Esta Política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios se publicarán en esta página con una fecha actualizada.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Para consultas relacionadas con la privacidad: ",
        ],
        contactEmail: "privacy@qruniverse.com",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const content = privacyContent[language];

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Back link */}
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {content.backToHome}
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="rounded-2xl glass p-6 sm:p-8 lg:p-10">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
            {content.title}
          </h1>
          <p className="text-text-secondary text-sm mb-10 pb-8 border-b border-border-subtle">
            {content.lastUpdated}
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {content.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-5">
                  {section.heading}
                </h2>

                {/* Sub-sections (like "QR Code Content", "Usage Analytics") */}
                {section.subSections?.map((sub, subIdx) => (
                  <div key={subIdx} className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {sub.subHeading}
                    </h3>
                    {sub.paragraphs?.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-text-secondary leading-relaxed mb-3"
                      >
                        {p}
                      </p>
                    ))}
                    {sub.bullets && (
                      <ul className="list-disc pl-6 space-y-1.5 mb-3 text-text-secondary leading-relaxed">
                        {sub.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {sub.afterBullets && (
                      <p className="text-text-secondary leading-relaxed">
                        {sub.afterBullets}
                      </p>
                    )}
                  </div>
                ))}

                {/* Direct paragraphs (no sub-headings) */}
                {section.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-text-secondary leading-relaxed mb-3">
                    {p}
                    {section.contactEmail && pIdx === section.paragraphs.length - 1 && (
                      <a
                        href={`mailto:${section.contactEmail}`}
                        className="text-primary hover:text-primary-light underline underline-offset-4 transition-colors font-medium"
                      >
                        {section.contactEmail}
                      </a>
                    )}
                  </p>
                ))}

                {/* Direct bullets (no sub-headings) */}
                {section.bullets && (
                  <ul className="list-disc pl-6 space-y-1.5 mb-3 text-text-secondary leading-relaxed">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.afterBullets && (
                  <p className="text-text-secondary leading-relaxed">
                    {section.afterBullets}
                  </p>
                )}
              </section>
            ))}
          </div>

          {/* Bottom date */}
          <div className="mt-12 pt-6 border-t border-border-subtle">
            <p className="text-text-secondary text-xs">
              {content.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
