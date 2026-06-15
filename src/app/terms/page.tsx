"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";

const termsContent = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: June 15, 2026",
    intro:
      "Welcome to QR Universe. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.",
    sections: [
      {
        number: 1,
        title: "Acceptance of Terms",
        body: "By accessing, browsing, or using the QR Universe platform (the &ldquo;Service&rdquo;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not access or use the Service. These Terms constitute a binding legal agreement between you and QR Universe.",
      },
      {
        number: 2,
        title: "Description of Service",
        body: "QR Universe is a free, client-side QR code generation platform. The Service allows you to create, customize, and download professional QR codes directly in your browser. No user accounts are required, no payments are collected, and all QR code generation happens locally on your device. QR Universe does not store your generated QR content on our servers. The Service is provided on an &ldquo;as-is&rdquo; basis for your convenience.",
      },
      {
        number: 3,
        title: "User Responsibilities",
        body: "You agree that you are solely responsible for the content you encode into QR codes using our Service and for any consequences arising from their use. You expressly agree not to use QR Universe to generate QR codes that: (a) direct to or contain illegal content under applicable law; (b) distribute malware, viruses, ransomware, or any other harmful software; (c) facilitate phishing, social engineering, or fraudulent schemes; (d) disseminate spam, unsolicited commercial communications, or pyramid schemes; (e) infringe upon the intellectual property, privacy, or publicity rights of any third party; or (f) promote hate speech, violence, discrimination, harassment, or any form of abusive conduct. QR Universe reserves the right to investigate and take appropriate legal action against anyone who violates these provisions.",
      },
      {
        number: 4,
        title: "Intellectual Property",
        body: "The QR Universe platform, including its source code, branding, logos, user interface, templates, and design elements, is the proprietary intellectual property of QR Universe and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or create derivative works of the platform itself. QR codes you generate using our Service are your own intellectual property, and QR Universe claims no ownership over them. Templates provided by the platform are licensed to you for use in generating QR codes; this license is non-exclusive, non-transferable, and revocable. All rights not expressly granted are reserved.",
      },
      {
        number: 5,
        title: "Disclaimer of Warranties",
        body: "THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, QR UNIVERSE DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. QR Universe does not warrant that: (a) the Service will function uninterrupted, secure, or error-free; (b) any defects or errors will be corrected; (c) the QR codes generated will be scannable on all devices or under all conditions; or (d) the Service is free of viruses or other harmful components. QR Universe assumes no responsibility for the misuse of QR codes generated through the Service or for the content to which they direct.",
      },
      {
        number: 6,
        title: "Limitation of Liability",
        body: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL QR UNIVERSE, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, OR PERSONAL INJURY, ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN ANY EVENT, QR UNIVERSE&rsquo;S MAXIMUM AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THE SERVICE SHALL BE LIMITED TO THE GREATER OF FIFTY UNITED STATES DOLLARS ($50.00) OR THE AMOUNT YOU HAVE PAID TO QR UNIVERSE IN THE TWELVE MONTHS PRECEDING THE CLAIM. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THESE LIMITATIONS MAY NOT APPLY TO YOU.",
      },
      {
        number: 7,
        title: "Changes to Terms",
        body: "QR Universe reserves the right to modify, amend, or replace these Terms of Service at any time at its sole discretion. When changes are made, we will update the &ldquo;Last updated&rdquo; date at the top of this page and post the revised terms. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms of Service. It is your responsibility to review these Terms periodically for updates. If you do not agree to the modified terms, you must discontinue your use of the Service.",
      },
      {
        number: 8,
        title: "Governing Law",
        body: "These Terms of Service and any disputes arising from or relating to them shall be governed by and construed in accordance with the laws of the jurisdiction in which QR Universe operates, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the competent courts of that jurisdiction, and you consent to the personal jurisdiction and venue of such courts.",
      },
      {
        number: 9,
        title: "Contact Us",
        body: "If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at terms@qruniverse.com. We value your input and will make every effort to address your inquiries promptly.",
      },
    ],
  },

  es: {
    title: "Términos del Servicio",
    lastUpdated: "Última actualización: 15 de junio de 2026",
    intro:
      "Bienvenido a QR Universe. Al acceder o utilizar nuestra plataforma, usted acepta estar sujeto a estos Términos del Servicio. Por favor, léalos detenidamente antes de utilizar nuestros servicios.",
    sections: [
      {
        number: 1,
        title: "Aceptación de los Términos",
        body: "Al acceder, navegar o utilizar la plataforma QR Universe (el &ldquo;Servicio&rdquo;), usted reconoce haber leído, comprendido y acepta estar legalmente obligado por estos Términos del Servicio y nuestra Política de Privacidad. Si no está de acuerdo con estos términos, no puede acceder ni utilizar el Servicio. Estos Términos constituyen un acuerdo legal vinculante entre usted y QR Universe.",
      },
      {
        number: 2,
        title: "Descripción del Servicio",
        body: "QR Universe es una plataforma gratuita de generación de códigos QR que opera del lado del cliente. El Servicio le permite crear, personalizar y descargar códigos QR profesionales directamente en su navegador. No se requieren cuentas de usuario, no se recopilan pagos y toda la generación de códigos QR ocurre localmente en su dispositivo. QR Universe no almacena el contenido de sus QR generados en nuestros servidores. El Servicio se proporciona &ldquo;tal cual&rdquo; para su conveniencia.",
      },
      {
        number: 3,
        title: "Responsabilidades del Usuario",
        body: "Usted acepta que es el único responsable del contenido que codifica en los códigos QR utilizando nuestro Servicio y de cualquier consecuencia derivada de su uso. Usted acepta expresamente no utilizar QR Universe para generar códigos QR que: (a) dirijan o contengan contenido ilegal según la legislación aplicable; (b) distribuyan malware, virus, ransomware o cualquier otro software dañino; (c) faciliten phishing, ingeniería social o esquemas fraudulentos; (d) difundan spam, comunicaciones comerciales no solicitadas o esquemas piramidales; (e) infrinjan los derechos de propiedad intelectual, privacidad o publicidad de terceros; o (f) promuevan discurso de odio, violencia, discriminación, acoso o cualquier forma de conducta abusiva. QR Universe se reserva el derecho de investigar y tomar las medidas legales apropiadas contra cualquier persona que viole estas disposiciones.",
      },
      {
        number: 4,
        title: "Propiedad Intelectual",
        body: "La plataforma QR Universe, incluyendo su código fuente, marca, logotipos, interfaz de usuario, plantillas y elementos de diseño, es propiedad intelectual exclusiva de QR Universe y está protegida por derechos de autor, marcas registradas y otras leyes de propiedad intelectual. Usted no puede copiar, modificar, distribuir, vender ni crear obras derivadas de la plataforma en sí. Los códigos QR que usted genere utilizando nuestro Servicio son de su propiedad intelectual y QR Universe no reclama ningún derecho sobre ellos. Las plantillas proporcionadas por la plataforma se le otorgan bajo licencia para su uso en la generación de códigos QR; esta licencia es no exclusiva, intransferible y revocable. Todos los derechos no expresamente concedidos están reservados.",
      },
      {
        number: 5,
        title: "Exención de Garantías",
        body: "EL SERVICIO SE PROPORCIONA &ldquo;TAL CUAL&rdquo; Y &ldquo;SEGÚN DISPONIBILIDAD&rdquo;, SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS. EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEGISLACIÓN APLICABLE, QR UNIVERSE RENUNCIA A TODAS LAS GARANTÍAS, INCLUYENDO PERO NO LIMITÁNDOSE A LAS GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR, TITULARIDAD Y NO INFRACCIÓN. QR Universe no garantiza que: (a) el Servicio funcione de manera ininterrumpida, segura o libre de errores; (b) los defectos o errores sean corregidos; (c) los códigos QR generados sean escaneables en todos los dispositivos o bajo todas las condiciones; o (d) el Servicio esté libre de virus u otros componentes dañinos. QR Universe no asume ninguna responsabilidad por el uso indebido de los códigos QR generados a través del Servicio ni por el contenido al que dirigen.",
      },
      {
        number: 6,
        title: "Limitación de Responsabilidad",
        body: "HASTA EL MÁXIMO PERMITIDO POR LA LEGISLACIÓN APLICABLE, EN NINGÚN CASO QR UNIVERSE, SUS AFILIADOS, DIRECTIVOS, DIRECTORES, EMPLEADOS O AGENTES SERÁN RESPONSABLES POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES, EJEMPLARES O PUNITIVOS, INCLUYENDO PERO NO LIMITÁNDOSE A PÉRDIDA DE BENEFICIOS, PÉRDIDA DE DATOS, PÉRDIDA DE FONDO DE COMERCIO, INTERRUPCIÓN DE NEGOCIO O LESIONES PERSONALES, QUE SURJAN O ESTÉN RELACIONADOS CON EL USO O LA IMPOSIBILIDAD DE USO DEL SERVICIO, YA SEA BASADO EN GARANTÍA, CONTRATO, AGRAVIO (INCLUYENDO NEGLIGENCIA) O CUALQUIER OTRA TEORÍA LEGAL, INCLUSO SI SE HA ADVERTIDO DE LA POSIBILIDAD DE TALES DAÑOS. EN CUALQUIER CASO, LA RESPONSABILIDAD MÁXIMA AGREGADA DE QR UNIVERSE HACIA USTED POR TODAS LAS RECLAMACIONES QUE SURJAN O SE RELACIONEN CON EL SERVICIO SE LIMITARÁ AL MAYOR DE CINCUENTA DÓLARES ESTADOUNIDENSES ($50.00) O EL MONTO QUE USTED HAYA PAGADO A QR UNIVERSE EN LOS DOCE MESES ANTERIORES A LA RECLAMACIÓN. ALGUNAS JURISDICCIONES NO PERMITEN LA EXCLUSIÓN O LIMITACIÓN DE CIERTOS DAÑOS, POR LO QUE ESTAS LIMITACIONES PUEDEN NO APLICARSE EN SU CASO.",
      },
      {
        number: 7,
        title: "Modificaciones de los Términos",
        body: "QR Universe se reserva el derecho de modificar, enmendar o reemplazar estos Términos del Servicio en cualquier momento a su entera discreción. Cuando se realicen cambios, actualizaremos la fecha de &ldquo;Última actualización&rdquo; en la parte superior de esta página y publicaremos los términos revisados. Su uso continuado del Servicio después de dichos cambios constituye la aceptación de los nuevos Términos del Servicio. Es su responsabilidad revisar periódicamente estos Términos para estar al tanto de las actualizaciones. Si no está de acuerdo con los términos modificados, debe interrumpir el uso del Servicio.",
      },
      {
        number: 8,
        title: "Legislación Aplicable",
        body: "Estos Términos del Servicio y cualquier disputa que surja o se relacione con ellos se regirán e interpretarán de acuerdo con las leyes de la jurisdicción en la que opera QR Universe, sin tener en cuenta los principios de conflicto de leyes. Cualquier acción o procedimiento legal que surja en virtud de estos Términos se presentará exclusivamente ante los tribunales competentes de dicha jurisdicción, y usted acepta la jurisdicción personal y el foro de dichos tribunales.",
      },
      {
        number: 9,
        title: "Contacto",
        body: "Si tiene alguna pregunta, inquietud o comentario sobre estos Términos del Servicio, contáctenos en terms@qruniverse.com. Valoramos su opinión y haremos todo lo posible por atender sus consultas con prontitud.",
      },
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const content = termsContent[language];

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-text-secondary mb-3 tracking-wide uppercase">
            {content.lastUpdated}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)] gradient-text">
            {content.title}
          </h1>
        </div>

        {/* Legal content card */}
        <article className="rounded-2xl glass p-8 sm:p-12 space-y-10">
          {/* Introduction */}
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            {content.intro}
          </p>

          {/* Sections */}
          {content.sections.map((section) => (
            <section key={section.number} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary font-[family-name:var(--font-display)]">
                {section.number}. {section.title}
              </h2>
              <p
                className="text-text-secondary leading-relaxed text-base"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </section>
          ))}

          {/* Footer note */}
          <div className="pt-8 mt-8 border-t border-border-subtle">
            <p className="text-sm text-text-secondary">
              {language === "en" ? (
                <>
                  For questions about these terms, contact us at{" "}
                  <Link
                    href="mailto:terms@qruniverse.com"
                    className="text-primary hover:text-primary-light transition-colors underline underline-offset-2"
                  >
                    terms@qruniverse.com
                  </Link>
                  .
                </>
              ) : (
                <>
                  Para preguntas sobre estos términos, contáctenos en{" "}
                  <Link
                    href="mailto:terms@qruniverse.com"
                    className="text-primary hover:text-primary-light transition-colors underline underline-offset-2"
                  >
                    terms@qruniverse.com
                  </Link>
                  .
                </>
              )}
            </p>
            <p className="text-sm text-text-secondary mt-3">
              {language === "en"
                ? "\u00a9 2026 QR Universe. All rights reserved."
                : "\u00a9 2026 QR Universe. Todos los derechos reservados."}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
