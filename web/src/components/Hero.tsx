import { MagneticCta } from "./MagneticCta";
import { HeroReveal, HeroRevealItem } from "./motion/hero-reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#12354D] to-[#226185]" />
      <HeroReveal className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
        <HeroRevealItem>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
            />
            Rede nacional de cuidadores de idosos • Unidade Burle Marx
          </span>
        </HeroRevealItem>

        <HeroRevealItem>
          <h1 className="max-w-3xl font-[family-name:var(--font-script)] text-4xl leading-tight sm:text-5xl md:text-6xl">
            Cuidar de quem você ama, sem abrir mão da sua rotina
          </h1>
        </HeroRevealItem>

        <HeroRevealItem>
          <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
            Cuidador ou enfermeiro profissional na casa da sua família, com
            supervisão técnica constante e plantão sob medida para o seu caso.
          </p>
        </HeroRevealItem>

        <HeroRevealItem>
          <MagneticCta
            href="#formulario"
            className="mt-2 bg-[var(--color-secondary)] px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-95"
          >
            Quero uma avaliação gratuita
          </MagneticCta>
        </HeroRevealItem>

        <HeroRevealItem>
          <p className="text-sm text-white/85">
            Sem compromisso · Resposta rápida da equipe local
          </p>
        </HeroRevealItem>
      </HeroReveal>
    </section>
  );
}
