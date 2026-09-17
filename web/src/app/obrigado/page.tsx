import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConversionTracking } from "@/components/ConversionTracking";
import { SuccessCheck } from "@/components/SuccessCheck";
import { buildWhatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Recebemos seu contato | Home Angels Burle Marx",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <>
      <ConversionTracking />
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
        <SuccessCheck />
        <h1 className="max-w-xl font-display text-3xl font-medium text-navy sm:text-4xl">
          Recebemos seu contato!
        </h1>
        <p className="max-w-md text-lg text-muted">
          Nossa equipe da unidade Burle Marx vai retornar em breve. Se
          preferir, fale com a gente agora mesmo pelo WhatsApp.
        </p>
        <Link
          href={buildWhatsappLink(
            "Olá! Acabei de preencher o formulário da Home Angels Burle Marx."
          )}
          className="rounded-lg bg-forest px-8 py-4 text-lg font-bold text-white transition hover:brightness-95"
        >
          Chamar no WhatsApp agora
        </Link>
      </main>
      <Footer />
    </>
  );
}
