import { Reveal } from "./Reveal";

// TODO(cliente): substituir os depoimentos abaixo por relatos reais de
// famílias atendidas pela unidade Burle Marx, com autorização de uso do nome
// e, se possível, foto. Não publicar depoimento fictício em produção.
const TESTIMONIAL_PLACEHOLDERS = [
  {
    quote:
      "[Depoimento real da família a ser inserido pela unidade Burle Marx]",
    name: "[Nome do cliente]",
  },
  {
    quote:
      "[Depoimento real da família a ser inserido pela unidade Burle Marx]",
    name: "[Nome do cliente]",
  },
] as const;

const TRUST_POINTS = [
  "Parte da rede nacional Home Angels Brasil",
  "Cuidadores selecionados e supervisionados tecnicamente",
  "Atendimento humanizado dentro da casa da família",
] as const;

export function SocialProof() {
  return (
    <section className="bg-[var(--color-bg-alt)] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-center">
            {TRUST_POINTS.map((point) => (
              <span
                key={point}
                className="text-sm font-semibold text-[var(--color-primary)]"
              >
                ✓ {point}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {TESTIMONIAL_PLACEHOLDERS.map((testimonial, index) => (
            <Reveal key={testimonial.name + index} delayMs={index * 80}>
              <blockquote className="h-full rounded-xl bg-white p-6 shadow-sm">
                <p className="mb-4 italic text-[var(--color-muted)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="font-bold text-[var(--color-ink)]">
                  {testimonial.name}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
