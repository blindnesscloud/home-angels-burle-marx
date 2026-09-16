import type { CrmAdapter, LeadPayload } from "./types";

/**
 * Envia o lead para o workflow "Inbound Webhook" do Go High Level.
 * A URL é um segredo do cliente — nunca hardcode, sempre via env var.
 */
export const ghlAdapter: CrmAdapter = {
  async sendLead(payload: LeadPayload) {
    const webhookUrl = process.env.GHL_INBOUND_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error(
        "GHL_INBOUND_WEBHOOK_URL não configurada. Ver docs/crm-integration.md."
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Go High Level respondeu ${response.status} ao receber o lead.`
      );
    }
  },
};
