# Estratégia de Aquisição e Growth — LP Home Angels Burle Marx

Recomendações do agente estrategista, complementares ao trabalho técnico já
feito na LP (ver `GATES.md`, `docs/site-structure.md`, `docs/crm-integration.md`).
Este documento não altera código — é input para o franqueado e para quem
configurar o Go High Level (GHL) e as campanhas do Google Ads.

Contexto que molda todas as recomendações abaixo: ticket alto, decisão
emocional e urgente (às vezes literalmente uma crise familiar em curso),
ciclo de vendas curto, fechamento por telefone/WhatsApp após o lead cair no
CRM, tráfego 100% pago (cada lead mal tratado é dinheiro jogado fora).

---

## 1. Pós-lead / nurture no GHL

O ativo mais caro deste negócio não é a LP, é a velocidade e a qualidade do
primeiro contato humano depois que o formulário é enviado. Prioridades, em
ordem:

1. **Resposta automática imediata (0-60s), segmentada por `urgency`.**
   - `urgency = "imediata"`: workflow dispara SMS/WhatsApp automático em até
     1 minuto ("Recebemos seu pedido, [Nome]. Alguém da nossa equipe vai
     ligar em instantes.") e cria a oportunidade com tag `URGENTE` e prioridade
     máxima no pipeline. Notificação interna (SMS/push para o time de plantão)
     deve ser diferente de um lead normal — não pode esperar a rotina de
     e-mail.
   - `urgency = "planejando"`: mensagem de confirmação mais informativa, sem
     tom de emergência, com expectativa de retorno em algumas horas (ex: "em
     até 4h úteis"), pois aqui a decisão amadurece em dias, não minutos.
   - Justificativa: para "imediata" a família provavelmente está lidando com
     alta hospitalar, queda, ou crise de cuidado agora — se o telefone não
     tocar em minutos, ela liga para o próximo resultado do Google.

2. **Cadência de ligação com escalonamento por tentativa, não só uma tentativa.**
   - Tentativa 1: ligação em até 5 min (urgente) / até 2h (planejando).
   - Se não atender: SMS/WhatsApp automático "Tentamos falar com você sobre o
     cuidado para [careFor placeholder]. Pode nos retornar quando puder?" com
     link direto de WhatsApp da unidade (não um número genérico de central).
   - Tentativa 2: 30-60 min depois (urgente) / no dia seguinte de manhã
     (planejando).
   - Tentativa 3: 24h depois; se ainda sem resposta, mover para pipeline de
     "lead frio" e entrar em nutrição por WhatsApp de baixa frequência (não
     abandonar — decisão de contratar cuidador raramente é cancelada, só
     adiada ou transferida para concorrente mais rápido).
   - Regra de ouro: nunca deixar um lead "imediata" parado sem toque humano
     por mais de 15 minutos em horário comercial. Se isso não é operacionalmente
     possível 24/7, considerar um número de plantão fora do horário comercial
     só para leads urgentes (mesmo que seja o celular pessoal do gestor).

3. **Segmentação por `careFor` para personalizar o discurso, não só o roteamento.**
   - Se o campo indicar "idoso" com contexto de demência/Alzheimer (hoje a LP
     captura isso implicitamente pela seção de dor, mas não como campo
     estruturado — ver recomendação de teste A/B #4 abaixo sobre adicionar um
     campo de "situação" mais específico), o script de ligação deveria mudar:
     empatia primeiro, sem pressa, validando a dificuldade emocional, antes de
     falar preço/processo. Para "outro" (não necessariamente idoso), o discurso
     de urgência emocional deve ser mais moderado — tratar como possível lead
     mal qualificado (ex: pesquisa de mercado, curioso) e confirmar a real
     necessidade antes de investir tempo comercial.
   - Tag automática no GHL por combinação `urgency x careFor` (4 tags) permite
     relatório de conversão por segmento depois — essencial para saber se vale
     a pena continuar comprando cliques para "planejando" ou concentrar
     orçamento em quem sinaliza urgência.

4. **Não perder o UTM na oportunidade do GHL.** Confirmar que o workflow do
   Inbound Webhook grava `utm_source`/`utm_campaign`/`utm_medium` como campos
   customizados da oportunidade (não só no payload bruto do webhook) — sem
   isso, ninguém consegue depois cruzar "qual campanha gerou vendas fechadas",
   só "qual campanha gerou leads". Essa é a métrica que realmente importa para
   otimizar o Google Ads (ver seção 3).

---

## 2. Ideias de teste A/B (pós-lançamento, com tráfego pago real)

Tráfego pago é caro por clique — os testes devem ser priorizados pelo que
move a agulha de conversão com o menor risco de "quebrar" o que já funciona.
Ordem sugerida de execução (não simultânea — um teste de cada vez, para não
poluir os dados com pouco volume):

1. **Headline do hero.** É o elemento de maior alavancagem porque decide se o
   visitante continua lendo. Testar a headline atual ("Cuidar de quem você
   ama, sem abrir mão da sua rotina") contra uma variante que abre 100% pela
   dor/urgência sem mencionar rotina do cuidador familiar (ex: focada em "não
   sabe o que fazer agora" / momento de crise) — como o público de Ads pode
   estar em dois momentos de intenção diferentes (crise aguda vs. planejamento
   preventivo), vale também considerar variantes de headline por grupo de
   anúncio/UTM (headline dinâmica alinhada à palavra-chave), não só um A/B
   genérico.

2. **Texto e formato do CTA principal.** Testar "Quero uma avaliação gratuita"
   contra variantes que reduzem fricção percebida ou aumentam urgência: ex.
   "Falar agora com um especialista" (para tráfego de urgência) vs. "Quero
   entender como funciona" (para tráfego de planejamento). Como o CTA se
   repete várias vezes na página (hero + formulário final), testar se um CTA
   diferente no hero vs. no formulário (jornada, não repetição idêntica) performa
   melhor do que repetir o mesmo texto.

3. **Campos do formulário — tentar remover fricção, não adicionar.** O
   formulário atual já é enxuto (nome, telefone, careFor, urgency). Antes de
   adicionar qualquer campo (ex: "situação específica", "cidade"), testar se
   *remover* um campo não essencial (ex: tornar `careFor` uma pergunta
   pós-envio, feita por telefone, em vez de no formulário) aumenta a taxa de
   conversão do formulário sem prejudicar a qualidade do lead — cada campo a
   mais é fricção em um público 30+ mobile, muitas vezes digitando com pressa
   ou emoção. Se o negócio precisar de mais qualificação, prefira fazer isso
   na ligação humana, não no formulário.

4. **Posição do formulário: só no final vs. duplicado (sticky/CTA secundário).**
   A decisão atual é "um único formulário, no final, como clímax" — está bem
   fundamentada pela auditoria (evitar múltiplos formulários concorrentes).
   Mas vale testar um CTA sticky mobile (barra fixa no rodapé com botão
   "Quero avaliação gratuita" que rola até o mesmo formulário único) sem
   introduzir um segundo formulário — isso ataca abandono por scroll fatigue
   em mobile sem violar a regra de "um formulário só".

5. **Prova social: depoimentos nomeados vs. números/selo de credibilidade em
   destaque.** Testar se depoimentos (quando existirem reais, ver pendência do
   README) convertem mais que ênfase em números frios (anos de atuação,
   atendimentos realizados) — o público de dor emocional pode responder mais a
   história do que estatística, mas isso deve ser validado, não assumido.

6. **Ordem de seções "validação da dor" vs. "como funciona".** A estrutura
   atual prioriza emoção antes de processo. Testar inverter para público que
   chega via keywords mais racionais/comerciais (ex: "empresa de cuidador de
   idosos preço") vs. manter a ordem emocional para keywords de sintoma/crise
   (ex: "mãe caiu não consegue andar cuidador"). Isso é mais um teste de
   variação por segmento de campanha do que um A/B clássico de página única.

Nota de método: com tráfego pago caro, rodar cada teste até significância
estatística mínima (calcular tamanho de amostra antes, não julgar no olho após
poucos dias) e nunca testar dois elementos de alto impacto ao mesmo tempo.

---

## 3. Métricas de sucesso (acompanhamento semanal do franqueado)

Taxa de conversão de visita→lead sozinha é enganosa neste negócio porque a
venda acontece por telefone, não no site. O franqueado precisa de um funil
completo:

1. **Taxa de conversão da LP (visita → lead).** Métrica de baseline, mas não
   suficiente sozinha.

2. **Custo por lead (CPL) por campanha/anúncio/UTM.** Só é possível com o
   pipeline de UTM→GHL funcionando de ponta a ponta (ver seção 1, item 4).
   Sem isso o franqueado está comprando cliques às cegas.

3. **Taxa de contato efetivo (leads que a equipe conseguiu falar em até 1h /
   em até 24h).** Esta é a métrica operacional mais importante e a mais fácil
   de negligenciar — mede a própria equipe, não a LP. Um lead bom que não é
   atendido rápido é um lead perdido para o concorrente.

4. **Taxa de qualificação (leads que, após a ligação, são um caso real e
   dentro do serviço oferecido) vs. leads não-qualificados (curiosos, fora da
   área de atendimento, orçamento incompatível).** Sem isso, uma campanha
   pode parecer ótima em CPL e estar trazendo volume de gente que nunca
   fecharia — o corretivo é ajustar segmentação/palavras-chave da campanha,
   não a LP.

5. **Taxa de conversão lead → contrato fechado, segmentada por
   `urgency`/`careFor`/campanha.** É a métrica que realmente fecha o loop de
   ROI: custo de aquisição por cliente pagante (CAC), não por lead. Sem
   integrar isso ao GHL (fechamento marcado como "Won" na oportunidade), o
   franqueado nunca vai saber qual campanha realmente traz clientes, só qual
   traz cliques.

6. **Tempo médio de primeira resposta (da submissão do formulário até o
   primeiro contato humano registrado).** Correlacionar semanalmente essa
   métrica com a taxa de fechamento é o jeito mais direto de provar (ou
   desmentir) a hipótese "velocidade de resposta = vendas" e justificar
   investimento em plantão fora do horário comercial se necessário.

7. **Ticket médio e tempo de permanência do cliente (LTV) por origem de
   campanha**, se o CRM permitir — decisão de ticket alto pode variar muito
   entre um plantão de poucas semanas pós-cirúrgico e um contrato de cuidado
   contínuo de longo prazo; campanhas podem estar otimizadas sem querer para
   o tipo de cliente errado.

Recomendação prática: montar um dashboard simples (mesmo que seja uma planilha
alimentada manualmente no início) com essas métricas por semana e por
campanha — sem isso, otimizar o Google Ads vira decisão no achismo.

---

## 4. Reaproveitamento como padrão de agência (processo, não código)

O objetivo declarado no README é usar este projeto como modelo replicável
para outros clientes de nicho parecido (serviço local, ticket alto, decisão
emocional). Do ponto de vista de processo de agência, o que precisa existir:

1. **Um "playbook de diagnóstico pré-LP" padronizado**, aplicado antes de
   qualquer linha de design: (a) auditoria de 2-3 concorrentes/referências do
   nicho (como foi feito em `docs/reference-audit.md`) identificando o que
   seguir e o que evitar; (b) mapeamento das objeções específicas do nicho que
   a estrutura da página precisa neutralizar seção por seção (como
   `docs/site-structure.md` fez para "medo de contratar errado", "e se o
   cuidador faltar" etc.); (c) definição de campos mínimos de formulário e de
   como cada campo alimenta a segmentação no CRM. Esse playbook é o ativo de
   agência mais valioso aqui — não o código da LP em si.

2. **Kit de identidade de marca desacoplado do código** — o mecanismo já usado
   aqui (`home-angels-brand` skill, tokens de design em CSS, `assets/logo`)
   deve virar um template genérico ("skill de marca") que, para o próximo
   cliente, só troca cores/tipografia/logo/tom de voz sem tocar em lógica de
   página. Isso já parece estruturalmente correto neste projeto (ver G7/G8 em
   `GATES.md`) — o próximo passo de processo é documentar isso como um
   checklist de onboarding de marca (que perguntas fazer ao cliente, que
   arquivos pedir: manual de marca, paleta, logo vetorial) para não repetir a
   pendência atual de "logo vetorial ainda não entregue pelo cliente".

3. **Adaptador de CRM como parte do padrão, não exceção.** A decisão já tomada
   aqui (`docs/crm-integration.md`: formulário → API própria → adapter de CRM
   trocável) deveria ser o template obrigatório para qualquer novo cliente,
   já que negócios locais de ticket alto raramente usam o mesmo CRM entre si.
   Isso vira parte do "kit de venda" da agência: "não importa qual CRM você já
   usa, plugamos nele" é um argumento comercial forte para fechar clientes
   novos rapidamente.

4. **Gate de qualidade replicável (`GATES.md`) generalizado em um checklist
   de aceite por vertical.** O padrão de gates usado aqui (build, lint,
   formulário único, sem menu de saída, cores de marca, Lighthouse) pode virar
   um checklist-base reaproveitado, com 2-3 gates específicos do nicho
   adicionados por projeto (ex: para este nicho, "nenhuma promessa de
   resultado de saúde" — ver seção 5). Isso permite vender ao próximo cliente
   um prazo e uma "garantia de qualidade" objetiva e comprovável, não uma
   promessa vaga de "landing page profissional".

5. **Priorizar nichos com o mesmo formato de negócio (serviço local, decisão
   emocional/urgente, venda fechada por telefone/WhatsApp após o lead).**
   Exemplos de próximos clientes onde o mesmo padrão se aplica quase 1:1:
   clínicas de reabilitação/fisioterapia domiciliar, funerárias/planos
   funerários, escolas terapêuticas/clínicas de reforço para necessidades
   especiais, assistência técnica de urgência (desentupidora, chaveiro 24h),
   advocacia de família/inventário. O critério comum reaproveitável é:
   tráfego pago caro + decisão emocional ou urgente + fechamento humano
   pós-lead — não replicar cegamente para nichos de e-commerce/autoatendimento
   onde a lógica de funil é outra.

---

## 5. Riscos de compliance/ético específicos do nicho

Cuidado de idosos envolve dados de saúde (categoria sensível sob a LGPD, Lei
13.709/2018, art. 5º II) e um público em momento de vulnerabilidade emocional.
Riscos concretos e o que fazer:

1. **Dados de saúde no formulário/CRM são dado sensível sob a LGPD.** Mesmo
   que a LP hoje só capture `careFor` (idoso/outro) e não diagnóstico
   específico, qualquer campo futuro que peça condição de saúde (ex:
   "Alzheimer", "pós-AVC", "acamado") passa a ser dado sensível e exige base
   legal reforçada, informação clara ao titular sobre a finalidade, e cuidado
   redobrado de segurança no GHL (quem tem acesso à oportunidade, retenção de
   dados). Recomendação: manter o formulário público o mais genérico possível
   (como já é) e só coletar detalhes de saúde na ligação humana, não em texto
   armazenado sem controle de acesso claro. Adicionar um link de política de
   privacidade no footer e um checkbox de consentimento no formulário (hoje
   aparentemente ausente pela descrição da estrutura) antes do lançamento —
   isso deveria virar um gate adicional em `GATES.md`.

2. **Nunca prometer resultado de saúde ou cura/melhora clínica na copy.**
   Frases como "seu familiar vai se recuperar mais rápido" ou qualquer
   promessa de desfecho de saúde criam exposição jurídica (propaganda enganosa,
   possivelmente até questão regulatória de publicidade em saúde) e expectativa
   que o serviço de cuidador (não é serviço médico) não pode garantir. A copy
   deve prometer processo e cuidado ("cuidador qualificado", "supervisão
   técnica", "resposta rápida"), nunca resultado clínico.

3. **Não simular ou insinuar vínculo com convênio médico, plano de saúde ou
   serviço médico regulado**, se a franquia não for credenciada — isso pode
   configurar concorrência desleal ou infração regulatória (o serviço de
   cuidador de idosos não é serviço de enfermagem regulado pelo COREN a menos
   que a equipe realmente inclua profissionais registrados; se a copy menciona
   "enfermeiro", confirmar que isso é literalmente verdade na equipe, não um
   eufemismo de marketing para cuidador leigo).

4. **Cuidado com gatilhos de urgência/medo manipulativos.** A estratégia de
   abrir pela dor validada (já adotada, corretamente, na estrutura da LP) é
   legítima e eficaz, mas há uma linha entre "validar a dor real" e "explorar
   pânico" (ex: linguagem que sugira que não agir agora vai piorar a saúde ou
   colocar o idoso em risco iminente). Recomendação: revisar a copy final com
   a lente de "isso ajudaria uma família em crise real a se sentir acolhida, ou
   isso pressiona alguém emocionalmente fragilizado a agir por medo?" — a
   segunda opção é risco reputacional (reviews negativos, reclamações) mesmo
   quando não é ilegal.

5. **Testemunhos/depoimentos exigem autorização explícita e verificável**,
   especialmente por envolverem terceiros vulneráveis (o idoso, que muitas
   vezes não é quem decide nem quem autoriza). O README já lista isso como
   pendência ("depoimentos reais... com autorização de uso") — reforçar que a
   autorização deve ser por escrito, guardada pelo franqueado, e idealmente do
   familiar responsável, não do idoso quando ele não tem capacidade de
   consentir claramente. Sugerir usar apenas iniciais/primeiro nome + foto com
   consentimento explícito de uso de imagem, nunca sobrenome completo + foto
   sem essa autorização documentada.

6. **Cláusula de retenção e descarte de dados do lead não convertido.**
   Definir no GHL por quanto tempo um lead que nunca fechou fica com seus
   dados (incluindo indícios de condição de saúde de terceiro) armazenados —
   política de retenção indefinida de dado sensível de quem nunca virou
   cliente é risco desnecessário sob a LGPD. Sugestão prática: revisão/expurgo
   periódico (ex: anual) de leads frios sem interação.

7. **Transparência sobre quem responde ao WhatsApp/telefone.** Se o primeiro
   contato automático (SMS/WhatsApp) usa qualquer automação, deixar claro que
   é uma confirmação automática ("recebemos seu pedido") e não fingir ser uma
   pessoa — para um público em momento de fragilidade emocional, uma resposta
   automatizada que finge ser humana e depois "some" gera frustração e dano de
   reputação desproporcional ao das indústrias comuns.
