import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Funnel } from "@/components/site/Funnel";
import { Problems } from "@/components/site/Problems";
import { Services } from "@/components/site/Services";
import { Why } from "@/components/site/Why";
import { References } from "@/components/site/References";
import { Testimonials } from "@/components/site/Testimonials";
import { Jobs } from "@/components/site/Jobs";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Funnel />
        <Problems />
        <Services />
        <Why />
        <References />
        <Testimonials />
        <Jobs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
