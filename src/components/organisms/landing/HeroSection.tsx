/* eslint-disable tailwindcss/no-custom-classname */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DetailedHTMLProps, HTMLAttributes, ReactElement, useRef } from "react";
import { ButtonInversePrimary } from "@component/atoms/ButtonInversePrimary";
import { ButtonInverseSecondary } from "@component/atoms/ButtonInverseSecondary";
import { Banks } from "@component/molecules/Banks";
import { landing } from "@src/lib/landing";

export const HeroSection = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>): ReactElement => {
	const heroText = useRef(null);
	const contentText = useRef<HTMLParagraphElement>(null);

	useGSAP((): void => {
		gsap.to(heroText.current, {
			filter: "blur(0px)",
			duration: 0.7,
			ease: "power1.inOut",
			onComplete: (): void => {
				gsap.set(heroText.current, { filter: "blur(0px)" });
			},
		});

		gsap.to(contentText.current, {
			filter: "blur(0px)",
			duration: 1,
			ease: "power1.inOut",
			onComplete: (): void => {
				gsap.set(contentText.current, { filter: "blur(0px)" });
			},
		});
	});

	return (
		<section className="relative md:bg-white/5 lg:pt-40" {...props}>
			<div className="section 2xl:pt-58 mx-auto max-w-7xl px-4 pb-28 pt-32 text-center sm:px-6 sm:py-28 sm:pt-44 md:pb-40 md:pt-52 lg:px-6 lg:pt-36 xl:pt-48">
				<h1
					style={{ filter: "blur(5px)" }}
					ref={heroText}
					className="mx-auto max-w-4xl font-sans text-2xl font-semibold leading-tight text-slate-800 sm:text-3xl sm:leading-none md:text-4xl md:tracking-tight lg:text-6xl"
				>
					Integrasi
					<span className="relative md:whitespace-nowrap">
						<span className="relative mx-2 text-indigo-600 lg:mx-4">Mutasi Keuangan</span>
					</span>
					<br className="sm:hidden" />
					di Seluruh Platform.
				</h1>
				<p
					ref={contentText}
					style={{ filter: "blur(4px)" }}
					className="mx-auto mt-4 max-w-2xl font-sans text-sm font-medium tracking-tight text-slate-700/90 sm:text-lg md:text-lg lg:mt-6 lg:text-xl"
				>
					{landing.hero.text}
				</p>
				<div className="mt-10 flex flex-col justify-center gap-y-2 sm:flex-row sm:gap-x-4 md:gap-x-6 md:gap-y-0">
					<ButtonInversePrimary anim="fade-right" href="/auth/sign-in">
						Mulai Mencatat
					</ButtonInversePrimary>
					<ButtonInverseSecondary anim="fade-left" href="/docs/use-case">
						Explore Use Case
					</ButtonInverseSecondary>
				</div>
				<Banks />
			</div>
			<div className="absolute -bottom-20 -z-50 h-2/4 w-full bg-gradient-to-b from-transparent to-slate-200 lg:h-2/4" />
			<div
				className="h-[80px] w-full md:h-[128px]"
				style={{
					zIndex: "10",
					backgroundImage: "linear-gradient(to bottom, #00000000, rgb(226 232 240) 69%)",
					pointerEvents: "none",
					width: "100%",
					position: "absolute",
					inset: "auto auto 0% 0%",
				}}
			/>
		</section>
	);
};
