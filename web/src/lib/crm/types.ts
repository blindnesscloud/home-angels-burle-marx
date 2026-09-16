export type LeadPayload = {
  name: string;
  phone: string;
  careFor: "idoso" | "outro";
  urgency: "imediata" | "planejando";
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  page_url: string;
  submitted_at: string;
};

export type CrmAdapter = {
  sendLead(payload: LeadPayload): Promise<void>;
};
