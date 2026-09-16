// Configuração central da unidade. Substituir pelos dados reais antes do
// lançamento — nenhum destes valores é real, são placeholders de desenvolvimento.
export const siteConfig = {
  unitName: "Home Angels Burle Marx",
  // TODO(cliente): substituir pelo telefone/WhatsApp real da unidade.
  whatsappNumber: "5519000000000",
  whatsappDisplay: "(19) 0000-0000",
  // TODO(cliente): substituir pelo endereço real da unidade franqueada.
  address: "Burle Marx, Campinas/SP",
  googleAdsConversionLabel: "TODO_CONVERSION_LABEL",
};

export function buildWhatsappLink(prefilledMessage: string) {
  const encoded = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
