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

	const isDisabled = countByDuration.duration === 0;

	return (
		<li>
			<label
				className={`chip flex items-center rounded-lg px-3 py-2 shadow-md ${
					isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
				} ${
					countByDuration.checked
						? "bg-slate-700 text-slate-50"
						: "bg-slate-100 text-slate-800"
				}`}
			>
				<input
					type="checkbox"
					checked={countByDuration.checked}
					disabled={isDisabled}
					onChange={onChange}
					className={`mr-2.5 accent-slate-300 ${
						isDisabled ? "cursor-not-allowed" : "cursor-pointer"
					}`}
				/>
				<span className="mt-[2px]">
					{getHumanStringFromMilliseconds(countByDuration.duration)} *{" "}
					{countByDuration.count}회
				</span>
			</label>
		</li>
	);
}
