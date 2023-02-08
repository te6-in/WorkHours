import { DurationChip } from "@/components/Result/DurationChip";
import { Result } from "@/scripts/counts-by-durations";
import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";
import { Dispatch, SetStateAction } from "react";

interface EventsCardProps {
	result: Result;
	setResults: Dispatch<SetStateAction<Result[] | null>>;
}

interface ButtonProps {
	text: string;
	onClick: () => void;
}

function Button({ text, onClick }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className="mt-3 rounded-lg bg-slate-500 px-3 py-2 text-sm font-medium text-slate-100"
		>
			{text}
		</button>
	);
}

export function EventsCard({ result, setResults }: EventsCardProps) {
	const totalCount = result.countsByDurations.reduce(
		(total, countByDuration) => total + countByDuration.count,
		0
	);
	const totalDuration = result.countsByDurations.reduce(
		(total, countByDuration) =>
			total + countByDuration.count * countByDuration.duration,
		0
	);
	const selectedTotalCount = result.countsByDurations.reduce(
		(total, countByDuration) =>
			total + (countByDuration.checked ? countByDuration.count : 0),
		0
	);
	const selectedTotalDuration = result.countsByDurations.reduce(
		(total, countByDuration) =>
			total +
			(countByDuration.checked
				? countByDuration.count * countByDuration.duration
				: 0),
		0
	);

	const onSelectAllClick = () => {
		setResults((prevResults) => {
			if (prevResults === null) return null;

			const newResults = [...prevResults];

			const resultIndex = newResults.findIndex(
				(item) => item.summary === result.summary
			);

			newResults[resultIndex].countsByDurations = newResults[
				resultIndex
			].countsByDurations.map((item) => {
				if (item.duration !== 0) {
					return {
						...item,
						checked: true,
					};
				} else {
					return item;
				}
			});

			return newResults;
		});
	};

	const onSelectNoneClick = () => {
		setResults((prevResults) => {
			if (prevResults === null) return null;

			const newResults = [...prevResults];

			const resultIndex = newResults.findIndex(
				(item) => item.summary === result.summary
			);

			newResults[resultIndex].countsByDurations = newResults[
				resultIndex
			].countsByDurations.map((item) => ({
				...item,
				checked: false,
			}));

			return newResults;
		});
	};

	const hasChecked = result.countsByDurations.some(
		(countByDuration) => countByDuration.checked === true
	);

	const noneAvailable = result.countsByDurations.every(
		(countByDuration) => countByDuration.duration === 0
	);

	return (
		<li
			className={`card rounded-xl p-4 shadow-md ${
				hasChecked ? "bg-slate-300" : "bg-slate-400"
			}
			${noneAvailable ? "opacity-50" : ""}`}
		>
			<div className="mb-3 ml-1 flex flex-wrap items-center justify-between text-lg font-semibold text-slate-900">
				<div className="mr-4">{result.summary}</div>
				<div className="ml-auto text-right text-base font-medium text-slate-600">
					{`${
						selectedTotalCount === 0
							? "선택된 항목 없음"
							: `${getHumanStringFromMilliseconds(
									selectedTotalDuration
							  )} (${selectedTotalCount}회)`
					} / ${getHumanStringFromMilliseconds(
						totalDuration
					)} (${totalCount}회)`}
				</div>
			</div>
			<ul className="flex flex-wrap gap-2">
				{result.countsByDurations.map((countByDuration, index) => (
					<DurationChip
						countByDuration={countByDuration}
						summary={result.summary}
						setResults={setResults}
						key={index}
					/>
				))}
			</ul>
			{!noneAvailable && (
				<div className="flex justify-end gap-1">
					<Button text="모두 선택" onClick={onSelectAllClick} />
					<Button text="모두 선택 해제" onClick={onSelectNoneClick} />
				</div>
			)}
		</li>
	);
}
