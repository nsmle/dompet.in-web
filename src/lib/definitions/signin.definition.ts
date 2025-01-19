import { z } from "zod";

const SignInObjectSchema = {
	username: z
		.string()
		.min(4, { message: "Username harus minimal 4 karakter." })
		.max(20, { message: "Username tidak boleh lebih dari 20 karakter." })
		.regex(/^[a-z0-9._]+$/, { message: "Username hanya boleh berisi huruf kecil, angka, underscore, dan titik." })
		.trim(),
	password: z
		.string()
		.min(8, { message: "Panjang password harus minimal 8 karakter." })
		.regex(/[a-zA-Z]/, { message: "Harus berisi setidaknya satu huruf." })
		.regex(/[0-9]/, { message: "Harus berisi setidaknya satu angka." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Harus berisi setidaknya satu karakter spesial (@, #, $, &, *, dll).",
		})
		.trim(),
};

export const SignInFormSchema = z.object(SignInObjectSchema);
export const SignInApiSchema = z.object(SignInObjectSchema);

export const SignInApiParse = {
	username: z.object({ username: z.string({ message: "Username atau email tidak ditemukan!" }) }),
	password: z.object({ password: z.boolean().refine((val): boolean => val === true, { message: "Kata sandi salah atau tidak valid!" }) }),
};

export type SignInReqData = z.infer<typeof SignInApiSchema>;
export type SignInFormData = z.infer<typeof SignInFormSchema>;
