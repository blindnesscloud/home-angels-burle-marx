"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { captureAndGetUtmParams } from "@/lib/utm";

type SubmitState = "idle" | "submitting" | "error";

export function LeadForm() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const utm = captureAndGetUtmParams();

    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      careFor: formData.get("careFor"),
      urgency: formData.get("urgency"),
      consent: formData.get("consent") === "on",
      ...utm,
      page_url: window.location.href,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setErrorMessage(
          body?.error ?? "Não foi possível enviar. Tente novamente."
        );
        setState("error");
        return;
      }

      router.push("/obrigado");
    } catch {
      setErrorMessage("Falha de conexão. Verifique sua internet e tente novamente.");
      setState("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-semibold text-[var(--color-ink)]">
          Seu nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          className="rounded-lg border border-[var(--color-border)] px-4 py-3 text-base outline-none focus:border-[var(--color-primary)]"
          placeholder="Como podemos te chamar?"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-semibold text-[var(--color-ink)]">
          WhatsApp com DDD
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className="rounded-lg border border-[var(--color-border)] px-4 py-3 text-base outline-none focus:border-[var(--color-primary)]"
          placeholder="(19) 99999-9999"
        />
      </div>

      <fieldset className="flex flex-col gap-1">
        <legend className="mb-1 text-sm font-semibold text-[var(--color-ink)]">
          Para quem é o cuidado?
        </legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-[var(--color-ink)]">
            <input type="radio" name="careFor" value="idoso" required defaultChecked />
            Um idoso da família
          </label>
          <label className="flex items-center gap-2 text-[var(--color-ink)]">
            <input type="radio" name="careFor" value="outro" />
            Outra pessoa
          </label>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-1">
        <legend className="mb-1 text-sm font-semibold text-[var(--color-ink)]">
          Quando você precisa começar?
        </legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-[var(--color-ink)]">
            <input type="radio" name="urgency" value="imediata" required defaultChecked />
            O quanto antes
          </label>
          <label className="flex items-center gap-2 text-[var(--color-ink)]">
            <input type="radio" name="urgency" value="planejando" />
            Estou me planejando
          </label>
        </div>
      </fieldset>

      <label className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          Autorizo o contato da Home Angels Burle Marx sobre este pedido, de
          acordo com a{" "}
          <Link
            href="/privacidade"
            target="_blank"
            className="underline hover:text-[var(--color-primary)]"
          >
            política de privacidade
          </Link>
          .
        </span>
      </label>

      {errorMessage ? (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-2 rounded-lg bg-[var(--color-secondary)] px-6 py-4 text-lg font-bold text-white transition hover:brightness-95 disabled:opacity-60"
      >
        {state === "submitting" ? "Enviando..." : "Quero uma avaliação gratuita"}
      </button>

      <p className="text-center text-xs text-[var(--color-muted)]">
        Sem compromisso. Seus dados são usados só para retornarmos seu contato.
      </p>
    </form>
  );
}
