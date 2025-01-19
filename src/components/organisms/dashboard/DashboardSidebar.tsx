"use client";

import { Button } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { route } from "@lib/uri";
import { useTheme, useThemeDispatch } from "@hook/ThemeProvider";
import { Icon, IconProps } from "@component/atoms/Icon";
import { logout } from "@app/actions/auth";

type Menu = {
	label: string;
	url: string;
	icon: IconProps["type"];
};

export const DashboardSidebar = (): ReactElement => {
	const theme = useTheme();
	const themeDispatch = useThemeDispatch();
	const pathname = usePathname();
	const [active, setActive] = useState<"Dashboard" | "Transaksi" | "Workspace" | "Lokasi" | "Laporan" | "Integrasi" | "Pengaturan" | "Keluar">("Dashboard");

	const menus: Menu[] = [
		{
			label: "Dashboard",
			url: route.dashboard,
			icon: "activity",
		},
		{
			label: "Transaksi",
			url: route.transaction,
			icon: "wallet",
		},
		{
			label: "Workspace",
			url: route.workspace,
			icon: "category",
		},
		{
			label: "Lokasi",
			url: route.location,
			icon: "location",
		},
		{
			label: "Laporan",
			url: route.report,
			icon: "chart",
		},
		{
			label: "Integrasi",
			url: route.integration,
			icon: "branch",
		},
		{
			label: "Pengaturan",
			url: route.setting,
			icon: "setting",
		},
		{
			label: "Keluar",
			url: "/auth/sign-out",
			icon: "right-from-bracket",
		},
	];

	useEffect((): void => {
		if (pathname.match(route.dashboard)) setActive("Dashboard");
		if (pathname.match(route.transaction)) setActive("Transaksi");
		if (pathname.match(route.workspace)) setActive("Workspace");
		if (pathname.match(route.location)) setActive("Lokasi");
		if (pathname.match(route.report)) setActive("Laporan");
		if (pathname.match(route.integration)) setActive("Integrasi");
		if (pathname.match(route.setting)) setActive("Pengaturan");
	}, [pathname]);

	return (
		<aside
			// className="fixed left-0 top-0 z-40 h-screen w-56 bg-transparent pt-20 transition-transform md:translate-x-0"
			className={clsx(
				"fixed left-0 top-0 z-40 h-screen w-screen bg-transparent pt-20 transition-transform md:w-56 md:-translate-x-0",
				"ring-1 ring-white/50 backdrop-blur-lg md:ring-0 md:backdrop-blur-none",
				theme.showMenu ? "translate-x-0" : "-translate-x-full",
			)}
			aria-label="Sidebar"
		>
			<div className="h-full overflow-y-auto px-3 pb-4">
				<ul className="space-y-1.5 font-medium md:space-y-3">
					{menus.map(
						(menu, indexMenu): ReactElement => (
							<li key={`${menu.label}-${indexMenu}`}>
								{menu.label == "Keluar" ? (
									<Button
										onClick={(): Promise<void> => logout()}
										type="button"
										className={clsx([
											"group flex w-full max-w-[320px]  items-center rounded-lg px-4 py-2 text-sm text-gray-900 hover:bg-[#5035e1]/10 sm:max-w-56 md:max-w-full md:text-base",
										])}
									>
										<Icon type={menu.icon} className={clsx("size-5 shrink-0 text-gray-500 transition duration-75 sm:size-5 md:size-6")} />
										<span className="ms-3 font-sans">{menu.label}</span>
									</Button>
								) : (
									<Link
										href={menu.url}
										onClick={(): any => theme.showMenu && themeDispatch({ showMenu: false })}
										className={clsx([
											"group flex w-full max-w-[320px]  items-center rounded-lg px-4 py-2 text-sm sm:max-w-56 md:max-w-full md:text-base",
											menu.label == active ? "bg-[#5035e1]/80 font-semibold text-white" : "text-gray-900 hover:bg-[#5035e1]/10",
										])}
									>
										<Icon
											type={`${menu.icon}${menu.label == active ? ".bold" : ""}` as IconProps["type"]}
											className={clsx(
												"size-5 shrink-0 transition duration-75 sm:size-5 md:size-6",
												menu.label == active ? "text-white" : "text-gray-500",
											)}
										/>
										<span className="ms-3 font-sans">{menu.label}</span>
									</Link>
								)}
							</li>
						),
					)}
				</ul>
			</div>
		</aside>
	);
};
