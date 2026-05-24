import { test, expect } from "@playwright/test";

test.describe("ResumeCraft smoke tests", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Build Resume Free|Build Your Resume Free/i }).first()
    ).toBeVisible();
  });

  test("templates page lists templates", async ({ page }) => {
    await page.goto("/templates");
    await expect(page.getByRole("heading", { name: /Resume Templates/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Use Template/i }).first()).toBeVisible();
  });

  test("template opens builder with sample data", async ({ page }) => {
    await page.goto("/builder/new?template=classic");
    await page.waitForURL(/\/builder(\?r=|$)/, { timeout: 15_000 });
    await expect(page.getByRole("heading", { name: "Alex Morgan" })).toBeVisible();
    await expect(page.getByText("Results-driven software engineer")).toBeVisible();
  });

  test("examples page loads", async ({ page }) => {
    await page.goto("/examples");
    await expect(page.getByRole("heading", { name: /Resume Examples/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Use this example/i }).first()).toBeVisible();
  });

  test("privacy and terms pages load", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: /Privacy Policy/i })).toBeVisible();
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: /Terms of Service/i })).toBeVisible();
  });

  test("PDF export API returns valid PDF", async ({ request }) => {
    const sample = {
      id: "test-id",
      title: "Test Resume",
      templateId: "classic",
      style: {
        primaryColor: "#2563eb",
        fontFamily: "arial",
        fontSize: "medium",
        lineHeight: "normal",
        margin: "normal",
      },
      sections: {
        contact: {
          fullName: "Alex Morgan",
          jobTitle: "Engineer",
          email: "alex@test.com",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
        },
        summary: "Test summary for PDF export.",
        experience: [],
        education: [],
        skills: ["TypeScript"],
        projects: [],
        certifications: [],
        awards: [],
        languages: [],
      },
      visibility: {
        summary: true,
        experience: true,
        education: true,
        skills: true,
        projects: false,
        certifications: false,
        awards: false,
        languages: false,
      },
      updatedAt: new Date().toISOString(),
    };

    const res = await request.post("/api/export-pdf", { data: sample });
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"]).toContain("application/pdf");
    const body = await res.body();
    expect(body.subarray(0, 4).toString()).toBe("%PDF");
  });
});
