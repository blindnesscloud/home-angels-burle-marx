# Simulação de usuário — LP Home Angels Burle Marx (mobile, 390x844)

> Testado com Playwright (Chromium, viewport mobile 390x844, touch habilitado)
> contra `http://localhost:3000`. Narrativa em primeira pessoa, na perspectiva
> de uma pessoa de ~50 anos que acabou de clicar num anúncio do Google porque
> a mãe voltou de uma internação e ela não sabe o que fazer.

## Minha experiência, narrada

Cliquei no anúncio no celular, no meio de um dia corrido. A página abre e em
menos de dois segundos já vejo "Cuidar de quem você ama, sem abrir mão da sua
rotina" — isso é exatamente o que eu sinto, essa culpa de não conseguir dar
conta de tudo. Logo abaixo, uma frase mais direta explica que é um cuidador ou
enfermeiro profissional que vai na casa, com supervisão e plantão flexível.
Certo, entendi o que é e para quem é — não fiquei em dúvida. Tem até um selinho
dizendo que é rede nacional com unidade aqui perto (Burle Marx), o que me dá um
pouco mais de confiança de cara.

O botão verde "Quero uma avaliação gratuita" é grande, contrastante, e diz
exatamente o que vai acontecer se eu clicar. Embaixo dele tem uma linha
pequena "Sem compromisso · Resposta rápida da equipe local" — isso ajuda a
baixar minha guarda, porque eu tenho medo de "cair" num formulário de vendas
agressivo.

Se eu estivesse com pressa (e eu estou, sempre estou), eu clicaria nesse botão
verde agora. Quando eu clico, a página desliza suavemente e me leva direto para
um formulário curto: nome, WhatsApp, para quem é o cuidado, quando eu preciso.
As opções já vêm com uma marcada (idoso da família / o quanto antes), o que é
bom porque no meu estado emocional eu não quero pensar muito, só confirmar. Lá
embaixo do botão de enviar tem "Sem compromisso. Seus dados são usados só para
retornarmos seu contato" — isso é a garantia que eu precisava ver antes de
digitar meu telefone.

Se eu decidir rolar a página inteira em vez de clicar direto, ela me mostra os
sinais de que "isso é comigo" (pós-alta hospitalar, Alzheimer, mobilidade
reduzida, família sem tempo) — me vi em pelo menos dois desses, o que me deixa
mais confiante de que estou no lugar certo. Depois explica o passo a passo (1.
avaliação grátis, 2. escolha do cuidador, 3. início do plantão) — isso tira um
medo real que eu tinha, que era "e se eu contratar errado". Depois tem uma
lista do que está incluso, e ali aparece algo importante pra mim: "reposição
garantida em caso de falta do profissional" — é exatamente a pergunta que eu
ia fazer.

Só que aí, na parte de depoimentos, logo antes do formulário, o que eu vejo na
tela é isto, literalmente escrito:

> "[Depoimento real da família a ser inserido pela unidade Burle Marx]"
> — [Nome do cliente]

Duas vezes. Isso me tira do clima na hora. Eu não sei o que é isso — parece
que a página está incompleta, ou pior, que os depoimentos "de verdade" nem
existem e é tudo genérico. Justo no momento em que eu precisava de confiança
para preencher meus dados, a página me mostra um colchete de rascunho. Isso é
o tipo de coisa que, num momento de decisão emocional e desconfiança (estou
prestes a deixar um estranho cuidar da minha mãe), faz eu pensar "será que essa
empresa é séria mesmo?" e considerar fechar a aba ali.

Sobre o WhatsApp: no topo da página, o telefone "(19) 0000-0000" também é um
botão clicável, e ele já abre uma mensagem pronta ("Vim pela página da Home
Angels Burle Marx e quero saber mais sobre cuidadores de idosos"), o que é
ótimo — eu prefiro muito mais mandar uma mensagem do que preencher formulário,
principalmente estressada. O problema é que o número exibido, "(19) 0000-0000",
claramente não é um número real — aparece assim tanto no cabeçalho quanto no
rodapé. Se eu prestar atenção (e num momento de desconfiança eu prestaria), eu
notaria que aquilo parece um número de teste, não um telefone de verdade. Isso
também mina a confiança, embora o mecanismo (abrir WhatsApp com mensagem
pronta) funcione tecnicamente muito bem.

Quanto a precisar rolar demais: do topo até o formulário dá quase 6 telas de
celular se eu for lendo tudo com calma. Isso seria bastante para quem tem
pouca paciência, mas como o botão do herói já me leva direto para o formulário
com um clique, na prática eu nunca preciso rolar manualmente se eu já decidi
agir logo — e isso resolve bem o problema.

Não notei nenhuma trava visual ao tocar nos cartões (os de "isso é com você
se..." e "o que está incluso") — nada ficou "preso" com sombra ou inclinação
estranha como às vezes acontece em sites que foram pensados só para mouse.
Tudo ficou estável ao toque, sem esquisitice.

Uma coisa mais sutil: o título principal do herói está numa fonte cursiva/
manuscrita elegante. É bonita, mas em uma situação de estresse, com pressa,
uma fonte de letra "de mão" exige um pouco mais de esforço de leitura do que
uma fonte reta — não me impediu de entender, mas não é a leitura mais rápida
possível.

## Lista de fricções, por impacto na decisão de continuar ou desistir

1. **[CRÍTICO] Depoimentos com texto de placeholder visível ao vivo** — a
   seção de prova social mostra literalmente `[Depoimento real da família a
   ser inserido pela unidade Burle Marx]` e `[Nome do cliente]`, duas vezes,
   posicionada logo antes do formulário (o momento de maior necessidade de
   confiança). Isso é o ponto mais provável de fazer a pessoa fechar a aba,
   porque sugere que o site está incompleto ou que a prova social não é real
   — exatamente o oposto do que a seção deveria transmitir.

2. **[ALTO] Número de telefone/WhatsApp com dado de teste "(19) 0000-0000"**
   — aparece no cabeçalho (sticky, sempre visível) e no rodapé; o link do
   WhatsApp aponta para `5519000000000`. Mecanicamente funciona (abre
   WhatsApp com mensagem pronta), mas o número em si é claramente fictício.
   Se a pessoa notar, gera a mesma dúvida de seriedade que os depoimentos
   vazios.

3. **[MÉDIO] Extensão da rolagem até o formulário (~5-6 telas)** — mitigado
   pelo CTA do herói que pula direto para o formulário, mas para quem rola
   manualmente (sem clicar no botão) pode parecer uma jornada longa antes de
   agir, num momento em que a pessoa tem pouca paciência.

4. **[BAIXO] Fonte cursiva no título do herói** — estética válida e alinhada
   à marca, mas exige um pouco mais de esforço de leitura rápida do que uma
   fonte reta, num contexto em que a pessoa está sob estresse e não vai ler
   com calma.

5. **[SEM IMPACTO NEGATIVO OBSERVADO] Animações e cartões em mobile** — não
   foram encontrados problemas de hover "grudado", cartões deslocados ou
   inclinações estranhas ao tocar na tela; a página se comportou de forma
   estável em toque, sem sinais de comportamento pensado só para desktop.

6. **[PONTOS POSITIVOS a preservar]**
   - Hero cumpre o teste dos 3 segundos: dor validada, oferta clara, para
     quem é, CTA de ação em primeira pessoa, reforço de "sem compromisso"
     logo abaixo do botão.
   - CTA do herói rola suavemente direto até o formulário certo (não existe
     ambiguidade sobre para onde ele leva).
   - Formulário é curto, com opções pré-marcadas que reduzem esforço de
     decisão, e tem reforço explícito de garantia/baixo risco junto ao botão
     de enviar.
   - WhatsApp está sempre acessível no cabeçalho fixo, com mensagem
     pré-preenchida — um caminho alternativo claro ao formulário.
   - Nenhum menu de navegação com saída do funil; nenhuma seção institucional
     desconectada da decisão.

## Observações técnicas de apoio (não julgamento de código)

- Altura total da página: ~4855px; viewport mobile: 844px (~5,75 telas).
- CTA do hero (`href="#formulario"`) leva corretamente ao formulário com
  scroll suave; `scrollY` após o clique = 3755px, exatamente no topo da seção
  do formulário.
- Campos do formulário: `name` (texto), `phone` (tel), `careFor` (radio, com
  "Um idoso da família" pré-selecionado), `urgency` (radio, com "O quanto
  antes" pré-selecionado), botão de envio.
- Sem overflow horizontal detectado (`scrollWidth === clientWidth === 390`).
- Tamanhos de fonte: H1 36px, parágrafo introdutório 18px, corpo padrão 16px
  — adequados para leitura rápida em tela pequena.

## Screenshots capturados (referência local, não versionados)

Salvos em
`C:\Users\psive\AppData\Local\Temp\claude\f--HomeAngelsBurleMax\7f9259d6-5ddf-4dc2-b435-cd83cc126cec\scratchpad\screenshots\`:
- `01_hero_first_look.png`, `02_full_page.png`
- `03_scroll_00.png` a `03_scroll_05.png` (rolagem completa)
- `04_after_hero_cta_click.png`, `05_form_area.png`
- `tap_before.png`, `tap_during.png`, `tap_after.png` (teste de toque em
  cartões)
