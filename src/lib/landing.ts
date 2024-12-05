import { ProblemSectionProps } from "@component/organisms/landing/ProblemSection";

type Landing = {
	hero: { text: string; bg: string; bgMinify: string };
	problems: ProblemSectionProps["problems"];
};

export const landing: Landing = {
	hero: {
		text: "Sebagian besar transaksi multi-sumber, sulit dicacat. Kami berfokus mempercepat proses pencatatan transaksi multi-sumber, dan berharap hasil pembukuan dapat langsung digunakan.",
		// bg: "/motion/background.mp4",
		// bgMinify: "/motion/background-minify.mp4",
		bg: "/motion/background-minify.mp4",
		bgMinify: "/motion/background-minify-1.mp4",
	},
	problems: [
		{
			title: "Pencatatan transaksi tidak terstruktur",
			description: "Pencatatan transaksi manual harian yang cepat dan sering bisa menyebabkan data yang hilang atau tidak akurat.",
			preview: "/motion/nsmle-motion-flg.gif",
		},
		{
			title: "Sulit memantau arus kas",
			description: "Tanpa kategorisasi transaksi yang jelas, menyebabkan kesulitan dalam memantau dan mengelola arus kas",
			preview: "/motion/nsmle-motion-tgd.mp4",
		},
		{
			title: "Kurangnya laporan keuangan",
			description: "Laporan keuangan kurang terstruktur, menyebabkan kesulitan dalam membuat keputusan finansial.",
			preview: "/motion/nsmle-motion-cgd.mp4",
		},
		{
			title: "Pencatatan multi-sumber sulit diterapkan",
			description: "Pencatatan transaksi dari berbagai sumber, seperti bank, e-wallet, fintech platform dan lainnya, sulit untuk dicatat.",
			preview: "/motion/nsmle-motion-dtg.mp4",
		},
	],
};
