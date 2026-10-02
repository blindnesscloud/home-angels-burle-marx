"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";

const BUTTON =
  "flex h-44 flex-1 cursor-pointer items-center justify-center rounded-12 px-18 font-helvetica text-16 leading-[1.15] whitespace-nowrap transition-colors";

// Aviso de cookies no visual da LP: card creme, texto ink, botão CTA verde.
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage só existe no navegador
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-16 bottom-16 z-50 mx-auto flex max-w-560 flex-col gap-16 rounded-16 border border-badge bg-cream p-20 shadow-[0_8px_32px_rgba(21,59,81,0.18)] lg:inset-x-auto lg:right-32 lg:bottom-32 lg:max-w-460 lg:p-24"
    >
      <div className="flex flex-col gap-8">
        <p className="font-display text-20 leading-[1.2] text-ink">Sua privacidade importa</p>
        <p className="font-inter text-15 leading-[1.4] text-black/80">
          Usamos cookies para medir o desempenho dos nossos anúncios e melhorar sua experiência.
          Saiba mais na nossa{" "}
          <Link href="/privacidade" className="text-navy underline underline-offset-2">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
      <div className="flex gap-12">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${BUTTON} border border-ink/30 bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10`}
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${BUTTON} bg-green text-white hover:bg-green-hover active:bg-green-active`}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
