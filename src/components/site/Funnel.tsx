"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Hammer,
  Trash2,
  TreePine,
  Sofa,
  Boxes,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { SITE } from "@/lib/site";

type WasteType = {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
};

const WASTE: WasteType[] = [
  { id: "bauschutt", label: "Bauschutt", hint: "Beton, Ziegel, Fliesen", icon: Hammer },
  { id: "misch", label: "Mischabfall", hint: "Renovierung gemischt", icon: Boxes },
  { id: "sperr", label: "Sperrmüll", hint: "Möbel, Hausrat", icon: Sofa },
  { id: "garten", label: "Gartenabfall", hint: "Äste, Laub, Erde", icon: TreePine },
  { id: "haushalt", label: "Haushaltsauflösung", hint: "Komplett-Räumung", icon: Trash2 },
];

const SIZES = [
  { m3: 3, label: "3 m³", desc: "ca. 1 PKW-Anhänger", fits: "Kleine Renovierung" },
  { m3: 5, label: "5 m³", desc: "ca. 2 PKW-Anhänger", fits: "Badumbau" },
  { m3: 7, label: "7 m³", desc: "ca. 1 Garage halb", fits: "Wohnungs-Räumung" },
  { m3: 10, label: "10 m³", desc: "ca. 1 Garage voll", fits: "Hausentkernung" },
  { m3: 15, label: "15 m³", desc: "großer Container", fits: "Anbau / Neubau" },
];

export function Funnel() {
  const [step, setStep] = useState(0);
  const [waste, setWaste] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [form, setForm] = useState({ plz: "", date: "", name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  const canNext =
    (step === 0 && waste !== null) ||
    (step === 1 && size !== null) ||
    step === 2;

  function next() {
    if (step < 2) setStep(step + 1);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="anfragen"
      className="relative scroll-mt-24 py-20 sm:py-28 bg-bone text-ink"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/10 text-orange text-xs font-semibold uppercase tracking-wider">
              Anfrage in 60 Sekunden
            </div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.02]">
              Container.
              <br />
              <span className="text-orange">Festpreis.</span>
              <br />
              Erledigt.
            </h2>
            <p className="mt-5 text-ink/70 text-base sm:text-lg leading-relaxed max-w-md">
              Drei Schritte, keine versteckten Kosten. Sie bekommen den Festpreis
              innerhalb von 24 Stunden — meist schneller. Lieber direkt sprechen?
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-6 inline-flex items-center gap-2 text-ink font-semibold underline underline-offset-4 decoration-orange decoration-2 hover:text-orange transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              <span className="tabular-nums">{SITE.phone}</span>
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="relative rounded-3xl bg-ink text-bone p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_-20px_rgba(15,15,16,0.4)]">
              <Stepper step={step} sent={sent} />

              <AnimatePresence mode="wait">
                {!sent && step === 0 && (
                  <Step key="0">
                    <StepHeading title="Was muss weg?" sub="Wählen Sie eine Kategorie." />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {WASTE.map((w) => {
                        const Icon = w.icon;
                        const active = waste === w.id;
                        return (
                          <button
                            type="button"
                            key={w.id}
                            onClick={() => setWaste(w.id)}
                            className={`text-left p-4 rounded-xl border transition-all ${
                              active
                                ? "border-orange bg-orange/10"
                                : "border-bone/15 hover:border-bone/30 bg-bone/[0.02]"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 mb-2 ${
                                active ? "text-orange" : "text-bone/80"
                              }`}
                              strokeWidth={1.8}
                            />
                            <div className="font-semibold text-bone">{w.label}</div>
                            <div className="text-xs text-bone/60 mt-0.5">{w.hint}</div>
                          </button>
                        );
                      })}
                    </div>
                  </Step>
                )}

                {!sent && step === 1 && (
                  <Step key="1">
                    <StepHeading
                      title="Wie viel ungefähr?"
                      sub="Bei Unsicherheit eine Nummer größer wählen — wir beraten Sie nach."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {SIZES.map((s) => {
                        const active = size === s.m3;
                        return (
                          <button
                            type="button"
                            key={s.m3}
                            onClick={() => setSize(s.m3)}
                            className={`text-left p-4 rounded-xl border transition-all ${
                              active
                                ? "border-orange bg-orange/10"
                                : "border-bone/15 hover:border-bone/30 bg-bone/[0.02]"
                            }`}
                          >
                            <div className="flex items-baseline justify-between">
                              <div className="font-display text-2xl text-bone tabular-nums">
                                {s.label}
                              </div>
                              {active && (
                                <Check
                                  className="w-4 h-4 text-orange"
                                  strokeWidth={3}
                                />
                              )}
                            </div>
                            <div className="text-xs text-bone/60 mt-1">{s.desc}</div>
                            <div className="text-xs text-bone/80 mt-2">
                              passend für {s.fits}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </Step>
                )}

                {!sent && step === 2 && (
                  <Step key="2">
                    <StepHeading
                      title="Wohin und wann?"
                      sub="Wir melden uns innerhalb von 24 h mit Festpreis."
                    />
                    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field
                        label="PLZ"
                        value={form.plz}
                        onChange={(v) => setForm({ ...form, plz: v })}
                        placeholder="z. B. 15569"
                        required
                      />
                      <Field
                        label="Wunschtermin"
                        value={form.date}
                        onChange={(v) => setForm({ ...form, date: v })}
                        placeholder="z. B. ab Montag"
                        required
                      />
                      <Field
                        label="Ihr Name"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        placeholder="Vor- und Nachname"
                        required
                      />
                      <Field
                        label="Telefon"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                        placeholder="für den Rückruf"
                        required
                      />
                      <div className="sm:col-span-2">
                        <Field
                          label="E-Mail (optional)"
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                          placeholder="für die schriftliche Bestätigung"
                        />
                      </div>
                      <button type="submit" className="hidden" aria-hidden />
                    </form>
                  </Step>
                )}

                {sent && (
                  <Step key="done">
                    <div className="text-center py-6">
                      <div className="mx-auto w-14 h-14 rounded-full bg-orange/20 flex items-center justify-center mb-5">
                        <Check className="w-7 h-7 text-orange" strokeWidth={3} />
                      </div>
                      <h3 className="font-display text-3xl text-bone">
                        Anfrage ist raus.
                      </h3>
                      <p className="mt-3 text-bone/70 max-w-md mx-auto">
                        Wir melden uns mit Ihrem Festpreis innerhalb von 24 Stunden —
                        meist schon am selben Tag.
                      </p>
                      <a
                        href={SITE.phoneHref}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange text-ink font-semibold"
                      >
                        <Phone className="w-4 h-4" strokeWidth={2.5} />
                        Jetzt sprechen: {SITE.phone}
                      </a>
                    </div>
                  </Step>
                )}
              </AnimatePresence>

              {!sent && (
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-bone/60 hover:text-bone disabled:opacity-30 disabled:hover:text-bone/60 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Zurück
                  </button>
                  <button
                    type="button"
                    onClick={step === 2 ? submit : next}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange text-ink font-semibold hover:bg-orange-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {step === 2 ? "Festpreis anfragen" : "Weiter"}
                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-2xl sm:text-3xl text-bone">{title}</h3>
      <p className="mt-1.5 text-sm text-bone/60">{sub}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-bone/60 mb-1.5">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder:text-bone/30 focus:outline-none focus:border-orange transition-colors"
      />
    </label>
  );
}

function Stepper({ step, sent }: { step: number; sent: boolean }) {
  const labels = ["Abfall", "Größe", "Kontakt"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((l, i) => {
        const active = !sent && step === i;
        const done = sent || step > i;
        return (
          <div key={l} className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center gap-2 ${
                active ? "text-bone" : done ? "text-orange" : "text-bone/40"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums ${
                  active
                    ? "bg-orange text-ink"
                    : done
                    ? "bg-orange/20 text-orange"
                    : "bg-bone/10 text-bone/50"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                {l}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div
                className={`h-px flex-1 ${
                  done ? "bg-orange/40" : "bg-bone/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
