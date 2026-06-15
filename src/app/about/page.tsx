"use client";

import { motion } from "framer-motion";
import {
  QrCode,
  Sparkles,
  Zap,
  Layers,
  Globe,
  Monitor,
  Palette,
  TrendingUp,
  Shield,
  Rocket,
  Mail,
  ExternalLink,
  Cpu,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

/* ────────────────────────────────────────────
   Localised content (like terms/privacy pages)
   ──────────────────────────────────────────── */
const aboutContent = {
  en: {
    hero: {
      name: "Robinson Salgado",
      role: "Full-Stack Developer & Creator",
      bio: "I'm the creator of QR Universe — a passion project born from the desire to make beautiful, professional QR codes accessible to everyone. With over 18 years of experience in software development, I build tools that combine great design with solid engineering. QR Universe is my way of sharing that craft with the world.",
      socialAlt: {
        github: "GitHub",
        linkedin: "LinkedIn",
        twitter: "Twitter",
        email: "Email",
      },
    },
    stats: [
      { value: "∞", label: "QR Codes Generated" },
      { value: "7", label: "Templates" },
      { value: "3", label: "Export Formats" },
      { value: "2", label: "Languages" },
      { value: "13", label: "Technologies Used" },
      { value: "18+", label: "Years Coding" },
    ],
    tech: {
      heading: "Tech Stack",
      desc: "The modern toolchain powering QR Universe — built for performance, design flexibility, and a delightful developer experience.",
    },
    achievements: {
      heading: "Achievements",
      cards: [
        {
          icon: Rocket,
          title: "QR Universe Launched",
          desc: "Shipped a fully-featured QR generation platform from zero to production, with real-time preview, templates, and multi-language support.",
        },
        {
          icon: Palette,
          title: "QR Studio Built",
          desc: "Designed and built the visual QR Studio — an interactive editor with live preview, logo upload, gradient colors, and shape customization.",
        },
        {
          icon: TrendingUp,
          title: "Lighthouse 95+",
          desc: "Achieved a perfect performance score on Google Lighthouse across all pages, with near-instant load times and flawless accessibility.",
        },
      ],
    },
    timeline: {
      heading: "Timeline",
      desc: "The evolution of QR Universe — from concept to fully-featured platform.",
      items: [
        {
          year: "2026 Q2",
          title: "QR Universe Launch",
          desc: "Public launch of QR Universe with the landing page, QR Studio, templates gallery, and analytics showcase.",
        },
        {
          year: "2026 Q2",
          title: "QR Studio v1",
          desc: "Shipped the interactive QR Studio with real-time preview, logo upload, gradient colors, dot and corner shape customization.",
        },
        {
          year: "2026 Q1",
          title: "Platform Foundation",
          desc: "Set up the Next.js 15 architecture, design system with TailwindCSS v4, theme system, and bilingual i18n infrastructure.",
        },
      ],
    },
    footer: {
      quote:
        "Great tools don't just solve problems — they inspire people to create things they never thought possible.",
      author: "— QR Universe Manifesto",
    },
  },

  es: {
    hero: {
      name: "Robinson Salgado",
      role: "Desarrollador Full-Stack & Creador",
      bio: "Soy el creador de QR Universe — un proyecto apasionante que nació del deseo de hacer que los códigos QR hermosos y profesionales sean accesibles para todos. Con más de 18 años de experiencia en desarrollo de software, construyo herramientas que combinan gran diseño con ingeniería sólida. QR Universe es mi forma de compartir ese oficio con el mundo.",
      socialAlt: {
        github: "GitHub",
        linkedin: "LinkedIn",
        twitter: "Twitter",
        email: "Correo",
      },
    },
    stats: [
      { value: "∞", label: "QR Generados" },
      { value: "7", label: "Plantillas" },
      { value: "3", label: "Formatos de Exportación" },
      { value: "2", label: "Idiomas" },
      { value: "13", label: "Tecnologías Usadas" },
      { value: "18+", label: "Años Programando" },
    ],
    tech: {
      heading: "Stack Tecnológico",
      desc: "El toolchain moderno que impulsa QR Universe — construido para rendimiento, flexibilidad de diseño y una experiencia de desarrollo excepcional.",
    },
    achievements: {
      heading: "Logros",
      cards: [
        {
          icon: Rocket,
          title: "QR Universe Lanzado",
          desc: "Plataforma QR completa llevada de cero a producción, con vista previa en tiempo real, plantillas y soporte multi-idioma.",
        },
        {
          icon: Palette,
          title: "QR Studio Construido",
          desc: "Diseñé y construí el QR Studio visual — un editor interactivo con vista previa en vivo, carga de logo, colores en degradado y personalización de formas.",
        },
        {
          icon: TrendingUp,
          title: "Lighthouse 95+",
          desc: "Puntuación perfecta de rendimiento en Google Lighthouse en todas las páginas, con tiempos de carga casi instantáneos y accesibilidad impecable.",
        },
      ],
    },
    timeline: {
      heading: "Línea de Tiempo",
      desc: "La evolución de QR Universe — del concepto a plataforma completa.",
      items: [
        {
          year: "2026 Q2",
          title: "Lanzamiento de QR Universe",
          desc: "Lanzamiento público de QR Universe con la landing page, QR Studio, galería de plantillas y vitrina de analíticas.",
        },
        {
          year: "2026 Q2",
          title: "QR Studio v1",
          desc: "Publicación del QR Studio interactivo con vista previa en tiempo real, carga de logo, colores en degradado y personalización de puntos y esquinas.",
        },
        {
          year: "2026 Q1",
          title: "Fundación de la Plataforma",
          desc: "Configuración de la arquitectura Next.js 15, sistema de diseño con TailwindCSS v4, sistema de temas e infraestructura bilingüe i18n.",
        },
      ],
    },
    footer: {
      quote:
        "Las grandes herramientas no solo resuelven problemas — inspiran a las personas a crear cosas que nunca creyeron posibles.",
      author: "— Manifiesto QR Universe",
    },
  },
};

/* ────────────────────────────────────────────
   Animation presets
   ──────────────────────────────────────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* ────────────────────────────────────────────
   Tech stack data (colored icons from lucide)
   ──────────────────────────────────────────── */
const techStack = [
  { name: "Next.js 15", icon: Layers, color: "#FFFFFF" },
  { name: "React 19", icon: Cpu, color: "#61DAFB" },
  { name: "TypeScript", icon: Shield, color: "#3178C6" },
  { name: "TailwindCSS v4", icon: Palette, color: "#06B6D4" },
  { name: "Framer Motion", icon: Sparkles, color: "#F5A623" },
  { name: "qr-code-styling", icon: QrCode, color: "#14B8A6" },
  { name: "Recharts", icon: TrendingUp, color: "#8884D8" },
  { name: "shadcn/ui", icon: Monitor, color: "#A78BFA" },
  { name: "react-hook-form", icon: ExternalLink, color: "#EC5990" },
  { name: "Zustand", icon: Zap, color: "#F97316" },
  { name: "lucide-react", icon: Sparkles, color: "#F5A623" },
  { name: "next-themes", icon: Globe, color: "#3B82F6" },
];

/* ────────────────────────────────────────────
   Social links (shared across languages)
   ──────────────────────────────────────────── */
const socialLinks = [
  {
    icon: ExternalLink,
    href: "https://github.com/rsalgado85",
    key: "github" as const,
  },
  {
    icon: Globe,
    href: "https://www.linkedin.com/in/robinsonsalgado",
    key: "linkedin" as const,
  },
  {
    icon: MessageCircle,
    href: "https://twitter.com/rsalgado85",
    key: "twitter" as const,
  },
  {
    icon: Mail,
    href: "mailto:rsalgado85@gmail.com",
    key: "email" as const,
  },
];

/* ────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────── */
export default function AboutPage() {
  const { language, t } = useLanguage();
  const content = aboutContent[language];

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16 pt-24 px-4 sm:px-6 lg:px-8">
      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl glass p-8 md:p-12"
      >
        {/* Background decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar — QR-themed icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary to-gold p-[3px] shadow-xl shadow-primary/20">
              <div className="w-full h-full rounded-2xl bg-bg-card flex items-center justify-center">
                <QrCode size={64} className="text-primary" />
              </div>
            </div>

            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary border-4 border-bg-card flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black tracking-tight"
            >
              <span className="gradient-text">{content.hero.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg gradient-text font-semibold mt-1"
            >
              {content.hero.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary mt-3 max-w-lg leading-relaxed"
            >
              {content.hero.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center md:justify-start gap-3 mt-5"
            >
              {socialLinks.map(({ icon: Icon, href, key }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass hover:bg-bg-card-hover border border-border-subtle transition-all hover:scale-110 hover:border-primary/30"
                  aria-label={content.hero.socialAlt[key]}
                >
                  <Icon
                    size={18}
                    className="text-text-secondary hover:text-primary transition-colors"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════
          PROJECT STATS
          ════════════════════════════════════════ */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {content.stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="glass p-4 text-center hover:border-primary/20 transition-all rounded-xl"
          >
            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
            <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ════════════════════════════════════════
          TECH STACK
          ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6 md:p-8 rounded-2xl"
      >
        <h2 className="text-xl font-bold mb-2">
          {content.tech.heading}
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          {content.tech.desc}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass p-3 flex flex-col items-center gap-2 cursor-default rounded-xl border border-border-subtle hover:border-primary/20 transition-all"
            >
              <tech.icon size={24} style={{ color: tech.color }} />
              <span className="text-xs font-medium text-center text-text-primary">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════
          ACHIEVEMENTS
          ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-4">
          {content.achievements.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.achievements.cards.map((ach, i) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass p-5 hover:border-primary/20 transition-all rounded-xl border border-border-subtle"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-text-primary">
                  {ach.title}
                </h3>
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                  {ach.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════
          TIMELINE
          ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6 md:p-8 rounded-2xl"
      >
        <h2 className="text-xl font-bold mb-2">
          {content.timeline.heading}
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          {content.timeline.desc}
        </p>

        <div className="relative">
          {/* Timeline line with QR Universe gradient */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-gold to-transparent" />

          <div className="space-y-6">
            {content.timeline.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-primary to-gold shadow-lg shadow-primary/30" />

                <div className="glass p-4 rounded-xl border border-border-subtle">
                  <span className="text-xs font-bold gradient-text">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-semibold text-text-primary mt-1">
                    {item.title}
                  </h4>
                  <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════
          FOOTER QUOTE
          ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-8"
      >
        <p className="text-text-secondary text-sm italic">
          &ldquo;{content.footer.quote}&rdquo;
        </p>
        <p className="text-xs text-text-secondary/50 mt-2">
          {content.footer.author}
        </p>
      </motion.div>
    </div>
  );
}
