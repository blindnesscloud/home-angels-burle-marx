import { Reveal } from "./Reveal";

const STEPS = [
  {
    number: "1",
    title: "Avaliação gratuita",
    description:
      "Entendemos a necessidade da sua família por telefone ou visita, sem custo e sem compromisso.",
  },
  {
    number: "2",
    title: "Seleção do cuidador ideal",
    description:
      "Indicamos o profissional certo para o perfil e a rotina de quem vai receber o cuidado.",
  },
  {
    number: "3",
    title: "Início do plantão",
    description:
      "Plantão diário, noturno ou 24h — no formato que fizer sentido para a sua família.",
  },
  {
    number: "4",
    title: "Supervisão contínua",
    description:
      "Acompanhamento técnico da equipe Home Angels durante todo o cuidado, não só no início.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-[var(--color-bg-alt)] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
            Como funciona
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 80}>
              <div className="h-full rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 font-bold text-[var(--color-ink)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
