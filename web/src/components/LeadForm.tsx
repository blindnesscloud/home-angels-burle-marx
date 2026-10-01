"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { captureAndGetUtmParams } from "@/lib/utm";
import { normalizePhone } from "@/lib/phone";
import { CtaSubmit } from "./CtaButton";
import { Dropdown } from "./Dropdown";

const CARE_OPTIONS = [
  { value: "idoso", label: "Um idoso da família" },
  { value: "outro", label: "Outra pessoa" },
] as const;

const URGENCY_OPTIONS = [
  { value: "imediata", label: "O quanto antes" },
  { value: "planejando", label: "Estou me planejando" },
] as const;

const LABEL = "font-helvetica text-16 leading-[1.15] text-cream";
const INPUT =
  "h-49 w-full rounded-3 border border-line bg-transparent px-19 font-helvetica text-16 text-cream outline-none focus:border-cream";

export function LeadForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "");
    const careFor = String(data.get("careFor") ?? "");
    const urgency = String(data.get("urgency") ?? "");

    if (name.length < 2) {
      setError("Informe seu nome.");
      form.querySelector<HTMLInputElement>("#name")?.focus();
      return;
    }
    if (!normalizePhone(phone)) {
      setError("Informe o WhatsApp com DDD.");
      form.querySelector<HTMLInputElement>("#phone")?.focus();
      return;
    }
    if (!careFor) {
      setError("Selecione para quem é o cuidado.");
      form.querySelector<HTMLButtonElement>('[data-dropdown="careFor"]')?.focus();
      return;
    }
    if (!urgency) {
      setError("Selecione quando você precisa começar.");
      form.querySelector<HTMLButtonElement>('[data-dropdown="urgency"]')?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          careFor,
          urgency,
          ...captureAndGetUtmParams(),
          page_url: window.location.href,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error ?? "Não foi possível enviar. Tente novamente.");
        setSubmitting(false);
        return;
      }
      router.push("/obrigado");
    } catch {
      setError("Falha de conexão. Tente novamente.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col items-start">
      <div className="flex w-full flex-col items-start gap-18">
        <div className="grid w-full grid-cols-1 gap-8">
          <label htmlFor="name" className={LABEL}>
            Nome*
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={INPUT} />
        </div>

        <div className="flex w-full flex-col items-start gap-8">
          <label htmlFor="phone" className={`${LABEL} w-full`}>
            WhatsApp com DDD
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={INPUT} />
        </div>

        <div className="flex w-296 flex-col items-start gap-8 lg:w-378">
          <p id="label-careFor" className={LABEL}>
            Para quem é o cuidado?
          </p>
          <Dropdown
            name="careFor"
            labelId="label-careFor"
            options={CARE_OPTIONS}
            className="h-[calc(50.25*var(--spacing))] w-296 lg:w-[calc(380.5*var(--spacing))]"
            chevronRight="right-19"
          />
        </div>

        <div className="flex w-296 flex-col items-start gap-18 lg:w-378 lg:gap-8">
          <p id="label-urgency" className={`${LABEL} w-full`}>
            Quando você precisa começar?
          </p>
          <Dropdown
            name="urgency"
            labelId="label-urgency"
            options={URGENCY_OPTIONS}
            className="h-[calc(49.25*var(--spacing))] w-296 lg:w-376"
            chevronRight="right-17 lg:right-[calc(15.5*var(--spacing))]"
          />
        </div>
      </div>

      <div className="mt-28 flex w-full flex-col items-start gap-8">
        <div className="flex w-280 flex-col items-start">
          <CtaSubmit disabled={submitting}>
            {submitting ? "Enviando..." : "Quero uma avaliação gratuíta"}
          </CtaSubmit>
        </div>
        {error ? (
          <p role="alert" className="w-full font-helvetica text-12 leading-[1.15] text-[#ffd2d2]">
            {error}
          </p>
        ) : null}
        <div className="flex w-full items-center justify-center">
          <p className="w-293 font-sfpro text-12 leading-13 tracking-[-0.0192em] text-[rgba(250,247,243,0.8)] opacity-50 lg:w-auto lg:leading-20 lg:whitespace-nowrap">
            Sem compromisso. Seus dados são usados para retornarmos contato
          </p>
        </div>
      </div>
    </form>
  );
}
