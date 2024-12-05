import Image from "next/image";
import { default as NextLink } from "next/link";
import { Fragment, ReactElement, ReactNode } from "react";

export type CardProps = {
	title: string;
	description: string;
	href?: string;
	preview?: string;
};

const Link = ({ href, children, className }: { href?: string; children: ReactNode; className?: string }): ReactElement => {
	return href ? (
		<NextLink href={href} className={className}>
			{children}
		</NextLink>
	) : className ? (
		<div className={className}>{children}</div>
	) : (
		<Fragment>{children}</Fragment>
	);
};

export const Card = ({ title, description, href, preview }: CardProps): ReactElement => {
	const isVideo = Boolean(preview?.includes(".mp4"));

	return (
		<div className="group/card relative overflow-hidden rounded-3xl border border-transparent shadow-3xl shadow-blue-700/5 transition-all duration-700 hover:border-white hover:bg-white hover:shadow-blue-900/20 sm:rounded-4xl lg:rounded-5xl">
			{preview && (
				<Link
					href={href}
					className="flex aspect-video overflow-hidden rounded-t-3xl border-none bg-slate-300/80 transition-all duration-700 group-hover/card:rounded-3xl sm:rounded-t-4xl sm:group-hover/card:rounded-b-3xl sm:group-hover/card:rounded-t-4xl lg:rounded-t-5xl lg:group-hover/card:rounded-b-4xl lg:group-hover/card:rounded-t-5xl"
				>
					{isVideo ? (
						<video
							autoPlay={true}
							loop={true}
							muted={true}
							playsInline={true}
							preload="auto"
							data-wf-ignore="true"
							data-object-fit="cover"
							className="size-full  object-cover transition-all duration-700 group-hover/card:scale-105"
						>
							<source type="video/mp4" data-wf-ignore="true" src={preview} />
						</video>
					) : (
						<Image
							alt={`Image`}
							loading="lazy"
							width="217"
							height="58"
							decoding="async"
							data-nimg="1"
							className="size-full object-cover transition-all duration-700 group-hover/card:scale-105"
							src={preview}
						/>
					)}
				</Link>
			)}
			<div className="bg-gradient-to-b from-white to-white/5 p-4 md:p-6">
				<Link href={href}>
					<h5 className="mb-2 font-sans text-base font-semibold tracking-tight text-slate-600/95 group-hover/card:text-slate-600 md:text-lg lg:text-xl">
						{title}
					</h5>
				</Link>
				<p className="mb-3 font-sans text-xs font-medium leading-tight text-slate-500 md:text-sm">{description}</p>
			</div>
		</div>
	);
};
