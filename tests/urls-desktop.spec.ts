// Test all pages are available on the Desktop
import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 1280, height: 1100 },
  baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:1024",
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
