"use client";
import { ReactElement, useEffect, useState } from "react";
import { useThemeDispatch } from "@hook/ThemeProvider";

type AuthLayoutProps = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps): ReactElement {
	const [firstInit, setFirstInit] = useState<boolean>(true);
	const dispatchTheme = useThemeDispatch();
	dispatchTheme({ headerType: "none", footerType: "none" });

	useEffect((): void => {
		if (firstInit) {
			setFirstInit(false);
		}
	}, [firstInit]);

	return (
		<div className="relative overflow-hidden bg-gradient-to-br from-slate-950 to-blue-950">
			<video
				autoPlay={true}
				loop={true}
				muted={true}
				playsInline={true}
				preload="none"
				data-wf-ignore="true"
				data-object-fit="cover"
				className="absolute bottom-5 min-h-full scale-[1.9] object-cover sm:right-0 lg:scale-110 xl:bottom-0 xl:scale-[1.8]"
			>
				{/* <source type="video/mp4" data-wf-ignore="true" src="/motion/nsmle-motion-cgd.mp4" /> */}
				{/* <source type="video/mp4" data-wf-ignore="true" src="/motion/nsmle-motion-tgd.mp4" /> */}
				<source type="video/mp4" data-wf-ignore="true" src="/motion/transcode.mp4" />
			</video>
			<div className="flex size-full min-h-screen flex-col items-center justify-center overflow-hidden bg-blue-900/20 bg-clip-padding backdrop-blur-xl lg:backdrop-blur-2xl">
				<div className="relative flex w-full max-w-md flex-col items-center justify-center px-3 sm:px-0">{children}</div>
			</div>
		</div>
	);
}
