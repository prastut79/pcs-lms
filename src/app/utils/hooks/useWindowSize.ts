"use client";

import { useEffect, useState } from "react";

export default function useWindowSize(cutOff: number) {
	const [isDesktop, setIsDesktop] = useState<boolean>(true);

	function resize() {
		setIsDesktop((prev) => {
			if (prev && window.innerWidth < cutOff) {
				return false;
			} else if (!prev && window.innerWidth >= cutOff) {
				return true;
			}
			return prev;
		});
	}

	useEffect(() => {
		resize();
		window.addEventListener("resize", resize);

		return () => window.removeEventListener("resize", resize);
	}, []);

	return isDesktop;
}
