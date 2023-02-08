import { Result } from "@/scripts/counts-by-durations";
import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";
import { forwardRef } from "react";

interface StatisticsProps {
	results: Result[];
}

type Receipt = {
	summary: string;
	total: number;
}[];

export const Statistics = forwardRef<HTMLDivElement, StatisticsProps>(
	(props, ref) => {
		const { results } = props;
		const totalSelectedDuration = results.reduce(
			(total, result) =>
				total +
				result.countsByDurations.reduce(
					(total, countByDuration) =>
						total +
						(countByDuration.checked
							? countByDuration.count * countByDuration.duration
							: 0),
					0
				),
			0
		);

		const receipt: Receipt = [];

		results.forEach((result) => {
			const total = result.countsByDurations.reduce(
				(total, countByDuration) =>
					total +
					(countByDuration.checked
						? countByDuration.count * countByDuration.duration
						: 0),
				0
			);

			if (total > 0) {
				receipt.push({
					summary: result.summary,
					total,
				});
			}
		});

		receipt.sort((a, b) => {
			if (a.total === b.total) {
				return a.summary.localeCompare(b.summary);
			} else {
				return b.total - a.total;
			}
		});

		return (
			<div
				ref={ref}
				className="w-full max-w-xl rounded-2xl bg-slate-50 p-8 pt-6 text-slate-900 shadow-lg"
			>
				{receipt.length > 0 ? (
					<>
						<div className="flex items-end justify-between">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="mr-4 h-10 min-h-[2.5rem] w-10 min-w-[2.5rem] fill-none stroke-current text-slate-500"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
							<div>
								<div className="text-right text-5xl font-black leading-snug">
									총 {getHumanStringFromMilliseconds(totalSelectedDuration)}
								</div>
								<div className="text-right text-xl font-medium text-slate-500">
									수고하셨습니다.
								</div>
							</div>
						</div>
						<ul className="mt-6 flex flex-col gap-2 sm:grid sm:grid-cols-2">
							{receipt.map((item, index) => (
								<li
									key={index}
									className="flex flex-col flex-wrap justify-between rounded-lg bg-slate-200 px-3.5 py-3"
								>
									<div className="mr-2 font-medium text-slate-700">
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
					<div className="mt-1 text-center text-xl font-medium leading-relaxed text-slate-500">
						선택된 항목이 없습니다.
						<br />
						항목을 선택하면 여기에 결과가 나타납니다.
					</div>
				)}
			</div>
		);
	}
);
