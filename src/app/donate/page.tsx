"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const PRESETS = [3, 5, 10];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DonatePage() {
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomActive, setIsCustomActive] = useState(false);

  const amount = isCustomActive
    ? Number(customAmount) || 0
    : selectedPreset ?? 0;

  const handleDonate = () => {
    if (amount <= 0) return;
    window.open(
      `https://paypal.me/rsalgado85/${amount}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Back link */}
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t.nav.studio ? "Home" : "Inicio"}
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center size-20 rounded-2xl bg-gradient-to-br from-primary/20 to-gold/10 border border-border-subtle"
            >
              <Heart className="size-10 text-primary fill-primary" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold gradient-text"
            >
              {t.donate.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="text-text-secondary max-w-sm mx-auto leading-relaxed"
            >
              {t.donate.desc}
            </motion.p>
          </div>

          {/* Amount selection card */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 sm:p-8 text-left space-y-6 border border-border-subtle"
          >
            <p className="text-sm font-medium text-text-primary">
              {t.donate.chooseAmount}
            </p>

            {/* Preset buttons + custom input */}
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedPreset(amt);
                    setIsCustomActive(false);
                  }}
                  className={`flex items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                    selectedPreset === amt && !isCustomActive
                      ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/20"
                      : "border-border-subtle text-text-secondary hover:border-primary/30 hover:text-text-primary hover:bg-bg-card-hover"
                  }`}
                >
                  ${amt}
                </button>
              ))}

              {/* Custom amount input */}
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-medium text-text-secondary">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="Other"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setIsCustomActive(true);
                  }}
                  onFocus={() => setIsCustomActive(true)}
                  className={`w-full rounded-xl border bg-transparent py-3 pl-7 pr-1.5 text-sm font-semibold outline-none transition-all duration-200 text-center placeholder:text-text-secondary/50 ${
                    isCustomActive
                      ? "border-primary ring-2 ring-primary/20 text-text-primary"
                      : "border-border-subtle text-text-secondary hover:border-primary/30"
                  }`}
                />
              </div>
            </div>

            {/* PayPal button */}
            <button
              onClick={handleDonate}
              disabled={amount <= 0}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-primary to-gold px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Heart className="size-4 fill-white" />
              {t.donate.paypalButton}
              {amount > 0 ? ` — $${amount}` : ""}
            </button>
          </motion.div>

          {/* Redirect note */}
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className="text-xs text-text-secondary"
          >
            {t.donate.redirectNote}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
