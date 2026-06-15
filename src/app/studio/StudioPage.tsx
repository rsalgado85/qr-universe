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
} from "lucide-react";

/* ───── template presets ───── */
const TEMPLATES = [
  {
    id: "restaurant",
    fg: "#F59E0B",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#F59E0B",
    gradientEnd: "#FBBF24",
  },
  {
    id: "realEstate",
    fg: "#3B82F6",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#3B82F6",
    gradientEnd: "#60A5FA",
  },
  {
    id: "events",
    fg: "#A855F7",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#A855F7",
    gradientEnd: "#C084FC",
  },
  {
    id: "personalBrand",
    fg: "#14B8A6",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#14B8A6",
    gradientEnd: "#2DD4BF",
  },
  {
    id: "influencers",
    fg: "#EC4899",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#EC4899",
    gradientEnd: "#F472B6",
  },
  {
    id: "recruiters",
    fg: "#10B981",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#10B981",
    gradientEnd: "#34D399",
  },
  {
    id: "corporate",
    fg: "#F5A623",
    bg: "#0F172A",
    gradient: false,
    gradientStart: "#F5A623",
    gradientEnd: "#F7B84D",
  },
] as const;

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

  const applyTemplate = useCallback((tpl: (typeof TEMPLATES)[number]) => {
    setState((prev) => ({
      ...prev,
      fgColor: tpl.fg,
      bgColor: tpl.bg,
      useGradient: tpl.gradient,
      gradientStart: tpl.gradientStart,
      gradientEnd: tpl.gradientEnd,
    }));
  }, []);

  /* ── logo upload ── */
  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("logo", reader.result as string);
    reader.readAsDataURL(file);
  }, [update]);

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

  /* ── mock stats ── */
  const stats = { scans: 12347, today: 89, thisMonth: 2143 };

  /* ── translation shortcuts ── */
  const st = t.studio;

  return (
    <main className="min-h-screen bg-[#060B15] text-[#F8FAFC]">
      {/* ── Header ── */}
      <header className="border-b border-white/5 px-6 py-4">
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
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Templates */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Sparkles className="w-4 h-4" />
              {st.templates.title}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => applyTemplate(tpl)}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-white/[0.07] transition-all p-3"
                >
                  <span
                    className="w-8 h-8 rounded-full border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${tpl.fg}, ${tpl.gradientEnd})`,
                    }}
                  />
                  <span className="text-xs text-text-secondary">
                    {st.templates[tpl.id as keyof typeof st.templates]}
                  </span>
                </button>
              ))}
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
                  className="w-7 h-7 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
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
                  className="w-7 h-7 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                />
                <span className="text-xs text-text-secondary font-mono">{state.bgColor}</span>
              </div>
            </div>

            {/* Gradient toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state.useGradient}
                onChange={(e) => update("useGradient", e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-xs text-text-secondary">{st.colors.useGradient}</span>
            </label>

            {state.useGradient && (
              <div className="space-y-3 pl-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{st.colors.gradientStart}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={state.gradientStart}
                      onChange={(e) => update("gradientStart", e.target.value)}
                      className="w-7 h-7 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{st.colors.gradientEnd}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={state.gradientEnd}
                      onChange={(e) => update("gradientEnd", e.target.value)}
                      className="w-7 h-7 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logo */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Upload className="w-4 h-4" />
              {st.logo.title}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => logoInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all py-2.5 text-xs text-text-secondary"
              >
                <Upload className="w-3.5 h-3.5" />
                {st.logo.upload}
              </button>
              {state.logo && (
                <button
                  onClick={() => update("logo", null)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
            {state.logo && (
              <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3">
                <img
                  src={state.logo}
                  alt="Logo preview"
                  className="w-10 h-10 rounded-lg object-contain bg-white/10"
                />
                <span className="text-xs text-text-secondary">{st.logo.hint}</span>
              </div>
            )}
          </div>

          {/* Shape */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Shapes className="w-4 h-4" />
              {st.shapes.title}
            </div>

            {/* Dots type */}
            <div>
              <label className="text-xs text-text-secondary mb-2 block">{st.shapes.dots}</label>
              <div className="grid grid-cols-3 gap-1.5">
                {DOT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update("dotType", opt)}
                    className={`rounded-lg border py-2 text-xs transition-all ${
                      state.dotType === opt
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/5 bg-white/5 text-text-secondary hover:border-white/10"
                    }`}
                  >
                    {st.shapes.dotTypes[opt as keyof typeof st.shapes.dotTypes]}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner squares type */}
            <div>
              <label className="text-xs text-text-secondary mb-2 block">{st.shapes.corners}</label>
              <div className="grid grid-cols-3 gap-1.5">
                {CORNER_SQUARE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update("cornerSquareType", opt)}
                    className={`rounded-lg border py-2 text-xs transition-all ${
                      state.cornerSquareType === opt
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/5 bg-white/5 text-text-secondary hover:border-white/10"
                    }`}
                  >
                    {st.shapes.cornerTypes[opt as keyof typeof st.shapes.cornerTypes]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Size */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Maximize className="w-4 h-4" />
              {st.size.title}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => update("size", opt.px)}
                  className={`rounded-lg border py-2 text-xs transition-all ${
                    state.size === opt.px
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/5 bg-white/5 text-text-secondary hover:border-white/10"
                  }`}
                >
                  {st.size[opt.label]}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ═══ CENTER: QR Preview ═══ */}
        <section className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
          <div className="glass rounded-2xl p-8 lg:p-12 flex flex-col items-center gap-6 w-full max-w-lg">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Monitor className="w-4 h-4" />
              {t.hero.livePreview}
            </div>

            {/* QR container */}
            <div
              ref={containerRef}
              className={`flex items-center justify-center rounded-2xl bg-[#0F172A]/40 p-6 transition-all ${
                qrReady ? "opacity-100" : "opacity-0"
              }`}
            />

            {!qrReady && (
              <div className="flex flex-col items-center gap-3 py-8 text-text-secondary">
                <Grid3X3 className="w-8 h-8 animate-pulse" />
                <span className="text-sm">Loading QR Engine...</span>
              </div>
            )}

            {/* URL display */}
            <p className="text-xs text-text-secondary/60 truncate max-w-full">
              {state.url || "https://qr-universe.com"}
            </p>
          </div>
        </section>

        {/* ═══ RIGHT PANEL ═══ */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
          {/* Export */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Download className="w-4 h-4" />
              {st.export.title}
            </div>
            <div className="space-y-2">
              {(["png", "svg", "pdf"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleExport(fmt)}
                  disabled={!qrReady || exporting !== null}
                  className="w-full flex items-center justify-between rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all py-3 px-4 text-sm font-medium text-primary"
                >
                  <span>{st.export[fmt]}</span>
                  {exporting === fmt ? (
                    <span className="text-xs text-primary/70">{st.export.downloading}</span>
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-text-secondary/50 leading-relaxed">
              {t.faq.q[3].a}
            </p>
          </div>

          {/* Stats */}
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <BarChart3 className="w-4 h-4" />
              {st.stats.title}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-text-secondary">{st.stats.scans}</span>
                <span className="text-lg font-semibold text-primary">
                  {stats.scans.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-text-secondary">{st.stats.today}</span>
                <span className="text-lg font-semibold text-gold">
                  {stats.today.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">{st.stats.thisMonth}</span>
                <span className="text-lg font-semibold text-text-primary">
                  {stats.thisMonth.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-xs text-text-secondary/50">
              {t.analytics_showcase.subtitle}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
