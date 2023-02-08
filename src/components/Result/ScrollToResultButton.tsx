import { scrollToElement } from "@/scripts/scroll";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from "framer-motion";
import { RefObject, useState } from "react";

export function ScrollToResultButton({
	to,
}: {
	to: RefObject<HTMLDivElement>;
}) {
	const [show, setShow] = useState(false);
	const { scrollYProgress } = useScroll();
	const reduceMotion = useReducedMotion();

	const onClick = () => scrollToElement(to);

	useMotionValueEvent(scrollYProgress, "change", (value) => {
		if (value === 0 || value > 0.9) {
			setShow(false);
		} else {
			setShow(true);
		}
	});

	return (
		<AnimatePresence>
			{show && (
				<motion.button
					transition={{
						type: reduceMotion ? "tween" : "spring",
						bounce: reduceMotion ? 0 : 0.35,
						duration: reduceMotion ? 0.25 : 0.75,
					}}
					initial={{ x: "-50%", y: 80 }}
					animate={{ x: "-50%", y: 0 }}
					exit={{ x: "-50%", y: 80 }}
					onClick={onClick}
					className="fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-zinc-700 p-4 text-zinc-50 shadow-md"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-6 min-h-[1.5rem] w-6 min-w-[1.5rem] fill-none stroke-current"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<polyline points="19 12 12 19 5 12" />
					</svg>
					<div className="mr-1">결과 확인하기</div>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
