import { DurationChip } from "@/components/DurationChip";
import { Result } from "@/scripts/counts-by-durations";
import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";

export function EventsCard({ result }: { result: Result }) {
	const totalCount = result.countsByDurations.reduce(
		(total, countByDuration) => total + countByDuration.count,
		0
	);
	const totalDuration = result.countsByDurations.reduce(
		(total, countByDuration) => total + countByDuration.duration,
		0
	);

	return (
		<li className="rounded-xl bg-slate-400 p-4 shadow-md">
			<div className="mb-3 ml-[0.125rem] flex flex-wrap items-center justify-between text-lg font-semibold text-slate-900">
				<label className="cursor-pointer">
					<input
						type="checkbox"
						className="mr-2 cursor-pointer accent-slate-800"
					/>
					{result.summary}
				</label>
				<div className="ml-auto text-right text-base font-medium text-slate-600">
					{`${getHumanStringFromMilliseconds(
						totalDuration
					)}(${totalCount}회) / ${getHumanStringFromMilliseconds(
						totalDuration
					)}(${totalCount}회)`}
				</div>
			</div>
			<ul className="flex flex-wrap gap-2">
				{result.countsByDurations.map((countByDuration, index) => (
					<DurationChip
						key={index}
						duration={countByDuration.duration}
						count={countByDuration.count}
					/>
				))}
			</ul>
		</li>
	);
}
