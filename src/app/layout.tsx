import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Metadata } from "next";
import { ReactElement } from "react";
import { geistMono, geistSans } from "@style/fonts";
import { useMetadata } from "@hook/useMetadata";
import "./../styles/globals.css";

gsap.registerPlugin(useGSAP);

export const metadata: Metadata = useMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): ReactElement {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<main>{children}</main>
			</body>
		</html>
	);
}
