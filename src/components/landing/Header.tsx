"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.features, href: "#features" },
    { label: t.nav.templates, href: "#templates" },
    { label: t.nav.analytics, href: "#analytics" },
    { label: t.nav.faq, href: "#faq" },
  ];

  const toggleLang = () => setLanguage(language === "en" ? "es" : "en");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-strong border-b border-border-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-gold flex items-center justify-center">
              <span className="text-white font-bold text-sm">QR</span>
            </div>
            <span className="text-lg font-bold">
              QR <span className="text-primary">Universe</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-200 flex items-center gap-1.5"
              aria-label={t.common.ariaLang}
              title={t.common.language}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{language === "en" ? "EN" : "ES"}</span>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all duration-200"
                aria-label={t.common.ariaTheme}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            <a
              href="#"
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {t.header.signIn}
            </a>
            <a
              href="/studio"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
            >
              {t.header.getStarted}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary transition-all duration-200"
              aria-label={t.common.ariaLang}
            >
              <Globe className="w-4 h-4" />
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary transition-all duration-200"
                aria-label={t.common.ariaTheme}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary transition-all duration-200"
              aria-label={t.common.ariaMenu}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-strong border-t border-border-subtle overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-text-secondary hover:text-text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-border-subtle" />
              <a
                href="#"
                className="block text-text-secondary hover:text-text-primary transition-colors py-2"
              >
                {t.header.signIn}
              </a>
              <a
                href="/studio"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-xl bg-primary text-white font-semibold transition-all duration-300 hover:bg-primary-light"
              >
                {t.header.getStarted}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
