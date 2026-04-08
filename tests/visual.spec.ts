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
  test.use({ locale: "pt-BR" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  for (const section of sections) {
    test(`${section} matches snapshot`, async ({ page }) => {
      const element = page.getByTestId(section);
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(element).toHaveScreenshot(`${section}.png`, {
        maxDiffPixelRatio: 0.05,
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
  test.use({ locale: "pt-BR" });

  test("contact page matches snapshot", async ({ page }) => {
    await page.goto("/contato");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("contact-full.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });
});
