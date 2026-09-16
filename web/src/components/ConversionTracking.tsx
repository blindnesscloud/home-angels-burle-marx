"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara a conversão do Google Ads em /obrigado. Não faz nada até que
 * siteConfig.googleAdsConversionLabel seja substituído pelo valor real
 * (evita registrar conversões falsas com um label placeholder).
 */
export function ConversionTracking() {
  useEffect(() => {
    if (siteConfig.googleAdsConversionLabel === "TODO_CONVERSION_LABEL") {
      return;
    }
    window.gtag?.("event", "conversion", {
      send_to: siteConfig.googleAdsConversionLabel,
    });
  }, []);

  return null;
}
