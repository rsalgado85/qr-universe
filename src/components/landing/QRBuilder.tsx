"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCodeStyling, { type Options } from "qr-code-styling";
import { Loader2, RefreshCw } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function QRBuilder() {
  const { t } = useLanguage();
  const [text, setText] = useState("https://qruniverse.com");
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 240,
      height: 240,
      data: text,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 8,
      },
      dotsOptions: {
        type: "rounded",
        color: "#14B8A6",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: "#14B8A6" },
            { offset: 1, color: "#0D9488" },
          ],
        },
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#14B8A6",
      },
      cornersDotOptions: {
        type: "dot",
        color: "#F5A623",
      },
      backgroundOptions: {
        color: "transparent",
      },
    });

    setQrCode(qr);
    setIsReady(true);

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    if (qrCode && containerRef.current) {
      containerRef.current.innerHTML = "";
      qrCode.append(containerRef.current);
    }
  }, [qrCode, isReady]);

  const updateQR = useCallback(() => {
    if (qrCode) {
      qrCode.update({
        data: text || "https://qruniverse.com",
      });
    }
  }, [qrCode, text]);

  useEffect(() => {
    if (qrCode) {
      const timeout = setTimeout(updateQR, 300);
      return () => clearTimeout(timeout);
    }
  }, [text, qrCode, updateQR]);

  const presets = [
    { label: `🌐 ${t.hero.presets.website}`, value: "https://example.com" },
    { label: `📱 ${t.hero.presets.wifi}`, value: "WIFI:S:MyNetwork;T:WPA;P:mypassword;;" },
    { label: `📧 ${t.hero.presets.email}`, value: "mailto:hello@qruniverse.com" },
    { label: `📍 ${t.hero.presets.location}`, value: "https://maps.google.com/?q=40.7128,-74.0060" },
  ];

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6 sm:p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
          {t.hero.livePreview}
        </h3>
      </div>

      {/* QR Display */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl" />
          <div className="relative bg-white rounded-2xl p-4">
            {isReady ? (
              <div ref={containerRef} className="flex items-center justify-center" />
            ) : (
              <div className="w-[240px] h-[240px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.hero.placeholder}
            className="w-full px-4 py-3 rounded-xl bg-bg-dark border border-border-muted text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
          />
          <button
            onClick={updateQR}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
            title={t.hero.refresh || "Refresh QR"}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setText(preset.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                text === preset.value
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "glass text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
