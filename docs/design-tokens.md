# Design — Home Angels Burle Marx (LP)

**Fonte da verdade: arquivo Figma "PREXTER"** (`OPdatMgTIZuRgAANc1UG2r`), frames
`Home Page Desktop` (26:2330, 1440px), `Homepage Mobile` (25:2177, 375px) e
`Muito Obrigado` (20:1082). O código replica esses frames 1:1; qualquer
mudança visual deve ser feita primeiro no Figma.

## Escala

`--spacing: 0.0625rem` → 1 unidade Tailwind = 1px do frame (`pl-260`, `h-694`...).
A fonte da raiz escala com a tela, igual ao preview do Figma:

- desktop (≥1024px): `font-size: min(100vw / 90, 21.33px)` → frame de 1440 ocupa a largura.
- mobile: `clamp(14px, 100vw / 23.4375, 18px)` → frame de 375 ocupa a largura.

## Cores (estilos do Figma)

| Token | Hex | Estilo Figma |
|---|---|---|
| `ink` | #153B51 | Foundation/Blue/B500 |
| `ink-2` | #18445D | Foundation/Blue/B400 |
| `navy` | #226185 | card do formulário |
| `green` / `green-hover` / `green-active` | #5C925C / #97B197 / #2E492E | Botão CTA (Default/Hover/Click) |
| `green-50` | #EDF2ED | Foundation/Green/G50 |
| `cream` | #FAF7F3 | Foundation/Brown/B50 |
| `badge` | #ECDECD | Foundation/Brown/B75 |
| `line` | #D9D9D9 | bordas do formulário |

## Tipografia

Libre Baskerville (títulos), Inter (texto), Helvetica (botões/labels — cai em
Arial onde não houver Helvetica), SF Pro (legenda do formulário — cai na fonte
do sistema). A Inter regular leva `-0.0033em` para compensar a diferença de
largura entre a Inter da web e a do Figma e manter as mesmas quebras de linha.

## Imagens

As fotos no Figma usam preenchimento `CROP` com filtros (exposição, saturação,
temperatura, tint, sombras). Os arquivos em `web/public/figma/*.jpg` foram
gerados a partir dos originais em 4096px aplicando a matriz de recorte exata de
cada nó e a mesma correção de cor (erro médio de 2–4/255 vs. render do Figma).
