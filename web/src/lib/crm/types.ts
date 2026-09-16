export type LeadPayload = {
  name: string;
  phone: string;
  careFor: "idoso" | "outro";
  urgency: "imediata" | "planejando";
  // Prova de consentimento LGPD no momento do envio (dado de saúde é
  // categoria sensível — ver docs/reviews/estrategista.md, seção 5).
  consent: true;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  page_url: string;
  submitted_at: string;
};

export type CrmAdapter = {
  sendLead(payload: LeadPayload): Promise<void>;
};
