"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATS = [
  { value: 600, suffix: "+", label: "Container im Bestand", sub: "2 bis 33 m³" },
  { value: 24, suffix: " h", label: "Lieferung in der Region", sub: "Berlin & Umland" },
  { value: 4.6, suffix: " ★", label: "Google-Bewertung", sub: "aus 43 Bewertungen" },
  { value: 4, suffix: "", label: "Gewerke aus einer Hand", sub: "Container, Erdbau, Abriss, Baustoffe" },
];

export function Why() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = ref.current?.querySelectorAll<HTMLElement>("[data-counter]");
      els?.forEach((el) => {
        const target = Number(el.dataset.target);
        const decimals = (el.dataset.target ?? "").includes(".") ? 1 : 0;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = decimals
              ? obj.v.toFixed(1).replace(".", ",")
              : Math.round(obj.v).toString();
          },
        });
      });
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 border-t border-line overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,106,0,0.10), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-orange">
            Warum Hildebrandt
          </div>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl text-bone leading-[1.02]">
            Größere Auswahl.{" "}
            <span className="text-bone/50">Kürzere Wege. Echter Festpreis.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-[56px] sm:text-[72px] lg:text-[88px] leading-none text-bone tabular-nums tracking-tight">
                <span data-counter data-target={s.value}>
                  0
                </span>
                <span className="text-orange">{s.suffix}</span>
              </div>
              <div className="mt-2 text-bone font-semibold">{s.label}</div>
              <div className="text-sm text-bone/55 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
