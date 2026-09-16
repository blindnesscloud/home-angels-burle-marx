import { SectionReveal } from "./motion/section-reveal";
import { siteConfig } from "@/lib/site-config";

const TRUST_POINTS = [
  "Parte da rede nacional Home Angels Brasil",
  "Cuidadores selecionados e supervisionados tecnicamente",
  "Atendimento humanizado dentro da casa da família",
] as const;

export function SocialProof() {
  const hasTestimonials = siteConfig.testimonials.length > 0;
  const hasStats = siteConfig.stats.length > 0;

  return (
    <section className="bg-[var(--color-bg-alt)] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <SectionReveal className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-center">
          {TRUST_POINTS.map((point) => (
            <span
              key={point}
              className="text-sm font-semibold text-[var(--color-primary)]"
            >
              ✓ {point}
            </span>
          ))}
        </SectionReveal>

        {/* Números concretos (anos de operação, atendimentos etc.) só aparecem
            com dado real cadastrado em siteConfig.stats — mesmo motivo dos
            depoimentos: um número não verificado é pior que nenhum número. */}
        {hasStats ? (
          <SectionReveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </SectionReveal>
        ) : null}

        {/* Bloco de depoimentos só aparece com conteúdo real cadastrado em
            siteConfig.testimonials — nunca placeholder visível em produção. */}
        {hasTestimonials ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {siteConfig.testimonials.map((testimonial, index) => (
              <SectionReveal key={testimonial.name + index} delay={index * 0.08}>
                <blockquote className="h-full rounded-xl bg-white p-6 shadow-sm">
                  <p className="mb-4 italic text-[var(--color-muted)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="font-bold text-[var(--color-ink)]">
                    {testimonial.name}
                  </footer>
                </blockquote>
              </SectionReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
