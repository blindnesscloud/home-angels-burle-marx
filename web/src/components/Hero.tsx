/* eslint-disable @next/next/no-img-element */
import { CtaLink } from "./CtaButton";

function Eyebrow() {
  return (
    <div className="flex items-end gap-12">
      <img
        src="/figma/eyebrow-icon.svg"
        alt=""
        className="h-[calc(17.746*var(--spacing))] w-14 shrink-0"
      />
      <p className="font-inter text-12 leading-17 tracking-[-0.0192em] whitespace-nowrap text-cream">
        Atendimento em toda cidade de São Paulo
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Mobile (frame Homepage Mobile, 375 x 595) */}
      <div className="relative h-595 lg:hidden">
        <div className="absolute top-0 left-1/2 h-full w-1163 -translate-x-1/2">
          <img
            src="/figma/hero-mobile.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(189.5485deg, rgba(0,0,0,0) 12.372%, rgb(21,59,81) 69.517%), linear-gradient(207.7194deg, rgba(164,190,205,0) 42.173%, rgb(21,59,81) 88.153%)",
            }}
          />
        </div>
        <div className="relative mx-auto h-full max-w-375 pt-151 pl-20">
          <div className="flex w-313 flex-col items-start gap-14">
            <Eyebrow />
            <h1 className="w-300 font-display text-38 leading-[1.15] tracking-[-0.03em] text-cream">
              Cuide de quem você ama, sem abrir mão da sua rotina
            </h1>
            <p className="w-323 font-helvetica text-16 leading-[1.15] text-cream">
              Cuidador profissional dentro da sua casa, com supervisão técnica
              constante e atendimento sob medida para o seu caso.
            </p>
            <CtaLink href="#formulario">Quero uma avaliação gratuita</CtaLink>
            <p className="w-full font-inter text-12 leading-17 tracking-[-0.0192em] text-cream">
              Sem compromisso. Resposta rápida da rede local
            </p>
          </div>
        </div>
      </div>

      {/* Desktop (frame Home Page Desktop, 1440 x 694) */}
      <div className="relative hidden h-694 lg:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src="/figma/hero.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(34,97,133,0.42)] mix-blend-screen" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(237.7955deg, rgba(0,0,0,0) 38.357%, rgb(21,59,81) 100.25%), linear-gradient(206.3344deg, rgba(164,190,205,0) 42.173%, rgb(21,59,81) 88.153%)",
            }}
          />
        </div>
        <div className="relative mx-auto h-full max-w-1440 pt-368 pl-260">
          <div className="flex w-559 flex-col items-start gap-8">
            <Eyebrow />
            <h1 className="w-full font-display text-38 leading-[1.15] tracking-[-0.03em] text-cream">
              Cuide de quem você ama, sem abrir mão da sua rotina
            </h1>
            <p className="w-457 font-helvetica text-16 leading-[1.15] text-cream">
              Cuidador profissional dentro da sua casa, com supervisão técnica
              constante e atendimento sob medida para o seu caso.
            </p>
            <CtaLink href="#formulario">Quero uma avaliação gratuita</CtaLink>
            <p className="font-inter text-12 leading-17 tracking-[-0.0192em] whitespace-nowrap text-cream">
              Sem compromisso. Resposta rápida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
