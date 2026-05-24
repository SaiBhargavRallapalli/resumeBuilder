# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> ResumeCraft smoke tests >> templates page lists templates
- Location: e2e/smoke.spec.ts:11:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Resume Templates/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Resume Templates/i })

```

```yaml
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("ResumeCraft smoke tests", () => {
  4  |   test("landing page loads", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await expect(
  7  |       page.getByRole("link", { name: /Build Resume Free|Build Your Resume Free/i }).first()
  8  |     ).toBeVisible();
  9  |   });
  10 | 
  11 |   test("templates page lists templates", async ({ page }) => {
  12 |     await page.goto("/templates");
> 13 |     await expect(page.getByRole("heading", { name: /Resume Templates/i })).toBeVisible();
     |                                                                            ^ Error: expect(locator).toBeVisible() failed
  14 |     await expect(page.getByRole("button", { name: /Use Template/i }).first()).toBeVisible();
  15 |   });
  16 | 
  17 |   test("template opens builder with sample data", async ({ page }) => {
  18 |     await page.goto("/builder/new?template=classic");
  19 |     await page.waitForURL(/\/builder(\?r=|$)/, { timeout: 15_000 });
  20 |     await expect(page.getByRole("heading", { name: "Alex Morgan" })).toBeVisible();
  21 |     await expect(page.getByText("Results-driven software engineer")).toBeVisible();
  22 |   });
  23 | 
  24 |   test("examples page loads", async ({ page }) => {
  25 |     await page.goto("/examples");
  26 |     await expect(page.getByRole("heading", { name: /Resume Examples/i })).toBeVisible();
  27 |     await expect(page.getByRole("button", { name: /Use this example/i }).first()).toBeVisible();
  28 |   });
  29 | 
  30 |   test("privacy and terms pages load", async ({ page }) => {
  31 |     await page.goto("/privacy");
  32 |     await expect(page.getByRole("heading", { name: /Privacy Policy/i })).toBeVisible();
  33 |     await page.goto("/terms");
  34 |     await expect(page.getByRole("heading", { name: /Terms of Service/i })).toBeVisible();
  35 |   });
  36 | 
  37 |   test("PDF export API returns valid PDF", async ({ request }) => {
  38 |     const sample = {
  39 |       id: "test-id",
  40 |       title: "Test Resume",
  41 |       templateId: "classic",
  42 |       style: {
  43 |         primaryColor: "#2563eb",
  44 |         fontFamily: "arial",
  45 |         fontSize: "medium",
  46 |         lineHeight: "normal",
  47 |         margin: "normal",
  48 |       },
  49 |       sections: {
  50 |         contact: {
  51 |           fullName: "Alex Morgan",
  52 |           jobTitle: "Engineer",
  53 |           email: "alex@test.com",
  54 |           phone: "",
  55 |           location: "",
  56 |           website: "",
  57 |           linkedin: "",
  58 |         },
  59 |         summary: "Test summary for PDF export.",
  60 |         experience: [],
  61 |         education: [],
  62 |         skills: ["TypeScript"],
  63 |         projects: [],
  64 |         certifications: [],
  65 |         awards: [],
  66 |         languages: [],
  67 |       },
  68 |       visibility: {
  69 |         summary: true,
  70 |         experience: true,
  71 |         education: true,
  72 |         skills: true,
  73 |         projects: false,
  74 |         certifications: false,
  75 |         awards: false,
  76 |         languages: false,
  77 |       },
  78 |       updatedAt: new Date().toISOString(),
  79 |     };
  80 | 
  81 |     const res = await request.post("/api/export-pdf", { data: sample });
  82 |     expect(res.ok()).toBeTruthy();
  83 |     expect(res.headers()["content-type"]).toContain("application/pdf");
  84 |     const body = await res.body();
  85 |     expect(body.subarray(0, 4).toString()).toBe("%PDF");
  86 |   });
  87 | });
  88 | 
```