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

- Scroll reveal discreto (fade + translateY 12px) — sem exagero, público-alvo pode achar
  animações agressivas "amadoras" ou distrativas.
- Sem parallax pesado, sem autoplay de vídeo com som.
- Contador de anos/atendimentos com count-up ao entrar em viewport (reforço de
  credibilidade, mesmo padrão do Prexter).
- Todas as imagens com lazy loading nativo + blur-up placeholder (padrão unlazy).

## Acessibilidade / performance (não-negociável para LP de Ads)

- Contraste mínimo AA em todo texto sobre cor.
- LCP < 2.5s, CLS < 0.1 — página paga por clique, cada segundo de espera é dinheiro.
- Formulário utilizável por teclado e leitor de tela.
- Testado em 375 / 768 / 1280 / 1920, com foco especial em 375-414 (a maior parte do
  tráfego de Google Ads mobile chega nessa faixa).
