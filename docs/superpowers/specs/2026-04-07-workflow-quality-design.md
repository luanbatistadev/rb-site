# Workflow de Qualidade e Verificacao - Design Spec

**Data:** 2026-04-07
**Problema:** Claude implementa diferente do pedido (A) e resultado visual diverge do Figma (C)
**Solucao:** Tres pilares - processo no CLAUDE.md, Figma local, testes Playwright

---

## Pilar 1: CLAUDE.md - Regras de Processo

Adicionar secao "Workflow Obrigatorio" ao CLAUDE.md com checklist que o Claude DEVE seguir.

### Antes de implementar qualquer feature:
- Ler a spec em `docs/superpowers/specs/` se existir
- Consultar o design Figma local em `docs/figma/` se existir
- Confirmar com o usuario o que vai ser feito antes de comecar (resumo do entendimento em 2-3 bullet points)

### Durante a implementacao:
- Seguir os valores exatos do Figma (cores, espacamentos, tamanhos, tipografia)
- Nao tomar decisoes criativas de layout/visual sem perguntar - o Figma e a fonte de verdade
- Se algo no Figma nao fizer sentido tecnico, perguntar antes de adaptar

### Depois de implementar:
- Rodar `next build` - deve passar sem erros
- Rodar testes Playwright (`npx playwright test`)
- Se existir referencia Figma local, tirar screenshot e comparar

### Regra de ouro:
- Na duvida, perguntar. Nunca assumir.

---

## Pilar 2: Figma Local como Referencia

### Fluxo de captura (1x por feature):

1. **Usuario pede** pra puxar o design de uma secao
2. **1 chamada MCP** (`get_design_context`) com o nodeId da secao
3. **MCP retorna:** screenshot + codigo de referencia + tokens (cores, tipografia)
4. **Salvar localmente:**
   - Screenshot em `docs/figma/screenshots/{secao}.png`
   - Specs em `docs/figma/specs/{secao}.md`
5. **Usuario complementa** com espacamentos do Figma (padding, margin, gap, border-radius, shadows) - ~2-3 minutos por secao

### Estrutura de arquivos:

```
docs/figma/
├── screenshots/         # Screenshots do Figma (referencia visual)
│   ├── hero.png
│   ├── services.png
│   └── header.png
├── specs/               # Tokens + espacamentos por secao
│   ├── hero.md
│   ├── services.md
│   └── header.md
└── comparison/          # Gerado pelo Playwright: figma vs implementacao
    ├── hero-comparison.png
    └── services-comparison.png
```

### Regras de uso:
- Valores do spec sao lei - nao inventar cores ou espacamentos
- Se precisar de mais detalhe de um sub-elemento, gastar mais uma chamada MCP (raro)
- Quando o design mudar no Figma, usuario pede pra puxar de novo
- Arquivos ficam no git, acessiveis em qualquer conversa futura

### O que o MCP retorna vs o que o usuario complementa:

| Fonte | Dados |
|-------|-------|
| MCP (automatico) | Cores, tipografia, screenshot, codigo de referencia |
| Usuario (manual, ~2-3min) | Espacamentos (padding, margin, gap), border-radius, shadows com valores exatos |

---

## Pilar 3: Playwright como Rede de Seguranca

### Camada 1: Smoke Tests
Testes basicos que garantem que nada quebrou:
- Pagina `/pt-BR` carrega com status 200
- Pagina `/en` carrega com status 200
- Header, footer e todas as secoes estao presentes no DOM
- Links de navegacao levam a secao correta (verificar que o elemento alvo esta visivel apos click)
- Troca de idioma funciona (pt-BR <-> en)
- Formulario de contato: campos existem, validacao funciona
- Imagens carregam sem erro

### Camada 2: Visual Snapshots (regressao)
Detecta automaticamente mudancas visuais entre commits:
- Screenshot de cada secao (hero, services, projects, metrics, cta, footer)
- Compara com snapshot anterior salvo no git
- Se mudou, teste FALHA - usuario decide se mudanca foi intencional
- Roda em desktop (1280px) e mobile (375px)

### Camada 3: Comparacao com Figma
Quando existir screenshot do Figma em `docs/figma/screenshots/`:
- Tira screenshot da secao implementada
- Salva ambas imagens em `docs/figma/comparison/` (ex: `hero-figma.png` e `hero-atual.png`)
- NAO falha automaticamente - gera imagens pra usuario abrir e validar visualmente

### Setup tecnico:

**Dependencia:**
```bash
npm install -D @playwright/test
npx playwright install chromium
```

**Config:** `playwright.config.ts` na raiz do projeto

**Estrutura de testes:**
```
tests/
├── smoke.spec.ts          # Camada 1: smoke tests
├── visual.spec.ts         # Camada 2: visual snapshots
├── figma-compare.spec.ts  # Camada 3: comparacao com Figma
└── screenshots/           # Snapshots de referencia (git tracked)
```

**Scripts no package.json:**
```json
{
  "test": "playwright test",
  "test:smoke": "playwright test tests/smoke.spec.ts",
  "test:visual": "playwright test tests/visual.spec.ts",
  "test:update": "playwright test --update-snapshots"
}
```

### Quando rodar:
- Depois de cada feature (parte do checklist do Pilar 1)
- `next build` + `npx playwright test` como validacao final
- `test:update` quando mudanca visual for intencional

---

## Alteracoes no CLAUDE.md

Adicionar ao final do CLAUDE.md:

```markdown
## Workflow Obrigatorio

### Antes de implementar
- Ler a spec em `docs/superpowers/specs/` se existir
- Consultar design Figma local em `docs/figma/` se existir
- Confirmar com o usuario o que vai ser feito (resumo em 2-3 bullets)

### Durante
- Figma e fonte de verdade para visual (cores, espacamentos, tipografia, layout)
- Nao tomar decisoes criativas sem perguntar
- Se algo no Figma nao fizer sentido tecnico, perguntar antes de adaptar

### Depois
- `next build` deve passar
- `npx playwright test` deve passar
- Se existir referencia Figma, comparar screenshot

### Regra de ouro
- Na duvida, perguntar. Nunca assumir.

## Figma Local

- Designs ficam em `docs/figma/` (screenshots + specs)
- 1 chamada MCP por secao, salvar resultado localmente
- Usuario complementa espacamentos manualmente
- Arquivos versionados no git
```

---

## Ordem de implementacao

1. Atualizar CLAUDE.md com as novas regras
2. Criar estrutura `docs/figma/`
3. Instalar Playwright e criar config
4. Escrever smoke tests (Camada 1)
5. Escrever visual snapshot tests (Camada 2)
6. Escrever figma comparison tests (Camada 3)
7. Adicionar scripts ao package.json
8. Rodar tudo e validar
