"use client";

import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border-subtle bg-bg-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2">QR Universe</h3>
            <p className="text-text-secondary text-sm">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t.footer.product}</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Features</Link></li>
              <li><Link href="/#templates" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-text-secondary hover:text-text-primary text-sm transition-colors">{t.footer.privacy}</Link></li>
              <li><Link href="/terms" className="text-text-secondary hover:text-text-primary text-sm transition-colors">{t.footer.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
          <p className="text-text-secondary text-xs flex items-center justify-center gap-1">
            {t.footer.madeWith} <Heart className="w-3 h-3 text-primary" /> {t.footer.by} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
