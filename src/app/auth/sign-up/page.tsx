"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { ReactElement, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ButtonInversePrimary } from "@component/atoms/ButtonInversePrimary";
import { ButtonInverseSecondary } from "@component/atoms/ButtonInverseSecondary";
import { Icon } from "@component/atoms/Icon";
import { InputInverse } from "@component/atoms/InputInverse";
import { useAuth } from "@hook/AuthProvider";
import { SignUpFormData, SignUpFormSchema } from "@lib/definitions/signup.definition";
import { route } from "@lib/uri";
import { Config } from "@src/utils/config.util";

export default function SignUpPage(): ReactElement {
	const auth = useAuth();
	const [disable, setDisable] = useState(false);
	const form = useForm<SignUpFormData>({
		mode: "onChange",
		resolver: zodResolver(SignUpFormSchema),
	});

	const username = form.watch("username");
	const showAnotherFieldClassName = Boolean(username?.length && !form.formState.errors["username"]?.message?.length) ? "block" : "hidden";

	// @TODO: Implement sign up with third party provider
	const signUpProviderUnImplement = (provider: string): string => toast.error(`Daftar dengan ${provider} belum aktif, Silahkan daftar dengan email.`);

	const onSubmit = async (formData: SignUpFormData): Promise<void> => {
		if (!auth.signUp) return;
		setDisable(true);
		const register = await auth.signUp(formData);
		if (register.errors) {
			register.errors.map((error): void => form.setError(error.path[0] as keyof SignUpFormData, { message: error.message }));
		}

		toast[register.ok ? "success" : "error"](register.message);
		if (register.ok) return redirect(route.signIn, RedirectType.push);
		setDisable(false);
	};

	return (
		<div className=" w-full">
			<div className="group w-full max-w-md overflow-hidden rounded-2xl border border-white/50 transition-all duration-700 hover:shadow-4xl hover:shadow-white/20 sm:border">
				<div className="border-b border-white/50 bg-white/35 bg-clip-padding pb-6 pt-8 text-center backdrop-blur-3xl transition-all duration-700 group-hover:bg-white/45">
					<h3 className="font-sans text-lg font-bold text-slate-950 sm:text-slate-800">
						Buat akun{" "}
						<Link href={route.landing} className="hover:text-[#5035e1]">
							{Config.AppName}
						</Link>
					</h3>
				</div>
				<div className="bg-white/25 bg-clip-padding px-4 py-8 backdrop-blur-xl transition-all duration-700 group-hover:bg-white/35 sm:px-16">
					<div className="flex flex-col gap-3">
						<FormProvider {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="flex flex-col space-y-4">
									<InputInverse
										wrapperClassName={showAnotherFieldClassName}
										placeholder="Nama"
										autoComplete="name"
										required={true}
										type="text"
										name="name"
									/>
									<InputInverse
										placeholder="Username"
										autoComplete="username"
										checkUsername={true}
										required={true}
										type="text"
										name="username"
									/>
									<InputInverse
										wrapperClassName={showAnotherFieldClassName}
										placeholder="Email"
										autoComplete="email"
										required={true}
										type="email"
										name="email"
									/>
									<InputInverse
										wrapperClassName={showAnotherFieldClassName}
										placeholder="Password"
										autoComplete="password"
										required={true}
										type="password"
										name="password"
									/>
									<InputInverse
										wrapperClassName={showAnotherFieldClassName}
										placeholder="Konfirmasi Password"
										autoComplete="password"
										required={true}
										type="password"
										name="rePassword"
									/>
									<ButtonInversePrimary
										type="submit"
										disabled={disable || form.formState.isLoading || form.formState.isSubmitting}
										loading={disable || form.formState.isLoading}
										className="h-10 w-full whitespace-nowrap rounded-md border border-transparent text-white transition-all duration-700 hover:bg-gray-800 hover:ring-4 hover:ring-blue-600/20 sm:text-[16px] md:text-[16px] lg:text-[16px]"
									>
										Sign up
									</ButtonInversePrimary>
								</div>
							</form>
						</FormProvider>
						<div className="my-2 flex shrink items-center justify-center gap-2">
							<div className="grow basis-0 border-b border-slate-300/80"></div>
							<span className="text-xs font-normal uppercase leading-none text-slate-200">or</span>
							<div className="grow basis-0 border-b border-slate-300/80"></div>
						</div>
						<ButtonInverseSecondary
							icon={<Icon type="google" className="size-4" />}
							iconPlace="left"
							onClick={(): string => signUpProviderUnImplement("Google")}
							// href="/auth/google"
							className="h-10 min-w-0 truncate rounded-md bg-white bg-clip-padding px-4 py-2 text-sm/6 font-semibold text-slate-900 backdrop-blur-xl transition-all duration-700 hover:bg-white/50 hover:text-slate-950 active:scale-95 md:text-sm/6 lg:text-sm/6 xl:text-sm/6"
						>
							Continue with Google
						</ButtonInverseSecondary>
						<ButtonInverseSecondary
							icon={<Icon type="github" className="size-4" />}
							iconPlace="left"
							onClick={(): string => signUpProviderUnImplement("GitHub")}
							// href="/auth/github"
							className="h-10 min-w-0 truncate rounded-md bg-white bg-clip-padding px-4 py-2 text-sm/6 font-semibold text-slate-900 backdrop-blur-xl transition-all duration-700 hover:bg-white/50 hover:text-slate-950 active:scale-95 md:text-sm/6 lg:text-sm/6 xl:text-sm/6"
						>
							Continue with GitHub
						</ButtonInverseSecondary>
					</div>
				</div>
			</div>
			<p className="z-10 mt-4 text-center font-sans text-sm text-slate-200">
				Sudah punya akun?&nbsp;&nbsp;
				<Link className="font-sans font-semibold text-slate-100 underline underline-offset-2 transition-colors hover:text-white" href="/auth/sign-in">
					Sign in
				</Link>
			</p>
		</div>
	);
}
