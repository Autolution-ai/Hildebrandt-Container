"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Truck, Wrench, FileText, Home, Clock4, Wallet } from "lucide-react";

const POSITIONS = [
  {
    id: "lkw",
    title: "LKW-Fahrer / Baumaschinist (m/w/d)",
    sub: "Festanstellung · Region Berlin & Umland",
    icon: Truck,
    perks: [
      { icon: Home, label: "Nur regional fahren" },
      { icon: Clock4, label: "Abends zuhause" },
      { icon: Wallet, label: "Faire Bezahlung" },
    ],
    href: "/jobs/bewerben?stelle=lkw",
    accent: true,
  },
  {
    id: "schlosser",
    title: "Fahrzeugschlosser / KFZ-Mechatroniker (m/w/d)",
    sub: "Festanstellung · eigene Werkstatt in Woltersdorf",
    icon: Wrench,
    perks: [
      { icon: Home, label: "Feste Werkstatt" },
      { icon: Clock4, label: "Geregelte Zeiten" },
      { icon: Wallet, label: "Faire Bezahlung" },
    ],
    href: "/jobs/bewerben?stelle=schlosser",
    accent: true,
  },
];

export function Jobs() {
  return (
    <section
      id="jobs"
      className="scroll-mt-24 relative py-20 sm:py-28 border-t border-line overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 80% 50%, rgba(255,106,0,0.10), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange">
              Karriere
            </div>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.02]">
              Fahre regional.{" "}
              <span className="text-bone/50">Mehr Zeit für Familie.</span>
            </h2>
            <p className="mt-5 text-bone/70 text-base sm:text-lg leading-relaxed max-w-xl">
              Wir sind ein Familienbetrieb in Woltersdorf. Kurze Wege, klare Ansage,
              moderne Fahrzeugflotte. Bewerben in 90 Sekunden — keine Anschreiben-Pflicht.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <a
              href="/jobs/bewerben"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange text-ink font-semibold hover:bg-orange-2 transition-colors"
            >
              In 2 Minuten bewerben
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4 sm:gap-6">
          {POSITIONS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.id}
                href={p.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 sm:p-8 rounded-2xl border-2 border-orange/30 bg-gradient-to-br from-orange/[0.06] to-transparent hover:border-orange/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange flex items-center justify-center">
                    <Icon className="w-6 h-6 text-ink" strokeWidth={2} />
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-bone/50 group-hover:text-orange group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="mt-5">
                  <div className="font-display text-2xl sm:text-[28px] leading-tight text-bone">
                    {p.title}
                  </div>
                  <div className="mt-1.5 text-sm text-bone/60">{p.sub}</div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.perks.map((perk) => {
                    const PIcon = perk.icon;
                    return (
                      <span
                        key={perk.label}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bone/[0.05] border border-bone/10 text-xs sm:text-sm text-bone/80"
                      >
                        <PIcon className="w-3.5 h-3.5 text-orange" strokeWidth={2} />
                        {perk.label}
                      </span>
                    );
                  })}
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.a
          href="/jobs/bewerben?stelle=initiativ"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group mt-4 sm:mt-6 flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-bone/10 bg-ink-2 hover:border-bone/25 transition-colors"
        >
          <div className="flex items-center gap-4">
            <FileText
              className="w-5 h-5 text-bone/60"
              strokeWidth={1.8}
            />
            <div>
              <div className="font-semibold text-bone">
                Initiativbewerbung
              </div>
              <div className="text-sm text-bone/55">
                Andere Position? Sagen Sie uns, was Sie können — wir hören zu.
              </div>
            </div>
          </div>
          <ArrowUpRight
            className="w-5 h-5 text-bone/40 group-hover:text-bone transition-colors flex-shrink-0"
            strokeWidth={1.8}
          />
        </motion.a>
      </div>
    </section>
  );
}
