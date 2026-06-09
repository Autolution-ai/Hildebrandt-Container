"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const QA = [
  {
    q: "Wie schnell kann ein Container geliefert werden?",
    a: "In Berlin und Umland in der Regel innerhalb von 24 Stunden, oft schon am selben Werktag. Bei Anruf vor 11 Uhr ist taggleiche Lieferung häufig möglich.",
  },
  {
    q: "Was darf in den Container und was nicht?",
    a: "Pro Container ein Material — z. B. Bauschutt sortenrein, Mischabfall, Sperrmüll oder Gartenabfall. Asbest, Gefahrstoffe und Elektrogeräte sind separat zu entsorgen. Wir klären das im Telefonat und vermeiden Fehlbestellungen.",
  },
  {
    q: "Bekomme ich vorher einen festen Preis?",
    a: "Ja. Sie bekommen den Festpreis schriftlich vor der Lieferung. Keine Nachberechnung bei Abholung, sofern der Container nicht überladen oder mit anderem Material gefüllt ist als bestellt.",
  },
  {
    q: "Brauche ich eine Genehmigung für den Stellplatz?",
    a: "Nur, wenn der Container auf öffentlicher Fläche steht (Straße, Gehweg). Auf Ihrem Grundstück oder Hof brauchen Sie nichts. Falls eine Genehmigung nötig ist, helfen wir bei der Beantragung.",
  },
  {
    q: "Wie lange darf der Container stehen?",
    a: "Standard sind 7 Tage. Längere Standzeit ist möglich — sagen Sie es uns einfach beim Bestellen.",
  },
  {
    q: "In welchen Orten liefern Sie?",
    a: "Berlin gesamt sowie Woltersdorf, Erkner, Rüdersdorf, Hoppegarten, Neuenhagen, Schöneiche, Grünheide, Strausberg, Fürstenwalde und Umgebung. Bei anderen PLZ kurz anrufen — wir machen viel möglich.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange">
          Häufige Fragen
        </div>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.02]">
          Sechs Antworten,{" "}
          <span className="text-bone/50">bevor Sie anrufen.</span>
        </h2>

        <div className="mt-10 sm:mt-12 divide-y divide-bone/10 border-y border-bone/10">
          {QA.map((item, i) => (
            <Item key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-lg sm:text-xl text-bone leading-snug pr-4">
          {q}
        </span>
        <Plus
          className={`w-5 h-5 mt-1 flex-shrink-0 text-orange transition-transform ${
            open ? "rotate-45" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-bone/70 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
