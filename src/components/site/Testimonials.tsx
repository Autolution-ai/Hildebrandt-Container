"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    name: "Stefan K.",
    place: "Berlin-Friedrichshagen",
    when: "vor 2 Wochen",
    rating: 5,
    body: "Container morgens bestellt, am nächsten Tag stand er da. Festpreis am Telefon, exakt der Preis auf der Rechnung. So einfach kann es sein.",
  },
  {
    name: "Andrea M.",
    place: "Erkner",
    when: "vor 1 Monat",
    rating: 5,
    body: "Wir haben das Haus meiner Eltern entrümpelt. Drei Container, freundliche Fahrer, alles unkompliziert. Empfehle ich gerne weiter.",
  },
  {
    name: "Tobias L.",
    place: "Rüdersdorf",
    when: "vor 3 Wochen",
    rating: 5,
    body: "Brauchte Mutterboden und einen Bauschuttcontainer in derselben Woche. Hat alles eine Firma erledigt — kein Hin-und-her, kein Doppelpreis.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 py-20 sm:py-28 bg-bone text-ink"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-orange">
              Echte Bewertungen
            </div>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.02]">
              {SITE.rating.value} Sterne aus {SITE.rating.count} Bewertungen.
            </h2>
            <p className="mt-4 text-ink/70 max-w-xl">
              Bei Google bewertet. Direkt verlinkt. Jede Stimme ein echter Kunde aus
              Berlin oder Umland.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-orange text-orange"
                  strokeWidth={1}
                />
              ))}
            </div>
            <div className="font-display text-2xl text-ink tabular-nums">
              {SITE.rating.value}
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative p-6 sm:p-7 rounded-2xl bg-ink text-bone border border-bone/10"
            >
              <Quote
                className="absolute top-5 right-5 w-6 h-6 text-orange/40"
                strokeWidth={1.5}
              />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-orange text-orange"
                    strokeWidth={1}
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-bone/85 leading-relaxed">
                {r.body}
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-bone/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-bone">{r.name}</div>
                  <div className="text-xs text-bone/55">{r.place}</div>
                </div>
                <div className="text-xs text-bone/40">{r.when}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
