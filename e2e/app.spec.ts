import { test, expect } from "@playwright/test";

test.describe("avrae frontpage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display welcome message", async ({ page }) => {
    const paragraphText = await page.textContent("css=.about-avrae");
    expect(paragraphText).toContain("I am Avrae");
  });
});
