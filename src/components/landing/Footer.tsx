import Link from "next/link";
import { Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2">QR Universe</h3>
            <p className="text-text-secondary text-sm">
              Create beautiful, professional QR codes that stand out.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/#templates" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
          <p className="text-text-secondary text-xs flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary" /> by QR Universe &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
