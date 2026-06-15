"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "QR Universe transformed how we handle our restaurant menus. The analytics alone have helped us optimize our offerings based on what people actually look at.",
    name: "Sarah Chen",
    role: "Owner, The Golden Table",
    avatar: "SC",
    color: "from-primary to-emerald-500",
  },
  {
    quote:
      "We've tried every QR generator out there. None come close to the customization and brand control QR Universe gives us. It's become essential to our marketing stack.",
    name: "Marcus Rivera",
    role: "Marketing Director, BrandWave",
    avatar: "MR",
    color: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "The dynamic QR codes with real-time analytics changed our event game. We now know exactly which touchpoints drive engagement during our conferences.",
    name: "Emily Park",
    role: "Event Manager, TechCon Global",
    avatar: "EP",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "As a real estate agent, I need my QR codes to look premium. QR Universe delivers exactly that — my open house signs have never gotten more scans.",
    name: "David Thompson",
    role: "Real Estate Agent, Premier Homes",
    avatar: "DT",
    color: "from-gold to-orange-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-medium text-gold uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Hear from professionals who use QR Universe every day to create
            beautiful, high-performing QR experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={card}
              className="relative p-6 sm:p-8 rounded-2xl glass hover:bg-bg-card-hover/50 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <blockquote className="text-text-primary text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
