import * as headersModule from "next/headers";
import { NextRequest } from "next/server";
import { POST } from "@src/app/api/auth/sign-in/route";
import { HttpAppCode, HttpCode } from "@src/utils/http.util";

// Mock user data
const mockUser = {
	id: 1,
	username: "admin",
	name: "Admin",
	roleId: 2,
	password: "hashed",
	dataValues: {
		id: 1,
		username: "admin",
		name: "Admin",
		roleId: 2,
	},
};

// Mock Jwt signing
jest.mock("@util/jwt.util", () => ({
	Jwt: {
		sign: jest.fn().mockResolvedValue("mocked-token"),
		accessExpire: { toMillis: (): number => Date.now() + 10000 },
		refreshExpire: { toMillis: (): number => Date.now() + 20000 },
	},
	TokenType: {
		Access: "access",
		Refresh: "refresh",
	},
}));

// Mock Repository
const mockIsPasswordMatch = jest.fn();
const mockGetUserByUsername = jest.fn();
jest.mock("@repository/core/repository", () => ({
	Repository: jest.fn().mockImplementation(() => ({
		user: {
			isPasswordMatch: mockIsPasswordMatch,
			getUserByUsername: mockGetUserByUsername,
		},
	})),
}));

const createMockRequest = (body: object): NextRequest =>
	new NextRequest("http://localhost/api/auth/sign-in", {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "content-type": "application/json" },
	} as any);

describe("POST /api/auth/sign-in", () => {
	beforeEach(() => jest.clearAllMocks());

	it("should return 200 and set cookies on successful login", async (): Promise<void> => {
		mockIsPasswordMatch.mockResolvedValue(true);
		mockGetUserByUsername.mockResolvedValue(mockUser);

		const mockCookies: any = { set: jest.fn() };
		jest.spyOn(headersModule, "cookies").mockReturnValue(mockCookies);

		const req = createMockRequest({
			username: "admin",
			password: "@TestPassword123",
		});

		const res = await POST(req);
		const data = await res.json();

		expect(res.status).toBe(HttpCode.Ok);
		expect(data.ok).toBe(true);
		expect(data.code).toBe(HttpAppCode.SigninSuccess);
		expect(mockCookies.set).toHaveBeenCalledWith("access", "mocked-token", expect.any(Object));
		expect(mockCookies.set).toHaveBeenCalledWith("refresh", "mocked-token", expect.any(Object));
	});

	it("should return 400 if password validation fails", async (): Promise<void> => {
		const res = await POST(
			createMockRequest({
				username: "admin",
				password: "input-password-invalid-format",
			}),
		);
		const data = await res.json();

		expect(res.status).toBe(HttpCode.BadRequest);
		expect(data.ok).toBe(false);
		expect(data.message).toBe("Login gagal");
		expect(data.errors).toEqual([
			{
				validation: "regex",
				code: "invalid_string",
				message: "Harus berisi setidaknya satu angka.",
				path: ["password"],
			},
		]);
	});

	it("should return 400 if username validation fails", async (): Promise<void> => {
		const res = await POST(
			createMockRequest({
				username: "adm",
				password: "@TestPassword123",
			}),
		);
		const data = await res.json();

		expect(res.status).toBe(HttpCode.BadRequest);
		expect(data.ok).toBe(false);
		expect(data.message).toBe("Login gagal");
		expect(data.errors).toEqual([
			{
				code: "too_small",
				minimum: 4,
				type: "string",
				inclusive: true,
				exact: false,
				message: "Username harus minimal 4 karakter.",
				path: ["username"],
			},
		]);
	});
});
