import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Credibility } from "@/components/Credibility";
import { Included } from "@/components/Included";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 overflow-x-clip bg-white pb-[calc(30.5*var(--spacing))] lg:gap-0 lg:pb-10">
      <Header />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Credibility />
      <Included />
      <FinalCta />
      <Footer />
    </div>
  );
}
