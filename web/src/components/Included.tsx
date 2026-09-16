import { SectionReveal } from "./motion/section-reveal";

const ITEMS = [
  "Cuidador ou enfermeiro qualificado e selecionado",
  "Supervisão técnica constante da equipe Home Angels",
  "Plantões flexíveis, diário, noturno ou 24 horas",
  "Reposição garantida em caso de falta do profissional",
] as const;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 shrink-0 text-[var(--color-secondary)]"
    >
      <path
        fill="currentColor"
        d="M9.55 17.65 4.9 13l1.4-1.4 3.25 3.25 8.15-8.15 1.4 1.4Z"
      />
    </svg>
  );
}

export function Included() {
  return (
    <section className="bg-[var(--color-bg)] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <SectionReveal>
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
            O que está incluso
          </h2>
        </SectionReveal>

        <ul className="mx-auto grid max-w-2xl gap-4">
          {ITEMS.map((item, index) => (
            <SectionReveal
              key={item}
              as="li"
              delay={index * 0.08}
              className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4 transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-secondary)] hover:shadow-md"
            >
              <CheckIcon />
              <span className="text-[var(--color-ink)]">{item}</span>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
