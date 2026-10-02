// Consentimento de cookies (LGPD). A escolha fica no localStorage do visitante.
// Os scripts de tracking em layout.tsx leem a mesma chave antes de carregar, e
// o banner atualiza o Google (Consent Mode v2) e o Pixel da Meta na hora.
export const CONSENT_KEY = "ha_cookie_consent";
export const OPEN_CONSENT_EVENT = "ha:open-cookie-consent";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // sem storage (aba anônima restrita): vale só para esta visita
  }
  window.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
  window.fbq?.("consent", choice === "granted" ? "grant" : "revoke");
  window.dataLayer?.push({ event: "cookie_consent_update", cookie_consent: choice });
}

export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
