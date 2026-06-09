import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ApplyFunnel } from "@/components/site/ApplyFunnel";

export const metadata: Metadata = {
  title: "Jetzt bewerben — in 2 Minuten",
  description:
    "LKW-Fahrer, KFZ-Mechatroniker oder Initiativ. Regional fahren, abends zuhause sein. Familienbetrieb Hildebrandt aus Woltersdorf bei Berlin.",
};

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28 sm:pt-32 pb-20">
        <ApplyFunnel />
      </main>
      <Footer />
    </>
  );
}
