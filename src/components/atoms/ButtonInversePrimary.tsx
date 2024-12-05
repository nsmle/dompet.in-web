import gsap from "gsap";
import Link, { LinkProps } from "next/link";
import { CSSProperties, ReactElement, ReactNode, useEffect, useRef } from "react";

type ButtonInversePrimaryProps = LinkProps & {
	children: ReactNode;
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
	const linkRef = useRef<HTMLAnchorElement>(null);

	useEffect((): void => {
		if (props.anim) gsap.to(linkRef.current, motion);
	}, [props.anim]);

	return (
		<Link
			ref={linkRef}
			style={style}
			className="group inline-flex items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-700 px-8 py-2.5 font-sans text-sm font-semibold text-slate-100 shadow-xl transition-all duration-700 hover:scale-95 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-600 hover:text-white hover:shadow-2xl focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300 sm:text-base md:text-lg lg:text-lg"
			{...props}
		>
			{props.children}
		</Link>
	);
};
