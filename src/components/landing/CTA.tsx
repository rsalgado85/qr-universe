"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 relative">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="glass-strong rounded-3xl p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{  }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              {t.cta.badge}
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{  }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t.cta.title1}
            <br />
            <span className="gradient-text">{t.cta.title2}</span>
          </motion.h2>

          <motion.p
            className="text-lg text-text-secondary max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{  }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{  }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="#features"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
            >
              {t.cta.cta1}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#templates"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-text-primary font-semibold text-lg transition-all duration-300 hover:bg-bg-card-hover"
            >
              {t.cta.cta2}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
