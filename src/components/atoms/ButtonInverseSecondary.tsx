import gsap from "gsap";
import Link, { LinkProps } from "next/link";
import { CSSProperties, Fragment, ReactElement, ReactNode, useEffect, useRef } from "react";

type ButtonInverseSecondaryProps = LinkProps & {
	children: ReactNode;
	icon?: ReactNode;
	anim?: "fade-right" | "fade-left";
};

const getMotion = (motion?: ButtonInverseSecondaryProps["anim"]): gsap.TweenVars => {
	switch (motion) {
		case "fade-right":
			return { filter: "blur(0px)", delay: 0.08, opacity: 1, translateX: "0%" };
		case "fade-left":
			return { filter: "blur(0px)", delay: 0.08, opacity: 1, translateX: "0%" };
		default:
			return {};
	}
};

const getStyle = (motion?: ButtonInverseSecondaryProps["anim"]): CSSProperties => {
	switch (motion) {
		case "fade-right":
			return { filter: "blur(0px)", opacity: 0, transform: `translateX(-110%)` };
		case "fade-left":
			return { filter: "blur(0px)", opacity: 0, transform: `translateX(110%)` };
		default:
			return {};
	}
};

export const ButtonInverseSecondary = (props: ButtonInverseSecondaryProps): ReactElement => {
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
			className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 font-sans text-sm font-medium text-slate-600 transition-all duration-700 hover:scale-95 hover:text-slate-900 hover:shadow-2xl hover:ring-slate-300 focus:outline-none focus-visible:outline-blue-600 focus-visible:ring-slate-300 active:bg-slate-100 active:text-slate-600 sm:text-base md:text-lg lg:text-lg"
			{...props}
		>
			{props.icon ? (
				<Fragment>
					<span className="mr-2">{props.children}</span>
					{props.icon}
				</Fragment>
			) : (
				<Fragment>{props.children}</Fragment>
			)}
		</Link>
	);
};
