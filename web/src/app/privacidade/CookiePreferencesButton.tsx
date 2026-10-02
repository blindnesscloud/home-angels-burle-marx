"use client";

import { openConsentBanner } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="w-fit cursor-pointer font-inter text-16 leading-[1.15] text-navy underline underline-offset-2"
    >
      Alterar minhas preferências de cookies
    </button>
  );
}
