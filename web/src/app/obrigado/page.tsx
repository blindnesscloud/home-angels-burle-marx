/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ConversionTracking } from "@/components/ConversionTracking";
import { MobileFooter } from "@/components/Footer";
import { buildWhatsappLink, siteConfig } from "@/lib/site-config";

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
        <footer className="relative">
          <div className="h-372 bg-white" />
          <div className="flex h-68 items-start justify-center bg-ink pt-[calc(24.75*var(--spacing))]">
            <p className="w-169 font-helvetica text-15 leading-[1.15] text-white">Desenvolvido por Prexter</p>
          </div>
          <div className="absolute top-62 left-1/2 grid h-236 w-916 -translate-x-1/2 grid-cols-4 grid-rows-[2fr_1fr_2fr] gap-x-97 gap-y-8">
            <div className="relative col-1 row-1 h-61 w-218 overflow-hidden">
              <img
                src="/figma/footer-logo.png"
                alt="Home Angels Cuidadores de Idosos"
                className="absolute top-0 left-[-0.33%] h-full w-[100.36%] max-w-none"
              />
            </div>
            <p className="col-1 row-2 self-start font-inter text-15 leading-20 tracking-[-0.0153em] text-black/50">
              Unidade Burle Marx
            </p>
            <div className="col-1 row-3 flex flex-col items-start gap-12 font-helvetica text-15 leading-[1.15] text-black">
              <p className="w-159">Home Angels ⓒ 2026</p>
              <p className="w-299">{siteConfig.cnpj}</p>
            </div>
            <Link
              href="/privacidade"
              className="col-3 row-3 flex h-46 w-159 items-end justify-self-start font-helvetica text-12 leading-[1.15] text-black/59"
            >
              Política de Privacidade
            </Link>
            <p className="col-4 row-1 w-159 font-sfpro text-15 leading-20 tracking-[-0.0153em] text-black">
              Todo Cuidado é Nosso
            </p>
            <div className="col-4 row-2 flex items-start gap-8 self-start">
              <a
                href={buildWhatsappLink("Olá! Acabei de preencher o formulário da Home Angels Burle Marx.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="relative size-30 shrink-0"
              >
                <img
                  src="/figma/obrigado-whatsapp.svg"
                  alt=""
                  className="absolute inset-[-0.2%_0_-0.21%_0] block size-full max-w-none"
                />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="relative size-31 shrink-0"
              >
                <img src="/figma/obrigado-instagram.svg" alt="" className="absolute inset-0 block size-full max-w-none" />
              </a>
            </div>
            <Link
              href="/termos"
              className="col-4 row-3 flex h-46 w-159 items-end justify-self-start self-start font-helvetica text-12 leading-[1.15] text-black/61"
            >
              Termos e Condições
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
