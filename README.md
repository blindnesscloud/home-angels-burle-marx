# Home Angels Burle Marx — LP

Landing page de conversão para campanhas de Google Ads da unidade franqueada
Home Angels Burle Marx (cuidadores de idosos). Página única, um formulário,
integrada ao Go High Level.

Este projeto segue o mesmo padrão de qualidade estabelecido no projeto Prexter
(stack e disciplina de gates), para ser reaproveitado em outros clientes.

## Estrutura

- `web/` aplicação Next.js 16 (App Router, TypeScript, Tailwind v4)
- `assets/` referências de logo extraídas do manual da marca
- `docs/` design tokens, estrutura da LP, auditoria dos sites de referência e
  integração com CRM
- `GATES.md` critérios de aceite da LP

## Desenvolvimento

```bash
cd web
cp .env.example .env.local   # preencher GHL_INBOUND_WEBHOOK_URL
npm install
npm run dev
```

## Build e validação

```bash
cd web
npm run build
npm run lint
npm run check:launch-ready   # roda antes de cada deploy, ver abaixo
```

## Pendências do cliente antes do lançamento

`npm run check:launch-ready` falha com a lista completa enquanto estas
pendências não forem resolvidas — rodar sempre antes de publicar:

1. **Telefone/WhatsApp real** da unidade — hoje é um placeholder em
   `web/src/lib/site-config.ts` (`whatsappNumber`/`whatsappDisplay`).
2. **URL do Inbound Webhook do Go High Level** — ver `docs/crm-integration.md`.
3. **ID/label de conversão do Google Ads** — hoje é um placeholder em
   `web/src/lib/site-config.ts` (`googleAdsConversionLabel`), sem isso a
   conversão não é reportada ao Google Ads.

O visual é 100% o Figma "PREXTER" — ver `docs/design-tokens.md`. Logos e fotos
em `web/public/figma/` vêm do próprio arquivo Figma.

## Revisões de qualidade

`docs/reviews/` reúne avaliações independentes feitas sobre a LP (simulação de
usuário real, recomendações de estratégia de aquisição/CRM). Ler antes de
priorizar a próxima rodada de mudanças.

## Deploy

Alvo de deploy: Vercel.
