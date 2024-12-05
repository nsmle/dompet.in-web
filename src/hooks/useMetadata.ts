import { Metadata } from "next";

const WEB_URL = "https://dompetin.vercel.app";
const WEB_TITLE = "DompetIn - Safe and Secure Transactions History";
const WEB_DESCRIPTION = "DompetIn is a web application to manage your transactions history";

export const useMetadata = (): Metadata => ({
	title: WEB_TITLE,
	description: WEB_DESCRIPTION,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: WEB_URL,
		title: WEB_TITLE,
		description: WEB_DESCRIPTION,
		images: [
			{
				url: `${WEB_URL}/mockup/dashboard.svg`,
				width: 1200,
				height: 630,
				alt: WEB_TITLE,
			},
		],
		siteName: "DompetIn",
	},
});
