"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "Bewertungen", href: "#testimonials" },
  { label: "Jobs", href: "#jobs" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-ink/80 border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="font-display text-xl sm:text-2xl text-bone">
            Hildebrandt
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-orange" />
          <span className="hidden sm:inline text-bone/60 text-sm font-medium">
            Container
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-bone/70 hover:text-bone transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full bg-orange text-ink font-semibold text-sm lg:text-base hover:bg-orange-2 transition-colors shadow-[0_0_0_1px_rgba(255,106,0,0.4),0_8px_24px_-8px_rgba(255,106,0,0.6)]"
          >
            <Phone className="w-4 h-4" strokeWidth={2.5} />
            <span className="tabular-nums">{SITE.phone}</span>
          </a>
          <a
            href="#anfragen"
            className="hidden md:inline-flex items-center px-4 lg:px-5 py-2.5 rounded-full border border-bone/20 text-bone text-sm lg:text-base hover:bg-bone/5 transition-colors"
          >
            Container anfragen
          </a>
          <button
            type="button"
            aria-label="Menü"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-bone/15 text-bone"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-bone/80 py-2 text-base"
              >
                {n.label}
              </a>
            ))}
            <a
              href={SITE.phoneHref}
              className="sm:hidden inline-flex items-center justify-center gap-2 mt-2 px-5 py-3 rounded-full bg-orange text-ink font-semibold"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              {SITE.phone}
            </a>
            <a
              href="#anfragen"
              onClick={() => setOpen(false)}
              className="md:hidden inline-flex items-center justify-center px-5 py-3 rounded-full border border-bone/20 text-bone"
            >
              Container anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
