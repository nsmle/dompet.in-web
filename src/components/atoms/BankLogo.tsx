"use client";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { ReactElement, useRef, useState } from "react";

type BankLogoProps = {
	bank: string;
	href: string;
};

export const BankLogo = ({ bank, href }: BankLogoProps): ReactElement => {
	const ref = useRef<HTMLAnchorElement>(null);
	const [isHover, setIsHover] = useState<boolean>(false);

	const imageLoader = ({ width, quality }: ImageLoaderProps): string => {
		return `/bank${isHover ? "/" : "/inverse/"}${bank}.svg?w=${width}&q=${quality || 75}`;
	};

	return (
		<Link ref={ref} onMouseOver={(): void => setIsHover(true)} onMouseOut={(): void => setIsHover(false)} className="group " target="_blank" href={href}>
			<Image
				loader={imageLoader}
				alt={`Bank ${bank}`}
				loading="lazy"
				width="217"
				height="58"
				decoding="async"
				data-nimg="1"
				// eslint-disable-next-line tailwindcss/no-custom-classname
				className="bank-logo mx-auto max-h-[38px] max-w-[130px] rounded-lg border border-transparent bg-white/10 transition-shadow duration-700 hover:border-slate-100 hover:bg-clip-padding hover:shadow-xl hover:shadow-blue-900/10 hover:backdrop-blur-xl sm:bg-transparent lg:max-h-[58px] lg:max-w-[217px]"
				style={{ color: "transparent" }}
				src={bank}
			/>
		</Link>
	);
};
