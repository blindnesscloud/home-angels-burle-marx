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

const leadConfig = readFileSync(path.join(here, "..", "public", "api", "config.php"), "utf8");
if (leadConfig.includes("COLE_AQUI_A_URL_DO_WEBHOOK_DO_GHL")) {
  problems.push(
    "URL do webhook do GHL não configurada em public/api/config.php — o formulário vai falhar ao enviar o lead. Ver docs/crm-integration.md."
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
