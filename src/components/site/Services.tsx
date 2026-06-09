"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Container, Shovel, Wrench, Mountain } from "lucide-react";

const SERVICES = [
  {
    id: "container",
    icon: Container,
    title: "Container & Entsorgung",
    sub: "600 Container, 2–33 m³",
    body: "Vom kleinen Bauschutt-Container bis zum 33 m³-Industriecontainer. Festpreis. Gesetzeskonforme Entsorgung.",
    big: true,
  },
  {
    id: "erdbau",
    icon: Shovel,
    title: "Erdbau & Bautransport",
    sub: "Aushub bis Anlieferung",
    body: "Baugrube, Verfüllung, Aushub-Transport. Alles aus einer Hand — Maschine, Fahrer und Disposition aus Woltersdorf.",
  },
  {
    id: "abriss",
    icon: Wrench,
    title: "Abriss & Baustellen­vorbereitung",
    sub: "Bauen fängt beim Abriss an",
    body: "Schuppen, Garage, kleines Haus. Wir reißen ab, sortieren und entsorgen — Sie übergeben eine leere Fläche.",
  },
  {
    id: "baustoffe",
    icon: Mountain,
    title: "Baustoffe & Rohstoffe",
    sub: "Kies · Sand · Mutterboden",
    body: "Sand, Kies, Füllboden, Mutterboden, Rindenmulch, Recyclingbaustoffe. Geliefert auf Ihre Baustelle.",
  },
];

export function Services() {
  return (
    <section id="leistungen" className="scroll-mt-24 py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange">
              Leistungen
            </div>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.02]">
              Vier Gewerke. <span className="text-bone/50">Eine Telefonnummer.</span>
            </h2>
          </div>
          <p className="text-bone/60 max-w-md">
            Container ist nur der Anfang. Für viele Bauvorhaben übernehmen wir das
            komplette Drumherum — Sie sparen Koordination und Geld.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const span = s.big ? "lg:col-span-6" : "lg:col-span-4";
            return (
              <motion.a
                key={s.id}
                href={`#anfragen`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative ${
                  i === 0 ? "lg:col-span-12" : span
                } p-6 sm:p-8 rounded-2xl border border-bone/10 bg-gradient-to-br from-ink-2 to-ink hover:border-orange/40 transition-colors`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-orange/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-orange" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="font-display text-2xl sm:text-3xl text-bone">
                        {s.title}
                      </div>
                      <div className="text-sm text-bone/50 mt-0.5">{s.sub}</div>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-bone/40 group-hover:text-orange group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    strokeWidth={1.8}
                  />
                </div>
                <p className="mt-4 text-bone/70 leading-relaxed max-w-xl">{s.body}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
