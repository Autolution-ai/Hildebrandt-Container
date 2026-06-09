"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const PROJECTS = [
  {
    title: "Komplette Entkernung Reihenhaus",
    place: "Erkner",
    type: "Abriss · Container",
    size: "3 × 10 m³",
    color: "from-orange/30 to-orange/5",
  },
  {
    title: "Bauschutt-Räumung Renovierung",
    place: "Berlin-Köpenick",
    type: "Container · Entsorgung",
    size: "1 × 7 m³",
    color: "from-bone/15 to-bone/0",
  },
  {
    title: "Aushub & Mutterboden",
    place: "Woltersdorf",
    type: "Erdbau · Bautransport",
    size: "32 t",
    color: "from-orange/20 to-orange/0",
  },
  {
    title: "Gartenumbau & Recycling",
    place: "Rüdersdorf",
    type: "Container · Baustoffe",
    size: "2 × 5 m³ · 8 t Kies",
    color: "from-bone/10 to-bone/0",
  },
];

export function References() {
  return (
    <section
      id="referenzen"
      className="scroll-mt-24 py-20 sm:py-28 border-t border-line"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange">
              Referenzen
            </div>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.02]">
              Aus Berlin und Umland.{" "}
              <span className="text-bone/50">Jeden Tag.</span>
            </h2>
          </div>
          <p className="text-bone/60 max-w-md">
            Auszug aus den letzten Wochen. Detail-Fotos und Vorher/Nachher folgen mit
            dem Relaunch — Sie können uns gerne nach Referenzen in Ihrer Straße
            fragen.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden border border-bone/10 bg-ink-2 aspect-[4/5]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.color}`}
                aria-hidden
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.04) 14px 15px)",
                }}
              />
              <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
                <div className="text-xs uppercase tracking-wider text-bone/70">
                  {p.type}
                </div>
                <div className="mt-1 font-display text-xl sm:text-2xl text-bone leading-tight">
                  {p.title}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-bone/60">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.place}
                  <span className="text-bone/30">·</span>
                  <span className="tabular-nums">{p.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
