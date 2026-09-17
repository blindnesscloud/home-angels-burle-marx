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
      className="mt-1 h-5 w-5 shrink-0 text-forest"
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
    <section className="bg-paper px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[900px]">
        <h2 className="mb-10 font-display text-3xl font-medium text-ink sm:text-4xl">
          O que está incluso
        </h2>

        <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-lg text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
