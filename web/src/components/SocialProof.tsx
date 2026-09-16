import { SectionReveal } from "./motion/section-reveal";
import { siteConfig } from "@/lib/site-config";

const TRUST_POINTS = [
  "Parte da rede nacional Home Angels Brasil",
  "Cuidadores selecionados e supervisionados tecnicamente",
  "Atendimento humanizado dentro da casa da família",
] as const;

export function SocialProof() {
  const hasTestimonials = siteConfig.testimonials.length > 0;

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
