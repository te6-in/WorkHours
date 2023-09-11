import { scrollToElement } from "@/scripts/scroll";
import { getEventName } from "@/scripts/umami";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from "framer-motion";
import { ChevronDownCircle } from "lucide-react";
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
					data-umami-event={getEventName("scroll-to-result")}
					className="fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-zinc-700 p-4 text-zinc-50 shadow-md"
				>
					<ChevronDownCircle />
					<div className="mr-1">결과 확인하기</div>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
