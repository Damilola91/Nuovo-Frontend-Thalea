import { test, expect } from "@playwright/test";

test.describe("Flusso prenotazione", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calendar");
  });

  test("mostra lo stepper con 5 step", async ({ page }) => {
    const steps = page.locator("ol li");
    await expect(steps).toHaveCount(5);
  });

  test("il bottone Continua è disabilitato senza date", async ({ page }) => {
    const continueBtn = page.getByRole("button", {
      name: /continua|continue/i,
    });
    await expect(continueBtn).toBeDisabled();
  });

  test("il calendario è visibile", async ({ page }) => {
    // DayPicker renderizza una griglia accessibile — selettore stabile tra versioni
    await expect(page.getByRole("grid").first()).toBeVisible();
  });

  test("il riepilogo laterale è presente", async ({ page }) => {
    // Il BookingSummary è nella colonna laterale della griglia
    const summary = page.locator(
      "aside, [class*='summary'], .md\\:grid-cols-\\[1fr_300px\\] > div:last-child",
    );
    await expect(summary.first()).toBeVisible();
  });

  test("selezionando meno di 3 notti mostra errore minimo soggiorno", async ({
    page,
  }) => {
    // Trova i giorni cliccabili (non disabilitati) nella griglia
    const availableDays = page
      .getByRole("gridcell")
      .locator("button:not([disabled])");
    const count = await availableDays.count();

    if (count < 3) {
      test.skip();
      return;
    }

    // Seleziona check-in e check-out a distanza di 2 giorni (2 notti — sotto il minimo)
    await availableDays.nth(0).click();
    await availableDays.nth(2).click();

    // Deve apparire il messaggio di errore per il minimo soggiorno
    const errorMsg = page.locator("text=/3 notti|3 nights|minim/i");
    await expect(errorMsg.first()).toBeVisible({ timeout: 3000 });
  });

  test("selezionando 3+ notti il bottone Continua si abilita", async ({
    page,
  }) => {
    const availableDays = page
      .getByRole("gridcell")
      .locator("button:not([disabled])");
    const count = await availableDays.count();

    if (count < 4) {
      test.skip();
      return;
    }

    // Seleziona un range di almeno 3 notti
    await availableDays.nth(0).click();
    await availableDays.nth(3).click();

    const continueBtn = page.getByRole("button", {
      name: /continua|continue/i,
    });
    await expect(continueBtn).toBeEnabled({ timeout: 3000 });
  });
});
