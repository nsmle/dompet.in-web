"use client";
import clsx from "clsx";
import { createContext, ReactElement, ReactNode, useContext, useReducer } from "react";
import { Toaster } from "react-hot-toast";
import { DashboardHeader } from "@component/organisms/dashboard/DashboardHeader";
import { DashboardSidebar } from "@component/organisms/dashboard/DashboardSidebar";
import { LandingFooter } from "@component/organisms/landing/LandingFooter";
import { LandingHeader } from "@component/organisms/landing/LandingHeader";

type ThemeProviderProps = {
	children: ReactNode;
};

type ThemeType = {
	headerType: "none" | "landing" | "dashboard";
	footerType: "none" | "landing";
	showMenu: boolean;
	showProfileMenu: boolean;
};

type ThemeDispatchType = React.Dispatch<Partial<ThemeType>>;

const initialTheme: ThemeType = {
	headerType: "none",
	footerType: "none",
	showMenu: false,
	showProfileMenu: false,
};

const ThemeContext = createContext<ThemeType>(initialTheme);
const ThemeDispatchContext = createContext<ThemeDispatchType>((): void => {});

export const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => {
	const [theme, themeDispatch] = useReducer(themeReducer, initialTheme);

	const Header = ({ headerType }: { headerType: ThemeType["headerType"] }): ReactElement | null => {
		switch (headerType) {
			case "landing":
				return <LandingHeader />;
			case "dashboard":
				return <DashboardHeader />;
			default:
				return null;
		}
	};

	const Footer = ({ footerType }: { footerType: ThemeType["footerType"] }): ReactElement | null => {
		switch (footerType) {
			case "landing":
				return <LandingFooter />;
			default:
				return null;
		}
	};

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeDispatchContext.Provider value={themeDispatch}>
				<Header headerType={theme.headerType} />
				{theme.headerType == "dashboard" && <DashboardSidebar />}

				<main
					className={clsx(
						theme.headerType == "dashboard" &&
							"mt-14 min-h-screen rounded-t-2xl bg-white pt-2 shadow-[-10px_-10px_30px_0_rgba(30,58,138,0.05)] transition-transform md:ml-60 md:mt-16 md:rounded-l-xl md:pl-2",
					)}
				>
					{children}
				</main>
				<Footer footerType={theme.footerType} />
				<Toaster position="bottom-right" reverseOrder={true} />
			</ThemeDispatchContext.Provider>
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeType => useContext(ThemeContext);
export const useThemeDispatch = (): ThemeDispatchType => useContext(ThemeDispatchContext);

export const themeReducer = (state: ThemeType, action: Partial<ThemeType>): ThemeType => {
	return { ...state, ...action };
};
