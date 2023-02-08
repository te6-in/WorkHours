import { RefObject } from "react";

export function scrollToTop(timeout: number) {
	setTimeout(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			window.scrollTo({
				top: 0,
			});
		} else {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	}, timeout);
}

export function scrollToElement(to: RefObject<HTMLDivElement>) {
	if (to.current) {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			to.current.scrollIntoView();
		} else {
			to.current.scrollIntoView({
				behavior: "smooth",
			});
		}
	}
}
