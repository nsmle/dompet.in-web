"use client";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useThemeDispatch } from "@hook/ThemeProvider";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps): ReactElement {
	const [firstInit, setFirstInit] = useState<boolean>(true);
	const dispatchTheme = useThemeDispatch();
	dispatchTheme({ headerType: "dashboard", footerType: "none" });

	useEffect((): void => {
		if (firstInit) {
			setFirstInit(false);
		}
	}, [firstInit]);

	return <Fragment>{children}</Fragment>;
}
