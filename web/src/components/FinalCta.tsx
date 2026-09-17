import { LeadForm } from "./LeadForm";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  const hasTestimonials = siteConfig.testimonials.length > 0;
  const hasStats = siteConfig.stats.length > 0;

  return (
    <section
      id="formulario"
      className="scroll-mt-20 bg-navy px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-[640px] text-paper">
          <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
            Parte da rede nacional Home Angels Brasil. Cuidadores
            selecionados e supervisionados tecnicamente, com atendimento
            humanizado dentro da casa da sua família.
          </p>

          {hasStats ? (
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-medium">
                    {stat.value}
                  </div>
                  <div className="text-sm text-sand-light">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : null}

          {hasTestimonials ? (
            <div className="mt-8 grid gap-6 border-t border-white/20 pt-6 sm:grid-cols-2">
              {siteConfig.testimonials.map((testimonial) => (
                <blockquote key={testimonial.name}>
                  <p className="text-paper/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-2 text-sm font-semibold text-sand-light">
                    {testimonial.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-16 max-w-[640px] border-t border-white/20 pt-16 text-center text-paper">
          <h2 className="mb-3 font-display text-3xl font-medium sm:text-4xl">
            Fale agora com a equipe Home Angels Burle Marx
          </h2>
          <p className="mx-auto max-w-xl text-paper/90">
            Preencha os dados abaixo. Nossa equipe local retorna rapidamente
            para entender a necessidade da sua família, sem compromisso.
          </p>
        </div>

        <div className="mt-10">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
