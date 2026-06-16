"use client";

import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Wrench,
  UtensilsCrossed,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t.features.social.title,
      description: t.features.social.desc,
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      icon: Briefcase,
      title: t.features.business.title,
      description: t.features.business.desc,
      color: "from-primary/20 to-emerald-500/20",
      iconColor: "text-primary",
    },
    {
      icon: Wrench,
      title: t.features.utility.title,
      description: t.features.utility.desc,
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
    },
    {
      icon: UtensilsCrossed,
      title: t.features.restaurant.title,
      description: t.features.restaurant.desc,
      color: "from-orange-500/20 to-yellow-500/20",
      iconColor: "text-orange-400",
    },
    {
      icon: Calendar,
      title: t.features.event.title,
      description: t.features.event.desc,
      color: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-400",
    },
    {
      icon: BarChart3,
      title: t.features.analytics.title,
      description: t.features.analytics.desc,
      color: "from-teal-500/20 to-green-500/20",
      iconColor: "text-teal-400",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {t.features.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.features.title1}{" "}
            <span className="gradient-text">{t.features.title2}</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-50px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="group relative p-6 rounded-2xl glass hover:bg-bg-card-hover/50 transition-all duration-300 hover:border-border-muted cursor-default"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-bg-card flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
