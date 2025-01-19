"use client";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, ReactElement, useState } from "react";
import { Icon, IconProps } from "@component/atoms/Icon";

interface ILandingNavItem {
	name: string;
	url?: string;
	icon?: string;
	items?: Array<{
		name: string;
		description: string;
		url: string;
		icon: IconProps["type"];
	}>;
	footerItemLeft?: { label: string; url: string; icon: IconProps["type"] };
	footerItemRight?: { label: string; url: string; icon: IconProps["type"] };
}

export interface LandingNavItemProps {
	items: ILandingNavItem[];
}

export const LandingNavItem = (props: LandingNavItemProps): ReactElement => {
	return (
		<Fragment>
			{props.items.map(
				(item, indexNavChildItem): ReactElement => (
					<Fragment key={`nav-child-item-${item.name}-${indexNavChildItem}`}>
						{item?.items?.length ? (
							<LandingItem {...item} />
						) : (
							<Link href={item?.url || "#"} className="text-sm/6 font-semibold text-slate-700 xl:text-base">
								{item.name}
							</Link>
						)}
					</Fragment>
				),
			)}
		</Fragment>
	);
};

export const LandingItem = (item: ILandingNavItem): ReactElement => {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<div className="relative" onMouseOver={(): void => setOpen(true)} onMouseLeave={(): void => setOpen(false)}>
				<button
					onClick={(): void => setOpen(!open)}
					type="button"
					className="flex items-center gap-x-1 text-sm/6 font-semibold text-slate-800 xl:text-base"
				>
					{item.name}
					<Icon type={open ? "chevron-up" : "chevron-down"} className="ml-1 size-3 flex-none text-slate-400/80" />
				</button>

				<Transition
					as="div"
					show={open}
					className={clsx([
						"absolute -left-10 top-full z-10 w-screen max-w-md pt-3",
						"transition-all focus:outline-none data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in-out",
					])}
				>
					<div className="mx-auto w-full overflow-hidden rounded-3xl bg-white shadow-4xl shadow-blue-800/20">
						<div className="p-4">
							{item.items?.map(
								(childItem, indexChildItem): ReactElement => (
									<div
										key={`nav-child-item-${childItem.name}-${indexChildItem}`}
										className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-slate-50"
									>
										<div className="flex size-11 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-violet-50">
											<Icon type={childItem.icon} className="size-6 flex-none text-slate-600 group-hover:text-indigo-600" />
										</div>
										<div className="flex-auto">
											<Link href={childItem.url} className="block font-semibold text-slate-700">
												{childItem.name}
												<span className="absolute inset-0"></span>
											</Link>
											<p className="mt-1 text-slate-500">{childItem.description}</p>
										</div>
									</div>
								),
							)}
						</div>
						<div className="grid grid-cols-2 divide-x divide-slate-900/5 bg-slate-50">
							{item.footerItemLeft && (
								<Link
									href={item.footerItemLeft.url}
									className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-slate-800 hover:bg-slate-100"
								>
									<Icon type={item.footerItemLeft.icon} className="size-5 flex-none text-slate-400" />
									{item.footerItemLeft.label}
								</Link>
							)}
							{item.footerItemRight && (
								<Link
									href={item.footerItemRight.url}
									className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-slate-800 hover:bg-slate-100"
								>
									<Icon type={item.footerItemRight.icon} className="size-5 flex-none text-slate-400" />
									{item.footerItemRight.label}
								</Link>
							)}
						</div>
					</div>
				</Transition>
			</div>
		</Fragment>
	);
};
