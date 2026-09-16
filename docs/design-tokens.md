# Design Tokens — Home Angels Burle Marx (LP)

Fonte: `manual-da-marca-home-angels.pdf` (Jan/2025) + `.claude/skills/home-angels-brand/SKILL.md`.

## Cores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | #226185 | Azul de marca — header, títulos, botão CTA principal |
| `--color-primary-dark` | #17475F | Hover/active do CTA, texto sobre fundo claro quando precisa de mais contraste |
| `--color-secondary` | #5C925C | Selo de credencial, ícones de check, badges |
| `--color-accent` | #D1AE86 | Detalhes, divisores, assinatura de marca, fundo alternado de seção |
| `--color-bg` | #FFFFFF | Fundo primário — página é predominantemente clara (público 30+, alta legibilidade) |
| `--color-bg-alt` | #F7F5F1 | Fundo de seção alternada (aquece a página sem sair da paleta) |
| `--color-ink` | #1E1E1E | Texto primário — nunca preto puro, para não pesar em telas |
| `--color-muted` | #5A5A5A | Texto secundário, legendas |
| `--color-border` | #E6E2D8 | Bordas e divisores sutis |
| `--color-success` | #5C925C | Confirmação de envio de formulário |

Regra herdada do manual: azul predomina; verde e areia são acentos, nunca fundo dominante.
Gradiente institucional (`#12354D`→`#82E0BC`) é reservado para uso pontual no hero, nunca
atrás de texto de corpo ou formulário (risco de contraste/legibilidade para público 45+).

## Tipografia

- Headings: **Turbinado Pro Bold** (script) apenas na headline do hero e na assinatura
  final "Todo Cuidado é Nosso" — no máximo 2 ocorrências na página.
- Todos os outros títulos (H2/H3): **San Francisco Pro Text Bold**, fallback `Arial`.
- Corpo: **San Francisco Pro Text Regular**, fallback `Arial`, tracking -1%.
- Escala: 14 / 16 / 18 / 24 / 32 / 44 / 64px. Line-height 1.15 em headings grandes,
  1.6 em corpo. Tamanho mínimo de corpo: 16px (público 45+, sem zoom).

## Forma

- Cantos: raio moderado (8-12px) em cards e botões — acolhedor, não corporativo-frio.
- Botão CTA: alto contraste, altura mínima 56px (alvo de toque confortável), texto 18px bold.
- Grid: 1 coluna em mobile, container max 1120px em desktop, padding vertical de seção
  64-96px.
- Um único formulário na página (na seção final e replicado/ancorado no CTA do hero via
  scroll suave — nunca um segundo formulário concorrente).

## Motion

Conceito herdado do padrão Prexter (framer-motion, easing spring suave,
resposta 1:1 ao ponteiro), mas contido: sem cursor customizado, sem trilha
orgânica, sem paleta dark/tech — o objetivo aqui é transmitir cuidado e
confiança, não "produto de tecnologia".

- `web/src/components/motion/section-reveal.tsx` — scroll reveal via
  framer-motion `whileInView` (opacity + y + scale leve), sem blur (precisa
  ficar nítido para leitura rápida sob estresse). Respeita
  `prefers-reduced-motion` e permanece visível sem JavaScript via `.js-reveal`
  sobrescrito em `<noscript>` no layout.
- `web/src/components/motion/hero-reveal.tsx` — entrada escalonada (stagger)
  do hero ao carregar a página, não ao rolar.
- `web/src/components/MagneticCta.tsx` — versão contida do botão magnético
  Prexter: desloca até ~25% do offset do cursor (metade da intensidade
  original) e brilho radial branco discreto. Só reage a mouse; em touch
  (maioria do tráfego de Ads) é um link comum.
- `web/src/components/TiltCard.tsx` — versão contida do tilt-parallax
  Prexter: inclinação máxima 5° (Prexter usa 10°), brilho verde institucional
  em vez de lima, sem o elemento de marca em contra-parallax. Ignora eventos
  de touch para não tremer durante o scroll no celular.
- `web/src/app/template.tsx` — transição suave (fade + leve subida) entre `/`
  e `/obrigado`, para a confirmação de envio parecer natural, não um reload.
- `web/src/components/SuccessCheck.tsx` — check animado (stroke se desenha)
  na página de obrigado, reforço de confiança no momento de maior ansiedade
  do visitante.
- Sem parallax pesado, sem autoplay de vídeo com som, sem splash screen de
  carregamento (cada segundo de atraso custa dinheiro em Ads).
- Todas as imagens com lazy loading nativo (padrão unlazy).

## Acessibilidade / performance (não-negociável para LP de Ads)

- Contraste mínimo AA em todo texto sobre cor.
- LCP < 2.5s, CLS < 0.1 — página paga por clique, cada segundo de espera é dinheiro.
- Formulário utilizável por teclado e leitor de tela.
- Testado em 375 / 768 / 1280 / 1920, com foco especial em 375-414 (a maior parte do
  tráfego de Google Ads mobile chega nessa faixa).
