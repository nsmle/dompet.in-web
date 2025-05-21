import { expect, test } from "@playwright/test";
import { route } from "../../src/lib/uri";
import { Config } from "../../src/utils/config.util";

const user = {
	super: {
		name: "Tester",
		username: "test",
		password: "@TestPassword123",
	},
	standar: {
		name: "Tester 1",
		username: "test1",
		password: "@TestPassword123",
	},
};

test.describe("sing-in", () => {
	test("navigation", async ({ page }): Promise<void> => {
		await page.goto(Config.AppUrl);
		expect(page.url()).toBe(Config.AppUrl);
		await page.getByRole("link", { name: "Log in" }).click();

		await expect(page).toHaveURL(route.signIn);
		await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
	});

	test("validation", async ({ page }): Promise<void> => {
		await page.goto(route.signIn);

		await page.locator('[name="username"]').fill("a");
		expect(await page.locator('[aria-label="error-username"]').textContent()).toBe("Username harus minimal 4 karakter.");
		await page.locator('[name="username"]').fill(user.super.username);

		await page.locator('[name="password"]').fill("a");
		expect(await page.locator('[aria-label="error-password"]').textContent()).toBe("Panjang password harus minimal 8 karakter.");
		await page.locator('[name="password"]').fill(user.super.password);
	});

	test("login admin", async ({ page }): Promise<void> => {
		await page.goto(route.signIn);
		await page.locator('[name="username"]').fill(user.super.username + "_invalid");
		await page.locator('[name="password"]').fill(user.super.password + "_invalid");
		await page.getByRole("button", { name: "Sign in" }).click();
		await page.waitForResponse("**/*/api/auth/sign-in");
		expect(await page.locator('[aria-label="error-username"]').textContent()).toBe("Username atau email tidak ditemukan!");

		await page.locator('[name="username"]').fill(user.super.username);
		await page.getByRole("button", { name: "Sign in" }).click();
		await page.waitForResponse("**/*/api/auth/sign-in");
		expect(await page.locator('[aria-label="error-password"]').textContent()).toBe("Kata sandi salah atau tidak valid!");

		await page.locator('[name="password"]').fill(user.super.password);
		await page.getByRole("button", { name: "Sign in" }).click();
		await page.waitForResponse("**/*/api/auth/sign-in");
		await expect(page).toHaveURL(route.dashboard);
		expect((await page.locator('[role="status"]').allTextContents()).at(0)).toBe(`Hallo ${user.super.name}, apa kabar?`);
	});

	test("login user", async ({ page }): Promise<void> => {
		await page.goto(route.signIn);
		await page.locator('[name="username"]').fill(user.standar.username);
		await page.locator('[name="password"]').fill(user.standar.password);
		await page.getByRole("button", { name: "Sign in" }).click();

		await page.waitForResponse("**/*/api/auth/sign-in");
		await expect(page).toHaveURL(route.dashboard);
		expect((await page.locator('[role="status"]').allTextContents()).at(0)).toBe(`Hallo ${user.standar.name}, apa kabar?`);
	});
});
