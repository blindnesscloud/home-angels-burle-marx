import { NextRequest, NextResponse } from "next/server";
import { crm } from "@/lib/crm";
import type { LeadPayload } from "@/lib/crm";

const CARE_FOR_VALUES = new Set(["idoso", "outro"]);
const URGENCY_VALUES = new Set(["imediata", "planejando"]);
const PHONE_DIGITS_MIN = 10;
const PHONE_DIGITS_MAX = 13;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < PHONE_DIGITS_MIN || digits.length > PHONE_DIGITS_MAX) {
    return null;
  }
  return digits;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(body.name) || body.name.trim().length < 2) {
    return NextResponse.json(
      { error: "Informe um nome válido." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(body.phone)) {
    return NextResponse.json(
      { error: "Informe um telefone válido." },
      { status: 400 }
    );
  }
  const phone = normalizePhone(body.phone);
  if (!phone) {
    return NextResponse.json(
      { error: "Telefone deve ter DDD + número." },
      { status: 400 }
    );
  }

  if (typeof body.careFor !== "string" || !CARE_FOR_VALUES.has(body.careFor)) {
    return NextResponse.json(
      { error: "Selecione para quem é o cuidado." },
      { status: 400 }
    );
  }

  if (typeof body.urgency !== "string" || !URGENCY_VALUES.has(body.urgency)) {
    return NextResponse.json(
      { error: "Selecione a urgência." },
      { status: 400 }
    );
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { error: "É necessário autorizar o contato para enviar o formulário." },
      { status: 400 }
    );
  }

  const payload: LeadPayload = {
    name: body.name.trim(),
    phone,
    careFor: body.careFor as LeadPayload["careFor"],
    urgency: body.urgency as LeadPayload["urgency"],
    consent: true,
    utm_source: isNonEmptyString(body.utm_source) ? body.utm_source : null,
    utm_campaign: isNonEmptyString(body.utm_campaign)
      ? body.utm_campaign
      : null,
    utm_medium: isNonEmptyString(body.utm_medium) ? body.utm_medium : null,
    page_url: isNonEmptyString(body.page_url) ? body.page_url : "",
    submitted_at: new Date().toISOString(),
  };

  try {
    await crm.sendLead(payload);
  } catch (error) {
    console.error("Falha ao enviar lead para o CRM:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar seus dados agora. Tente novamente." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
