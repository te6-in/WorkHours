import { CountByDuration, Result } from "@/scripts/counts-by-durations";
import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface DurationChipProps {
	summary: string;
	countByDuration: CountByDuration;
	setResults: Dispatch<SetStateAction<Result[] | null>>;
}

export function DurationChip({
	summary,
	countByDuration,
	setResults,
}: DurationChipProps) {
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setResults((prevResults) => {
			if (prevResults === null) return null;

			const newResults = [...prevResults];

			const resultIndex = newResults.findIndex(
				(result) => result.summary === summary
			);

			const countByDurationIndex = newResults[
				resultIndex
			].countsByDurations.findIndex(
				(item) => item.duration === countByDuration.duration
			);

			newResults[resultIndex].countsByDurations[countByDurationIndex].checked =
				event.target.checked;

			return newResults;
		});
	};

	return (
		<li>
			<label className="chip flex cursor-pointer items-center rounded-lg bg-slate-100 px-3 py-2 text-slate-800 shadow-md">
				<input
					type="checkbox"
					checked={countByDuration.checked}
					onChange={onChange}
					className="mr-2.5 cursor-pointer accent-slate-300"
				/>
				<span className="mt-[2px]">
					{getHumanStringFromMilliseconds(countByDuration.duration)} *{" "}
					{countByDuration.count}회
				</span>
			</label>
		</li>
	);
}
