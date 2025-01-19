"use client";

import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import { Api } from "@lib/api";

type InputElement = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type InputInverseProps = InputElement & {
	checkUsername?: boolean;
	error?: string;
	name: string;
	wrapperClassName?: string;
};

export const InputInverse = (props: InputInverseProps): ReactElement => {
	const { className, wrapperClassName, ...properties } = props;
	const methods = useFormContext();
	const state = methods.formState;
	const isError = state.errors[props.name];

	const handleOnUsernameChange = async (e: any): Promise<void> => {
		const value = e.target.value.toLowerCase();

		if (value.length >= 4 && value.length <= 20) {
			methods.setValue("username", value, { shouldValidate: false, shouldDirty: false });
			const isExists = await Api.usernameExists(value);
			if (isExists) return methods.setError("username", { message: "Username sudah ada, silahkan gunakan username lain.", type: "value" });
			methods.clearErrors("username");
		} else {
			methods.setValue("username", value, { shouldValidate: true, shouldDirty: true });
		}
	};

	return (
		<div className={wrapperClassName}>
			<input
				type={properties?.type || "text"}
				className={clsx(
					"block w-full rounded-lg border bg-clip-padding p-2.5 font-sans text-sm font-medium backdrop-blur placeholder:font-normal hover:backdrop-blur-md focus:outline-none focus:backdrop-blur-2xl",
					!isError
						? "border-white/15 bg-white/5 text-slate-950 placeholder:text-slate-700 hover:border-white/20 hover:bg-white/15 focus:border-white/80 focus:bg-white/30 focus:ring-green-500"
						: "border-red-500/40 bg-red-500/15 text-red-700 placeholder:text-red-600/80 hover:border-red-500/50 hover:bg-red-500/10 focus:border-red-500/80 focus:bg-red-500/10 focus:ring-red-500",
					className,
				)}
				placeholder={props.placeholder}
				autoComplete={props.autoComplete}
				{...methods.register(properties.name as string, { required: props.required, disabled: props.disabled })}
				{...(props.name == "username" && props?.checkUsername ? { onChange: handleOnUsernameChange } : {})}
			/>
			{isError && (
				<span className="mt-1 block font-sans text-xs font-medium leading-tight text-red-300 drop-shadow-4xl">
					{(state.errors[props.name] as any)?.message}
				</span>
			)}
		</div>
	);
};
