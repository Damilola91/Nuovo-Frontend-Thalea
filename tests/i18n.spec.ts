import { test, expect } from "@playwright/test";

test.describe("Cambio lingua", () => {
  test("il language switcher è presente nell'header", async ({ page }) => {
    await page.goto("/");
    const switcher = page.locator('header button[aria-haspopup="listbox"]');
    await expect(switcher.first()).toBeVisible();
  });

  test("apre il dropdown con tutte le lingue", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('header button[aria-haspopup="listbox"]')
      .first()
      .click();

    const options = page.locator('[role="option"]');
    await expect(options).toHaveCount(6);
  });

  test("cambiando lingua il contenuto si traduce", async ({ page }) => {
    await page.goto("/");

    // Verifica che il footer sia in italiano all'inizio
    await expect(page.locator("footer")).toContainText(/Link Rapidi/i);

    // Apri il dropdown e seleziona English
    await page
      .locator('header button[aria-haspopup="listbox"]')
      .first()
      .click();
    await page.locator('[role="option"]:has-text("English")').click();

    // Attende che il footer contenga il testo inglese — polling automatico
    await expect(page.locator("footer")).toContainText(/Quick Links/i, {
      timeout: 10000,
    });
  });

  test("il cookie NEXT_LOCALE viene impostato", async ({ page, context }) => {
    await page.goto("/");
    await page
      .locator('header button[aria-haspopup="listbox"]')
      .first()
      .click();
    await page.locator('[role="option"]:has-text("English")').click();

    // Attende che il cookie sia effettivamente scritto
    await expect(async () => {
      const cookies = await context.cookies();
      const localeCookie = cookies.find((c) => c.name === "NEXT_LOCALE");
      expect(localeCookie?.value).toBe("en");
    }).toPass({ timeout: 5000 });
  });

  test("la lingua persiste dopo il reload", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('header button[aria-haspopup="listbox"]')
      .first()
      .click();
    await page.locator('[role="option"]:has-text("English")').click();

    await expect(page.locator("footer")).toContainText(/Quick Links/i, {
      timeout: 10000,
    });

    // Ricarica e verifica che sia ancora in inglese
    await page.reload();
    await expect(page.locator("footer")).toContainText(/Quick Links/i);
  });
});
