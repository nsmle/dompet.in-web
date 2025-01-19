import { z } from "zod";

const SignUpObjectSchema = {
	name: z.string().min(3, { message: "Nama harus minimal panjang 3 characters." }).trim(),
	username: z
		.string()
		.min(4, { message: "Username harus minimal 4 karakter." })
		.max(20, { message: "Username tidak boleh lebih dari 20 karakter." })
		.regex(/^[a-z0-9._]+$/, { message: "Username hanya boleh berisi huruf kecil, angka, underscore, dan titik." })
		.trim(),
	email: z.string().email({ message: "Email harus berupa alamat email yang valid." }).trim(),
	password: z
		.string()
		.min(8, { message: "Panjang password harus minimal 8 karakter." })
		.regex(/[a-zA-Z]/, { message: "Harus berisi setidaknya satu huruf." })
		.regex(/[0-9]/, { message: "Harus berisi setidaknya satu angka." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Harus berisi setidaknya satu karakter spesial (@, #, $, &, *, dll).",
		})
		.trim(),
	rePassword: z.string().min(8, { message: "Panjang konfirmasi password harus minimal 8 karakter." }).trim(),
};

export const SignUpFormSchema = z.object(SignUpObjectSchema).refine((data): boolean => data.password === data["rePassword"], {
	message: "Konfirmasi password harus sama dengan password.",
	path: ["rePassword"],
});

const { rePassword, ...SignUpApiObjectSchema } = SignUpObjectSchema;
export const SignUpApiSchema = z.object(SignUpApiObjectSchema);

export type SignUpReqData = z.infer<typeof SignUpApiSchema>;
export type SignUpFormData = z.infer<typeof SignUpFormSchema>;
