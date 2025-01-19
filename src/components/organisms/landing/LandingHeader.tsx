"use client";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { LandingNavItem, LandingNavItemProps } from "@component/organisms/landing/LandingNavItem";
import { useAuth } from "@hook/AuthProvider";
import { brandIcon, useMetadata } from "@hook/useMetadata";
import useScroll from "@hook/useScroll";
import { route } from "@lib/uri";
import { Config } from "@src/utils/config.util";

export const LandingHeader = (): ReactElement => {
	const auth = useAuth();
	const [mobileMenuShow, setMobileMenuShow] = useState<boolean>(false);
	const navItem: LandingNavItemProps["items"] = [
		{
			name: "Producs",
			items: [
				{
					name: "Laporan Keuangan",
					description: "Catat mutasi transaksi di berbagai layanan keuangan, dengan laporan keuangan yang akurat",
					url: route.transaction,
					icon: "analytics",
				},
				{
					name: "Data Produk",
					description: "Bandingkan data produk dengan mudah dan cepat, dengan data produk yang terintegrasi",
					url: route.product,
					icon: "automations",
				},
				{
					name: "Rest API",
					description: "Buat layanan pencatat mutasi keuangan mu sendiri dengan layanan Rest API kami",
					url: route.developers,
					icon: "integrations",
				},
			],
		},
		{
			name: "Solutions",
			items: [
				{
					name: "Laporan",
					description: "Dapatkan laporan keuangan yang akurat",
					url: route.transaction,
					icon: "analytics",
				},
				{
					name: "Integrasi",
					description: "Integrasi layanan keuangan, w-wallet, dan bank",
					url: route.integration,
					icon: "integrations",
				},
				{
					name: "Otomatisasi",
					description: "Catat transaksi otomatis dari layanan keuangan",
					url: route.integration_connect,
					icon: "automations",
				},
				{
					name: "Kolaborasi",
					description: "Kolaborasi mutasi dengan keluarga dan tim",
					url: route.workspace,
					icon: "engagement",
				},
				{
					name: "Keamanan",
					description: "Keamanan data mutasi transaksi yang ditingkatkan",
					url: route.setting_certificate,
					icon: "security",
				},
			],
			footerItemLeft: {
				label: "Tonton Demo",
				url: route.video_demo,
				icon: "video",
			},
			footerItemRight: {
				label: "Tutorial",
				url: route.video_tutorial,
				icon: "video",
			},
		},
		{ name: "Pricing", url: route.pricing },
		{ name: "Docs", url: route.docs },
	];

	const [glassHeader, setGlassHeader] = useState<boolean>(false);
	const metadata: Metadata = useMetadata();
	useScroll((x: number, y: number): void => setGlassHeader(y > 10));

	return (
		<header className={"group/header fixed inset-x-0 top-0 z-50 transition-all duration-700"}>
			<nav
				className={clsx([
					"mx-auto flex max-w-full transition-all duration-700 ",
					mobileMenuShow ? "opacity-0" : "",
					glassHeader
						? "bg-white/5 bg-clip-padding shadow-2xl shadow-transparent backdrop-blur-md group-hover/header:bg-white/20 group-hover/header:shadow-blue-800/10 group-hover/header:backdrop-blur-2xl"
						: "group-hover/header:bg-white/20 group-hover/header:bg-clip-padding group-hover/header:shadow-blue-800/10 group-hover/header:backdrop-blur-2xl",
				])}
				aria-label="Global"
			>
				<div className="mx-auto flex w-full max-w-full items-center justify-between px-6 py-4 md:py-4 lg:px-8 xl:px-16 xl:py-5 2xl:max-w-10xl 2xl:px-24">
					<div className="flex items-center lg:flex-1">
						<Link href={Config.AppUrl} className="-m-1.5 flex items-center p-1.5">
							<Image
								className="h-6 w-auto md:h-7 lg:h-8"
								src={brandIcon.url.toString()}
								width={(brandIcon.sizes?.split("x")?.[0], 512)}
								height={(brandIcon.sizes?.split("x")?.[1], 512)}
								alt={metadata.applicationName || ""}
							/>
							{/* <span className="sr-only">{metadata.applicationName}</span> */}
							<span className="ml-1 text-base font-bold text-[#5035e1] md:text-lg lg:ml-1.5 lg:text-xl">{metadata.applicationName}</span>
						</Link>
					</div>
					<div className="flex items-center lg:hidden">
						<button
							type="button"
							onClick={(): void => setMobileMenuShow(!mobileMenuShow)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
						</button>
					</div>
					<div className="hidden lg:flex lg:items-center lg:gap-x-12">
						<LandingNavItem items={navItem} />
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						{auth?.user?.id ? (
							<Link
								href={route.dashboard}
								className="-my-2 rounded-lg bg-transparent px-4 py-2 text-sm/6 font-semibold text-gray-900 transition-all duration-700 hover:bg-white/20 hover:bg-clip-padding hover:backdrop-blur-xl active:scale-95 xl:text-base"
							>
								Dashboard
							</Link>
						) : (
							<Link
								href={route.signIn}
								className="-my-2 rounded-lg bg-transparent px-4 py-2 text-sm/6 font-semibold text-gray-900 transition-all duration-700 hover:bg-white/20 hover:bg-clip-padding hover:backdrop-blur-xl active:scale-95 xl:text-base"
							>
								Log in <span aria-hidden="true">&rarr;</span>
							</Link>
						)}
					</div>
				</div>
			</nav>
			<Transition
				as="div"
				show={mobileMenuShow}
				enter="transition-transform duration-700"
				enterFrom="translate-x-full"
				enterTo="translate-x-0"
				leave="transition-transform duration-700"
				leaveFrom="translate-x-0"
				leaveTo="translate-x-full"
				className="fixed right-0 top-0 size-full lg:hidden"
				role="dialog"
				aria-modal="true"
			>
				<div className="fixed inset-0 z-10"></div>
				<div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white/5 bg-clip-padding px-6 py-5 shadow-3xl backdrop-blur-md sm:max-w-sm sm:ring-1 sm:ring-white/50 sm:backdrop-blur-lg">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 flex items-center px-1.5">
							<span className="sr-only">{metadata.applicationName}</span>
							<Image
								className="h-6 w-auto md:h-7 lg:h-8"
								src={brandIcon.url.toString()}
								width={(brandIcon.sizes?.split("x")?.[0], 512)}
								height={(brandIcon.sizes?.split("x")?.[1], 512)}
								alt={metadata.applicationName || ""}
							/>
							<span className="ml-1 text-base font-bold text-[#5035e1] md:text-lg lg:ml-1.5 lg:text-xl">{metadata.applicationName}</span>
						</a>
						<button type="button" onClick={(): void => setMobileMenuShow(!mobileMenuShow)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
							<span className="sr-only">Close menu</span>
							<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</Transition>
		</header>
	);
};
