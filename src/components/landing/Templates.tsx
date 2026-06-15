"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Building2,
  CalendarDays,
  UserCircle2,
  TrendingUp,
  UserCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export function Templates() {
  const { t } = useLanguage();

  const templates = [
    {
      icon: UtensilsCrossed,
      title: t.templates.categories.restaurants,
      description: t.templates.descriptions.restaurants,
      color: "text-orange-400",
      gradient: "from-orange-500/10 to-yellow-500/10",
    },
    {
      icon: Building2,
      title: t.templates.categories.realEstate,
      description: t.templates.descriptions.realEstate,
      color: "text-blue-400",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: CalendarDays,
      title: t.templates.categories.events,
      description: t.templates.descriptions.events,
      color: "text-purple-400",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: UserCircle2,
      title: t.templates.categories.personalBrand,
      description: t.templates.descriptions.personalBrand,
      color: "text-primary",
      gradient: "from-primary/10 to-emerald-500/10",
    },
    {
      icon: TrendingUp,
      title: t.templates.categories.influencers,
      description: t.templates.descriptions.influencers,
      color: "text-pink-400",
      gradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      icon: UserCheck,
      title: t.templates.categories.recruiters,
      description: t.templates.descriptions.recruiters,
      color: "text-green-400",
      gradient: "from-green-500/10 to-teal-500/10",
    },
    {
      icon: Briefcase,
      title: t.templates.categories.corporate,
      description: t.templates.descriptions.corporate,
      color: "text-indigo-400",
      gradient: "from-indigo-500/10 to-blue-500/10",
    },
  ];

  return (
    <section id="templates" className="py-24 sm:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-medium text-gold uppercase tracking-wider">
              {t.templates.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.templates.title1}{" "}
            <span className="gradient-text">{t.templates.title2}</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t.templates.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-50px" }}
        >
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <motion.div
                key={template.title}
                variants={cardItem}
                className="group relative p-6 rounded-2xl glass hover:bg-bg-card-hover/50 transition-all duration-300 cursor-pointer hover:border-border-muted"
              >
                {/* Gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <Icon
                    className={`w-10 h-10 ${template.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    {t.templates.explore} <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
