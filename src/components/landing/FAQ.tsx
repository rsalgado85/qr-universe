"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What makes QR Universe different from other QR generators?",
    answer:
      "QR Universe is not just a generator — it's a complete visual platform. You get advanced customization (colors, logos, shapes, gradients), real-time preview, dynamic QR codes that you can update anytime, detailed analytics, and beautifully designed templates. All wrapped in a premium, intuitive interface.",
  },
  {
    question: "Are dynamic QR codes really free?",
    answer:
      "Yes! Our Free plan includes up to 5 dynamic QR codes with basic analytics. Dynamic QR codes let you change the destination URL anytime without reprinting the code. Pro and Business plans unlock unlimited dynamic codes and advanced features.",
  },
  {
    question: "Can I use my own logo and brand colors?",
    answer:
      "Absolutely. All plans support custom branding — upload your logo, choose brand colors, and style every aspect of your QR code. Pro and Business plans include advanced customization with gradient colors, custom shapes, and brand kits.",
  },
  {
    question: "What kind of analytics do you provide?",
    answer:
      "We track total scans, unique users, scan locations (country/city), device types, operating systems, browsers, time of scan, and more. Pro and Business plans include downloadable reports, API access, and integrations with Google Analytics.",
  },
  {
    question: "How do templates work?",
    answer:
      "Templates are pre-designed QR experiences for common use cases — restaurants, events, real estate, and more. Each template is fully customizable. Just pick one, adjust the content and styling, and your QR code is ready to share in minutes.",
  },
  {
    question: "Is there an API for bulk QR code generation?",
    answer:
      "Yes, our Business plan includes full API access for programmatic QR code creation and management. You can generate thousands of codes, update them dynamically, and pull analytics data — perfect for enterprise workflows.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Everything you need to know about QR Universe.
          </p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl glass overflow-hidden transition-all duration-300 hover:border-border-muted"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm sm:text-base font-medium pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary" />
                  ) : (
                    <Plus className="w-5 h-5 text-text-secondary" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
