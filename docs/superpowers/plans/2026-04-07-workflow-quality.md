# Workflow de Qualidade e Verificacao - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar processo de qualidade ao projeto com CLAUDE.md atualizado, estrutura Figma local, e testes Playwright (smoke + visual snapshots + comparacao Figma).

**Architecture:** O CLAUDE.md ganha regras de workflow obrigatorio. Designs do Figma sao salvos localmente em `docs/figma/`. Playwright roda 3 camadas de teste: smoke (funcionalidade), visual snapshots (regressao), e comparacao com Figma (fidelidade).

**Tech Stack:** Playwright Test, Next.js 16, TypeScript

---

## File Structure

```
Files to create:
- playwright.config.ts                    (Playwright config)
- tests/smoke.spec.ts                     (Camada 1: smoke tests)
- tests/visual.spec.ts                    (Camada 2: visual snapshots)
- tests/figma-compare.spec.ts             (Camada 3: comparacao Figma)
- docs/figma/screenshots/.gitkeep         (Placeholder pra screenshots Figma)
- docs/figma/specs/.gitkeep               (Placeholder pra specs Figma)
- docs/figma/comparison/.gitkeep          (Placeholder pra comparacoes)

Files to modify:
- CLAUDE.md                               (Adicionar workflow obrigatorio + Figma local)
- package.json                            (Adicionar scripts de teste)
- .gitignore                              (Adicionar test-results/)
```

---

### Task 1: Adicionar data-testid nos componentes

Os componentes nao tem seletores estaveis pra testes. Precisamos adicionar `data-testid` em cada secao pra o Playwright conseguir localizar.

**Files:**
- Modify: `src/components/sections/hero.tsx:46`
- Modify: `src/components/sections/tech-bar.tsx:138`
- Modify: `src/components/sections/services.tsx:62`
- Modify: `src/components/sections/projects.tsx:226`
- Modify: `src/components/sections/metrics.tsx:21`
- Modify: `src/components/sections/cta.tsx:34`
- Modify: `src/components/sections/contact-form.tsx:31`
- Modify: `src/components/layout/header.tsx:57`
- Modify: `src/components/layout/footer.tsx:42`

- [ ] **Step 1: Adicionar data-testid no hero**

Em `src/components/sections/hero.tsx`, na tag `<section` (linha 46), adicionar `data-testid="hero"`:

```tsx
<section
  data-testid="hero"
  ref={sectionRef}
```

- [ ] **Step 2: Adicionar data-testid no tech-bar**

Em `src/components/sections/tech-bar.tsx`, na tag `<section` (linha 138), adicionar `data-testid="tech-bar"`:

```tsx
<section data-testid="tech-bar" className="bg-white py-8 overflow-hidden relative">
```

- [ ] **Step 3: Adicionar data-testid no services**

Em `src/components/sections/services.tsx`, na tag `<section` (linha 62), adicionar `data-testid="services"`:

```tsx
<section data-testid="services" id="servicos" className="bg-white">
```

- [ ] **Step 4: Adicionar data-testid no projects**

Em `src/components/sections/projects.tsx`, na tag `<section` (linha 226), adicionar `data-testid="projects"`:

```tsx
<section data-testid="projects" id="projetos" className="bg-foreground/2 py-24 px-6">
```

- [ ] **Step 5: Adicionar data-testid no metrics**

Em `src/components/sections/metrics.tsx`, na tag `<section` (linha 21), adicionar `data-testid="metrics"`:

```tsx
<section data-testid="metrics" className="bg-background py-24 px-6">
```

- [ ] **Step 6: Adicionar data-testid no cta**

Em `src/components/sections/cta.tsx`, na tag `<section` (linha 34), adicionar `data-testid="cta"`:

```tsx
<section data-testid="cta" className="bg-background px-6 py-16 lg:px-30">
```

- [ ] **Step 7: Adicionar data-testid no header**

Em `src/components/layout/header.tsx`, na tag `<motion.header` (linha 57), adicionar `data-testid="header"`:

```tsx
<motion.header
  data-testid="header"
  initial={{ opacity: 0, y: -30 }}
```

- [ ] **Step 8: Adicionar data-testid no footer**

Em `src/components/layout/footer.tsx`, na tag `<footer` (linha 42), adicionar `data-testid="footer"`:

```tsx
<footer data-testid="footer" className="bg-background px-2 pb-2">
```

- [ ] **Step 9: Adicionar data-testid no contact-form**

Em `src/components/sections/contact-form.tsx`, na tag `<motion.div` (linha 31), adicionar `data-testid="contact-form"`:

```tsx
<motion.div
  data-testid="contact-form"
  variants={staggerContainer}
```

- [ ] **Step 10: Verificar build**

Run: `npx next build`
Expected: Build passa sem erros

- [ ] **Step 11: Commit**

```bash
git add src/components/sections/hero.tsx src/components/sections/tech-bar.tsx src/components/sections/services.tsx src/components/sections/projects.tsx src/components/sections/metrics.tsx src/components/sections/cta.tsx src/components/sections/contact-form.tsx src/components/layout/header.tsx src/components/layout/footer.tsx
git commit -m "feat: add data-testid attributes to all sections and layout components"
```

---

### Task 2: Instalar Playwright e criar config

**Files:**
- Modify: `package.json`
- Create: `playwright.config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Instalar Playwright**

Run: `npm install -D @playwright/test`
Expected: Pacote adicionado ao devDependencies

- [ ] **Step 2: Instalar browser Chromium**

Run: `npx playwright install chromium`
Expected: Chromium baixado com sucesso

- [ ] **Step 3: Criar playwright.config.ts**

Criar `playwright.config.ts` na raiz:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1280, height: 720 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 4: Adicionar scripts ao package.json**

Adicionar em `scripts`:

```json
{
  "test": "playwright test",
  "test:smoke": "playwright test tests/smoke.spec.ts",
  "test:visual": "playwright test tests/visual.spec.ts",
  "test:update": "playwright test --update-snapshots"
}
```

- [ ] **Step 5: Adicionar test-results/ ao .gitignore**

Adicionar ao `.gitignore`:

```
test-results/
playwright-report/
```

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts package.json package-lock.json .gitignore
git commit -m "feat: add Playwright test infrastructure"
```

---

### Task 3: Smoke Tests (Camada 1)

**Files:**
- Create: `tests/smoke.spec.ts`

- [ ] **Step 1: Criar smoke tests**

Criar `tests/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

const locales = ["pt-BR", "en"] as const;

for (const locale of locales) {
  test.describe(`${locale} - Home`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${locale}`);
    });

    test("page loads with status 200", async ({ page }) => {
      const response = await page.goto(`/${locale}`);
      expect(response?.status()).toBe(200);
    });

    test("all sections are present", async ({ page }) => {
      await expect(page.getByTestId("header")).toBeVisible();
      await expect(page.getByTestId("hero")).toBeVisible();
      await expect(page.getByTestId("tech-bar")).toBeVisible();
      await expect(page.getByTestId("services")).toBeVisible();
      await expect(page.getByTestId("projects")).toBeVisible();
      await expect(page.getByTestId("metrics")).toBeVisible();
      await expect(page.getByTestId("cta")).toBeVisible();
      await expect(page.getByTestId("footer")).toBeVisible();
    });

    test("navigation links scroll to correct section", async ({ page }) => {
      await page.click(`a[href="#servicos"]`);
      await expect(page.getByTestId("services")).toBeInViewport();
    });

    test("CTA link navigates to contact page", async ({ page }) => {
      await page.click(`a[href="/${locale}/contato"]`);
      await page.waitForURL(`**/${locale}/contato`);
      await expect(page.getByTestId("contact-form")).toBeVisible();
    });

    test("images load without errors", async ({ page }) => {
      const images = page.locator("img");
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        await expect(img).toHaveJSProperty("complete", true);
        await expect(img).not.toHaveJSProperty("naturalWidth", 0);
      }
    });
  });

  test.describe(`${locale} - Contact`, () => {
    test("page loads with status 200", async ({ page }) => {
      const response = await page.goto(`/${locale}/contato`);
      expect(response?.status()).toBe(200);
    });

    test("form fields exist", async ({ page }) => {
      await page.goto(`/${locale}/contato`);
      await expect(page.locator("#name")).toBeVisible();
      await expect(page.locator("#email")).toBeVisible();
      await expect(page.locator("#phone")).toBeVisible();
      await expect(page.locator("#message")).toBeVisible();
    });

    test("form validation works", async ({ page }) => {
      await page.goto(`/${locale}/contato`);
      const submitButton = page.locator("button[type='submit']");
      await submitButton.click();
      const nameInput = page.locator("#name");
      await expect(nameInput).toHaveAttribute("required", "");
    });

    test("form submits successfully", async ({ page }) => {
      await page.goto(`/${locale}/contato`);
      await page.fill("#name", "Teste");
      await page.fill("#email", "teste@teste.com");
      await page.fill("#phone", "11999999999");
      await page.fill("#message", "Mensagem de teste");
      await page.click("button[type='submit']");
      const successText = locale === "pt-BR"
        ? "Mensagem enviada com sucesso!"
        : "Message sent successfully!";
      await expect(page.getByText(successText)).toBeVisible();
    });
  });
}

test.describe("i18n", () => {
  test("switching locale changes content", async ({ page }) => {
    await page.goto("/pt-BR");
    await expect(page.getByText("DESENVOLVIMENTO,")).toBeVisible();

    await page.goto("/en");
    await expect(page.getByText("DEVELOPMENT,")).toBeVisible();
  });
});
```

- [ ] **Step 2: Rodar smoke tests**

Run: `npx playwright test tests/smoke.spec.ts --project=desktop`
Expected: Todos os testes passam

- [ ] **Step 3: Corrigir falhas se houver**

Se algum teste falhar, ajustar seletores ou assercoes com base no output do Playwright.

- [ ] **Step 4: Commit**

```bash
git add tests/smoke.spec.ts
git commit -m "test: add smoke tests for home and contact pages"
```

---

### Task 4: Visual Snapshots (Camada 2)

**Files:**
- Create: `tests/visual.spec.ts`

- [ ] **Step 1: Criar visual snapshot tests**

Criar `tests/visual.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

const sections = [
  "header",
  "hero",
  "tech-bar",
  "services",
  "projects",
  "metrics",
  "cta",
  "footer",
] as const;

test.describe("visual regression - pt-BR", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt-BR");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  for (const section of sections) {
    test(`${section} matches snapshot`, async ({ page }) => {
      const element = page.getByTestId(section);
      await element.scrollIntoViewIfNeeded();
      await expect(element).toHaveScreenshot(`${section}.png`, {
        maxDiffPixelRatio: 0.02,
        animations: "disabled",
      });
    });
  }

  test("full page matches snapshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("home-full.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });
});

test.describe("visual regression - contact", () => {
  test("contact page matches snapshot", async ({ page }) => {
    await page.goto("/pt-BR/contato");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("contact-full.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });
});
```

- [ ] **Step 2: Gerar snapshots iniciais**

Run: `npx playwright test tests/visual.spec.ts --update-snapshots`
Expected: Snapshots gerados em `tests/visual.spec.ts-snapshots/`

- [ ] **Step 3: Verificar que snapshots foram criados**

Run: `ls tests/visual.spec.ts-snapshots/`
Expected: Arquivos `.png` para cada secao

- [ ] **Step 4: Rodar testes visuais**

Run: `npx playwright test tests/visual.spec.ts`
Expected: Todos passam (comparando com os snapshots recem-criados)

- [ ] **Step 5: Commit**

```bash
git add tests/visual.spec.ts tests/visual.spec.ts-snapshots/
git commit -m "test: add visual regression snapshot tests"
```

---

### Task 5: Comparacao com Figma (Camada 3)

**Files:**
- Create: `tests/figma-compare.spec.ts`
- Create: `docs/figma/screenshots/.gitkeep`
- Create: `docs/figma/specs/.gitkeep`
- Create: `docs/figma/comparison/.gitkeep`

- [ ] **Step 1: Criar estrutura de diretorio docs/figma**

```bash
mkdir -p docs/figma/screenshots docs/figma/specs docs/figma/comparison
touch docs/figma/screenshots/.gitkeep docs/figma/specs/.gitkeep docs/figma/comparison/.gitkeep
```

- [ ] **Step 2: Criar figma-compare tests**

Criar `tests/figma-compare.spec.ts`:

```ts
import { test } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const figmaScreenshotsDir = path.join(
  process.cwd(),
  "docs/figma/screenshots"
);
const comparisonDir = path.join(process.cwd(), "docs/figma/comparison");

const sections = [
  "header",
  "hero",
  "tech-bar",
  "services",
  "projects",
  "metrics",
  "cta",
  "footer",
] as const;

test.describe("figma comparison", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt-BR");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  for (const section of sections) {
    test(`capture ${section} for figma comparison`, async ({ page }) => {
      const figmaPath = path.join(figmaScreenshotsDir, `${section}.png`);
      if (!fs.existsSync(figmaPath)) {
        test.skip();
        return;
      }

      if (!fs.existsSync(comparisonDir)) {
        fs.mkdirSync(comparisonDir, { recursive: true });
      }

      const element = page.getByTestId(section);
      await element.scrollIntoViewIfNeeded();
      await element.screenshot({
        path: path.join(comparisonDir, `${section}-atual.png`),
        animations: "disabled",
      });

      fs.copyFileSync(
        figmaPath,
        path.join(comparisonDir, `${section}-figma.png`)
      );
    });
  }
});
```

- [ ] **Step 3: Rodar figma-compare (todos devem ser skipped)**

Run: `npx playwright test tests/figma-compare.spec.ts --project=desktop`
Expected: Todos os testes sao skipped (nenhum screenshot Figma existe ainda)

- [ ] **Step 4: Commit**

```bash
git add tests/figma-compare.spec.ts docs/figma/
git commit -m "test: add Figma comparison test infrastructure"
```

---

### Task 6: Atualizar CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Adicionar secoes de Workflow e Figma Local ao CLAUDE.md**

Adicionar ao final do `CLAUDE.md`, depois da secao `## Workflow`:

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
- Executar `code-simplifier`
- Verificar localizacao de textos (todos os idiomas)

### Regra de ouro
- Na duvida, perguntar. Nunca assumir.

## Figma Local

- Designs ficam em `docs/figma/` (screenshots + specs)
- 1 chamada MCP por secao, salvar resultado localmente
- Usuario complementa espacamentos manualmente
- Arquivos versionados no git

## Testes Playwright

- `npm test` roda todos os testes
- `npm run test:smoke` roda smoke tests
- `npm run test:visual` roda visual regression
- `npm run test:update` atualiza snapshots quando mudanca visual for intencional
```

- [ ] **Step 2: Remover secao antiga de Testes e Workflow**

Remover as secoes:
```markdown
## Testes
- Build deve passar sem erros antes de qualquer commit
- Verificar visualmente com Playwright quando possivel

## Workflow
- Apos cada feature executar `code-simplifier`
- Verificar localizacao de textos
```

Essas regras estao incorporadas nas novas secoes.

- [ ] **Step 3: Verificar CLAUDE.md esta correto**

Ler o arquivo completo e verificar que nao ha duplicacao ou inconsistencia.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with workflow rules, Figma local, and Playwright testing"
```

---

### Task 7: Validacao final

**Files:** Nenhum arquivo novo.

- [ ] **Step 1: Rodar build**

Run: `npx next build`
Expected: Build passa sem erros

- [ ] **Step 2: Rodar todos os testes**

Run: `npx playwright test --project=desktop`
Expected: Smoke tests passam, visual tests passam, figma-compare tests sao skipped

- [ ] **Step 3: Rodar testes em mobile**

Run: `npx playwright test tests/smoke.spec.ts --project=mobile`
Expected: Smoke tests passam em viewport mobile

- [ ] **Step 4: Commit final se houve ajustes**

Se algum ajuste foi necessario:
```bash
git add -A
git commit -m "fix: adjust tests after validation"
```
