"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Truck,
  Wrench,
  FileText,
  Phone,
  Upload,
} from "lucide-react";
import { SITE } from "@/lib/site";

const ROLES = [
  {
    id: "lkw",
    title: "LKW-Fahrer / Baumaschinist",
    sub: "Region Berlin & Umland · Festanstellung",
    icon: Truck,
  },
  {
    id: "schlosser",
    title: "KFZ-Schlosser / Mechatroniker",
    sub: "Werkstatt Woltersdorf · Festanstellung",
    icon: Wrench,
  },
  {
    id: "initiativ",
    title: "Initiativbewerbung",
    sub: "Andere Position? Erzählen Sie es uns.",
    icon: FileText,
  },
];

const LICENSES = ["Klasse B", "Klasse C / C1", "Klasse CE", "Keine / weiß nicht"];
const EXPERIENCE = ["Berufseinsteiger", "1–3 Jahre", "4–9 Jahre", "10+ Jahre"];
const START = ["Sofort", "Innerhalb 4 Wochen", "In 1–3 Monaten", "Flexibel"];

export function ApplyFunnel() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [license, setLicense] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [fileName, setFileName] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const skipSkills = role === "initiativ";

  const canNext =
    (step === 0 && role !== null) ||
    (step === 1 &&
      (skipSkills || (license !== null && experience !== null && start !== null))) ||
    step === 2;

  function next() {
    if (step < 2) setStep(step + 1);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange">
          Bewerbung in 2 Minuten
        </div>
        <h1 className="font-display mt-3 text-4xl sm:text-5xl text-bone leading-[1.02]">
          Drei Schritte. Kein Anschreiben.
        </h1>
        <p className="mt-4 text-bone/70 max-w-xl">
          Wir melden uns innerhalb von 48 Stunden bei Ihnen — meist schon am
          nächsten Werktag. Telefon reicht uns, der Rest klärt sich im Gespräch.
        </p>
      </div>

      <div className="rounded-3xl border border-bone/10 bg-ink-2 p-6 sm:p-8 lg:p-10">
        <Stepper step={step} sent={sent} skipSkills={skipSkills} />

        <AnimatePresence mode="wait">
          {!sent && step === 0 && (
            <StepWrap key="0">
              <Heading title="Welche Stelle interessiert Sie?" />
              <div className="grid sm:grid-cols-1 gap-3">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.id;
                  const primary = r.id !== "initiativ";
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 text-left transition-all ${
                        active
                          ? "border-orange bg-orange/10"
                          : primary
                          ? "border-orange/30 bg-orange/[0.03] hover:border-orange/60"
                          : "border-bone/10 bg-bone/[0.02] hover:border-bone/25"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          active || primary ? "bg-orange" : "bg-bone/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            active || primary ? "text-ink" : "text-bone/70"
                          }`}
                          strokeWidth={2}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-lg sm:text-xl text-bone leading-tight">
                          {r.title}
                        </div>
                        <div className="text-sm text-bone/60 mt-0.5">{r.sub}</div>
                      </div>
                      {active && (
                        <Check
                          className="w-5 h-5 text-orange flex-shrink-0"
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </StepWrap>
          )}

          {!sent && step === 1 && !skipSkills && (
            <StepWrap key="1">
              <Heading title="Drei kurze Fragen zu Ihrer Erfahrung." />
              <div className="space-y-6">
                <ChipGroup
                  label="Führerschein"
                  options={LICENSES}
                  value={license}
                  onChange={setLicense}
                  hideForRole={role === "schlosser"}
                />
                <ChipGroup
                  label="Berufserfahrung"
                  options={EXPERIENCE}
                  value={experience}
                  onChange={setExperience}
                />
                <ChipGroup
                  label="Wann könnten Sie starten?"
                  options={START}
                  value={start}
                  onChange={setStart}
                />
              </div>
            </StepWrap>
          )}

          {!sent && step === 1 && skipSkills && (
            <StepWrap key="1-init">
              <Heading
                title="Worum geht es bei Ihnen?"
                sub="Ein paar Sätze reichen — wir lesen jede Initiativbewerbung."
              />
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Welche Position, welche Erfahrung, was reizt Sie?"
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder:text-bone/30 focus:outline-none focus:border-orange transition-colors resize-none"
              />
            </StepWrap>
          )}

          {!sent && step === 2 && (
            <StepWrap key="2">
              <Heading
                title="Wie erreichen wir Sie?"
                sub="Telefon reicht. Lebenslauf gerne, aber nicht zwingend."
              />
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
                <Input
                  label="Vor- und Nachname"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Input
                  label="Telefon / WhatsApp"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="für den Rückruf"
                  required
                />
                <div className="sm:col-span-2">
                  <Input
                    label="E-Mail (optional)"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <span className="block text-xs text-bone/60 mb-1.5">
                    Lebenslauf (optional, PDF)
                  </span>
                  <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-bone/[0.04] border border-dashed border-bone/20 cursor-pointer hover:border-orange/50 transition-colors">
                    <Upload className="w-4 h-4 text-bone/60" />
                    <span className="text-sm text-bone/70 truncate">
                      {fileName ?? "Datei wählen oder hierher ziehen"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                      className="hidden"
                    />
                  </label>
                </div>
                <button type="submit" className="hidden" aria-hidden />
              </form>
            </StepWrap>
          )}

          {sent && (
            <StepWrap key="done">
              <div className="text-center py-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-orange/20 flex items-center justify-center mb-5">
                  <Check className="w-7 h-7 text-orange" strokeWidth={3} />
                </div>
                <h3 className="font-display text-3xl text-bone">
                  Bewerbung ist da.
                </h3>
                <p className="mt-3 text-bone/70 max-w-md mx-auto">
                  Wir melden uns innerhalb von 48 Stunden — meist am nächsten
                  Werktag. Danke, dass Sie uns in Betracht ziehen.
                </p>
                <a
                  href={SITE.phoneHref}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange text-ink font-semibold"
                >
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                  Direkt sprechen: {SITE.phone}
                </a>
              </div>
            </StepWrap>
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
              {step === 2 ? "Bewerbung senden" : "Weiter"}
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepWrap({ children }: { children: React.ReactNode }) {
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

function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl sm:text-3xl text-bone">{title}</h2>
      {sub && <p className="mt-1.5 text-sm text-bone/60">{sub}</p>}
    </div>
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
  hideForRole,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  hideForRole?: boolean;
}) {
  if (hideForRole) return null;
  return (
    <div>
      <div className="text-sm text-bone/60 mb-2.5">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              type="button"
              key={o}
              onClick={() => onChange(o)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                active
                  ? "bg-orange text-ink border-orange font-semibold"
                  : "border-bone/15 text-bone/80 hover:border-bone/30"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Input({
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

function Stepper({
  step,
  sent,
  skipSkills,
}: {
  step: number;
  sent: boolean;
  skipSkills: boolean;
}) {
  const labels = ["Stelle", skipSkills ? "Anliegen" : "Skills", "Kontakt"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((l, i) => {
        const active = !sent && step === i;
        const done = sent || step > i;
        return (
          <div key={l + i} className="flex items-center gap-2 flex-1">
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
