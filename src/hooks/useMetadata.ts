import { Metadata } from "next";
import { IconDescriptor } from "next/dist/lib/metadata/types/metadata-types";
import { Config } from "@src/utils/config.util";

export const brandIcon: IconDescriptor = {
	url: Config.resolve("APP_URL/brand.svg"),
	type: "image/svg+xml",
	color: "purple",
	fetchPriority: "high",
	sizes: "512x512",
};

export const useMetadata = (pageTitle?: string, pageDescription?: string): Metadata => ({
	applicationName: Config.AppName,
	title: Config.AppTitle,
	description: Config.AppDescription,
	icons: [brandIcon],
	openGraph: {
		type: "website",
		locale: "id_ID",
		url: Config.AppUrl,
		title: Config.AppTitle,
		description: Config.AppDescription,
		images: [
			{
				url: Config.resolve("APP_URL/mockup/dashboard.svg"),
				width: 1200,
				height: 630,
				alt: Config.AppName,
			},
		],
		siteName: Config.AppName,
	},
});
