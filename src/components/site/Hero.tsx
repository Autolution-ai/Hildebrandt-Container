"use client";

import { motion } from "framer-motion";
import { Phone, Star, ArrowDown } from "lucide-react";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 grain"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 10%, rgba(255,106,0,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(255,106,0,0.08), transparent 60%), #0F0F10",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-bone/15 bg-bone/[0.03] backdrop-blur-sm text-xs sm:text-sm text-bone/80"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          <span>Familienbetrieb aus Woltersdorf · seit Jahrzehnten</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display mt-6 text-[40px] leading-[1.02] sm:text-[64px] sm:leading-[0.98] lg:text-[96px] lg:leading-[0.95] text-bone max-w-5xl"
        >
          {SITE.containerCount} Container.
          <br />
          <span className="text-orange">Ein Anruf.</span> Morgen vor der Tür.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-bone/70 leading-relaxed"
        >
          Bauschutt, Sperrmüll, Renovierung. Wir bringen den passenden Container von
          2 bis 33 m³ — zum Festpreis, in Berlin und Umland. Kein Kleingedrucktes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <a
            href={SITE.phoneHref}
            className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-orange text-ink font-semibold text-base sm:text-lg hover:bg-orange-2 transition-colors shadow-[0_0_0_1px_rgba(255,106,0,0.5),0_20px_50px_-15px_rgba(255,106,0,0.6)]"
          >
            <Phone className="w-5 h-5" strokeWidth={2.5} />
            <span className="tabular-nums">{SITE.phone}</span>
            <span className="hidden sm:inline text-ink/70 text-sm font-medium">
              · sofort sprechen
            </span>
          </a>
          <a
            href="#anfragen"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-bone/20 text-bone font-medium hover:bg-bone/5 transition-colors"
          >
            <span>Container in 60 Sek. anfragen</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-bone/10 border border-bone/10 rounded-2xl overflow-hidden max-w-3xl"
        >
          <TrustCell
            top={
              <span className="flex items-center gap-1">
                <span className="tabular-nums">{SITE.rating.value}</span>
                <Star className="w-4 h-4 fill-orange text-orange" />
              </span>
            }
            bottom={`${SITE.rating.count} Google-Bewertungen`}
          />
          <TrustCell top={`${SITE.containerCount}+`} bottom="Container 2–33 m³" />
          <TrustCell top="24 h" bottom="Lieferung in der Region" />
          <TrustCell top="Festpreis" bottom="Vorab. Schriftlich." />
        </motion.div>
      </div>
    </section>
  );
}

function TrustCell({
  top,
  bottom,
}: {
  top: React.ReactNode;
  bottom: string;
}) {
  return (
    <div className="bg-ink px-4 py-4 sm:px-5 sm:py-5">
      <div className="font-display text-2xl sm:text-3xl text-bone tabular-nums">
        {top}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-bone/60">{bottom}</div>
    </div>
  );
}
