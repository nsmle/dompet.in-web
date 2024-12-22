import { Metadata } from "next";
import { ReactElement } from "react";
import { Header } from "@component/organisms/Header";
import { useMetadata } from "@hook/useMetadata";
import { geistMono, geistSans } from "@style/fonts";
import "./../styles/globals.css";

export const metadata: Metadata = useMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): ReactElement {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
