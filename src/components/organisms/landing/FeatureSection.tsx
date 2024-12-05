"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, ReactElement } from "react";

export default function FeatureSection({ id }: { id: string }): ReactElement {
	const features = [
		{
			title: "Analisis arus kas",
			description:
				"Analisis arus kas mendetail, memudahkan pemantauan pengeluaran dan keuntungan, serta membantu mengidentifikasi pola untuk pengambilan keputusan yang lebih baik.",
			preview: "/mockup/dashboard.svg",
		},
		{
			title: "Kategorisasi transaksi",
			description:
				"Kategorisasi transaksi manual dan otomatis, memudahkan dalam melacak pengeluaran dan pendapatan, serta memudahkan dalam pembuatan laporan keuangan.",
			preview: "/mockup/transaction.svg",
		},
		{
			title: "Integrasi",
			description:
				"Integrasikan dengan platform lain dan catatan transaksi secara otomatis, memastikan akurasi dan memperbarui data keuangan secara real-time, sehingga mengurangi risiko kesalahan manusia.",
			preview: "/mockup/dashboard.svg",
		},
		{
			title: "Laporan keuangan",
			description:
				"Laporan bulanan dan tahunan dengan cepat dan detail, memudahkan  dalam mengevaluasi kinerja usaha dan merencanakan langkah-langkah perbaikan yang diperlukan.",
			preview: "/mockup/transaction.svg",
		},
	];

	return (
		<section id={id} aria-label="Features" className="relative overflow-hidden">
			<video
				autoPlay={true}
				loop={true}
				muted={true}
				playsInline={true}
				preload="none"
				data-wf-ignore="true"
				data-object-fit="cover"
				className="absolute bottom-0 min-h-full scale-[2.4] bg-gradient-to-b from-slate-800 object-cover sm:scale-[2.1] lg:scale-[1.2]"
			>
				<source type="video/mp4" data-wf-ignore="true" src="/motion/transcode.mp4" />
			</video>
			<div
				className={
					"w-full h-full pb-16 pt-20 sm:py-28 " +
					" bg-[rgb(3,12,77)]/20 md:bg-[rgb(3,12,77)]/30 lg:bg-[rgb(3,12,77)]/25 bg-clip-padding backdrop-blur-md sm:backdrop-blur backdrop-contrast-100 backdrop-saturate-100"
				}
			>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
					<div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
						<h2 className="text-center font-sans text-xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
							Solusi yang kami tawarkan!
						</h2>
						<p className="mt-1 text-center font-sans text-sm font-medium tracking-tight text-white/80 sm:text-base md:mt-3 md:text-lg lg:mt-6 lg:text-xl">
							Semua fitur yang kamu butuhkan untuk mengelola keuangan tersedia.
						</p>
					</div>
					<TabGroup
						defaultIndex={0}
						vertical
						as="div"
						className="grid grid-cols-1 items-center gap-y-2 pt-10 sm:mt-8 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
					>
						<div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:pb-0 lg:col-span-5 lg:overflow-visible">
							<TabList
								as="div"
								className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto md:px-6 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal lg:px-0"
							>
								{features.map(
									({ title, description }, index): ReactElement => (
										<Tab as={Fragment} key={`feature-${index}`}>
											{({ hover, selected }): ReactElement => (
												<div
													className={
														selected
															? "group relative my-0.5 rounded-full bg-white px-4 py-1 outline-none lg:rounded-l-xl lg:rounded-r-none lg:bg-white/20 lg:p-6 lg:ring-1 lg:ring-inset lg:ring-white/10"
															: "group relative my-0.5 cursor-pointer rounded-full bg-white/20 px-4  py-1 outline-none hover:bg-white/10 sm:bg-white/5 lg:rounded-l-xl lg:rounded-r-none lg:bg-transparent lg:p-6 lg:hover:bg-white/10"
													}
												>
													<h3
														className={`text-base md:text-lg ${selected ? "text-slate-800 hover:text-slate-600 lg:text-white lg:hover:text-white" : "text-blue-50 hover:text-white"}`}
													>
														<span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"></span>
														{title}
													</h3>
													<p className="mt-2 hidden font-sans text-sm text-blue-100 group-hover:text-white lg:block">{description}</p>
												</div>
											)}
										</Tab>
									),
								)}
							</TabList>
						</div>
						<TabPanels as="div" className="lg:col-span-7">
							{features.map(
								({ description, preview }, index): ReactElement => (
									<TabPanel as="div" key={`feature-content-${index}`}>
										{({ selected }) => (
											<Transition show={selected}>
												<div className="relative sm:px-6 lg:hidden">
													<div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] hidden bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:block sm:rounded-t-xl"></div>
													<p className="relative mx-auto max-w-2xl text-xs text-white/70 sm:text-center sm:text-sm md:text-base">
														{description}
													</p>
												</div>
												<div
													className={
														// "mt-3 sm:mt-4 md:mt-6 w-full overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem] " +
														"mt-3 sm:mt-4 md:mt-6 w-full overflow-hidden rounded-xl  bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[66.4rem] " +
														"transition duration-300 ease-in data-[closed]:opacity-0"
													}
												>
													{/* <Image
														alt=""
														width="2174"
														height="1464"
														decoding="async"
														className="size-full"
														sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
														src={preview}
													/> */}
													<Image
														alt=""
														width="1920"
														height="1311"
														decoding="async"
														className="size-full"
														sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
														src={preview}
													/>
												</div>
											</Transition>
										)}
									</TabPanel>
								),
							)}
						</TabPanels>
					</TabGroup>
				</div>
			</div>
		</section>
	);
}
