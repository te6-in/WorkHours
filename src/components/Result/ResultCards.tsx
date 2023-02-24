import { Note } from "@/components/Note";
import { EventsCard } from "@/components/Result/EventsCard";
import { Receipt } from "@/components/Result/Receipt";
import { ScrollToResultButton } from "@/components/Result/ScrollToResultButton";
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
	const receiptRef = useRef<HTMLDivElement>(null);

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
			<ScrollToResultButton to={receiptRef} />
			{results && (
				<>
					{results.length > 0 && (
						<ul className="flex max-w-xl flex-col gap-4 rounded-2xl bg-zinc-800 p-4">
							{(firstNoneAvailableResultIndex === -1 || !hideNoneAvailables) &&
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
