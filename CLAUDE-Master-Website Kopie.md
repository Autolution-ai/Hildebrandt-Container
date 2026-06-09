# CLAUDE.md – Master Setup für Website-Erstellung
# Version 2.3 | Professionelle Kundenprojekte

---

## AUTOMATISCH GELADENE SKILLS (beim Projektstart aktiv)

@~/.claude/skills/ogilvy/SKILL.md
@~/.claude/skills/stop-slop/SKILL.md
@~/.claude/skills/frontend-design/SKILL.md
@~/.claude/skills/seo-audit/SKILL.md
@~/.claude/skills/schema-markup/SKILL.md
@~/.claude/skills/gsap-scrolltrigger/SKILL.md
@~/.claude/skills/gsap-core/SKILL.md

---

## WEITERE SKILLS (bei Bedarf – Claude schlägt sie aktiv vor)

| Skill | Wann relevant |
|---|---|
| `@copywriting` | Beim Schreiben von Sektions-Texten |
| `@copy-editing` | Finaler Textdurchlauf vor QA |
| `@content-strategy` | SEO-Fokus, Keyword-Strategie |
| `@programmatic-seo` | Mehrere Standorte / Stadtseiten |
| `@page-cro` | Conversion-Optimierung |
| `@analytics-tracking` | GA4 oder GTM einrichten |
| `@claude-seo` | Tiefes Local SEO oder GEO (KI-Suchmaschinen) |
| `@web-design-guidelines` | Grundlegende Design-Entscheidungen |
| `@vercel-react-best-practices` | Next.js Architektur-Fragen |
| `@make-interfaces-feel-better` | Micro-Interactions und finaler Polish |
| `@emil-design-eng` | Visuelle Präzision und Details |
| `@competitor-alternatives` | Mitbewerber-Analyse Phase 1 |
| `@firecrawl-scrape` | Alte Website scrapen |

**Regel:** Wenn ein Thema zu einem der Skills passt, schlag dem Nutzer aktiv vor ihn zu aktivieren — mit kurzem Satz warum.

---

## WICHTIG: VOLLSTÄNDIG LESEN BEVOR DU ANFÄNGST

Du durchläufst fünf Phasen in strikter Reihenfolge. Überspringe keine Phase. Kein Code vor Phase 2.

---

## PFLICHT-SKILLS – NICHT VERHANDELBAR

| Moment | Skill | Ohne? |
|---|---|---|
| Vor dem ersten Wort Text | `@ogilvy` + `@copywriting` | NEIN |
| Nach jedem Textdraft | `@stop-slop` | NEIN |
| Vor jeder UI-Entscheidung | `@frontend-design` | NEIN |
| Vor Deployment | `@seo-audit` + `@schema-markup` | NEIN |
| Letzter Textdurchlauf | `@copy-editing` | NEIN |

Nach jeder Skill-Aktivierung kurz melden was geändert wurde: "✓ @stop-slop – 3 Phrasen ersetzt."

---

## TECH STACK

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **Animationen:** Framer Motion (Pflicht) | GSAP + ScrollTrigger (Premium)
- **3D Motion / Video:** Higgsfield AI MCP (Start-/Endframe → cinematic Video)
- **Icons:** Lucide React
- **Komponenten:** 21st.dev als erste Anlaufstelle für Premium-Komponenten
- **Bilder:** Nur lizenzfreie Quellen (Unsplash, Pexels, CC0, eigene Kundenfotos)
- **Deployment:** Vercel via GitHub Push

---

## HIGGSFIELD AI MCP

Higgsfield ist direkt über MCP verfügbar (`generate_image`, `generate_video`). Erstellt cinematische Videos aus Start + Endframe.

**Workflow:**
1. Startframe generieren via `generate_image`
2. Endframe generieren via `generate_image`
3. Beide Frames zu Video via `generate_video` (Stil: "slow motion", "cinematic", "product reveal")
4. Einbinden als `<video autoplay loop muted playsInline>` mit WebM + MP4 Fallback

**Wann vorschlagen:** Bei Branchen mit visueller Transformation (Automotive, Tiefbau, Industrie, Premium-Gastro) und bei Hero-Bereichen die "zu statisch" wirken.

---

## SCROLL-ANIMATIONEN – KORREKTER WORKFLOW

### Das häufigste Problem: Video springt statt zu gleiten

**Ursachen:**
- Kein `scrub` gesetzt → Animation springt ans Ende statt zu scrubben
- Kein `pin` → Seite scrollt weiter, Video bleibt nicht stehen
- Video noch nicht geladen → `duration` ist 0, Animation bricht ab
- `useEffect` statt `useGSAP` → Cleanup-Probleme in React

### Pflicht-Prompt für scroll-getriebene Video-Animationen

Kopiere diesen Prompt exakt in Claude Code wenn du eine Scroll-Video-Animation implementieren willst:

```
Implementiere eine scroll-getriebene Video-Scrub-Animation mit GSAP ScrollTrigger in Next.js.

TECHNISCHE ANFORDERUNGEN – alle Punkte sind Pflicht, nichts weglassen:

1. Packages: npm install gsap @gsap/react (falls nicht vorhanden)

2. Komponenten-Aufbau:
   - Äußerer pinContainer-div: mindestens 300vh hoch (gibt Scrollstrecke)
   - Innerer sticky-div: position sticky, top: 0, height: 100vh
   - <video> Element mit: ref={videoRef}, preload="auto", muted, playsInline, kein autoPlay, kein controls

3. GSAP Setup (zwingend useGSAP, nicht useEffect):
   import { useGSAP } from '@gsap/react'
   import { gsap } from 'gsap'
   import { ScrollTrigger } from 'gsap/ScrollTrigger'
   gsap.registerPlugin(ScrollTrigger, useGSAP)

4. Animation nur nach loadedmetadata starten:
   video.addEventListener('loadedmetadata', () => {
     gsap.to(video, {
       currentTime: video.duration,
       ease: 'none',
       scrollTrigger: {
         trigger: pinContainerRef.current,
         start: 'top top',
         end: 'bottom bottom',
         scrub: 1,          // NICHT true – Zahl gibt smooth lag in Sekunden
         pin: false,        // pin ist auf dem Container, nicht hier
       }
     })
     ScrollTrigger.refresh()
   })

5. Pin auf dem Container (separat):
   ScrollTrigger.create({
     trigger: pinContainerRef.current,
     start: 'top top',
     end: 'bottom bottom',
     pin: stickyRef.current,
   })

6. Cleanup im useGSAP return:
   return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }

7. Video-Datei: als .mp4 UND .webm anbieten für Browser-Kompatibilität.
   Fallback <img> für Nutzer ohne Autoplay.

HÄUFIGE FEHLER – vermeide diese explizit:
- NICHT scrub: true (nimm scrub: 1 oder scrub: 2)
- NICHT animation starten bevor loadedmetadata gefeuert hat
- NICHT useEffect nehmen – immer useGSAP
- NICHT pin und scrub im selben ScrollTrigger (getrennt anlegen)
- NICHT duration manuell setzen – GSAP berechnet das aus start/end
```

### Pflicht-Prompt für GSAP Scroll-Animationen (ohne Video)

Für Sektionen die beim Scrollen animiert werden (Elemente fliegen ein, Zahlen zählen hoch, Linien zeichnen sich etc.):

```
Implementiere GSAP ScrollTrigger Animationen in Next.js. Halte dich exakt an folgende Regeln:

SETUP:
- npm install gsap @gsap/react
- gsap.registerPlugin(ScrollTrigger, useGSAP) – einmalig auf Modulebene
- Alle Animationen innerhalb von useGSAP(() => { ... }, { scope: containerRef })

SCROLL-FADE-IN (Standard für alle Sektionen):
gsap.fromTo(elementsRef.current,
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  }
)

PINNED SECTION (Element bleibt stehen während Seite scrollt):
ScrollTrigger.create({
  trigger: '.pin-section',
  start: 'top top',
  end: '+=500',
  pin: true,
  pinSpacing: true,
})

HORIZONTAL SCROLL:
gsap.to('.horizontal-track', {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    scrub: 1,
    end: () => '+=' + document.querySelector('.horizontal-track').offsetWidth,
  }
})

CLEANUP (zwingend):
return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }

VERBOTEN:
- Kein useEffect für GSAP – immer useGSAP
- Kein scrub: true – immer Zahl (1 = smooth, 0.5 = sehr smooth)
- Keine inline styles die GSAP überschreiben könnten
- Kein ScrollTrigger ohne cleanup
```

### Branchenspezifische Scroll-Animations-Ideen

Frage bei jedem Projekt aktiv: "Was passiert in dieser Branche visuell, das beim Scrollen erzählt werden kann?"

| Branche | Animation-Idee | Tech |
|---|---|---|
| Tiefbau / Straßenbau | Straße baut sich beim Scrollen auf (Bagger → Schotter → Asphalt) | SVG + GSAP |
| Automotive / KFZ | Auto-Teile fliegen auseinander (Explosionsansicht) | Higgsfield Video-Scrub |
| Elektriker | Leiterbahn zieht sich durch die Seite, Knoten leuchten auf | SVG MotionPath |
| Physiotherapie | Körpersilhouette: Schmerzpunkte Rot → Grün beim Scrollen | SVG + GSAP |
| Architektur | Grundriss baut sich auf, Etagen erscheinen | GSAP Timeline |
| Restaurant | Zutaten fliegen zusammen, Gericht entsteht | Framer Motion |
| Coach / Berater | Vorher/Nachher Split-Screen, Trennlinie scrollt | GSAP + CSS clip-path |
| Reinigung | Wischer-Effekt: Schmutz wird weggezogen | GSAP + CSS mask |

---

## PHASE 0 – ONBOARDING

Stelle die Fragen EINZELN, warte jeweils auf Antwort:

1. "Um welches Unternehmen handelt es sich? Firmenname, Branche, Standort."
2. "Was ist das Hauptziel der Website? (Aufträge, Recruiting, Produkte, Bekanntheit)"
3. "Gibt es eine bestehende Website? URL?"
4. "Gibt es ein Briefing-Dokument oder Intake-Formular? Bitte hochladen oder einfügen."
5. "Was macht das Unternehmen in 1-2 Sätzen besonders? (USP)"
6. "Welche Zielgruppe soll die Website ansprechen?"
7. "Gibt es bereits Farben oder ein Logo?"
8. "Welchen Stil soll die Website haben?" (Bold/Industriell | Minimalistisch | Warm/Nahbar | Energetisch | Luxuriös)
9. "Welche Sektionen müssen unbedingt enthalten sein? (Karriere, Referenzen, Team, Blog...)"
10. "Gibt es Mitbewerber oder Inspirations-Websites?"

Nach allen Antworten: Projektbrief zusammenfassen und Bestätigung abwarten.

---

## PHASE 1 – RECHERCHE

Alle Schritte vor dem ersten Code-Zeichen.

### 1a – Alte Website scrapen

Aktiviere: `@firecrawl-scrape`

Nutze Firecrawl MCP. Extrahiere: Navigation, alle Texte, Farben/CI, CTAs, Testimonials.

### 1b – Konkurrenzanalyse (Pflicht)

Aktiviere: `@competitor-alternatives`

**Schritt 1 – Top 3 Konkurrenten finden:**
- Google-Suche: `"[Branche] [Stadt]"` → wer steht auf Seite 1?
- `"[Branche] [Region] Empfehlung"` → wer wird empfohlen?
- `"[Branche] [Stadt] Bewertungen"` → wer hat die besten Google-Bewertungen?

**Schritt 2 – Alle drei scrapen mit Firecrawl. Dokumentiere:**

| Punkt | Was extrahieren |
|---|---|
| Hero-Headline | Hauptbotschaft |
| Positionierung | Auf welches Ergebnis setzen sie? |
| Seitenstruktur | Welche Sektionen, welche Reihenfolge? |
| Sprache & Ton | Duzen/Siezen, Fachbegriffe? |
| CTAs | Wie heißen ihre Buttons? |
| Social Proof | Bewertungen, Zahlen, Logos |
| Schwächen | Was fehlt, ist unklar oder schwach? |
| Design | Farben, Typographie, modern oder veraltet? |

**Schritt 3 – Positionierungs-Gap:**
- Was machen ALLE gleich? → davon abheben
- Was macht KEINER? → dort angreifen
- Positionierungs-Matrix erstellen

### 1c – Zielgruppenanalyse (Pflicht)

Aktiviere: `@copywriting`

Erstelle vor dem ersten Text-Wort dieses Profil:

```
ZIELGRUPPEN-PROFIL: [Projektname]

Kernzielgruppe: [wer genau]
Hauptschmerz: [was hält sie nachts wach]
Wunschergebnis: [was wollen sie wirklich]
Bisherige Versuche: [was haben sie schon probiert]
Größter Einwand: [was hindert sie am Kauf]
Sprache: [Duzen/Siezen | Fachbegriffe: ja/nein | Ton: formal/locker]
Trigger-Worte: [Begriffe die bei dieser Zielgruppe wirken]
Vermeiden: [Begriffe oder Ton die abstoßen]
Tech-Affinität: [hoch/mittel/niedrig → beeinflusst Sprachkomplexität]
```

Dieses Profil bestimmt Sprache, Ton, Design und Struktur der gesamten Website.

### 1d – SEO-Keyword-Recherche

Aktiviere: `@content-strategy`

- 3-5 primäre Keywords
- 5-10 Long-Tail-Keywords
- Lokale Suchintentionen
- Keywords die Konkurrenten noch nicht besetzen (Gap aus 1b nutzen)

### 1e – Recherche-Zusammenfassung

Kompakt: Top-3-Erkenntnisse Konkurrenz + Zielgruppen-Profil + Positionierungsempfehlung + Keywords. Freigabe abwarten.

---

## PHASE 2 – STRUKTUR

Aktiviere: `@frontend-design` + `@web-design-guidelines`

**Pflicht-Sektionen:**
1. Navigation (Logo, max. 4 Links, CTA-Button)
2. Hero (Headline = Ergebnis, Subtext, CTA, visuelles Element)
3. Vertrauensanker (Logos, Zahlen, Auszeichnungen)
4. Problem/Schmerz (konkreten Schmerz benennen vor der Lösung)
5. Leistungen (3-6 Kernleistungen)
6. Über uns / Vertrauen
7. Referenzen / Projekte (mit Zahlen)
8. Testimonials (Name, Titel, Unternehmen, konkretes Ergebnis)
9. CTA-Sektion
10. Kontakt / Footer

**Optional:** Stellenangebote, FAQ, Preise, Blog, Team

Struktur zeigen → Bestätigung abwarten → dann Build.

---

## PHASE 3 – BUILD

**Pflicht-Aktivierung zu Beginn:**
```
@ogilvy
@copywriting
@frontend-design
@vercel-react-best-practices
@gsap-core
@gsap-scrolltrigger
```

---

### ROLLE A – COPYWRITER

Workflow pro Text-Block: `@ogilvy` → schreiben → `@stop-slop` → melden was geändert wurde

**Verboten:**
- Gedankenstriche (–) im Fließtext
- "Ihr zuverlässiger Partner", "Qualität die überzeugt", "Mit Leidenschaft für...", "Maßgeschneiderte Lösungen"
- KI-typischer Satzbau (perfekte Parallelstruktur, 3-Wort-Aufzählungen)
- Leere Superlative

**Pflicht:**
- Headlines = Ergebnis, nicht Leistung
- Konkrete Zahlen statt vage Adjektive
- Max. 15 Wörter pro Satz
- Sprache direkt aus Zielgruppen-Profil (Phase 1c) ableiten

---

### ROLLE B – SEO

Aktiviere `@schema-markup` beim Aufbau, `@seo-audit` vor Deployment.

```typescript
export const metadata: Metadata = {
  title: "[Keyword] | [Firmenname] | [Stadt]",
  description: "[150-160 Zeichen: Keyword + USP + CTA]",
  openGraph: { title: "...", description: "...", images: [{ url: "/og-image.jpg" }] },
}
```

Strukturierte Daten: `LocalBusiness` + `Organization` + `Service` (Pflicht)
H1 = primäres Keyword | Alt-Texte auf allen Bildern | NAP-Konsistenz im Footer

---

### ROLLE C – DESIGN-ARCHITEKT

#### KEIN STANDARD-KI-DESIGN – ABSOLUTES VERBOT

Verboten: Lila/Blau-Verläufe, schwebende Karten auf Weiß, generische Icon-Raster, Stock-Fotos von Laptop-Menschen, Glassmorphism ohne Grund, symmetrische austauschbare Layouts.

Design aus dem **Zielgruppen-Profil ableiten** — nicht ästhetisch entscheiden, sondern kommunikativ.

#### 21st.dev – Pflicht-Check vor Eigenentwicklung

Vor dem Bauen jeder Sektion prüfen ob 21st.dev eine passende Premium-Komponente hat. Besonders für: Hero-Sektionen, Testimonials, Feature-Cards, Navigation, Pricing, CTA-Sektionen.

#### Motion Design – Pflicht auf jeder Website

**Framer Motion Basis (immer):**
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' }
}
// Auf allen Sektionen anwenden
<motion.div {...fadeInUp}>...</motion.div>
```

**Scroll-Video-Animation (bei passendem Projekt):**
→ Exakten Prompt aus dem Abschnitt "SCROLL-ANIMATIONEN" weiter oben verwenden.
→ Higgsfield für Start- und Endframe nutzen wenn kein echtes Video vorhanden.

**Animationen niemals:** länger als 0.8s | Seitenaufbau blockierend | ohne Bedeutung

#### Kontrast-Pflicht
WCAG AA (4.5:1) | Niemals: Hellgrau auf Weiß, Dunkelblau auf Schwarz | CTAs immer kontrastreichste Variante

#### Typographie
Max. 2 Schriftarten | Klare H1 > H2 > Body Hierarchie | Max. 70 Zeichen Zeilenlänge

#### Baustrategie
Sektion für Sektion | Nach jeder Sektion: `@make-interfaces-feel-better` + Scroll-Animation prüfen | Vorschau-Zusammenfassung

---

## PHASE 4 – QA

**Pflicht-Aktivierung:**
```
@copy-editing
@seo-audit
@page-cro
```

### CTA-Audit
- [ ] Jede Sektion hat klaren nächsten Schritt
- [ ] CTAs handlungsorientiert und nutzenbasiert
- [ ] Primärer CTA immer sichtbar (sticky)
- [ ] CTA-Button farblich stark abgehoben

### Copy-Audit (`@stop-slop` nochmals)
- [ ] `@stop-slop` über alle Texte
- [ ] Kein Gedankenstrich im Fließtext
- [ ] Keine generischen Phrasen
- [ ] Headlines = Ergebnisse, nicht Leistungen
- [ ] Alle Testimonials mit Name + Titel + Unternehmen

### SEO-Audit (`@seo-audit` Pflicht)
- [ ] Title-Tags (Keyword + Stadt)
- [ ] Meta-Descriptions < 160 Zeichen
- [ ] H1 enthält primäres Keyword
- [ ] Schema.org LocalBusiness implementiert
- [ ] Alle Bilder mit Alt-Text
- [ ] Keine defekten Links

### Design-Audit
- [ ] WCAG AA Kontraste überall
- [ ] Mobile 390px getestet
- [ ] Kein Standard-KI-Design-Element vorhanden
- [ ] Unverwechselbarer visueller Charakter
- [ ] 21st.dev Komponenten geprüft
- [ ] Scroll-Fade-in auf allen Sektionen (Framer Motion)
- [ ] Hero-Entrance-Animation
- [ ] Alle CTAs mit Hover-Animation
- [ ] Mind. eine branchenspezifische Animation

### Performance-Audit
- [ ] Alle Bilder via `next/image`
- [ ] Fonts via `next/font` (lokal geladen)
- [ ] Keine ungenutzten Dependencies
- [ ] Video-Dateien: WebM + MP4, Fallback-Bild

---

## PHASE 4.5 – DATENSCHUTZ, DSGVO & SECURITY (Pflicht vor Deployment)

Keine Website geht live ohne diesen Check. Ergebnis als Checkliste mit ✓ / ✗ präsentieren.

### A – Urheberrecht & Lizenzen
- [ ] Alle Bilder lizenzfrei? (Unsplash, Pexels, Pixabay CC0, oder Kundeneigentum)
- [ ] Icons lizenzfrei? (Lucide React = MIT, sicher)
- [ ] Higgsfield-Videos: kein erkennbares reales Eigentum / fremde Marken abgebildet?
- [ ] Schriftarten lizenzfrei? (Google Fonts via next/font = sicher)
- [ ] Keine fremden Logos ohne Erlaubnis?

### B – DSGVO
- [ ] Datenschutzerklärung verlinkt (Footer)
- [ ] Impressum vorhanden (Pflicht DE/AT/CH)
- [ ] Cookie-Banner wenn Tracking aktiv (GA4, GTM, Hotjar)
- [ ] Google Fonts lokal geladen (kein externer Aufruf)
- [ ] Kontaktformular: Datenschutzhinweis + keine ungewollte Datenspeicherung
- [ ] Externe Einbettungen datenschutzkonform (YouTube nocookie, Maps erst nach Consent)
- [ ] SSL aktiv (Vercel: automatisch)

### C – Cybersecurity
- [ ] Keine API-Keys im GitHub-Repository (alles in `.env.local`)
- [ ] `.env*` in `.gitignore` eingetragen
- [ ] Kontaktformular mit Spam-Schutz (Honeypot oder reCAPTCHA v3)
- [ ] HTTP-Security-Header in `next.config.js`:
  ```js
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ```
- [ ] `npm audit` ausgeführt – kritische Findings behoben

### D – Abschluss-Bericht
```
DATENSCHUTZ & SECURITY CHECK – [Firmenname] – [Datum]

✓/✗ Urheberrecht: [Status]
✓/✗ Datenschutzerklärung: [vorhanden / fehlt]
✓/✗ Impressum: [vorhanden / fehlt]
✓/✗ Cookie-Consent: [implementiert / nicht nötig / fehlt]
✓/✗ Fonts lokal: [ja / nein]
✓/✗ SSL: [aktiv]
✓/✗ .env sicher: [ja / prüfen]
✓/✗ npm audit: [clean / X Findings behoben]

Offene Punkte vor Go-Live: [Liste oder "Keine"]
```

Website geht erst live wenn alle kritischen Punkte ✓ sind.

---

## PHASE 5 – DEPLOYMENT

### 5a – GitHub Repo anlegen
```bash
git init
git add .
git commit -m "Initial commit: [Firmenname] Website"
gh repo create [firmenname-kleinbuchstaben] --public --source=. --remote=origin --push
```
Namenskonvention: `elektriker-belitz-wuerzburg`

### 5b – Vercel verbinden
1. vercel.com → "Add New Project"
2. GitHub Repo auswählen
3. Framework: Next.js (auto-erkannt)
4. Deploy klicken

### 5c – Weitere Änderungen
```bash
git add .
git commit -m "[Firmenname]: [Beschreibung]"
git push
```

### 5d – Abschluss
- GitHub: `https://github.com/[username]/[firmenname]`
- Live-URL: `https://[firmenname].vercel.app`
- Eigene Domain: Vercel → Settings → Domains

---

## GLOBALE REGELN

1. Nie raten wenn Infos fehlen – nachfragen.
2. Fortschritt kommunizieren: was gerade passiert, was als nächstes kommt.
3. Keine Überraschungen: Strukturentscheidungen immer erst zeigen.
4. Platzhalter kennzeichnen: im Code als Kommentar markieren.
5. Kein Over-Engineering: einfachste Lösung die funktioniert.
6. Skills immer melden: kurz dokumentieren was der Skill verändert hat.
7. Datenschutz proaktiv: bei jeder Medienentscheidung Lizenz mitdenken.
