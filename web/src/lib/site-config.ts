// Configuração central da unidade. Substituir pelos placeholders restantes
// pelos dados reais antes do lançamento.
// `npm run check:launch-ready` falha o build se algum placeholder aqui não
// tiver sido substituído.
export const PLACEHOLDER_WHATSAPP_NUMBER = "5519000000000";

export const siteConfig = {
  unitName: "Home Angels Burle Marx",
  // TODO(cliente): substituir pelo telefone/WhatsApp real da unidade.
  whatsappNumber: PLACEHOLDER_WHATSAPP_NUMBER,
  whatsappDisplay: "(19) 0000-0000",
  // TODO(cliente): substituir pelo endereço real da unidade franqueada.
  address: "Burle Marx, Campinas/SP",
  // CNPJ vem do mockup aprovado no Figma (PREXTER).
  cnpj: "61.703.144/0001-07",
  instagramUrl: "https://www.instagram.com/homeangelsburlemarx/",
  googleAdsConversionLabel: "TODO_CONVERSION_LABEL",
};

export function buildWhatsappLink(prefilledMessage: string) {
  const encoded = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
