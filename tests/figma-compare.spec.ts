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
  test.use({ locale: "pt-BR" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
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
