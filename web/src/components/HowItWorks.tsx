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
      "Plantão diário, noturno ou 24h, no formato que fizer sentido para a sua família.",
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
    <section className="bg-paper-dark px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[720px]">
        <h2 className="mb-14 font-display text-3xl font-medium text-ink sm:text-4xl">
          Como funciona
        </h2>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-border"
          />
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex gap-6 ${
                index < STEPS.length - 1 ? "pb-12" : ""
              }`}
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-medium text-white">
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="mb-1 text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="max-w-md text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
