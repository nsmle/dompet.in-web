import { expect, test } from "@playwright/test";
import { route } from "../src/lib/uri";
import { Config } from "../src/utils/config.util";

const userExists = {
	username: "test",
	email: "test@test.test",
};

const user = (() => {
	const seed = Math.random().toString(36).substring(7);
	return {
		username: seed,
		name: `User Test ${seed}`,
		email: `${seed}@gmail.com`,
		password: "@TestPassword123",
	};
})();

test.describe("sing-up", () => {
	test("navigation", async ({ page }): Promise<void> => {
		await page.goto(Config.AppUrl);
		expect(page.url()).toBe(Config.AppUrl);
		await page.getByRole("link", { name: "Mulai Mencatat" }).click();

		await expect(page).toHaveURL(route.signUp);
		await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
	});

	test("validation", async ({ page }): Promise<void> => {
		await page.goto(route.signUp);
		await page.locator('[name="username"]').fill("a");
		expect(await page.locator('[aria-label="error-username"]').textContent()).toBe("Username harus minimal 4 karakter.");

		await page.locator('[name="username"]').fill(userExists.username);
		await page.waitForResponse("**/*/api/auth/username");
		expect(await page.locator('[aria-label="error-username"]').textContent()).toBe("Username sudah ada, silahkan gunakan username lain.");

		await page.locator('[name="username"]').fill(user.username);
		await page.waitForResponse("**/*/api/auth/username");

		await page.getByRole("button", { name: "Sign up" }).click();
		expect(await page.locator('[aria-label="error-name"]').textContent()).toBe("Nama harus minimal panjang 3 characters.");
		expect(await page.locator('[aria-label="error-email"]').textContent()).toBe("Email harus berupa alamat email yang valid.");
		expect(await page.locator('[aria-label="error-password"]').textContent()).toBe("Panjang password harus minimal 8 karakter.");
		expect(await page.locator('[aria-label="error-rePassword"]').textContent()).toBe("Panjang konfirmasi password harus minimal 8 karakter.");
	});

	test("register", async ({ page }): Promise<void> => {
		await page.goto(route.signUp);
		await page.locator('[name="username"]').fill(user.username);
		await page.locator('[name="name"]').fill(user.name);
		await page.locator('[name="password"]').fill(user.password);
		await page.locator('[name="rePassword"]').fill(user.password);

		await page.locator('[name="email"]').fill(userExists.email);
		await page.getByRole("button", { name: "Sign up" }).click();
		await page.waitForResponse("**/*/api/auth/sign-up");
		expect((await page.locator('[role="status"]').allTextContents()).at(0)).toBe("Username atau email sudah ada!");

		await page.locator('[name="email"]').fill(user.email);
		await page.getByRole("button", { name: "Sign up" }).click();
		await page.waitForResponse("**/*/api/auth/sign-up");
		await expect(page).toHaveURL(route.signIn);
		expect((await page.locator('[role="status"]').allTextContents()).at(0)).toBe("Berhasil registrasi, silahkan login!");
	});
});
