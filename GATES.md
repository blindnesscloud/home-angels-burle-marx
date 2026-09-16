# Gates: LP Home Angels Burle Marx

OWNS: web/**, docs/**, .claude/**, assets/**

Scope: landing page de conversão de página única, formulário integrado ao Go
High Level via webhook, fiel a identidade visual do manual da marca, testada
ponta a ponta.

- [x] G1: build de producao compila sem erro
  CHECK: node -e "process.exit(require('child_process').spawnSync('npm',['run','build'],{cwd:'web',shell:true,stdio:'inherit'}).status)"
  EXPECT: (exit 0)
  EVIDENCE: npm run build (Next.js 16.3.5) — Compiled successfully, 4 rotas geradas.

- [x] G2: lint sem violacoes
  CHECK: node -e "process.exit(require('child_process').spawnSync('npm',['run','lint'],{cwd:'web',shell:true,stdio:'inherit'}).status)"
  EXPECT: (exit 0)
  EVIDENCE: npm run lint — sem erros ou warnings.

- [x] G3: pagina possui exatamente um formulario de captura de lead
  CHECK: node -e "const fs=require('fs');const files=fs.readdirSync('web/src/components').filter(f=>/\.tsx$/.test(f));const out=files.filter(f=>/form/i.test(f));console.log(out.length)"
  EXPECT: 1
  EVIDENCE: apenas web/src/components/LeadForm.tsx; usado uma unica vez em FinalCta.tsx.

- [x] G4: rota / responde 200 no servidor de producao local
  EVIDENCE: `npm run start -p 4173` + curl localhost:4173/ -> 200; /obrigado -> 200.

- [x] G5: rota /api/lead valida payload invalido com erro 4xx e nao lanca excecao nao tratada
  EVIDENCE: curl -X POST /api/lead com body {} -> 400 {"error":"Informe um nome válido."}, servidor seguiu respondendo normalmente depois.

- [x] G6: nenhum menu de navegacao com links de saida do funil no header
  CHECK: node -e "const {execSync}=require('child_process'); const out=execSync('git grep -n \"<nav\" -- web/src || true').toString(); console.log(out.trim().length===0 ? 'CLEAN' : out)"
  EXPECT: CLEAN
  EVIDENCE: Header.tsx contem apenas logo + link de WhatsApp, nenhum <nav> ou menu no codebase.

- [x] G7: cores institucionais (azul #226185, verde #5C925C, areia #D1AE86) presentes nos tokens de tema
  EVIDENCE: web/src/app/globals.css define --color-primary:#226185, --color-secondary:#5c925c, --color-accent:#d1ae86.

- [x] G8: logo oficial (imagem, nao reconstruida em texto) usada no header e footer
  EVIDENCE: Header.tsx e Footer.tsx usam next/image apontando para web/public/logo/*.png (extraidos do manual oficial). Vetorial definitivo ainda pendente do SAF — ver README.md "Pendencias do cliente".

- [x] G10: revisao final de copy sem travessao, dois-pontos estilistico ou frase cliche de agencia ("solucoes sob medida", "excelencia no atendimento")
  EVIDENCE: grep por travessao (—) no codigo de UI: 0 ocorrencias apos correcao de ProblemSection.tsx e Included.tsx. Nenhuma frase cliche de agencia no copy.

- [x] G11: interacoes de motion (scroll reveal, cta magnetico, tilt card) nao quebram layout e permanecem utilizaveis sem JS ou com prefers-reduced-motion
  CHECK: node -e "const fs=require('fs'); const out=fs.readFileSync('web/src/app/layout.tsx','utf8'); console.log(out.includes('js-reveal') ? 'CLEAN' : 'MISSING')"
  EXPECT: CLEAN
  EVIDENCE: layout.tsx contem noscript sobrescrevendo .js-reveal para opacity:1. Testado com Playwright (browser.new_context(reduced_motion='reduce')): bug real encontrado (5 itens do hero presos em opacity:0 por propagacao de variants=undefined entre HeroReveal/HeroRevealItem) e corrigido usando variantes estaticas em vez de undefined (web/src/components/motion/hero-reveal.tsx). Reteste apos fix: 0 de 26 elementos .js-reveal presos em opacity 0, com e sem reduced motion.

- [x] G12: nenhum conteudo fabricado (depoimento ou dado de contato falso) fica visivel em producao sem trava
  EVIDENCE: simulacao de usuario real (docs/reviews/simulador-usuario.md) apontou depoimentos placeholder e telefone de teste como quebra de confianca critica. Depoimentos: SocialProof.tsx so renderiza a lista se siteConfig.testimonials tiver conteudo real (vazio por padrao, nunca mostra placeholder). Telefone/webhook/label de conversao: `npm run check:launch-ready` (web/scripts/check-launch-ready.mjs) falha com exit 1 e lista as pendencias enquanto os placeholders nao forem substituidos — rodar antes de cada deploy.

- [x] G13: Lighthouse mobile: performance >= 85, acessibilidade >= 90
  EVIDENCE: rodado com sucesso usando o Chromium ja baixado pelo Playwright como executavel do Lighthouse (`npx lighthouse` + `chrome-launcher`, instalados com --no-save), contra servidor de producao real (`npm run build && npm run start`), mobile 390x844, throttling simulado. Primeira rodada: performance 96, acessibilidade 88 (abaixo da meta), best-practices 92, seo 100 -- a causa da acessibilidade baixa foi uma auditoria "list/listitem" real (ver G18). Apos corrigir, segunda rodada: performance 92, acessibilidade 96, best-practices 100, seo 100. Todas as metas atingidas.

- [x] G18: elementos de lista semantica (<ul>/<li>) nao tem elemento nao-list-item entre pai e filho
  CHECK: node -e "const fs=require('fs'); const out=fs.readFileSync('web/src/components/Included.tsx','utf8'); console.log(out.includes('as=\"li\"') ? 'CLEAN' : 'MISSING')"
  EXPECT: CLEAN
  EVIDENCE: Lighthouse (G13) encontrou list/listitem quebrados -- Included.tsx tinha `<SectionReveal><li>...</li></SectionReveal>` dentro de `<ul>`, e o SectionReveal renderiza um `<div>` por padrao, quebrando a relacao pai-filho semantica exigida (ul > li direto). Corrigido adicionando prop `as` ao SectionReveal (web/src/components/motion/section-reveal.tsx), permitindo renderizar como `motion.li` quando usado dentro de listas. Reexecucao do Lighthouse confirmou a correcao (acessibilidade 88 -> 96).

- [x] G15: contraste de texto >= WCAG AA (4.5:1 texto normal, 3:1 texto grande/negrito) em todos os pares cor-de-texto/fundo usados na LP
  EVIDENCE: calculo manual de contraste (formula WCAG, luminancia relativa) sobre os pares reais usados no codigo, ja que Lighthouse nao esta disponivel neste ambiente (ver G13). Dois problemas reais encontrados e corrigidos: (1) badge do hero usava texto areia (#D1AE86) sobre fundo composito azul -- 2.57:1, corrigido trocando para texto branco (5.33:1) e movendo a cor areia para um indicador decorativo; (2) botao de WhatsApp do header usava texto branco 14px bold sobre verde secundario -- 3.67:1, abaixo do minimo para texto que nao se qualifica como "grande" -- corrigido trocando o fundo para --color-primary-dark (9.99:1). Demais pares (corpo de texto, CTA verde principal em 18px bold, cards) ja passavam AA. Reexecutar com Lighthouse real antes do deploy para confirmar (G13).

- [x] G14: formulario exige consentimento explicito e existe politica de privacidade acessivel (dado de saude e categoria sensivel LGPD)
  CHECK: node -e "const fs=require('fs'); const form=fs.readFileSync('web/src/components/LeadForm.tsx','utf8'); const api=fs.readFileSync('web/src/app/api/lead/route.ts','utf8'); const priv=fs.existsSync('web/src/app/privacidade/page.tsx'); console.log(form.includes('name=\"consent\"') && api.includes('body.consent') && priv ? 'CLEAN' : 'MISSING')"
  EXPECT: CLEAN
  EVIDENCE: recomendacao do relatorio docs/reviews/estrategista.md (secao 5, item 1). LeadForm.tsx tem checkbox obrigatorio de consentimento linkando /privacidade; route.ts rejeita com 400 se consent != true; pagina /privacidade criada e linkada no footer. TODO(cliente/juridico): revisar o texto de /privacidade com advogado antes de publicar.

- [x] G16: formulario da feedback visual proprio (nao so bolha nativa do navegador) para telefone invalido e consentimento nao marcado
  EVIDENCE: recomendacoes 1/2/4 de docs/reviews/testador-e-juiz.md (juiz de conversao). LeadForm.tsx valida telefone com normalizePhone (web/src/lib/phone.ts, mesma logica compartilhada com a API) no blur e no submit, mostrando erro inline vermelho; checkbox de consentimento agora usa text-[var(--color-ink)] (era --color-muted, contraste mais fraco) e mostra erro proprio com outline vermelho se o submit for tentado sem marcar. Testado com Playwright: erro de telefone aparece/some corretamente, erro de consentimento aparece ao tentar enviar sem marcar.

- [x] G17: prova social tem espaco estrutural para numeros concretos reais, sem fabricar dado nao verificado
  EVIDENCE: recomendacao 3 de docs/reviews/testador-e-juiz.md (juiz apontou prova social como ponto mais fraco: 6/10). siteConfig.stats (web/src/lib/site-config.ts) segue o mesmo padrao de siteConfig.testimonials -- vazio por padrao, SocialProof.tsx so renderiza o bloco de numeros se houver conteudo real cadastrado. Nenhum numero de anos de atuacao ou atendimentos foi inventado.
