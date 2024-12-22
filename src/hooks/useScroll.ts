"use client";
import { useEffect, useState } from "react";

type ScrollResult = { y: number; x: number };
const useScroll = (onScrollEvent?: (x: number, y: number) => void): ScrollResult => {
	const [scrollY, setScrollY] = useState(0);
	const [scrollX, setScrollX] = useState(0);

	useEffect((): (() => void) => {
		const handleScroll = (): void => {
			const { scrollY: y, scrollX: x } = window;
			setScrollY(y);
			setScrollX(x);
			if (onScrollEvent) onScrollEvent(x, y);
		};

		window.addEventListener("scroll", handleScroll);
		return (): void => window.removeEventListener("scroll", handleScroll);
	}, []);

	return { y: scrollY, x: scrollX };
};

export default useScroll;
