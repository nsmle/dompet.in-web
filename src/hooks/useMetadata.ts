import { Metadata } from "next";
import { IconDescriptor } from "next/dist/lib/metadata/types/metadata-types";

export const transcode = (text?: string): string => {
	if (!text) return "";
	const transcoded = text
		.replace(/APP_URL/gm, String(process.env.NEXT_PUBLIC_APP_URL))
		.replace(/APP_NAME/gm, String(process.env.NEXT_PUBLIC_APP_NAME))
		.replace(/APP_TITLE/gm, String(process.env.NEXT_PUBLIC_APP_TITLE))
		.replace(/APP_DESCRIPTION/gm, String(process.env.NEXT_PUBLIC_APP_DESCRIPTION))
		.trim();
	return transcoded;
};

export const brandIcon: IconDescriptor = {
	url: transcode("APP_URL/brand.svg"),
	type: "image/svg+xml",
	color: "purple",
	fetchPriority: "high",
	sizes: "512x512",
};

export const APP_URL: string = transcode("APP_URL");
export const APP_NAME: string = transcode("APP_NAME");
export const APP_TITLE: string = transcode("APP_TITLE");
export const APP_DESCRIPTION: string = transcode("APP_DESCRIPTION");
export const APP_ICON: IconDescriptor[] = [brandIcon];

export const useMetadata = (pageTitle?: string, pageDescription?: string): Metadata => ({
	applicationName: APP_NAME,
	title: transcode(pageTitle || APP_TITLE),
	description: transcode(pageDescription || APP_DESCRIPTION),
	icons: APP_ICON,
	openGraph: {
		type: "website",
		locale: "id_ID",
		url: APP_URL,
		title: transcode(pageTitle || APP_TITLE),
		description: transcode(pageDescription || APP_DESCRIPTION),
		images: [
			{
				url: transcode("APP_URL/mockup/dashboard.svg"),
				width: 1200,
				height: 630,
				alt: APP_TITLE,
			},
		],
		siteName: APP_NAME,
	},
});
