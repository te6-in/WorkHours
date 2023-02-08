import { Result } from "@/scripts/counts-by-durations";
import { getReceipt } from "@/scripts/receipt";
import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";
import { forwardRef } from "react";

interface ReceiptProps {
	results: Result[];
}

export const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
	({ results }, ref) => {
		const { receipt, totalSelectedDuration } = getReceipt(results);

		return (
			<div
				ref={ref}
				className="w-full max-w-xl scroll-mt-[5vh] rounded-2xl bg-zinc-50 p-8 text-zinc-900 shadow-lg"
			>
				{receipt.length > 0 ? (
					<>
						<div className="-mt-2 flex items-end justify-between">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="mr-4 h-10 min-h-[2.5rem] w-10 min-w-[2.5rem] fill-none stroke-current text-zinc-500"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
							<div>
								<div className="text-right text-5xl font-black leading-snug">
									총 {getHumanStringFromMilliseconds(totalSelectedDuration)}
								</div>
								<div className="text-right text-xl font-medium text-zinc-500">
									수고하셨습니다.
								</div>
							</div>
						</div>
						<ul className="mt-6 flex flex-col gap-2 sm:grid sm:grid-cols-2">
							{receipt.map((item, index) => (
								<li
									key={index}
									className="flex flex-col flex-wrap justify-between rounded-lg bg-zinc-200 px-3.5 py-3"
								>
									<div className="mr-2 font-medium text-zinc-700">
										{item.summary}
									</div>
									<div className="ml-auto font-bold">
										{getHumanStringFromMilliseconds(item.total)}
									</div>
								</li>
							))}
						</ul>
					</>
				) : (
					<div className="mt-1 text-center text-xl font-medium leading-relaxed text-zinc-500">
						선택된 항목이 없습니다.
						<br />
						항목을 선택하면 여기에 결과가 나타납니다.
					</div>
				)}
			</div>
		);
	}
);
