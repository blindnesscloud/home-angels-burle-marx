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
npm run check:launch-ready   # roda antes de cada deploy, ver abaixo
```

## Pendências do cliente antes do lançamento

`npm run check:launch-ready` falha com a lista completa enquanto estas
pendências não forem resolvidas — rodar sempre antes de publicar:

1. **Logo vetorial oficial** — os PNGs em `assets/logo/` e `web/public/logo/`
   foram extraídos do manual de marca como referência de cor/proporção.
   Solicitar ao SAF (+55 19 2042-1454) os arquivos vetoriais originais.
2. **Telefone/WhatsApp real** da unidade — hoje é um placeholder em
   `web/src/lib/site-config.ts` (`whatsappNumber`/`whatsappDisplay`).
3. **Depoimentos reais** de famílias atendidas, com autorização de uso —
   `siteConfig.testimonials` está vazio de propósito; a seção de prova social
   simplesmente esconde o bloco de depoimentos até ter conteúdo real (nunca
   mostramos um placeholder fictício em produção).
4. **URL do Inbound Webhook do Go High Level** — ver `docs/crm-integration.md`.
5. **ID/label de conversão do Google Ads** — hoje é um placeholder em
   `web/src/lib/site-config.ts` (`googleAdsConversionLabel`), sem isso a
   conversão não é reportada ao Google Ads.

## Revisões de qualidade

`docs/reviews/` reúne avaliações independentes feitas sobre a LP (simulação de
usuário real, recomendações de estratégia de aquisição/CRM). Ler antes de
priorizar a próxima rodada de mudanças.

## Deploy

Alvo de deploy: Vercel.
