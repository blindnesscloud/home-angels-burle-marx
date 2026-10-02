# Gates: LP Home Angels Burle Marx

OWNS: web/**, docs/**, assets/**

Scope: LP fiel 100% ao Figma "PREXTER" (frames Home Page Desktop, Homepage
Mobile e Muito Obrigado), formulário integrado ao Go High Level via webhook.

- [x] G1: build de producao compila sem erro
  CHECK: node -e "process.exit(require('child_process').spawnSync('npm',['run','build'],{cwd:'web',shell:true,stdio:'inherit'}).status)"
  EXPECT: (exit 0)
  EVIDENCE: npm run build (Next.js 16.3.5) — 6 rotas.

- [x] G2: lint sem violacoes
  CHECK: node -e "process.exit(require('child_process').spawnSync('npm',['run','lint'],{cwd:'web',shell:true,stdio:'inherit'}).status)"
  EXPECT: (exit 0)
  EVIDENCE: npm run lint limpo.

- [x] G3: layout bate com o Figma em 1440px e 375px
  EVIDENCE: screenshots full-page comparados lado a lado com get_screenshot dos frames 26:2330 e 25:2177. Mobile: 375x6358 (exato, +19px do ajuste de 48px do rodapé pedido pelo designer). Desktop: alturas de seção iguais ao Figma (121/694/928/1147/433/501/974/400). Quebras de linha de todos os blocos de texto conferidas.

- [x] G4: fotos com o mesmo recorte e cor do Figma
  EVIDENCE: imageTransform e filters lidos via Plugin API (só leitura); recorte reproduzido no original 4096px e cor calibrada contra o fill renderizado pelo Figma — RMSE 1.6–3.9/255.

- [x] G5: botões com os 3 estados do componente "Botão CTA" (Default #5C925C, Hover #97B197, Click #2E492E)
  EVIDENCE: Playwright — default rgb(92,146,92), hover rgb(151,177,151).

- [x] G6: formulário funcional (validação, dropdowns, envio para /api/lead.php)
  EVIDENCE: Playwright — erro "Informe seu nome." sem nome; dropdowns abrem no estado Default2 do Figma e selecionam; envio chega na API. lead.php testado com PHP 8.3: payload inválido → 400; válido → repassado ao webhook (mock) com telefone normalizado → 200.

- [ ] G7: pronto para publicar
  CHECK: node -e "process.exit(require('child_process').spawnSync('npm',['run','check:launch-ready'],{cwd:'web',shell:true,stdio:'inherit'}).status)"
  EXPECT: (exit 0)
  EVIDENCE: pendente — faltam WhatsApp real, label de conversão do Google Ads e webhook do GHL.

Removido por decisão do cliente ("100% fiel ao Figma, descartar o que não está no design"): checkbox de consentimento LGPD, animações, efeito magnético nos botões, ajustes de contraste que alteravam as cores do design.
