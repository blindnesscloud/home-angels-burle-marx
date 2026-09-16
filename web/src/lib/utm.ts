"use client";

const UTM_KEYS = ["utm_source", "utm_campaign", "utm_medium"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Record<UtmKey, string | null>;

const STORAGE_KEY = "ha_utm_params";

/**
 * Captura UTM da URL de chegada (primeiro clique do anúncio) e persiste em
 * sessionStorage, para que o valor sobreviva ao scroll até o formulário
 * mesmo se a URL mudar (ex: navegação para /obrigado).
 */
export function captureAndGetUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_campaign: null, utm_medium: null };
  }

  const url = new URL(window.location.href);
  const fromUrl: Partial<UtmParams> = {};
  let hasAny = false;
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) {
      fromUrl[key] = value;
      hasAny = true;
    }
  }

  if (hasAny) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // sessionStorage indisponível (modo privado etc.) — segue sem persistir.
    }
    return {
      utm_source: fromUrl.utm_source ?? null,
      utm_campaign: fromUrl.utm_campaign ?? null,
      utm_medium: fromUrl.utm_medium ?? null,
    };
  }

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<UtmParams>;
      return {
        utm_source: parsed.utm_source ?? null,
        utm_campaign: parsed.utm_campaign ?? null,
        utm_medium: parsed.utm_medium ?? null,
      };
    }
  } catch {
    // dado corrompido ou storage indisponível — segue sem UTM.
  }

  return { utm_source: null, utm_campaign: null, utm_medium: null };
}
