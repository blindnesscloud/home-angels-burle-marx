import { MagneticCta } from "./MagneticCta";
import { HomeMotif } from "./HomeMotif";
import { HeroReveal, HeroRevealItem } from "./motion/hero-reveal";

export function Hero() {
  return (
    <section className="bg-paper">
      <HeroReveal className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4 lg:py-32">
        <div className="flex flex-col gap-8">
          <HeroRevealItem>
            <p className="text-sm font-medium text-forest">
              Rede nacional de cuidadores de idosos, unidade Burle Marx
            </p>
          </HeroRevealItem>

          <HeroRevealItem>
            <h1 className="max-w-xl font-display text-[2.75rem] font-medium leading-[1.05] text-ink sm:text-6xl">
              Cuidar de quem você ama, sem abrir mão da sua rotina
            </h1>
          </HeroRevealItem>

          <HeroRevealItem>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Cuidador ou enfermeiro profissional dentro da sua casa, com
              supervisão técnica constante e plantão sob medida para o seu
              caso.
            </p>
          </HeroRevealItem>

          <HeroRevealItem>
            <div className="flex flex-col items-start gap-3">
              <MagneticCta
                href="#formulario"
                className="bg-forest px-7 py-4 text-lg font-semibold text-white transition hover:brightness-110"
              >
                Quero uma avaliação gratuita
              </MagneticCta>
              <p className="text-sm text-muted">
                Sem compromisso · Resposta rápida da equipe local
              </p>
            </div>
          </HeroRevealItem>
        </div>

        <HeroRevealItem className="hidden lg:block">
          <div className="relative flex h-full items-center justify-center rounded-[2rem] bg-navy p-12">
            <HomeMotif className="h-48 w-48 text-sand-light" />
          </div>
        </HeroRevealItem>
      </HeroReveal>
    </section>
  );
}
