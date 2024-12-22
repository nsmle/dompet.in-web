import clsx from "clsx";
import gsap from "gsap";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, CSSProperties, DetailedHTMLProps, Fragment, ReactElement, ReactNode, useEffect, useRef } from "react";

type ButtonInverseSecondaryProps = LinkProps &
	DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
		children: ReactNode;
		icon?: ReactNode;
		iconPlace?: "left" | "right";
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
	const { className, ...linkProps } = props;

	useEffect((): void => {
		if (props.anim) gsap.to(linkRef.current, motion);
	}, [props.anim]);

	return (
		<Link
			ref={linkRef}
			style={style}
			className={clsx([
				"group inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 font-sans text-sm font-medium text-slate-600 transition-all duration-700 hover:scale-95 hover:text-slate-900 hover:shadow-2xl hover:ring-slate-300 focus:outline-none focus-visible:outline-blue-600 focus-visible:ring-slate-300 active:bg-slate-100 active:text-slate-600 sm:text-base md:text-lg lg:text-lg " +
					className,
			])}
			{...linkProps}
		>
			{props.icon ? (
				<div className="flex items-center justify-center">
					{props?.iconPlace == "left" ? props.icon : ""}
					<span className={props?.iconPlace == "left" ? "ml-2" : "mr-2"}>{props.children}</span>
					{props?.iconPlace == "right" ? props.icon : ""}
					{!props?.iconPlace && props.icon}
				</div>
			) : (
				<Fragment>{props.children}</Fragment>
			)}
		</Link>
	);
};
