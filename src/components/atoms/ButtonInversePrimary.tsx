"use client";

import clsx from "clsx";
import gsap from "gsap";
import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, Fragment, ReactElement, ReactNode, RefObject, useEffect, useRef } from "react";
import { Spinner } from "@component/atoms/Spinner";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonInversePrimaryProps = Partial<LinkProps> &
	Partial<ButtonProps> & {
		children: ReactNode;
		loading?: boolean;
		anim?: "fade-right" | "fade-left";
	};

const getMotion = (anim?: ButtonInversePrimaryProps["anim"]): gsap.TweenVars => {
	switch (anim) {
		case "fade-right":
			return { filter: "blur(0px)", delay: 0.08, opacity: 1, translateX: "0%" };
		case "fade-left":
			return { filter: "blur(0px)", delay: 0.08, opacity: 1, translateX: "0%" };
		default:
			return {};
	}
};

const getStyle = (anim?: ButtonInversePrimaryProps["anim"]): CSSProperties => {
	switch (anim) {
		case "fade-right":
			return { filter: "blur(0px)", opacity: 0, transform: `translateX(-110%)` };
		case "fade-left":
			return { filter: "blur(0px)", opacity: 0, transform: `translateX(110%)` };
		default:
			return {};
	}
};

export const ButtonInversePrimary = (props: ButtonInversePrimaryProps): ReactElement => {
	const style = getStyle(props.anim);
	const motion = getMotion(props.anim);
	const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
	const { className, loading, ...properties } = props;

	useEffect((): void => {
		if (props.anim) gsap.to(ref.current, motion);
	}, [props.anim]);

	return (
		<Fragment>
			{props.href ? (
				<Link
					ref={ref as RefObject<HTMLAnchorElement>}
					style={style}
					className={clsx([
						"group inline-flex items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-700 px-8 py-2.5 font-sans text-sm font-semibold text-slate-100 shadow-xl transition-all duration-700 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-600 hover:text-white hover:shadow-2xl focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300 sm:text-base md:text-lg lg:text-lg",
						props?.disabled && "cursor-not-allowed opacity-80",
						!props?.disabled && !props?.loading ? "cursor-pointer hover:scale-95" : "cursor-wait",
						className,
					])}
					{...(properties as LinkProps)}
				>
					{loading && <Spinner />}
					{props.children}
				</Link>
			) : (
				<button
					ref={ref as RefObject<HTMLButtonElement>}
					style={style}
					className={clsx([
						"group inline-flex items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-700 px-8 py-2.5 font-sans text-sm font-semibold text-slate-100 shadow-xl transition-all duration-700 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-600 hover:text-white hover:shadow-2xl focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300 sm:text-base md:text-lg lg:text-lg",
						props?.disabled && "cursor-not-allowed opacity-60",
						!props?.disabled && !props?.loading ? "cursor-pointer hover:scale-95" : "cursor-wait",
						className,
					])}
					{...(properties as ButtonProps)}
				>
					{loading && <Spinner />}
					{props.children}
				</button>
			)}
		</Fragment>
	);
};
