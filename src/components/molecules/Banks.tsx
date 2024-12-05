import { ReactElement } from "react";
import { BankLogo } from "@component/atoms/BankLogo";

export const Banks = (): ReactElement => {
	const banks = [
		{ name: "BCA", uri: "/docs/integration/bca" },
		{ name: "BNI", uri: "/docs/integration/bni" },
		{ name: "BRI", uri: "/docs/integration/bri" },
		{ name: "CIMB-Niaga", uri: "/docs/integration/cimb-niaga" },
		{ name: "BJB", uri: "/docs/integration/bjb" },
		{ name: "BTN", uri: "/docs/integration/btn" },
		{ name: "MANDIRI", uri: "/docs/integration/mandiri" },
		{ name: "PERMATA", uri: "/docs/integration/permata-bank" },
		{ name: "BSI", uri: "/docs/integration/bsi" },
		{ name: "MEGA", uri: "/docs/integration/mega" },
	];

	return (
		// eslint-disable-next-line tailwindcss/no-custom-classname
		<div className="banks group mt-16 rounded-2xl border border-white/50 bg-white/5 bg-clip-padding py-6 shadow-2xl shadow-blue-400/5 backdrop-blur-md transition-all duration-700 hover:border-white/80 hover:bg-white/35 hover:shadow-2xl hover:shadow-blue-800/10 lg:mt-24 lg:rounded-3xl lg:hover:px-4">
			<p className="mx-4 font-sans text-sm font-medium text-slate-500 group-hover:text-slate-600/90 sm:mx-0 sm:text-base md:text-lg">
				Integrasikan mutasi transaksi di berbagai layanan
			</p>
			<div className="mx-auto mt-10 grid w-full grid-cols-2 gap-x-0 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-3 lg:gap-y-8">
				{banks.map(
					({ name, uri }, index): ReactElement => (
						<BankLogo key={`bank-${name.toLowerCase()}`} bank={name} href={uri} />
					),
				)}
			</div>
		</div>
	);
};
