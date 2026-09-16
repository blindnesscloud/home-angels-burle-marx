# Home Angels Burle Marx — LP

Landing page de conversão para campanhas de Google Ads da unidade franqueada
Home Angels Burle Marx (cuidadores de idosos). Página única, um formulário,
integrada ao Go High Level.

Este projeto segue o mesmo mecanismo de qualidade estabelecido em `F:\Prexter`
(stack, skills de agente, disciplina de gates) como padrão a ser reaproveitado
em outros clientes.

## Estrutura

- `web/` aplicação Next.js 16 (App Router, TypeScript, Tailwind v4)
- `assets/` referências de logo extraídas do manual da marca
- `docs/` design tokens, estrutura da LP, auditoria dos sites de referência e
  integração com CRM
- `.claude/skills/` skills de agente usadas no desenvolvimento
  (`home-angels-brand`, `unlazy`, `webapp-testing`)
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
```

## Pendências do cliente antes do lançamento

1. **Logo vetorial oficial** — os PNGs em `assets/logo/` e `web/public/logo/`
   foram extraídos do manual de marca como referência de cor/proporção.
   Solicitar ao SAF (+55 19 2042-1454) os arquivos vetoriais originais.
2. **Telefone/WhatsApp real** da unidade — hoje é um placeholder em
   `web/src/lib/site-config.ts`.
3. **Depoimentos reais** de famílias atendidas, com autorização de uso — hoje
   são placeholders em `web/src/components/SocialProof.tsx`.
4. **URL do Inbound Webhook do Go High Level** — ver `docs/crm-integration.md`.
5. **ID/label de conversão do Google Ads** — hoje é um placeholder em
   `web/src/lib/site-config.ts` (`googleAdsConversionLabel`), sem isso a
   conversão não é reportada ao Google Ads.

## Deploy

Alvo de deploy: Vercel.
