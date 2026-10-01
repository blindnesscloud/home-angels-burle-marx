/* eslint-disable @next/next/no-img-element */
import { LeadForm } from "./LeadForm";

export function FinalCta() {
  return (
    <section id="formulario" className="scroll-mt-20 lg:py-48">
      <div className="relative flex w-full justify-center lg:h-878 lg:items-center lg:justify-start">
        {/* Foto de fundo só existe no desktop */}
        <img
          src="/figma/form-bg.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 hidden size-full max-w-none object-cover lg:block"
        />
        <div className="relative lg:mx-auto lg:w-full lg:max-w-1440 lg:pt-67 lg:pb-68 lg:pl-246">
          <div className="flex h-791 w-343 flex-col items-center justify-center rounded-33 bg-navy py-48 lg:h-[calc(743.25*var(--spacing))] lg:w-512">
            <div className="flex h-648 w-296 flex-col items-center justify-center gap-28 lg:w-378">
              <div className="flex w-full flex-col items-start gap-12 leading-[1.15]">
                <h2 className="w-full font-inter text-28 font-semibold text-cream">
                  Fale agora com a equipe Home Angels Burle Marx
                </h2>
                <p className="w-full font-helvetica text-16 text-badge">
                  Atendemos toda a cidade de São Paulo
                </p>
                <p className="w-288 font-inter text-16 text-[rgba(250,247,243,0.8)] lg:w-355">
                  Preencha os dados abaixo e nossa equipe local retorna rapidamente para entender a
                  necessidade da sua família, sem compromisso
                </p>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
