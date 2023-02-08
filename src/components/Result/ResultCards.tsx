import { Note } from "@/components/Note";
import { EventsCard } from "@/components/Result/EventsCard";
import { ScrollToResultButton } from "@/components/Result/ScrollToResultButton";
import { Statistics } from "@/components/Result/Statistics";
import { Calendar } from "@/scripts/calendar";
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

interface ResultProps {
	calendar: Calendar;
	hideNoneAvailables: boolean;
	setHideNoneAvailables: Dispatch<SetStateAction<boolean>>;
	setData: (data: string) => void;
}

export function ResultCards({
	calendar,
	hideNoneAvailables,
	setHideNoneAvailables,
	setData,
}: ResultProps) {
	const [results, setResults] = useState<Result[] | null>(null);
	const statisticsRef = useRef<HTMLDivElement>(null);

	const firstNoneAvailableResultIndex = results
		? results.findIndex((result) =>
				result.countsByDurations.every(
					(countByDuration) => countByDuration.duration === 0
				)
		  )
		: -1;

	useEffect(() => {
		if (calendar) {
			setResults(getResults(calendar));
		}
	}, [calendar]);

	// TODO: erase this
	useEffect(() => {
		if (results) {
			console.log(results);
		}
	}, [results]);

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
			<ScrollToResultButton to={statisticsRef} />
			<ul className="flex max-w-xl flex-col gap-4 rounded-2xl bg-slate-800 p-4">
				{results &&
					(firstNoneAvailableResultIndex === -1 || !hideNoneAvailables) &&
					results.map((result, index) => (
						<EventsCard result={result} setResults={setResults} key={index} />
					))}
				{results && firstNoneAvailableResultIndex !== -1 && hideNoneAvailables && (
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
							className="mx-auto my-2 w-fit font-medium text-slate-300 underline underline-offset-2"
						>
							기간 없는 항목 {results.length - firstNoneAvailableResultIndex}개
							표시
						</button>
					</>
				)}
			</ul>
			{results && <Statistics results={results} ref={statisticsRef} />}
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
					className="text-md cursor-pointer text-center font-medium text-slate-300 underline underline-offset-2"
				>
					다른 파일로 결과 확인
				</label>
				<Note text="또는 끌어다 놓기" />
			</div>
		</section>
	);
}
