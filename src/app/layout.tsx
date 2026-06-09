import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `Container mieten Berlin & Umland | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "600 Container von 2 bis 33 m³. Festpreis, morgen vor der Tür. Familienbetrieb aus Woltersdorf. 4,6 Sterne bei Google. Jetzt in 60 Sekunden anfragen.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    title: `Container mieten Berlin & Umland | ${SITE.name}`,
    description:
      "600 Container, Festpreis, morgen vor der Tür. Familienbetrieb seit Jahrzehnten.",
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `https://${SITE.domain}#localbusiness`,
  name: SITE.legalName,
  url: `https://${SITE.domain}`,
  telephone: `+49 ${SITE.phone.replace(/\s/g, "").slice(1)}`,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    postalCode: SITE.postalCode,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: "DE",
  },
  areaServed: [SITE.serviceArea, "Brandenburg", "Berlin"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating.value,
    reviewCount: SITE.rating.count,
  },
  openingHours: ["Mo-Fr 07:00-17:00", "Sa 08:00-12:00"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${bricolage.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
