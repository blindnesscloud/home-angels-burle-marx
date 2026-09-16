# Estrutura da LP — Home Angels Burle Marx

## Objetivo

Uma única página, um único caminho, um único formulário. Tráfego 100% pago
(Google Ads), público majoritariamente 30+ decidindo por um familiar. Cada
seção existe para responder a uma objeção específica antes que ela apareça, e
empurrar para o mesmo CTA.

Aprendizados dos dois sites de referência analisados (ver `docs/reference-audit.md`):
- **Seguir** (homeangelsjardins.com.br): abrir com dor emocional validada antes de
  vender estrutura/processo; usar depoimentos nomeados; números de anos de atuação.
- **Evitar** (homeangels.com.br/sp-burlemarx): múltiplos formulários concorrentes,
  CTAs genéricos ("saiba mais"), prova social distante da decisão, navegação com
  saídas (menu completo) que tiram o visitante do funil.

Diferença estrutural desta LP: **zero menu de navegação com saídas** — página é
scroll-only, o header tem só logo + telefone/whatsapp (sem links que tirem do funil).

## Seções (ordem final)

1. **Header fixo mínimo** — logo Home Angels + telefone/WhatsApp clicável. Sem
   menu de navegação (não damos saída do funil).
2. **Hero** — headline validando a dor ("Cuidar de quem você ama, sem abrir mão
   da sua rotina"), subheadline com a proposta (cuidador/enfermeiro profissional
   em casa, plantão sob medida), CTA primário ("Quero uma avaliação gratuita")
   levando por scroll suave até o formulário. Selo de credibilidade (anos de
   franquia, rede nacional) já visível no hero.
3. **Validação da dor / "Isso é com você se..."** — 3-4 bullets de cenários
   (pós-alta hospitalar, Alzheimer/demência, mobilidade reduzida, família sem
   tempo/preparo). Gera identificação imediata.
4. **Como funciona (processo em 3-4 passos)** — avaliação gratuita → seleção do
   cuidador ideal → início do plantão → supervisão contínua. Remove a objeção
   "não sei como isso funciona / tenho medo de contratar errado".
5. **O que está incluso** — cards curtos: cuidador/enfermeiro qualificado,
   supervisão técnica, plantões flexíveis (diário/noturno/24h), reposição
   garantida em caso de falta. Remove objeção de "e se o cuidador faltar".
6. **Prova social + números** — anos de atuação da rede, atendimentos
   realizados, 2-3 depoimentos nomeados com foto/iniciais. Logo após a seção de
   inclusos (momento em que a confiança racional já foi construída).
7. **CTA + Formulário (seção final, é o clímax da página)** — único formulário
   da LP. Campos mínimos: nome, telefone/WhatsApp, para quem é o cuidado
   (idoso/outro), urgência (imediata/planejando). Copy reforça garantia
   ("avaliação gratuita, sem compromisso") e resposta rápida ("retorno em até X
   horas").
8. **Footer mínimo** — logo, telefone, endereço da unidade Burle Marx, CNPJ/
   dados legais da franquia, sem links de navegação adicionais.

## Regra de ouro

Todo elemento que não empurra para o formulário é candidato a corte. Nenhum
link externo, nenhum menu, nenhuma seção institucional "sobre nós" genérica sem
conexão direta com uma objeção de conversão.

## Requisitos técnicos

- Next.js (App Router, TypeScript, Tailwind), rota única `/` (mais `/obrigado`
  pós-conversão para tracking de conversão do Google Ads).
- Formulário submete via rota de API própria (`/api/lead`) que valida os dados
  e encaminha para o Go High Level; ver `docs/crm-integration.md`.
- Lazy loading de imagens (padrão unlazy), SEO básico (metadata, OG image),
  Lighthouse acessibilidade e performance >= 90.
- Suporte a UTM: capturar parâmetros de campanha da URL e enviá-los junto com
  o lead para o CRM (essencial para o cliente medir ROI por campanha/anúncio).
- Pixel/tag do Google Ads (conversão) disparado em `/obrigado`.
