import { Reveal } from "./Reveal";

const SCENARIOS = [
  {
    title: "Voltou de uma internação e precisa de cuidados em casa",
    description:
      "Pós-alta hospitalar exige atenção constante que a família nem sempre consegue dar sozinha.",
  },
  {
    title: "Alzheimer, demência ou outra condição que exige supervisão",
    description:
      "Cuidado especializado, com paciência e técnica, para manter a segurança e a dignidade.",
  },
  {
    title: "Mobilidade reduzida no dia a dia",
    description:
      "Apoio para higiene, locomoção e tarefas diárias, sem depender só da família.",
  },
  {
    title: "A família não tem tempo ou preparo para cuidar sozinha",
    description:
      "Trabalho, filhos, distância — é possível garantir cuidado de qualidade mesmo assim.",
  },
] as const;

export function ProblemSection() {
  return (
    <section className="bg-[var(--color-bg)] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
            Isso é com você se...
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {SCENARIOS.map((scenario, index) => (
            <Reveal key={scenario.title} delayMs={index * 80}>
              <div className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6">
                <h3 className="mb-2 text-lg font-bold text-[var(--color-ink)]">
                  {scenario.title}
                </h3>
                <p className="text-[var(--color-muted)]">
                  {scenario.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
