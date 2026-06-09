import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, SERVICE_REGIONS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-bone">Hildebrandt</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              <span className="text-bone/60 text-sm">Container</span>
            </div>
            <p className="mt-4 text-bone/60 max-w-md leading-relaxed">
              {SITE.legalName}. Familienbetrieb aus Woltersdorf — Container,
              Erdbau, Abriss und Baustoffe für Berlin und Umland.
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2.5 text-bone hover:text-orange transition-colors"
              >
                <Phone className="w-4 h-4 text-orange" strokeWidth={2} />
                <span className="tabular-nums font-semibold">{SITE.phone}</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-bone/80 hover:text-bone transition-colors"
              >
                <Mail className="w-4 h-4 text-orange/80" strokeWidth={2} />
                {SITE.email}
              </a>
              <div className="flex items-start gap-2.5 text-bone/80">
                <MapPin className="w-4 h-4 mt-0.5 text-orange/80" strokeWidth={2} />
                <span>
                  {SITE.street}
                  <br />
                  {SITE.postalCode} {SITE.city}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-bone/50 mb-4">
              Leistungen
            </div>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="#leistungen">Container & Entsorgung</FooterLink>
              <FooterLink href="#leistungen">Erdbau & Bautransport</FooterLink>
              <FooterLink href="#leistungen">Abriss & Vorbereitung</FooterLink>
              <FooterLink href="#leistungen">Baustoffe & Rohstoffe</FooterLink>
              <FooterLink href="#anfragen">Container anfragen</FooterLink>
              <FooterLink href="#jobs">Jobs & Karriere</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-bone/50 mb-4">
              Service-Gebiet
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SERVICE_REGIONS.map((r) => (
                <span
                  key={r}
                  className="text-xs px-2.5 py-1 rounded-full bg-bone/5 border border-bone/10 text-bone/70"
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="mt-6 text-xs text-bone/50">
              Öffnungszeiten: Mo–Fr 07:00–17:00 · Sa 08:00–12:00
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-bone/50">
          <div>
            © {new Date().getFullYear()} {SITE.legalName}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/impressum" className="hover:text-bone transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-bone transition-colors">
              Datenschutz
            </a>
            <a href="/agb" className="hover:text-bone transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-bone/75 hover:text-orange transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
