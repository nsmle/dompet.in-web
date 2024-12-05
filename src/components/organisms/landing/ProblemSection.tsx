/* eslint-disable tailwindcss/no-custom-classname */
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { CardStack, CardStackProps } from "@component/molecules/CardStack";

export interface ProblemSectionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	id: string;
	problems: CardStackProps["items"];
}

export default function ProblemSection(props: ProblemSectionProps): ReactElement {
	return (
		<section className="relative z-20 bg-gradient-to-b from-slate-200 to-white pb-16 sm:pb-32 md:pt-12 lg:pb-44" {...props}>
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
					<h2 className="h2-title z-50 text-center font-sans text-xl font-semibold tracking-tight text-slate-600 sm:text-3xl md:text-4xl lg:text-5xl">
						Masalah yang coba kami selesaikan?
					</h2>
					<p className="mt-2 text-center font-sans text-sm font-medium tracking-tight text-slate-500 sm:text-base md:mt-6 md:text-lg lg:text-xl">
						Beberapa masalah yang sering kami jumpai dalam mencatat sebuah transaksi.
					</p>
				</div>
				<div className="pt-6 md:pt-8 lg:pt-16">
					<CardStack items={props.problems} />
				</div>
			</div>
		</section>
	);
}
