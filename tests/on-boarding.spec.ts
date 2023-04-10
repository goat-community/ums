import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 1280, height: 1100 },
  baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:1024",
});

test.describe("Onboarding Component", () => {
  test("should display onboarding dialog on first visit", async ({ page }) => {
    // Check that the first page is displayed
    await page.goto("/");
    const image = await page.getByTestId("test-onboarding-image");
    expect(image).toBeTruthy();
    const src = await image?.getAttribute("src");
    expect(src).toContain("logo-horizontal-black");
  });

  // test("should navigate to next page when continue button is clicked", async ({
  //   page,
  // }) => {
  //   // Click continue button to navigate to next page
  //   const continueButton = await page.getByTestId("test-onboarding-continue-button");
  //   expect(continueButton).toBeTruthy();
  //   await continueButton.click();

  //   // Check that the second page is displayed
  //   const image = await page.getByTestId("test-onboarding-image");
  //   expect(image).toBeTruthy();
  //   const src = await image?.getAttribute("src");
  //   expect(src).toContain("15-min.jpg");

  //   // Click previous button to navigate back to first page
  //   const previousButton = await page.getByTestId("test-onboarding-previous-button");
  //   expect(previousButton).toBeTruthy();
  //   await previousButton?.click();
  //   const image_back = await page.getByTestId("test-onboarding-image");
  //   expect(image_back).toBeTruthy();
  //   const image_back_src = await image?.getAttribute("src");
  //   expect(image_back_src).toContain("logo-horizontal-black.png");
  // });

  test("should not display onboarding dialog on subsequent visits", async ({ page }) => {
    // Reload page to simulate subsequent visit
    await page.reload();

    // Check that onboarding dialog is not visible
    const dialogTitle = await page.$(".MuiDialogTitle-root");
    expect(dialogTitle).toBeFalsy();
  });
});
