"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "@/components/language-provider";

const weeklyData = [
  { name: "Mon", scans: 240, unique: 180 },
  { name: "Tue", scans: 320, unique: 260 },
  { name: "Wed", scans: 280, unique: 220 },
  { name: "Thu", scans: 450, unique: 380 },
  { name: "Fri", scans: 520, unique: 440 },
  { name: "Sat", scans: 610, unique: 520 },
  { name: "Sun", scans: 580, unique: 490 },
];

export function AnalyticsShowcase() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const stats = [
    { label: t.analytics_showcase.totalScans, value: "3,000", change: "+12.5%", up: true },
    { label: t.analytics_showcase.uniqueVisitors, value: "2,490", change: "+8.2%", up: true },
    { label: "CTR", value: "24.8%", change: "+3.1%", up: true },
    { label: "Avg. Time", value: "42s", change: "-5.3%", up: false },
  ];

  return (
    <section id="analytics" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {t.analytics_showcase.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.analytics_showcase.title1}{" "}
            <span className="gradient-text">{t.analytics_showcase.title2}</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t.analytics_showcase.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl glass">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <span
                  className={`text-xs font-medium ${
                    stat.up ? "text-green-400" : "text-rose-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-72 sm:h-80">
            {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0F172A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#F8FAFC",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="scans"
                  stroke="#14B8A6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScans)"
                />
                <Area
                  type="monotone"
                  dataKey="unique"
                  stroke="#F5A623"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUnique)"
                />
              </AreaChart>
            </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-text-secondary">{t.analytics_showcase.totalScans}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span className="text-sm text-text-secondary">{t.analytics_showcase.uniqueVisitors}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
