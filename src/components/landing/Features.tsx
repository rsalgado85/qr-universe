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

const features = [
  {
    icon: Users,
    title: "Social QR",
    description:
      "Connect social profiles, share contact info, and grow your network with dynamic social QR codes.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Briefcase,
    title: "Business QR",
    description:
      "Professional QR codes for vCards, digital business cards, LinkedIn profiles, and company pages.",
    color: "from-primary/20 to-emerald-500/20",
    iconColor: "text-primary",
  },
  {
    icon: Wrench,
    title: "Utility QR",
    description:
      "Create QR codes for WiFi access, payment links, app downloads, and everyday utility tasks.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant QR",
    description:
      "Digital menus, ordering systems, table reservations, and review collections — all via QR.",
    color: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Calendar,
    title: "Event QR",
    description:
      "Event registration, ticketing, scheduling, and calendar integrations with dynamic QR codes.",
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track scans, locations, devices, and engagement metrics in real-time with advanced analytics.",
    color: "from-teal-500/20 to-green-500/20",
    iconColor: "text-teal-400",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
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
              Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="gradient-text">Professional QR</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From simple URLs to complex dynamic campaigns — one platform, endless
            possibilities.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => {
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
