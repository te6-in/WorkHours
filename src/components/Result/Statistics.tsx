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
			<div ref={ref} className="w-full max-w-xl rounded-2xl bg-slate-100 p-4">
				<div>{getHumanStringFromMilliseconds(totalSelectedDuration)}</div>
				<ul>
					{receipt.map((item, index) => (
						<li key={index}>
							{item.summary}: {getHumanStringFromMilliseconds(item.total)}
						</li>
					))}
				</ul>
			</div>
		);
	}
);
