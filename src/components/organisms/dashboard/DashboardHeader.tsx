import { Button, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { logout } from "@app/actions/auth";
import { Icon } from "@component/atoms/Icon";
import { useAuth } from "@hook/AuthProvider";
import { useTheme, useThemeDispatch } from "@hook/ThemeProvider";
import { brandIcon } from "@hook/useMetadata";
import { route } from "@lib/uri";
import { Config } from "@src/utils/config.util";

type ProfileMenu = {
	title: string;
	action: string | (() => void);
	actType: "link" | "button";
};

export const DashboardHeader = (): ReactElement => {
	const { user } = useAuth();
	const theme = useTheme();
	const themeDispatch = useThemeDispatch();

	const [profileMenu, setProfileMenu] = useState<ProfileMenu[]>([
		{
			title: "Profile",
			action: route.profile,
			actType: "link",
		},
		{
			title: "Dashboard",
			action: route.dashboard,
			actType: "link",
		},
		{
			title: "Langganan",
			action: route.subscription,
			actType: "link",
		},
		{
			title: "Pengaturan",
			action: route.setting,
			actType: "link",
		},
	]);

	return (
		<nav className="fixed top-0 z-50 w-full bg-transparent">
			<div className="p-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						<Button
							className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
							onClick={(): void => themeDispatch({ showMenu: !theme.showMenu })}
							type="button"
						>
							<span className="sr-only">Open sidebar</span>
							<svg className="size-4 md:size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path
									clipRule="evenodd"
									fillRule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
								></path>
							</svg>
						</Button>

						{/* Brand Logo */}
						<Link href={route.dashboard} className="-m-1.5 flex items-center p-1.5 md:ms-3">
							<Image
								className="h-6 w-auto md:h-7 lg:h-8"
								src={brandIcon.url.toString()}
								width={(brandIcon.sizes?.split("x")?.[0], 512)}
								height={(brandIcon.sizes?.split("x")?.[1], 512)}
								alt={Config.AppName || ""}
							/>
							<span className="ml-1 text-base font-bold text-[#5035e1] md:text-lg lg:ml-1.5 lg:text-xl">{Config.AppName}</span>
						</Link>
					</div>
					<div className="relative flex items-center">
						<div
							className="ms-3 flex items-center"
							// onMouseDown={(): void => setShowProfileMenu(true)}
							// onMouseOut={(): void => setShowProfileMenu(false)}
						>
							<Button onClick={(): void => themeDispatch({ showProfileMenu: !theme.showProfileMenu })} type="button" className="flex text-sm">
								<div className="flex w-auto items-center justify-center rounded-full bg-slate-300 focus:ring-4 focus:ring-gray-300 md:rounded-md">
									<Image
										className="size-6 w-auto rounded-full md:size-7 md:rounded-md lg:size-8"
										src="/profile-photo.jpg"
										height={512}
										width={512}
										alt={user?.name ?? "default"}
									/>
								</div>
								<div className="hidden h-full w-auto md:flex">
									<div className="ms-3 flex h-full flex-col items-start justify-center">
										<span className="truncate font-sans text-sm font-semibold leading-none text-slate-800">{user?.name}</span>
										<span className="mt-0.5 truncate font-sans text-xs font-medium leading-none text-slate-500">@{user?.username}</span>
									</div>
									<Icon
										type={theme.showProfileMenu ? "chevron-up" : "chevron-down"}
										className="ms-4 mt-0.5 hidden size-3 self-start text-slate-400 md:flex"
									/>
								</div>
							</Button>
							<Transition
								as="div"
								show={theme.showProfileMenu}
								className={clsx([
									"absolute right-0 top-6 z-50 my-4 min-w-40 list-none divide-y divide-slate-200 rounded-lg border border-slate-300/60 bg-white text-base shadow-[-8px_8px_30px_0_rgba(30,58,128,0.1)] md:min-w-64",
									"transition-all focus:outline-none data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in-out",
								])}
							>
								<div className="px-4 py-3">
									<p className="truncate font-sans text-sm font-semibold text-gray-800">{user?.name}</p>
									<p className="truncate font-sans text-sm font-medium text-slate-500">{user?.email}</p>
								</div>
								<ul className="py-1">
									{profileMenu.map(
										(menu, indexProfileMenu): ReactElement => (
											<li key={`profile-menu-${menu.title}-${indexProfileMenu}`}>
												{menu.actType === "link" ? (
													<Link href={menu.action as string} className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-200/20">
														{menu.title}
													</Link>
												) : (
													<Button
														onClick={menu.action as () => void}
														type="button"
														className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-200/20"
													>
														{menu.title}
													</Button>
												)}
											</li>
										),
									)}
									<li className="mt-1 border-t border-slate-200 pt-1">
										<Button
											type="button"
											onClick={(): Promise<void> => logout()}
											className="group/logout flex w-full items-center gap-2 px-4 py-2 font-sans text-sm font-medium text-slate-800 hover:bg-red-300/10 hover:font-semibold hover:text-red-700"
										>
											<Icon type="right-from-bracket" className="size-4 truncate text-slate-500 group-hover/logout:text-red-500/80" />
											Sign out
										</Button>
									</li>
								</ul>
							</Transition>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
