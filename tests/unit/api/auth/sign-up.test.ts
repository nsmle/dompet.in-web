import { NextRequest } from "next/server";
import { POST } from "@app/api/auth/sign-up/route";
import { HttpAppCode, HttpCode } from "@src/utils/http.util";

// Mock getBody dan parseToHttpError
jest.mock("@src/utils/http.util", () => {
	const originalModule = jest.requireActual("@src/utils/http.util");
	return {
		...originalModule,
		getBody: jest.fn(),
		parseToHttpError: jest.fn((err, msg) => ({
			body: { ok: false, code: 500, message: msg },
			init: { status: 500 },
		})),
	};
});

// Mock Repository
const mockIsUserExists = jest.fn();
const mockAddUser = jest.fn();
jest.mock("@repository/core/repository", () => ({
	Repository: jest.fn().mockImplementation(() => ({
		user: {
			isUserExists: mockIsUserExists,
			addUser: mockAddUser,
		},
	})),
}));

const mockGetBody = require("@src/utils/http.util").getBody as jest.Mock;

describe("POST /api/auth/sign-up", () => {
	beforeEach(() => jest.clearAllMocks());
	const dummyRequest = {} as NextRequest;

	it("should return 200 and success message when user is created", async (): Promise<void> => {
		mockIsUserExists.mockResolvedValue(false);
		mockGetBody.mockResolvedValue({ username: "newuser", email: "new@user.com", password: "123456" });
		mockAddUser.mockResolvedValue({ id: "uuid-v4" });

		const response = await POST(dummyRequest);
		const json = await response.json();

		expect(response.status).toBe(HttpCode.Ok);
		expect(json).toEqual({
			ok: true,
			code: HttpAppCode.Registered,
			message: "Berhasil registrasi, silahkan login!",
			data: { userId: "uuid-v4" },
		});
	});

	it("should return 409 if username or email already exists", async (): Promise<void> => {
		mockGetBody.mockResolvedValue({ username: "existing", email: "exist@user.com", password: "123456" });
		mockIsUserExists.mockResolvedValue(true);

		const response = await POST(dummyRequest);
		const json = await response.json();

		expect(response.status).toBe(HttpCode.Conflict);
		expect(json).toEqual({
			ok: false,
			code: HttpAppCode.UsernameOrEmailAlreadyExists,
			message: "Username atau email sudah ada!",
		});
	});

	it("should return 500 if unexpected error occurs", async (): Promise<void> => {
		mockGetBody.mockRejectedValue(new Error("Unexpected"));

		const response = await POST(dummyRequest);
		const json = await response.json();

		expect(response.status).toBe(HttpCode.InternalServerError);
		expect(json).toEqual({
			ok: false,
			code: HttpCode.InternalServerError,
			message: "Gagal register!",
		});
	});
});
