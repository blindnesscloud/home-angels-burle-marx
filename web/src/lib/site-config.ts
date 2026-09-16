// Configuração central da unidade. Substituir pelos dados reais antes do
// lançamento — nenhum destes valores é real, são placeholders de desenvolvimento.
// `npm run check:launch-ready` falha o build se algum placeholder aqui não
// tiver sido substituído.
export const PLACEHOLDER_WHATSAPP_NUMBER = "5519000000000";

export type Testimonial = {
  quote: string;
  name: string;
};

export const siteConfig = {
  unitName: "Home Angels Burle Marx",
  // TODO(cliente): substituir pelo telefone/WhatsApp real da unidade.
  whatsappNumber: PLACEHOLDER_WHATSAPP_NUMBER,
  whatsappDisplay: "(19) 0000-0000",
  // TODO(cliente): substituir pelo endereço real da unidade franqueada.
  address: "Burle Marx, Campinas/SP",
  googleAdsConversionLabel: "TODO_CONVERSION_LABEL",
  // TODO(cliente): inserir depoimentos reais, com autorização de uso do nome.
  // Vazio de propósito — a seção de prova social esconde o bloco de
  // depoimentos até existir conteúdo real (nunca publicar depoimento
  // fictício apresentado como genuíno).
  testimonials: [] as Testimonial[],
};

export function buildWhatsappLink(prefilledMessage: string) {
  const encoded = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
