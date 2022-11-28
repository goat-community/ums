// Test all pages are available on the Desktop
// and not breaked by the new changes -> !404
import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 1280, height: 1100 },
  baseURL: "http://localhost:5173",
});

const URLS = ["/"];

test.describe("Desktop URLs validation", () => {
  URLS.forEach(async (URL) => {
    test(`URL: ${URL}`, async ({ page }) => {
      await page.goto(URL);
      await expect(page).not.toHaveTitle(/Page not found!/);
    });
  });
});
