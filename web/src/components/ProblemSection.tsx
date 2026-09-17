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
      "Trabalho, filhos e distância não precisam impedir um cuidado de qualidade.",
  },
] as const;

export function ProblemSection() {
  return (
    <section className="bg-paper px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[720px]">
        <h2 className="mb-10 font-display text-3xl font-medium text-ink sm:text-4xl">
          Isso é com você, se
        </h2>

        <div className="border-t border-border">
          {SCENARIOS.map((scenario) => (
            <div
              key={scenario.title}
              className="grid gap-1 border-b border-border py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-8"
            >
              <h3 className="text-lg font-semibold text-ink">
                {scenario.title}
              </h3>
              <p className="text-muted">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
