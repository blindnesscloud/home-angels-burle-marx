/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { ConversionTracking } from "@/components/ConversionTracking";
import { DesktopFooter, MobileFooter } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Obrigado pelo contato | Home Angels Burle Marx",
  robots: { index: false, follow: false },
};

function heroOverlays(src: string) {
  return (
  <>
    <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
    <div className="absolute inset-0 bg-[rgba(34,97,133,0.42)] mix-blend-screen" />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(237.7596deg, rgba(0,0,0,0) 38.357%, rgb(21,59,81) 100.25%), linear-gradient(206.3028deg, rgba(164,190,205,0) 42.173%, rgb(21,59,81) 88.153%)",
      }}
    />
  </>
  );
}

function Message({ titleWidth, textWidth }: { titleWidth: string; textWidth: string }) {
  return (
    <div className="flex flex-col items-center gap-18 text-center font-display leading-[1.15] text-white">
      <p className={`${titleWidth} text-36 tracking-[-0.03em]`}>Obrigado pelo contato.</p>
      <p className={`${textWidth} text-20 tracking-[-0.03em]`}>
        Nossa equipe irá analisar sua necessidade e entraremos em contato.
      </p>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <div className="bg-white">
      <ConversionTracking />

      {/* Mobile: o Figma não tem esta tela em mobile; segue o padrão da home mobile */}
      <div className="flex flex-col gap-24 lg:hidden">
        <header className="flex justify-center pt-24">
          <img
            src="/figma/header-logo-mobile.svg"
            alt="Home Angels"
            className="h-33 w-[calc(193.123*var(--spacing))]"
          />
        </header>
        <section className="relative h-595 overflow-hidden">
          <div aria-hidden="true" className="absolute top-0 left-1/2 h-full w-1163 -translate-x-1/2">
            {heroOverlays("/figma/hero-mobile.jpg")}
          </div>
          <div className="relative mx-auto flex h-full max-w-375 items-center justify-center px-20">
            <Message titleWidth="w-full" textWidth="w-full" />
          </div>
        </section>
        <MobileFooter />
      </div>

      {/* Desktop: frame "Muito Obrigado" (1440 x 1289) */}
      <div className="hidden lg:block">
        <header className="flex h-155 items-start justify-center pt-42">
          <img
            src="/figma/header-logo-desktop.svg"
            alt="Home Angels"
            className="h-[calc(76.6*var(--spacing))] w-[calc(448.28*var(--spacing))]"
          />
        </header>
        <section className="relative h-694 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {heroOverlays("/figma/obrigado-hero.jpg")}
          </div>
          <div className="relative flex justify-center pt-368">
            <Message titleWidth="w-643" textWidth="w-677" />
          </div>
        </section>
        <div className="pt-48">
          <DesktopFooter />
        </div>
      </div>
    </div>
  );
}
