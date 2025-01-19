import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { ReactElement } from "react";
import { AuthProvider } from "@hook/AuthProvider";
import { ThemeProvider } from "@hook/ThemeProvider";
import { useMetadata } from "@hook/useMetadata";
import { getSession } from "@lib/dal";
import { geistMono, geistSans } from "@style/fonts";

import "./../styles/globals.css";

export const metadata: Metadata = useMetadata();

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): Promise<ReactElement> {
	const session = await getSession();

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthProvider user={session.user} isAuthenticate={session.isAuthenticate}>
					<ThemeProvider>{children}</ThemeProvider>
				</AuthProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
