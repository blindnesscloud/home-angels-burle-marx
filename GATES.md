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

- [ ] G9: Lighthouse mobile: performance >= 85, acessibilidade >= 90
  EVIDENCE: pending — nao executado nesta sessao (sem Chrome DevTools/Lighthouse CLI disponivel no ambiente). Rodar antes do deploy final.

- [x] G10: revisao final de copy sem travessao, dois-pontos estilistico ou frase cliche de agencia ("solucoes sob medida", "excelencia no atendimento")
  EVIDENCE: grep por travessao (—) no codigo de UI: 0 ocorrencias. Unico dois-pontos estilistico encontrado (Included.tsx) corrigido. Nenhuma frase cliche de agencia no copy.
