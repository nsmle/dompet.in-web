"use client";
import { ReactElement } from "react";
import { ButtonInverseSecondary } from "@component/atoms/ButtonInverseSecondary";
import { Icon } from "@component/atoms/Icon";
import { useThemeDispatch } from "@hook/ThemeProvider";
import { route } from "@lib/uri";

export default function NotFound(): ReactElement {
	const dispatchTheme = useThemeDispatch();
	dispatchTheme({ headerType: "landing", footerType: "none" });

	return (
		<div className="relative overflow-hidden">
			<video
				autoPlay={true}
				loop={true}
				muted={true}
				playsInline={true}
				preload="none"
				data-wf-ignore="true"
				data-object-fit="cover"
				className=" absolute top-0 min-h-full object-cover sm:right-0 sm:scale-110 lg:-right-20 lg:top-10 lg:scale-110 xl:right-20 xl:scale-[1.8]"
			>
				<source type="video/mp4" data-wf-ignore="true" src="/motion/nsmle-motion-dtg.mp4" />
			</video>
			<div className="flex min-h-screen items-center justify-center overflow-hidden bg-blue-200/40 bg-clip-padding backdrop-blur-2xl">
				<div className="text-center">
					<h2 className="mx-auto max-w-4xl font-sans text-3xl font-semibold leading-tight text-slate-700 sm:text-3xl sm:leading-none md:text-4xl md:tracking-tight lg:text-6xl">
						Not Found
					</h2>
					<p className="mx-auto mb-4 mt-0.5 max-w-2xl font-sans text-sm font-medium tracking-tight text-slate-700/90 sm:mt-1 sm:text-lg md:mt-2 md:text-lg lg:mb-6 lg:mt-3 lg:text-xl">
						The page you requested could not be found
					</p>
					<ButtonInverseSecondary className="lg:px-8" icon={<Icon type="house" className="ml-1 h-4 w-auto" />} iconPlace="left" href={route.landing}>
						Back to Home
					</ButtonInverseSecondary>
				</div>
			</div>
		</div>
	);
}
