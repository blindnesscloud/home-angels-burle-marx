"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buildWhatsappLink, siteConfig } from "@/lib/site-config";

// Header intencionalmente sem menu de navegação: qualquer link de saída
// tira o visitante do funil pago. Só logo + contato direto. O estado
// "scrolled" (sombra + fundo levemente mais opaco) é o mesmo conceito de
// header "vivo" do padrão Prexter, sem escondê-lo ao rolar — para público
// 45+, o contato precisa continuar sempre visível e alcançável.
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled
          ? "border-[var(--color-border)] shadow-sm"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-3">
        <Image
          src="/logo/home-angels-logo-positivo.png"
          alt="Home Angels Cuidadores de Idosos"
          width={200}
          height={90}
          priority
          className="h-10 w-auto sm:h-12"
        />
        <Link
          href={buildWhatsappLink(
            "Olá! Vim pela página da Home Angels Burle Marx e quero saber mais sobre cuidadores de idosos."
          )}
          className="rounded-lg bg-[var(--color-secondary)] px-3 py-2 text-sm font-bold text-white transition hover:brightness-95 sm:px-4 sm:text-base"
        >
          {siteConfig.whatsappDisplay}
        </Link>
      </div>
    </header>
  );
}
