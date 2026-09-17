# Design Tokens — Home Angels Burle Marx (LP)

Segunda versão. A primeira seguia um template genérico de "SaaS card kit"
(cards arredondados idênticos, sombra suave, fade-in em cada seção, hover
com brilho 3D) — foi reconstruída em direção editorial, ancorada na
identidade real da marca (`manual-da-marca-home-angels.pdf`), depois de
feedback de que o resultado não expressava a força da marca.

## Cores

Paleta institucional (azul/verde/areia) aprofundada para um tom editorial,
sobre papel creme quente em vez de branco puro — mantém a marca real, evita
a combinação clichê "creme + terracota" de design genérico gerado por IA.

| Token | Hex | Uso |
|---|---|---|
| `--color-paper` | #F7F2E7 | Fundo principal — papel creme quente |
| `--color-paper-dark` | #EFE6D3 | Fundo de seção alternada |
| `--color-ink` | #17242E | Texto primário — navy-carvão, nunca preto puro |
| `--color-muted` | #5C5647 | Texto secundário |
| `--color-navy` | #1F4E68 | Painéis estruturais, faixa final, botão de contato do header |
| `--color-navy-deep` | #16394C | Variante mais escura (botão de WhatsApp do header) |
| `--color-forest` | #3E6B42 | Cor de ação — CTA principal em toda a página, ícones de check |
| `--color-sand` | #C99A66 | Decorativo apenas (linhas, preenchimento de ícone) — nunca texto sobre papel (contraste 2.27:1, reprova AA) |
| `--color-sand-light` | #E8C9A0 | Texto/acento sobre fundo navy (contraste 5.66:1) |
| `--color-border` | #DED2B8 | Divisores e linhas finas |

Regra de ouro: verde floresta é A cor de ação (todo CTA principal usa a
mesma cor, em todas as seções). Navy é estrutural (painéis, faixas). Areia é
decorativo, nunca corpo de texto.

## Tipografia

- **Display/headings**: Fraunces (variable, serif quente, `opsz`+`SOFT`
  axes) — escala grande, leading apertado (1.05 no H1), é o elemento com
  personalidade da página. Usado com peso 500 (medium), não bold pesado.
- **Corpo/UI**: Public Sans — humanista, altamente legível para o público
  45+, deliberadamente não é a Inter genérica de todo template.
- **Assinatura de marca**: Caveat bold, usada uma única vez (rodapé), como
  o genuíno signoff "Todo Cuidado é Nosso" do manual da marca — não
  espalhada como decoração ao longo da página.

## Layout

Nada de grid de cards idênticos. Cada seção tem uma estrutura própria que
corresponde ao que o conteúdo realmente é:

- **Hero**: assimétrico, tipografia grande à esquerda, painel navy sólido
  com motivo gráfico original (casa + coração em linha, `HomeMotif.tsx`) à
  direita — não foto de banco de imagens.
- **"Isso é com você, se"**: lista editorial de duas colunas com linhas
  finas divisórias, sem cards/ícones/sombra.
- **"Como funciona"**: linha do tempo vertical numerada — legítimo porque o
  conteúdo é de fato uma sequência de passos.
- **"O que está incluso"**: lista tipográfica em duas colunas, ícone de
  check inline, sem bordas de card.
- **Prova social + CTA final**: uma única faixa navy contínua (citação →
  divisor → formulário), não duas seções separadas com vazio entre elas.

Container geral max-w-[1120-1200px], alinhamento predominantemente à
esquerda (exceto a faixa final, centralizada por ser o momento de clímax).

## Motion

Um único momento orquestrado (entrada escalonada do hero ao carregar,
`motion/hero-reveal.tsx`), não fade-in repetido em cada seção — isso é o
tell mais comum de design genérico. Botão de CTA mantém o efeito magnético
(responde à ação do usuário, é interação legítima). Removido o hover 3D com
brilho nos cards (`TiltCard`) e o scroll-reveal por seção
(`motion/section-reveal.tsx`) — ambos eram efeito decorativo sem propósito,
não resposta a uma ação real do usuário.

## Acessibilidade

Todos os pares de cor recalculados para a nova paleta (fórmula WCAG,
luminância relativa) — ver commit de introdução da paleta editorial para os
números exatos. Regra fixa: areia nunca é texto sobre papel.
