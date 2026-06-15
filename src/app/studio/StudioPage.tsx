"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/components/language-provider";
import {
  Link,
  Palette,
  Upload,
  Trash2,
  Download,
  BarChart3,
  Sparkles,
  Grid3X3,
  Maximize,
  Shapes,
  Monitor,
  Share2,
  UtensilsCrossed,
  Building2,
  CalendarDays,
  UserCircle2,
  TrendingUp,
  UserCheck,
  Briefcase,
} from "lucide-react";

/* ───── SVG icon helpers ───── */
function makeIconUrl(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* PNG fallbacks for better QR compatibility (some renderers choke on SVG) */
function makePngIconUrl(svg: string, color: string): string {
  // Use a tiny canvas-like SVG that renders cleanly at small sizes
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const ICONS: Record<string, (fg?: string) => string> = {
  restaurant: (fg = "#F59E0B") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>`),
  realEstate: (fg = "#3B82F6") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>`),
  events: (fg = "#A855F7") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`),
  personalBrand: (fg = "#14B8A6") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.925 20.056a6 6 0 0 0-11.851.001"/><circle cx="12" cy="11" r="4"/><circle cx="12" cy="12" r="10"/></svg>`),
  influencers: (fg = "#EC4899") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>`),
  recruiters: (fg = "#10B981") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`),
  corporate: (fg = "#F5A623") =>
    makeIconUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`),
};

/* ───── template presets ───── */
const TEMPLATES = [
  {
    id: "restaurant",
    fg: "#F59E0B",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#F59E0B",
    gradientEnd: "#FBBF24",
    icon: ICONS.restaurant(),
  },
  {
    id: "realEstate",
    fg: "#3B82F6",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#3B82F6",
    gradientEnd: "#60A5FA",
    icon: ICONS.realEstate(),
  },
  {
    id: "events",
    fg: "#A855F7",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#A855F7",
    gradientEnd: "#C084FC",
    icon: ICONS.events(),
  },
  {
    id: "personalBrand",
    fg: "#14B8A6",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#14B8A6",
    gradientEnd: "#2DD4BF",
    icon: ICONS.personalBrand(),
  },
  {
    id: "influencers",
    fg: "#EC4899",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#EC4899",
    gradientEnd: "#F472B6",
    icon: ICONS.influencers(),
  },
  {
    id: "recruiters",
    fg: "#10B981",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#10B981",
    gradientEnd: "#34D399",
    icon: ICONS.recruiters(),
  },
  {
    id: "corporate",
    fg: "#F5A623",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#F5A623",
    gradientEnd: "#F7B84D",
    icon: ICONS.corporate(),
  },
] as const;

/* ── lucide icon mapping for UI display (matches Home Templates) ── */
const TEMPLATE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  restaurant: UtensilsCrossed,
  realEstate: Building2,
  events: CalendarDays,
  personalBrand: UserCircle2,
  influencers: TrendingUp,
  recruiters: UserCheck,
  corporate: Briefcase,
};

const TEMPLATE_COLORS: Record<string, string> = {
  restaurant: "text-orange-400",
  realEstate: "text-blue-400",
  events: "text-purple-400",
  personalBrand: "text-primary",
  influencers: "text-pink-400",
  recruiters: "text-green-400",
  corporate: "text-amber-400",
};

const DOT_OPTIONS = [
  "square",
  "dots",
  "rounded",
  "classy",
  "classy-rounded",
  "extra-rounded",
] as const;

const CORNER_SQUARE_OPTIONS = ["square", "extra-rounded", "dot"] as const;

const CORNER_DOT_OPTIONS = ["dot", "square"] as const;

const SIZE_OPTIONS = [
  { label: "small", px: 200 },
  { label: "medium", px: 280 },
  { label: "large", px: 360 },
] as const;

/* ───── helpers ───── */
function buildQROptions(state: QRState) {
  const opts: Record<string, unknown> = {
    width: state.size,
    height: state.size,
    data: state.url || "https://qr-universe.com",
    dotsOptions: {
      color: state.fgColor,
      type: state.dotType,
    },
    cornersSquareOptions: {
      color: state.fgColor,
      type: state.cornerSquareType,
    },
    cornersDotOptions: {
      color: state.fgColor,
      type: state.cornerDotType,
    },
    backgroundOptions: {
      color: state.bgColor,
    },
  };

  if (state.useGradient) {
    (opts.dotsOptions as Record<string, unknown>).gradient = {
      type: "linear",
      rotation: 0.785398, // 45°
      colorStops: [
        { offset: 0, color: state.gradientStart },
        { offset: 1, color: state.gradientEnd },
      ],
    };
  }

  if (state.logo) {
    opts.image = state.logo;
  } else {
    opts.image = undefined; // Explicitly clear when no logo
  }

  return opts;
}

/* ───── types ───── */
interface QRState {
  url: string;
  fgColor: string;
  bgColor: string;
  useGradient: boolean;
  gradientStart: string;
  gradientEnd: string;
  logo: string | null;
  dotType: string;
  cornerSquareType: string;
  cornerDotType: string;
  size: number;
}

/* ═══════════════════════════════════════════════════
   STUDIO PAGE
   ═══════════════════════════════════════════════════ */
export default function StudioPage() {
  const { t } = useLanguage();
  const qrRef = useRef<{ update: (o: unknown) => void; append: (el: HTMLElement) => void; getRawData: (ext: string) => Promise<Blob | null> } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [qrReady, setQrReady] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [hasCustomLogo, setHasCustomLogo] = useState(false);

  /* state */
  const [state, setState] = useState<QRState>({
    url: "https://qr-universe.com",
    fgColor: "#14B8A6",
    bgColor: "#0F172A",
    useGradient: false,
    gradientStart: "#14B8A6",
    gradientEnd: "#2DD4BF",
    logo: null,
    dotType: "rounded",
    cornerSquareType: "extra-rounded",
    cornerDotType: "dot",
    size: 280,
  });

  /* ── apply template from query param on mount ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    if (templateId) {
      const tpl = TEMPLATES.find((t) => t.id === templateId);
      if (tpl) {
        setActiveTemplate(tpl.id);
        setState((prev) => ({
          ...prev,
          fgColor: tpl.fg,
          bgColor: tpl.bg,
          useGradient: tpl.gradient,
          gradientStart: tpl.gradientStart,
          gradientEnd: tpl.gradientEnd,
          logo: tpl.icon,
        }));
      }
    }
  }, []);

  /* ── dynamic import + instantiate on mount ── */
  useEffect(() => {
    let cancelled = false;
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (cancelled) return;
      const instance = new QRCodeStyling(buildQROptions(state));
      qrRef.current = instance as typeof qrRef.current;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        instance.append(containerRef.current);
      }
      setQrReady(true);
    });
    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── update QR whenever state changes ── */
  useEffect(() => {
    if (!qrRef.current) return;
    qrRef.current.update(buildQROptions(state));
  }, [state]);

  /* ── helpers ── */
  const update = useCallback(<K extends keyof QRState>(key: K, value: QRState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyTemplate = useCallback(
    (tpl: (typeof TEMPLATES)[number]) => {
      // Toggle: if already active, deselect and reset to default
      if (activeTemplate === tpl.id) {
        setActiveTemplate(null);
        setHasCustomLogo(false);
        setState((prev) => ({
          ...prev,
          fgColor: "#14B8A6",
          bgColor: "#0F172A",
          useGradient: false,
          gradientStart: "#14B8A6",
          gradientEnd: "#2DD4BF",
          logo: null,
        }));
        return;
      }
      setActiveTemplate(tpl.id);
      setState((prev) => ({
        ...prev,
        fgColor: tpl.fg,
        bgColor: tpl.bg,
        useGradient: tpl.gradient,
        gradientStart: tpl.gradientStart,
        gradientEnd: tpl.gradientEnd,
        // Only set icon if user hasn't uploaded a custom logo
        logo: hasCustomLogo ? prev.logo : tpl.icon,
      }));
    },
    [activeTemplate, hasCustomLogo]
  );

  /* ── logo upload ── */
  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setHasCustomLogo(true);
        update("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [update]
  );

  /* ── clear logo ── */
  const handleClearLogo = useCallback(() => {
    setHasCustomLogo(false);
    // Re-apply template icon if a template is active
    if (activeTemplate) {
      const tpl = TEMPLATES.find((t) => t.id === activeTemplate);
      if (tpl) {
        update("logo", tpl.icon);
        return;
      }
    }
    update("logo", null);
  }, [activeTemplate, update]);

  /* ── export ── */
  const handleExport = useCallback(async (format: "png" | "svg" | "pdf") => {
    if (!qrRef.current) return;
    setExporting(format);
    try {
      const blob = await qrRef.current.getRawData(format);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-code.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(null);
    }
  }, []);

  /* ── share ── */
  const [sharing, setSharing] = useState(false);
  const handleShare = useCallback(async () => {
    if (!qrRef.current) return;
    setSharing(true);
    try {
      const blob = await qrRef.current.getRawData("png");
      if (!blob) return;
      const file = new File([blob], "qr-code.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "QR Universe",
        });
      } else {
        // Fallback: download as image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-code.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      // User cancelled share — no-op
      if ((err as DOMException).name !== "AbortError") {
        // Fallback on error: download
        const blob = await qrRef.current.getRawData("png");
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "qr-code.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }
    } finally {
      setSharing(false);
    }
  }, []);

  /* ── mock stats ── */
  const stats = { scans: 12347, today: 89, thisMonth: 2143 };

  /* ── translation shortcuts ── */
  const st = t.studio;

  return (
    <main className="min-h-screen bg-bg-dark text-text-primary pt-16 sm:pt-20">
      {/* ── Studio Header ── */}
      <header className="border-b border-border-subtle px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">{st.title}</h1>
              <p className="text-xs text-text-secondary">{st.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-text-secondary text-sm">
            <Monitor className="w-4 h-4" />
            <span>QR Universe Studio</span>
          </div>
        </div>
      </header>

      {/* ── Three-column layout ── */}
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-6 p-6">
        {/* ═══ LEFT PANEL ═══ */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
          {/* URL input */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Link className="w-4 h-4" />
              {st.url.label}
            </div>
            <input
              type="text"
              value={state.url}
              onChange={(e) => update("url", e.target.value)}
              placeholder={st.url.placeholder}
              className="w-full rounded-xl input-field px-4 py-3 text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Templates */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Sparkles className="w-4 h-4" />
              {st.templates.title}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tpl) => {
                const TplIcon = TEMPLATE_ICONS[tpl.id];
                return (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border transition-all p-3 ${
                    activeTemplate === tpl.id
                      ? "surface-active border-primary/50 ring-1 ring-primary/30"
                      : "surface-subtle hover:border-primary/40 surface-hover"
                  }`}
                >
                  {TplIcon && <TplIcon className={`w-6 h-6 ${TEMPLATE_COLORS[tpl.id]}`} />}
                  <span className="text-xs text-text-secondary">
                    {st.templates[tpl.id as keyof typeof st.templates]}
                  </span>
                </button>
              )})}
            </div>
          </div>

          {/* Colors */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Palette className="w-4 h-4" />
              {st.colors.title}
            </div>

            {/* Foreground */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-text-secondary">{st.colors.foreground}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.fgColor}
                  onChange={(e) => update("fgColor", e.target.value)}
                  className="w-7 h-7 rounded-lg border color-swatch bg-transparent cursor-pointer p-0.5"
                />
                <span className="text-xs text-text-secondary font-mono">{state.fgColor}</span>
              </div>
            </div>

            {/* Background */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-text-secondary">{st.colors.background}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.bgColor}
                  onChange={(e) => update("bgColor", e.target.value)}
                  className="w-7 h-7 rounded-lg border color-swatch bg-transparent cursor-pointer p-0.5"
                />
                <span className="text-xs text-text-secondary font-mono">{state.bgColor}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ═══ CENTER — QR preview ═══ */}
        <section className="flex-1 flex flex-col items-center gap-6 min-h-[400px]">
          {/* QR canvas */}
          <div className="glass rounded-2xl p-8 w-full flex items-center justify-center min-h-[360px]">
            {!qrReady && (
              <div className="text-text-secondary text-sm animate-pulse">
                {st.loading}
              </div>
            )}
            <div ref={containerRef} className="qr-container" />
          </div>

          {/* Size selector */}
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <span className="text-xs text-text-secondary flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5" />
              {st.size.title}
            </span>
            <div className="flex gap-1">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.px}
                  onClick={() => update("size", opt.px)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all size-btn ${
                    state.size === opt.px
                      ? "!bg-primary/20 !text-primary"
                      : ""
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Export buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleExport("png")}
              disabled={exporting !== null}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {exporting === "png" ? st.export.downloading : st.export.png}
            </button>
            <button
              onClick={() => handleExport("svg")}
              disabled={exporting !== null}
              className="px-4 py-2 rounded-xl export-btn text-sm font-medium hover:bg-white/15 dark:hover:bg-white/15 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {exporting === "svg" ? st.export.downloading : st.export.svg}
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={exporting !== null}
              className="px-4 py-2 rounded-xl export-btn text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {exporting === "pdf" ? st.export.downloading : st.export.pdf}
            </button>
            <button
              onClick={handleShare}
              disabled={sharing}
              className="px-4 py-2 rounded-xl export-btn text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {sharing ? st.export.sharing : st.export.share}
            </button>
          </div>
        </section>

        {/* ═══ RIGHT PANEL ═══ */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
          {/* Logo / Image upload */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Upload className="w-4 h-4" />
              {st.logo?.title || "Logo"}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => logoInputRef.current?.click()}
                className="flex-1 px-4 py-2.5 rounded-xl surface-subtle border text-sm text-text-primary hover:border-primary/40 transition-all text-center"
              >
                {state.logo ? st.logo.change : st.logo.upload}
              </button>
              {state.logo && (
                <button
                  onClick={handleClearLogo}
                  className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                  title={st.logo.remove}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            {state.logo && hasCustomLogo && (
              <p className="text-[10px] text-text-secondary/60">
                {st.logo.customHint}
              </p>
            )}
          </div>

          {/* Dot style */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Grid3X3 className="w-4 h-4" />
              {st.dots.title}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DOT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => update("dotType", opt)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                    state.dotType === opt
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "surface-subtle text-text-secondary"
                  }`}
                >
                  {opt.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Corner styles */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Shapes className="w-4 h-4" />
              {st.corners.title}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-text-secondary/70 mb-1.5 block">
                  {st.corners.outer}
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {CORNER_SQUARE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update("cornerSquareType", opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                        state.cornerSquareType === opt
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "surface-subtle text-text-secondary"
                      }`}
                    >
                      {opt.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-text-secondary/70 mb-1.5 block">
                  {st.corners.inner}
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {CORNER_DOT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update("cornerDotType", opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                        state.cornerDotType === opt
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "surface-subtle text-text-secondary"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats mock */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <BarChart3 className="w-4 h-4" />
              {st.stats.title}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-primary">
                  {stats.scans.toLocaleString()}
                </div>
                <div className="text-[10px] text-text-secondary">{st.stats.total}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">{stats.today}</div>
                <div className="text-[10px] text-text-secondary">{st.stats.today}</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {stats.thisMonth.toLocaleString()}
                </div>
                <div className="text-[10px] text-text-secondary">
                  {st.stats.month}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
