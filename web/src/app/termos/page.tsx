import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos e Condições | Home Angels Burle Marx",
  robots: { index: false, follow: false },
};

// TODO(cliente/jurídico): revisar este texto com um advogado antes de
// publicar. Honesto e específico ao que esta LP faz, mas não substitui
// revisão jurídica formal.
export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-720 flex-col gap-24 px-20 py-64">
        <h1 className="font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
          Termos e Condições
        </h1>

        <p className="font-inter text-16 leading-[1.15] text-black/80">
          Esta página explica o que acontece quando você preenche o
          formulário desta LP e entra em contato com a unidade{" "}
          {siteConfig.unitName}.
        </p>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            O que esta página oferece
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Esta LP é um canal de contato para solicitar uma avaliação
            gratuita e sem compromisso. O preenchimento do formulário não
            gera qualquer obrigação de contratação — você decide se quer
            seguir em frente depois de falar com a nossa equipe.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Sobre a unidade franqueada
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            A unidade {siteConfig.unitName} é uma franquia independente da
            rede Home Angels Brasil, CNPJ {siteConfig.cnpj}.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Dúvidas sobre estes termos
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Fale diretamente com a unidade pelo WhatsApp{" "}
            {siteConfig.whatsappDisplay}.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
