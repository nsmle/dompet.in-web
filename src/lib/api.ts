import axios, { AxiosError, AxiosInstance } from "axios";
import type { SignIn } from "@app/api/auth/sign-in/route";
import type { SignUp } from "@app/api/auth/sign-up/route";
import type { CheckUsername } from "@app/api/auth/username/route";
import type { SignInFormData } from "@lib/definitions/signin.definition";
import type { SignUpFormData } from "@lib/definitions/signup.definition";
import { Config } from "@src/utils/config.util";

export class Api {
	private static client: AxiosInstance = axios.create({
		baseURL: Config.ApiUrl,
		timeout: 8000,
	});

	public static async init(): Promise<void> {
		this.client.post(`/`);
	}

	public static async signIn(data: SignInFormData): Promise<SignIn> {
		return await this.client
			.post<SignIn>(`/auth/sign-in`, data)
			.then((res): SignIn => res.data)
			.catch((error): SignIn => error.response?.data);
	}

	public static async signUp(data: Omit<SignUpFormData, "rePassword">): Promise<SignUp> {
		return await this.client
			.post<SignUp>(`/auth/sign-up`, data)
			.then((res): SignUp => res.data)
			.catch((error): SignUp => error.response?.data);
	}

	public static async usernameExists(username: string): Promise<boolean> {
		try {
			const response = await this.client.post<CheckUsername>(`/auth/username`, { username });
			return response.data.exists;
		} catch (error) {
			if (error instanceof AxiosError) return error.response?.data?.exists;
			return false;
		}
	}
}
