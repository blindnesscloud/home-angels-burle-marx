import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import { CookiePreferencesButton } from "./CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Política de Privacidade | Home Angels Burle Marx",
  robots: { index: false, follow: false },
};

// TODO(cliente/jurídico): revisar este texto com um advogado antes de
// publicar. É um aviso de privacidade honesto e específico ao que esta LP
// realmente faz — não um modelo genérico de internet — mas não substitui
// revisão jurídica formal, especialmente por envolver dado de saúde
// (categoria sensível sob a LGPD).
export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-720 flex-col gap-24 px-20 py-64">
        <h1 className="font-display text-38 leading-[1.15] tracking-[-0.03em] text-ink">
          Política de Privacidade
        </h1>

        <p className="font-inter text-16 leading-[1.15] text-black/80">
          Esta página explica, de forma direta, o que acontece com os dados
          que você preenche no formulário desta página.
        </p>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Quais dados coletamos
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Nome, telefone/WhatsApp, para quem é o cuidado solicitado e a
            urgência informada por você no formulário. Não pedimos diagnóstico
            ou condição de saúde específica neste formulário — esses detalhes,
            se necessários, são tratados apenas na conversa por telefone com a
            nossa equipe.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Para que usamos
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Exclusivamente para retornar seu contato e entender a necessidade
            da sua família antes de qualquer atendimento. Não vendemos nem
            compartilhamos seus dados com terceiros para fins de publicidade.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Onde seus dados ficam
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Seus dados são enviados para o sistema de relacionamento com
            clientes (CRM) usado pela unidade {siteConfig.unitName} para
            organizar o atendimento. O acesso é restrito à equipe responsável
            pelo atendimento local.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Cookies
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Com a sua autorização, usamos cookies do Google (Google Ads e Tag
            Manager) e da Meta (Facebook e Instagram) para medir o resultado
            dos nossos anúncios. Se você recusar, esses cookies não são
            gravados e a página continua funcionando normalmente.
          </p>
          <CookiePreferencesButton />
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="font-inter text-24 leading-[1.15] font-bold text-ink">
            Seus direitos
          </h2>
          <p className="font-inter text-16 leading-[1.15] text-black/80">
            Você pode pedir a qualquer momento a exclusão dos seus dados ou
            esclarecimento sobre como eles são usados, falando diretamente com
            a unidade pelo WhatsApp {siteConfig.whatsappDisplay}.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
