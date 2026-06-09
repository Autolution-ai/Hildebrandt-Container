"use client";

import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-line overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,106,0,0.18), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-bone leading-[1.0]">
          Sagen Sie uns,{" "}
          <span className="text-orange">was weg muss.</span>
          <br className="hidden sm:block" />
          Wir kümmern uns.
        </h2>
        <p className="mt-6 text-bone/70 text-base sm:text-lg max-w-2xl mx-auto">
          Anruf, Festpreis, Container vor der Tür. So einfach läuft das bei
          uns — seit Jahrzehnten, in ganz Berlin und Umland.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-orange text-ink font-semibold text-lg hover:bg-orange-2 transition-colors shadow-[0_0_0_1px_rgba(255,106,0,0.5),0_20px_50px_-15px_rgba(255,106,0,0.6)]"
          >
            <Phone className="w-5 h-5" strokeWidth={2.5} />
            <span className="tabular-nums">{SITE.phone}</span>
          </a>
          <a
            href="#anfragen"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-bone/20 text-bone font-medium hover:bg-bone/5 transition-colors"
          >
            Online anfragen
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
