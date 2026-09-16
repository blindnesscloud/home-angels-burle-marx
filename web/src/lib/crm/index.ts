import type { CrmAdapter } from "./types";
import { ghlAdapter } from "./ghl";

export type { CrmAdapter, LeadPayload } from "./types";

// Trocar de CRM = trocar esta linha por um novo adapter com a mesma interface.
export const crm: CrmAdapter = ghlAdapter;
