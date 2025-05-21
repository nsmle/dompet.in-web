import { expect, test } from "@playwright/test";
import { route } from "../../src/lib/uri";
import { Config } from "../../src/utils/config.util";

test.describe("landing", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(Config.AppUrl);
	});

	test("navigation", async ({ page }) => {
		expect(page.url()).toBe(Config.AppUrl);
		expect(await page.getByText("Masalah yang coba kami selesaikan").isVisible()).toBe(true);
		expect(await page.getByText("Solusi yang kami tawarkan!").isVisible()).toBe(true);
		expect(await page.getByText("Explore Use Case").isVisible()).toBe(true);
	});

	test("has title", async ({ page }): Promise<void> => {
		await expect(page).toHaveTitle(Config.AppTitle);
	});

	test("sign-in navigation", async ({ page }): Promise<void> => {
		expect(page.url()).toBe(Config.AppUrl);
		await page.getByRole("link", { name: "Log in" }).click();
		await expect(page).toHaveURL(route.signIn);
	});

	test("sign-up navigation", async ({ page }): Promise<void> => {
		expect(page.url()).toBe(Config.AppUrl);
		await page.getByRole("link", { name: "Mulai Mencatat" }).click();
		await expect(page).toHaveURL(route.signUp);
	});
});
