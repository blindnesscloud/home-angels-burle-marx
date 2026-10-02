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
npm install
npm run dev
```

O `npm run dev` não executa PHP, então o envio do formulário só funciona no
servidor (Hostinger) ou com `php -S localhost:4500 -t out` depois do build.

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

## Deploy (Hostinger, hospedagem compartilhada)

O site é exportado como HTML estático (`output: "export"`), e o envio de leads
é feito por `web/public/api/lead.php`. Não precisa de Node no servidor.

1. Gerar o pacote: `cd web && npm run build`. A pasta `web/out/` é o site
   inteiro. Compactar o **conteúdo** dela (não a pasta) em um `.zip`, incluindo
   os arquivos ocultos `.htaccess` e `api/.htaccess`.
2. No hPanel, remover o WordPress padrão: Sites → WordPress → Instalações →
   Desinstalar. Ou, pelo Gerenciador de Arquivos, apagar o conteúdo de
   `public_html` (baixar um backup antes, se quiser).
3. Gerenciador de Arquivos → `public_html` → Upload do `.zip` → botão direito →
   Extrair para `public_html`. Conferir se `index.html`, `.htaccess` e a pasta
   `api/` ficaram direto em `public_html`, e não dentro de uma subpasta.
4. Editar `public_html/api/config.php` e colar a URL do Inbound Webhook do GHL
   no lugar de `COLE_AQUI_A_URL_DO_WEBHOOK_DO_GHL`. Esse valor fica só no
   servidor, nunca no repositório.
5. Garantir que o SSL do domínio está ativo (hPanel → Segurança → SSL). O
   `.htaccess` redireciona tudo para HTTPS.
6. Testar: abrir o site, enviar o formulário e conferir o contato no GHL.

Atualizações seguintes: refazer o build e subir o novo `.zip` por cima,
**sem** sobrescrever `api/config.php` (ou colar a URL de novo depois).
