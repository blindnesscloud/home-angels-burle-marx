# Testador QA + Juiz de Conversão — LP Home Angels Burle Marx

> Terceira rodada de avaliação, após correção dos 3 problemas críticos
> apontados pelo simulador de usuário (depoimentos placeholder, telefone de
> teste, bug de reduced-motion no hero) e após a adição do checkbox de
> consentimento (G14). Testado contra `http://localhost:3000` com Playwright
> (Chromium headless) e execução direta dos scripts de build/lint/gate.

---

## PARTE 1 — TESTADOR QA

### 1.0 Confirmação rápida dos 3 pontos já corrigidos (não reinvestigados a fundo)

- **Depoimentos placeholder**: confirmado corrigido. `siteConfig.testimonials`
  (`web/src/lib/site-config.ts:24`) está vazio por padrão, e
  `SocialProof.tsx:11` só renderiza o bloco de depoimentos
  (`hasTestimonials ? ... : null`) se houver conteúdo real. Nenhum colchete de
  rascunho aparece na tela — verificado nos screenshots de scroll real
  (seção de prova social mostra só os 3 selos de confiança).
- **Telefone de teste "(19) 0000-0000"**: ainda aparece no header, footer e
  botão de WhatsApp — mas isso agora é **esperado e travado**: é o
  placeholder de `siteConfig.ts` e `npm run check:launch-ready` falha
  explicitamente com esse aviso antes de deploy. Confirmado que o gate
  funciona (ver 1.1).
- **Bug de reduced-motion no hero**: confirmado corrigido. Testei
  `getComputedStyle(el).opacity` de todos os `.js-reveal` após scroll real
  incremental e após salto instantâneo para o fim da página: 0 elementos
  presos em opacidade < 0.99 em ambos os casos.

### 1.1 Build, lint, gate de lançamento

```
npm run build   → sucesso, "Compiled successfully in 545ms", 5 rotas geradas
                  (/, /_not-found, /api/lead, /obrigado, /privacidade)
npm run lint    → sem saída, sem erros/warnings
npm run check:launch-ready → exit 1 (esperado), mensagem clara:
  - whatsappNumber ainda é o placeholder de desenvolvimento...
  - googleAdsConversionLabel ainda é o placeholder...
  - Nenhum depoimento real cadastrado em siteConfig.testimonials...
  - GHL_INBOUND_WEBHOOK_URL não está definida no ambiente...
```
A mensagem do gate é clara, lista cada pendência com o arquivo/campo exato a
corrigir e não usa jargão técnico desnecessário — um não-desenvolvedor
(franqueado) conseguiria repassar essa lista para quem for configurar o
ambiente de produção. Nenhuma reclamação aqui.

### 1.2 Formulário com checkbox de consentimento

- **Sem marcar o checkbox** (via `POST /api/lead` direto, bypassando
  validação HTML5): `400 {"error":"É necessário autorizar o contato para
  enviar o formulário."}` — claro e específico. `web/src/app/api/lead/route.ts:68-73`.
- **Sem marcar o checkbox, pela UI**: o navegador bloqueia o submit antes de
  chegar à rede (`validationMessage`: "Please check this box if you want to
  proceed."), porque o input tem `required`. Nenhuma requisição sai, nenhuma
  navegação ocorre. Comportamento correto.
- **Com checkbox marcado + dados válidos**: a chamada a `/api/lead` retorna
  `502 {"error":"Não foi possível enviar seus dados agora. Tente novamente."}`
  (esperado, `GHL_INBOUND_WEBHOOK_URL` não configurada neste ambiente). A UI
  trata o erro corretamente: mostra a mensagem em `role="alert"` de forma
  visível (texto vermelho, acima do botão), o botão volta ao estado normal
  ("Quero uma avaliação gratuita"), o formulário permanece preenchido (nada é
  perdido), e a página continua 100% responsiva depois — confirmado com nova
  requisição a `/` retornando 200 logo em seguida. Nenhum erro não tratado no
  console além do 502 esperado da própria chamada de rede.

### 1.3 Rota `/privacidade`

Responde `200`. Conteúdo é real e específico ao que a LP faz (não é um
modelo genérico de internet): explica os 4 campos coletados, para que usa,
onde ficam os dados (CRM/GHL) e como exercer direitos, citando o WhatsApp da
unidade. Está corretamente marcada `robots: noindex` (não é para indexação)
e linkada tanto no footer (todas as páginas) quanto no checkbox do
formulário, abrindo em nova aba (`target="_blank"`) — bom, não tira o
usuário do fluxo de preenchimento. Único ponto a observar: o próprio texto
da política reproduz o telefone placeholder `(19) 0000-0000` como canal de
contato para exercício de direitos — não é um bug novo (é o mesmo
placeholder do site inteiro, já coberto pelo gate), mas fica registrado
porque é a página de compliance, o lugar onde esse dado errado dói mais se
escapar para produção.

### 1.4 Screenshots responsivos (375x812 e 1440x900)

Sem overflow horizontal em nenhum dos dois (`scrollWidth === clientWidth`
em ambos: 375 e 1440). Sem texto cortado, sem sobreposição, em nenhuma
seção, incluindo o novo checkbox de consentimento e o link de política no
footer. Detalhes observados:
- O checkbox de consentimento (`web/src/components/LeadForm.tsx:127-141`)
  tem alinhamento `items-start` com o texto ao lado, então o texto longo
  ("Autorizo o contato... de acordo com a política de privacidade.") quebra
  em 2-3 linhas sem desalinhar o checkbox do topo do texto — nada estranho
  visualmente, testado em mobile 375px onde o texto é mais apertado.
  Confirmado no screenshot `qa_mobile_form.png`.
  Nota metodológica: a primeira rodada de screenshots com `full_page=True`
  mostrou grandes blocos brancos vazios entre seções — isso **não é um bug
  real**, é uma limitação conhecida da captura full-page do Chromium via CDP
  (não dispara `IntersectionObserver` de verdade ao "montar" o documento
  inteiro fora da viewport). Reconfirmei com scroll real incremental
  (`window.scrollTo` + espera) e com salto instantâneo direto ao fim da
  página: 0 elementos presos em opacidade baixa nos dois casos. Falso
  positivo descartado, não entra na lista de problemas.
- O link "Política de Privacidade" no footer (`web/src/components/Footer.tsx:22-27`)
  está sublinhado, com contraste adequado sobre o fundo escuro do footer
  (`text-white/50`, hover `text-white/80`), sem quebrar layout em nenhuma
  largura testada.

### 1.5 Navegação por teclado

Sequência de Tab a partir do campo nome, dentro do formulário:
`name → phone → careFor (radio) → urgency (radio) → consent (checkbox) →
link "política de privacidade" → botão "Quero uma avaliação gratuita"`.
Nenhum elemento prende o foco (nenhum "tab trap"), a ordem segue exatamente
a ordem visual/lógica do formulário, e o checkbox de consentimento é
alcançável e marcável via teclado antes do botão de enviar, como esperado.
Depois do botão de enviar, o Tab segue naturalmente para o link de política
no footer e depois para os elementos do header/hero (loop de página normal,
sem nada quebrado).

### 1.6 Achados novos desta rodada (não reportados antes)

Nenhum bug técnico novo encontrado. A única observação nova é de conteúdo
(1.3, telefone placeholder também aparecendo no texto de `/privacidade`),
já coberta pelo gate existente e não tratada aqui como bug separado.

---

## PARTE 2 — JUIZ DE CONVERSÃO

Avaliação cética, como CRO para tráfego pago — não crítica de design.

### 1. Clareza da proposta de valor nos 5 primeiros segundos — **9/10**

O hero entrega, nesta ordem, em uma tela sem rolagem: (a) selo "Rede
nacional... Unidade Burle Marx" (credibilidade), (b) headline emocional que
valida a dor sem esconder o serviço, (c) subheadline que explicita o que é
literalmente contratado ("cuidador ou enfermeiro profissional na casa...
supervisão técnica... plantão sob medida"), (d) CTA de ação em primeira
pessoa, (e) reforço de baixo risco. Isso cumpre o teste dos 5 segundos:
dor + oferta + para quem + próximo passo, tudo visível sem scroll em
375x812. Só não é 10 porque a fonte cursiva do H1 (Caveat) exige fração de
segundo a mais de decodificação do que uma fonte reta exigiria — em um
contexto de estresse/pressa, cada milissegundo de leitura importa, mesmo que
marginalmente. É uma escolha de marca legítima, mas tem custo de clareza
instantânea.

### 2. Força e clareza do CTA principal — **9/10**

"Quero uma avaliação gratuita" é primeira pessoa, verbo de ação, benefício
explícito (gratuita) e baixo risco implícito. Aparece idêntico no hero e no
formulário final — decisão consciente e documentada (`docs/site-structure.md`),
e funciona bem porque reforça a mesma promessa em vez de confundir com
textos diferentes. O botão tem contraste forte (verde institucional sobre
fundo azul escuro do hero, verde sobre branco no formulário), tamanho
generoso para toque, e o efeito magnético (`MagneticCta.tsx`) é sutil o
suficiente para não distrair no fluxo de clique real (só reage a mouse; em
touch — maioria do tráfego de Ads — comporta-se como link normal, o que é a
decisão certa). Não é 10 porque o estrategista já identificou (corretamente)
que testar uma variante de urgência ("Falar agora com um especialista") para
tráfego de crise aguda é um teste de alto valor ainda não rodado — o CTA
atual é bom, mas otimizado para "planejamento", não para "crise".

### 3. Fricção do formulário / checkbox de consentimento — **8/10**

O trade-off é aceitável e, tecnicamente, bem resolvido: o texto do checkbox
é curto ("Autorizo o contato... de acordo com a política de privacidade"),
não usa jargão jurídico, o link abre em nova aba (não interrompe o
preenchimento), e a posição — depois dos campos de conteúdo, imediatamente
antes do botão de enviar — é a posição correta de UX para consentimento
(o usuário já decidiu preencher antes de ver a exigência extra). O
`required` nativo bloqueia o envio sem fricção de round-trip ao servidor.
Onde perde pontos: (a) o texto do checkbox usa `text-[var(--color-muted)]`,
a mesma cor cinza-clara do texto de apoio menos importante da página — para
um público 45+ sob estresse, um texto de exigência legal obrigatória
merecia contraste igual ou maior que os campos ao lado, não menor; (b) não
há nenhuma indicação visual de erro *no próprio checkbox* quando o
usuário tenta enviar sem marcá-lo — hoje depende inteiramente da bolha de
validação nativa do navegador (que em alguns navegadores mobile é discreta
ou pode ser perdida em scroll), sem um estado de erro customizado (borda
vermelha, texto abaixo do campo) como os outros itens do formulário podem
ter. É plausível que um usuário no celular, com o teclado virtual aberto,
não veja a bolha nativa de validação e ache que o botão "não funcionou".

### 4. Sequência de objeções antes do formulário — **9/10**

A ordem (dor validada → como funciona → o que está incluso → prova social →
formulário) segue exatamente o que a auditoria de referência recomendou e
neutraliza objeções específicas e nomeadas: "não sei como funciona" (seção
3), "e se o cuidador faltar" (reposição garantida, seção 4), "essa empresa é
séria?" (seção 5, ainda que hoje mais fraca — ver item 5). É uma sequência
lógica de redução de risco percebido, crescente até o clímax do formulário.
Não é 10 porque a extensão total (~5-6 telas em mobile, confirmado no
relatório anterior e ainda válido) significa que só quem rola manualmente
até o fim vê a objeção "reposição garantida em caso de falta" — um visitante
de alta urgência que só olha o hero e vai direto ao formulário via CTA nunca
vê essa objeção neutralizada antes de decidir. Isso é mitigado, não
resolvido, pelo atalho do CTA.

### 5. Prova social — pergunta direta sobre a seção enfraquecida — **6/10, honesto e correto, mas objetivamente fraco para conversão**

Opinião sincera: esconder o depoimento falso foi a decisão certa e
inegociável — um depoimento fabricado, descoberto pelo usuário (mesmo que
só subconscientemente, pela linguagem genérica), destrói mais confiança do
que a ausência de depoimento algum, especialmente neste nicho onde a decisão
envolve confiar um familiar vulnerável a um estranho. Então sim, a mudança é
uma melhoria líquida sobre o estado anterior. Mas isso não significa que a
seção atual seja "boa o suficiente" — ela é apenas "não prejudicial". Hoje
`SocialProof.tsx` mostra só 3 frases de confiança institucional
("Parte da rede nacional...", "Cuidadores selecionados...", "Atendimento
humanizado..."), sem nenhum número concreto (quantos atendimentos, quantos
anos de atuação nacional, quantas famílias atendidas na região), sem nome,
sem rosto, sem história. Comparado à âncora de referência que a própria
auditoria interna recomendou seguir (`docs/reference-audit.md`: "Seguir...
credibilidade (17+ anos)... depoimentos (3, nomeados)"), a página atual
entrega só metade da fórmula recomendada, e a metade mais fraca (afirmações
genéricas da própria empresa sobre si mesma, sem prova externa verificável).
Para o público-alvo (45+, decidindo por um familiar, ceticismo natural sobre
"empresa que só fala bem de si mesma"), isso é uma lacuna real, não um
detalhe. A nota não é mais baixa porque a alternativa (depoimento falso) é
comprovadamente pior, e porque pelo menos há 3 pontos concretos (rede
nacional, supervisão técnica, atendimento humanizado) em vez de nada — mas
esta seção é claramente a mais fraca de proporção risco/retorno na página
hoje, e é a prioridade nº1 de conteúdo (não de código) antes do lançamento
pago em escala.

### 6. Ausência de distrações/saídas do funil — **10/10**

Confirmado de novo nesta rodada: nenhum `<nav>`, nenhum menu, nenhum link
externo, um único formulário (`LeadForm.tsx` usado uma única vez em
`FinalCta.tsx`), o único outro caminho de conversão é o WhatsApp (que é uma
segunda via de conversão, não uma saída — leva para fora do site, mas para
dentro do funil de vendas, não para longe dele). O link para `/privacidade`
é a única saída de página existente, e ela é justificada por exigência
legal, abre em nova aba, e não compete pela atenção do CTA. Continua exemplar
neste critério.

### 7. Adequação ao público 45+ em momento de estresse emocional — **8/10**

Pontos fortes: tamanhos de fonte generosos (H1 36px+ em mobile, corpo 16px+,
confirmado no relatório anterior), botões grandes e de alto contraste,
opções pré-marcadas no formulário reduzindo carga de decisão, linguagem sem
jargão técnico ou "corporativês", header sempre visível com contato direto
(nunca esconde ao rolar). Pontos que tiram nota: (a) a fonte cursiva do
hero, já discutida, é uma escolha estética que compete (marginalmente) com
legibilidade rápida para esse público; (b) o texto do checkbox de
consentimento em cinza-claro (`color-muted`) é um contraste mais baixo
exatamente no elemento mais denso de texto legal da página — pior
combinação possível para leitura rápida por alguém 45+, potencialmente com
mais dificuldade visual, sob estresse. Nenhum dos dois é grave sozinho, mas
somados apontam para um padrão: decisões estéticas ocasionalmente pesam
mais que a leiturabilidade máxima para o público real.

### 8. Uso do motion (scroll reveal, CTA magnético, tilt card) — **8/10**

Bem calibrado para o contexto, na maior parte: o CTA magnético só reage a
mouse (desliga em touch, que é a maioria do tráfego pago mobile — decisão
correta documentada no próprio código), o tilt card também só reage a
`pointerType === "mouse"` e tem inclinação máxima de só 5 graus com glow
verde de baixa opacidade — sutil, não "gadget". O scroll reveal usa
`ease` suave sem bounce e sem blur (comentário no código: "para público 45+
lendo texto de decisão, nitidez imediata do texto importa mais que o
efeito") — essa é exatamente a decisão certa de design consciente do
público. Testei o `prefers-reduced-motion` e o gatilho de scroll real:
ambos funcionam sem travar elementos em opacidade zero. O único risco real
aqui, que classificaria como médio e não crítico: o tilt card em 3D
(`perspective`, `rotateX/Y`) nos cartões de "isso é com você se..." e
"como funciona" é um efeito que, para desktop (onde reage ao mouse), pode
soar um pouco "produto de tecnologia" para um serviço de cuidado humano —
não é flashy o suficiente para prejudicar a conversão, mas é o elemento de
motion mais distante, conceitualmente, do tom "acolhedor" que o resto da
copy constrói. Não recomendo remover (o efeito é discreto e o comentário no
código já mostra que a intensidade foi propositalmente reduzida vs. um
padrão mais "tech"), mas é o candidato nº1 se algum teste A/B futuro
precisar cortar algo de motion por under-performance.

### 9. Performance percebida do build de produção — **8/10 (estimativa qualitativa, sem Lighthouse — G13 ainda pendente)**

Não executei Lighthouse (mesma limitação de ambiente já registrada em G13 do
GATES.md — sem Chrome DevTools/Lighthouse CLI disponível). Avaliação
qualitativa a partir do build: `npm run build` compilou em 545ms
(Turbopack), gerou 5 rotas estáticas/dinâmicas sem avisos de tamanho de
bundle. Fatores que jogam a favor da performance percebida: (a) o hero não
usa uma imagem de fundo grande — é um gradiente CSS puro
(`bg-gradient-to-br`), então não há maior candidato a LCP lento por imagem
pesada; (b) fontes carregadas via `next/font/google` com `display: "swap"`,
autoexecução no build (self-hosted pelo Next, sem requisição externa
bloqueante); (c) logos usam `next/image` com dimensões fixas (sem CLS por
imagem sem tamanho definido). Fatores que pesam contra e que só um
Lighthouse real vai confirmar: framer-motion é uma dependência de bundle
não-trivial usada em quase toda seção da página (Hero, ProblemSection,
HowItWorks, Included, SocialProof, FinalCta todas usam `SectionReveal` ou
`HeroReveal`), o que aumenta o JS de hidratação total mesmo que cada efeito
individual seja leve. Recomendo fortemente rodar Lighthouse mobile real
antes do lançamento pago (G13 pendente) — a nota aqui é uma estimativa de
engenharia, não uma medição.

---

## Nota geral ponderada — **8,2/10**

Ponderação: pesos maiores para os critérios que decidem se o clique pago
vira lead (proposta de valor, CTA, fricção do formulário, ausência de
distrações) e peso menor para os critérios estéticos/de polimento (motion,
performance percebida sem medição real). A LP está estruturalmente muito
bem resolvida para conversão de tráfego pago: zero saídas de funil, um único
CTA reforçado, formulário curto com fricção de compliance bem posicionada
(mesmo com o defeito de contraste do checkbox), sequência de objeções
correta. O que impede uma nota mais alta não é nenhum erro técnico — é a
lacuna de conteúdo real ainda pendente do cliente (telefone, webhook, label
de conversão, depoimentos), que já está corretamente travada por gates, e a
prova social genuinamente fraca mesmo dentro do que é honesto mostrar hoje.

## As 5 mudanças mais valiosas a fazer a seguir, em ordem de prioridade

1. **Aumentar o contraste do texto do checkbox de consentimento.** Em
   `web/src/components/LeadForm.tsx:127`, trocar a classe do `<label>` de
   `text-sm text-[var(--color-muted)]` para uma cor de texto mais escura
   (ex: `text-[var(--color-ink)]` ou um `text-sm font-medium`), mantendo o
   tamanho pequeno mas elevando o contraste — hoje é o texto de exigência
   legal obrigatória com o contraste mais baixo do formulário inteiro, o
   oposto do que deveria ser para um público 45+.

2. **Adicionar estado de erro visual explícito no checkbox de consentimento
   quando o submit é bloqueado por falta de marcação.** Em
   `web/src/components/LeadForm.tsx`, capturar o evento de invalidez do
   campo `consent` (ex: `onInvalid` no input, ou verificação manual no
   `handleSubmit` antes do `fetch`) e renderizar uma mensagem própria (mesmo
   padrão visual do `errorMessage` já existente em vermelho) em vez de
   depender só da bolha de validação nativa do navegador, que pode passar
   despercebida em mobile com teclado virtual aberto.

3. **Fortalecer a seção de prova social com números concretos, mesmo sem
   depoimentos nomeados ainda.** Em `web/src/components/SocialProof.tsx` e
   `web/src/lib/site-config.ts`, adicionar campos estruturados para dados
   verificáveis que a franquia certamente já tem (anos de atuação da rede
   nacional, número aproximado de famílias atendidas, número de unidades no
   Brasil) e renderizá-los como destaque numérico (ex: "17+ anos", "500+
   famílias atendidas") ao lado dos 3 selos de confiança já existentes — é
   um ganho de credibilidade que não depende de aguardar depoimento
   nomeado/autorizado do cliente, que tem cronograma incerto.

4. **Testar (ou pelo menos preparar) uma segunda tag de "erro" para o campo
   telefone com feedback inline, não só a mensagem de erro genérica do
   topo/rodapé do formulário.** Hoje qualquer erro (telefone inválido,
   consent ausente detectado no servidor, falha 502) cai na mesma
   `<p role="alert">` genérica acima do botão. Para o caso específico de
   telefone mal formatado (`web/src/app/api/lead/route.ts:46-52`, regra de
   10-13 dígitos), adicionar validação client-side com feedback junto ao
   campo (`web/src/components/LeadForm.tsx`, input `#phone`) evitaria um
   round-trip desnecessário ao servidor para um erro detectável no
   navegador, reduzindo a percepção de "formulário quebrado" em conexões
   móveis mais lentas.

5. **Rodar Lighthouse mobile real antes do lançamento pago (fechar G13).**
   Nenhuma ferramenta de Lighthouse/Chrome DevTools estava disponível neste
   ambiente de teste; isso continua sendo o gate mais importante ainda
   aberto no `GATES.md` porque é o único critério de aceite objetivo de
   performance/acessibilidade que não foi validado nesta nem na rodada
   anterior — dado que framer-motion está presente em praticamente toda
   seção da página, vale medir antes de assumir que a performance percebida
   qualitativamente boa (estimativa da seção 9 acima) se confirma em campo,
   especialmente em rede móvel 4G que é o cenário real do público-alvo
   clicando em um anúncio do Google no celular.
