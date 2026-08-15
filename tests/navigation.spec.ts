import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", name: "Thălēa Apartment" },
  { path: "/gallery", name: "Gallery" },
  { path: "/nearby", name: "Nearby" },
  { path: "/services", name: "Services" },
  { path: "/where", name: "Where" },
  { path: "/calendar", name: "Calendar" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms" },
];

test.describe("Navigation public pages", () => {
  for (const { path, name } of PAGES) {
    test(`${name} - load without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      expect(errors).toHaveLength(0);

      // Accertarsi se Header e Footer sono presenti
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }
});
