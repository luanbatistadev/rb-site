import { test, expect } from "@playwright/test";

const localeConfig = {
  "pt-BR": {
    homeUrl: "/",
    contactUrl: "/contato",
    contactLinkHref: "/pt-BR/contato",
    browserLocale: "pt-BR",
    heroText: "DESENVOLVIMENTO",
    successText: "Mensagem enviada com sucesso!",
  },
  en: {
    homeUrl: "/en",
    contactUrl: "/en/contato",
    contactLinkHref: "/en/contato",
    browserLocale: "en-US",
    heroText: "DEVELOPMENT",
    successText: "Message sent successfully!",
  },
} as const;

const locales = ["pt-BR", "en"] as const;

for (const locale of locales) {
  const config = localeConfig[locale];

  test.describe(`${locale} - Home`, () => {
    test.use({ locale: config.browserLocale });

    test.beforeEach(async ({ page }) => {
      await page.goto(config.homeUrl);
    });

    test("page loads with status 200", async ({ page }) => {
      const response = await page.goto(config.homeUrl);
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
      await page.click(`a[href="${config.contactLinkHref}"]`);
      await page.waitForURL(`**${config.contactUrl}`);
      await expect(page.getByTestId("contact-form")).toBeVisible();
    });

    test("images load without errors", async ({ page }) => {
      const images = page.locator("img[loading='eager'], img:not([loading='lazy'])");
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        await expect(img).toHaveJSProperty("complete", true);
        await expect(img).not.toHaveJSProperty("naturalWidth", 0);
      }
    });
  });

  test.describe(`${locale} - Contact`, () => {
    test.use({ locale: config.browserLocale });

    test("page loads with status 200", async ({ page }) => {
      const response = await page.goto(config.contactUrl);
      expect(response?.status()).toBe(200);
    });

    test("form fields exist", async ({ page }) => {
      await page.goto(config.contactUrl);
      await expect(page.locator("#name")).toBeVisible();
      await expect(page.locator("#email")).toBeVisible();
      await expect(page.locator("#phone")).toBeVisible();
      await expect(page.locator("#message")).toBeVisible();
    });

    test("form validation works", async ({ page }) => {
      await page.goto(config.contactUrl);
      const submitButton = page.locator("button[type='submit']");
      await submitButton.click();
      const nameInput = page.locator("#name");
      await expect(nameInput).toHaveAttribute("required", "");
    });

    test("form submits successfully", async ({ page }) => {
      await page.goto(config.contactUrl);
      await page.fill("#name", "Teste");
      await page.fill("#email", "teste@teste.com");
      await page.fill("#phone", "11999999999");
      await page.fill("#message", "Mensagem de teste");
      await page.click("button[type='submit']");
      await expect(page.getByText(config.successText)).toBeVisible({ timeout: 10000 });
    });
  });
}

test.describe("i18n - pt-BR", () => {
  test.use({ locale: "pt-BR" });

  test("pt-BR locale shows Portuguese content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").filter({ hasText: "DESENVOLVIMENTO" })).toBeVisible({ timeout: 10000 });
  });
});

test.describe("i18n - en", () => {
  test.use({ locale: "en-US" });

  test("en locale shows English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1").filter({ hasText: "DEVELOPMENT" })).toBeVisible({ timeout: 10000 });
  });
});
