#!/usr/bin/env node
// Roda manualmente antes de publicar em produção (não faz parte de `npm run
// build`, que precisa continuar funcionando durante o desenvolvimento sem os
// dados reais do cliente ainda preenchidos). Falha alto e claro se algum
// placeholder de lançamento ainda estiver no lugar de um dado real.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteConfigPath = path.join(here, "..", "src", "lib", "site-config.ts");
const siteConfig = readFileSync(siteConfigPath, "utf8");

const problems = [];

if (siteConfig.includes('whatsappNumber: PLACEHOLDER_WHATSAPP_NUMBER')) {
  problems.push(
    "whatsappNumber ainda é o placeholder de desenvolvimento — substituir por WhatsApp real da unidade em src/lib/site-config.ts."
  );
}

if (siteConfig.includes("TODO_CONVERSION_LABEL")) {
  problems.push(
    "googleAdsConversionLabel ainda é o placeholder — sem isso a conversão não é reportada ao Google Ads."
  );
}

if (siteConfig.includes("testimonials: [] as Testimonial[]")) {
  problems.push(
    "Nenhum depoimento real cadastrado em siteConfig.testimonials (a seção fica sem prova social até isso ser preenchido — não bloqueante, mas reduz conversão)."
  );
}

if (!process.env.GHL_INBOUND_WEBHOOK_URL) {
  problems.push(
    "GHL_INBOUND_WEBHOOK_URL não está definida no ambiente — formulário vai falhar ao enviar lead para o CRM. Ver docs/crm-integration.md."
  );
}

if (problems.length > 0) {
  console.error("\n[check:launch-ready] Pendências antes de publicar:\n");
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  console.error("");
  process.exit(1);
}

console.log("[check:launch-ready] Nenhum placeholder de lançamento encontrado.");
