// Test all pages are available on the Mobile
import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 780, height: 900 },
  baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:1024",
});

const URLS = ["/", "/flower", "/profile", "/insights"];

test.describe("Mobile URLs validation", () => {
  URLS.forEach(async (URL) => {
    test(`URL: ${URL}`, async ({ page }) => {
      await page.goto(URL);
      await expect(page).not.toHaveTitle(/Page not found!/);
    });
  });
});
