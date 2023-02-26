import { Note } from "@/components/Note";
import { ButtonProps, EventsCard } from "@/components/Result/EventsCard";
import { Filter } from "@/components/Result/Filter";
import { Receipt } from "@/components/Result/Receipt";
import { ScrollToResultButton } from "@/components/Result/ScrollToResultButton";
import {
	Calendar,
	getFirstAndLastEventDate,
	getFirstAndLastHumanString,
	getHumanStringFromPickerString,
} from "@/scripts/calendar";
import { getResults, Result } from "@/scripts/counts-by-durations";
import { readFile } from "@/scripts/read-file";
import { scrollToTop } from "@/scripts/scroll";
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

interface ResultProps {
	icalData: string | null;
	calendar: Calendar;
	duration: DateValueType;
	setDuration: Dispatch<SetStateAction<DateValueType>>;
	hideNoneAvailables: boolean;
	setHideNoneAvailables: Dispatch<SetStateAction<boolean>>;
	setData: (data: string) => void;
}

function Button({ text, disabled, onClick }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`rounded-xl bg-zinc-600 px-3 py-2 text-zinc-100 ${
				disabled && "cursor-not-allowed opacity-50"
			}`}
		>
			{text}
		</button>
	);
}

export function ResultCards({
	icalData,
	calendar,
	duration,
	setDuration,
	hideNoneAvailables,
	setHideNoneAvailables,
	setData,
}: ResultProps) {
	const [results, setResults] = useState<Result[] | null>(null);
	const receiptRef = useRef<HTMLDivElement>(null);

	const firstNoneAvailableResultIndex = results
		? results.findIndex((result) =>
				result.countsByDurations.every(
					(countByDuration) => countByDuration.duration === 0
				)
		  )
		: -1;

	const allChecked = results
		? results.every((result) =>
				result.countsByDurations.every(
					(countByDuration) => countByDuration.checked
				)
		  )
		: false;

	const noneChecked = results
		? results.every((result) =>
				result.countsByDurations.every(
					(countByDuration) => !countByDuration.checked
				)
		  )
		: false;

	const count = results
		? results.reduce(
				(accumulator, result) =>
					accumulator +
					result.countsByDurations.reduce(
						(acc, countByDuration) => acc + countByDuration.count,
						0
					),
				0
		  )
		: 0;

	const onSelectAllClick = () => {
		setResults((prevResults) => {
			if (prevResults === null) {
				return null;
			}

			const newResults = [...prevResults];

			newResults.forEach((result) => {
				result.countsByDurations.forEach(
					(countByDuration) => (countByDuration.checked = true)
				);
			});

			return newResults;
		});
	};

	const onSelectNoneClick = () => {
		setResults((prevResults) => {
			if (prevResults === null) {
				return null;
			}

			const newResults = [...prevResults];

			newResults.forEach((result) => {
				result.countsByDurations.forEach(
					(countByDuration) => (countByDuration.checked = false)
				);
			});

			return newResults;
		});
	};

	useEffect(() => {
		if (calendar) {
			setResults(getResults(calendar));
		}
	}, [calendar]);

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;

		const file = files ? files[0] : null;

		if (file) {
			readFile(file, setData, setHideNoneAvailables);
			scrollToTop(100);
		}
	};

	const onShowButtonClick = () => {
		setHideNoneAvailables(false);
	};

	// TODO: add event search

	return (
		<section className="mt-10 flex flex-col items-center gap-6">
			<ScrollToResultButton to={receiptRef} />
			<Filter
				icalData={icalData}
				duration={duration}
				setDuration={setDuration}
			/>
			{results && (
				<>
					{results.length > 0 && (
						<div className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-zinc-800 p-4">
							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="ml-2">
									<h2 className="text-lg font-medium text-zinc-200">
										발견된 일정 {count.toLocaleString()}개
									</h2>
									{duration && (
										<>
											{duration.startDate !== null &&
											duration.endDate !== null ? (
												<p className="text-sm text-zinc-400">
													{getHumanStringFromPickerString(duration)}
												</p>
											) : (
												<p className="text-sm text-zinc-400">
													{getFirstAndLastHumanString(
														getFirstAndLastEventDate(calendar)
													)}
												</p>
											)}
										</>
									)}
								</div>
								<div className="ml-auto flex justify-end gap-2">
									<Button
										disabled={allChecked}
										onClick={onSelectAllClick}
										text="모두 선택"
									/>
									<Button
										disabled={noneChecked}
										onClick={onSelectNoneClick}
										text="모두 선택 해제"
									/>
								</div>
							</div>
							<ul className="flex flex-col gap-4">
								{(firstNoneAvailableResultIndex === -1 ||
									!hideNoneAvailables) &&
									results.map((result, index) => (
										<EventsCard
											result={result}
											setResults={setResults}
											key={index}
										/>
									))}
								{firstNoneAvailableResultIndex !== -1 && hideNoneAvailables && (
									<>
										{results
											.slice(0, firstNoneAvailableResultIndex)
											.map((result, index) => (
												<EventsCard
													result={result}
													setResults={setResults}
													key={index}
												/>
											))}
										<button
											onClick={onShowButtonClick}
											className="mx-auto my-2 w-fit font-medium text-zinc-300 underline underline-offset-2"
										>
											기간 없는 항목{" "}
											{results.length - firstNoneAvailableResultIndex}개 표시
										</button>
									</>
								)}
							</ul>
						</div>
					)}
					{<Receipt results={results} ref={receiptRef} />}
				</>
			)}
			<input
				type="file"
				id="new-file"
				accept="text/calendar"
				onChange={onFileChange}
				className="hidden"
			/>
			<div className="mt-6 flex select-none flex-col gap-1">
				<label
					htmlFor="new-file"
					className="text-md cursor-pointer text-center font-medium text-zinc-300 underline underline-offset-2"
				>
					다른 파일로 결과 확인
				</label>
				<Note text="또는 끌어다 놓기" />
			</div>
		</section>
	);
}
