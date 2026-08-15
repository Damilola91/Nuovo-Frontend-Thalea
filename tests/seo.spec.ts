import { test, expect } from "@playwright/test";

const PAGES = ["/", "/gallery", "/nearby", "/services", "/where", "/calendar"];

test.describe("SEO e metadata", () => {
  for (const path of PAGES) {
    test(`${path} — ha canonical, OG tags e alternates`, async ({ page }) => {
      await page.goto(path);

      // Canonical
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toBeTruthy();

      // Open Graph
      const ogTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute("content");
      expect(ogTitle).toBeTruthy();

      const ogDescription = await page
        .locator('meta[property="og:description"]')
        .getAttribute("content");
      expect(ogDescription).toBeTruthy();

      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      expect(ogImage).toBeTruthy();

      // Alternates hreflang
      const alternates = page.locator('link[rel="alternate"][hreflang]');
      expect(await alternates.count()).toBeGreaterThan(0);
    });
  }

  test("la home ha il JSON-LD LodgingBusiness", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd!);
    expect(parsed["@type"]).toBe("LodgingBusiness");
    expect(parsed.address).toBeTruthy();
    expect(parsed.geo).toBeTruthy();
  });

  test("il favicon è presente", async ({ page }) => {
    await page.goto("/");
    const icons = page.locator('link[rel="icon"]');
    expect(await icons.count()).toBeGreaterThan(0);
  });

  test("le pagine legali non sono followed", async ({ page }) => {
    await page.goto("/privacy-policy");
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toContain("nofollow");
  });
});
