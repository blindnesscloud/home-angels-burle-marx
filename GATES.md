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

- [ ] G13: Lighthouse mobile: performance >= 85, acessibilidade >= 90
  EVIDENCE: pending — nao executado nesta sessao (sem Chrome DevTools/Lighthouse CLI disponivel no ambiente). Rodar antes do deploy final.

- [x] G14: formulario exige consentimento explicito e existe politica de privacidade acessivel (dado de saude e categoria sensivel LGPD)
  CHECK: node -e "const fs=require('fs'); const form=fs.readFileSync('web/src/components/LeadForm.tsx','utf8'); const api=fs.readFileSync('web/src/app/api/lead/route.ts','utf8'); const priv=fs.existsSync('web/src/app/privacidade/page.tsx'); console.log(form.includes('name=\"consent\"') && api.includes('body.consent') && priv ? 'CLEAN' : 'MISSING')"
  EXPECT: CLEAN
  EVIDENCE: recomendacao do relatorio docs/reviews/estrategista.md (secao 5, item 1). LeadForm.tsx tem checkbox obrigatorio de consentimento linkando /privacidade; route.ts rejeita com 400 se consent != true; pagina /privacidade criada e linkada no footer. TODO(cliente/juridico): revisar o texto de /privacidade com advogado antes de publicar.
