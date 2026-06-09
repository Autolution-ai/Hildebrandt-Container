"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock4, Receipt } from "lucide-react";

const ITEMS = [
  {
    icon: Receipt,
    pain: "„Was kostet das am Ende wirklich?“",
    fix: "Festpreis schriftlich vorab. Kein Nachschlag bei der Abholung.",
  },
  {
    icon: Clock4,
    pain: "„Kommen die auch wirklich morgen?“",
    fix: "24 h-Lieferung in Berlin und Umland. Termin steht, wenn wir auflegen.",
  },
  {
    icon: ShieldCheck,
    pain: "„Was darf da überhaupt rein?“",
    fix: "Wir sortieren mit Ihnen am Telefon. Vermeidet falsche Container und Kosten.",
  },
];

export function Problems() {
  return (
    <section className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-orange">
            Drei Sorgen. Drei klare Antworten.
          </div>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.02]">
            Sie brauchen einen Container —{" "}
            <span className="text-bone/50">keine Überraschungen.</span>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-px bg-bone/10 border border-bone/10 rounded-2xl overflow-hidden">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.pain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-ink p-6 sm:p-8"
              >
                <Icon className="w-7 h-7 text-orange" strokeWidth={1.8} />
                <div className="mt-5 text-bone/80 text-lg font-display">
                  {it.pain}
                </div>
                <div className="mt-3 text-bone/60 leading-relaxed">{it.fix}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
