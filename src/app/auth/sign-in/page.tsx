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
import { SignInFormData, SignInFormSchema } from "@lib/definitions/signin.definition";
import { route } from "@lib/uri";
import { Config } from "@src/utils/config.util";

export default function SignInPage(): ReactElement {
	const auth = useAuth();
	const [disable, setDisable] = useState(false);
	const form = useForm<SignInFormData>({
		mode: "onChange",
		resolver: zodResolver(SignInFormSchema),
	});

	// @TODO: Implement sign up with third party provider
	const signInProviderUnImplement = (provider: string): string => toast.error(`Login dengan ${provider} belum aktif, Silahkan login dengan username.`);

	const onSubmit = async (formData: SignInFormData): Promise<void> => {
		if (!auth.signIn) return;
		setDisable(true);
		const login = await auth.signIn(formData);
		if (login.errors) login.errors.map((error): void => form.setError(error.path[0] as keyof SignInFormData, { message: error.message }));

		toast[login.ok ? "success" : "error"](login.message);
		if (login.ok) return redirect(route.dashboard, RedirectType.push);
		setDisable(false);
	};

	return (
		<div className=" w-full">
			<div className="group w-full max-w-md overflow-hidden rounded-2xl border border-white/50 transition-all duration-700 hover:shadow-4xl hover:shadow-white/20 sm:border">
				<div className="border-b border-white/50 bg-white/35 bg-clip-padding pb-6 pt-8 text-center backdrop-blur-3xl transition-all duration-700 group-hover:bg-white/45">
					<h3 className="font-sans text-lg font-bold text-slate-950 sm:text-slate-800">
						Masuk ke{" "}
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
									<InputInverse placeholder="Username" autoComplete="username" required={true} type="text" name="username" />
									<InputInverse placeholder="Password" autoComplete="password" required={true} type="password" name="password" />
									<ButtonInversePrimary
										type="submit"
										disabled={disable || form.formState.isLoading || form.formState.isSubmitting}
										loading={disable || form.formState.isLoading}
										className="h-10 w-full whitespace-nowrap rounded-md border border-transparent text-white transition-all duration-700 hover:ring-4 hover:ring-blue-600/20 disabled:hover:to-slate-700 sm:text-[16px] md:text-[16px] lg:text-[16px]"
									>
										Sign in
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
							onClick={(): string => signInProviderUnImplement("Google")}
							// href="/auth/google"
							className="h-10 min-w-0 truncate rounded-md bg-white bg-clip-padding px-4 py-2 text-sm/6 font-semibold text-slate-900 backdrop-blur-xl transition-all duration-700 hover:bg-white/50 hover:text-slate-950 active:scale-95 md:text-sm/6 lg:text-sm/6 xl:text-sm/6"
						>
							Sign-in with Google
						</ButtonInverseSecondary>
						<ButtonInverseSecondary
							icon={<Icon type="github" className="size-4" />}
							iconPlace="left"
							onClick={(): string => signInProviderUnImplement("Github")}
							// href="/auth/github"
							className="h-10 min-w-0 truncate rounded-md bg-white bg-clip-padding px-4 py-2 text-sm/6 font-semibold text-slate-900 backdrop-blur-xl transition-all duration-700 hover:bg-white/50 hover:text-slate-950 active:scale-95 md:text-sm/6 lg:text-sm/6 xl:text-sm/6"
						>
							Sign-in with GitHub
						</ButtonInverseSecondary>
					</div>
				</div>
			</div>
			<p className="z-10 mt-4 text-center font-sans text-sm text-slate-200">
				Belum punya akun?&nbsp;&nbsp;
				<Link className="font-sans font-semibold text-slate-100 underline underline-offset-2 transition-colors hover:text-white" href="/auth/sign-up">
					Sign up
				</Link>
			</p>
		</div>
	);
}
