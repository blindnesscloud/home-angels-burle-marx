import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section
      id="formulario"
      className="scroll-mt-20 bg-[var(--color-primary)] px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="mb-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Fale agora com a equipe Home Angels Burle Marx
          </h2>
          <p className="mx-auto max-w-xl text-white/90">
            Preencha os dados abaixo. Nossa equipe local retorna rapidamente
            para entender a necessidade da sua família, sem compromisso.
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
