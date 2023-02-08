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
