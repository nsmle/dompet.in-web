import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const borderRadius = {
	...defaultTheme.borderRadius,
	"4xl": "2rem",
	"5xl": "2.5rem",
};

const boxShadow = {
	...defaultTheme.boxShadow,
	"3xl": "0 35px 60px -15px rgb(0 0 0 / 0.3);",
	"4xl": "0 50px 100px -20px rgb(0 0 0 / 0.4);",
	"5xl": "0 60px 140px -25px rgb(0 0 0 / 0.5);",
	"6xl": "0 70px 160px -30px rgb(0 0 0 / 0.6);",
	"7xl": "0 80px 180px -35px rgb(0 0 0 / 0.7);",
	"8xl": "0 90px 200px -40px rgb(0 0 0 / 0.8);",
	"9xl": "0 100px 220px -45px rgb(0 0 0 / 0.9);",
	"10xl": "0 110px 240px -50px rgb(0 0 0 / 1);",
};

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		borderRadius,
		extend: {
			maxWidth: {
				"8xl": "90rem",
				"9xl": "100rem",
				"10xl": "110rem",
				"11xl": "120rem",
				"12xl": "130rem",
				"13xl": "140rem",
				"14xl": "150rem",
				"15xl": "160rem",
			},
			boxShadow,
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [],
} satisfies Config;
