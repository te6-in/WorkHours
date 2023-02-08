import { Note } from "@/components/Note";
import { EventsCard } from "@/components/Result/EventsCard";
import { ScrollToResultButton } from "@/components/Result/ScrollToResultButton";
import { Statistics } from "@/components/Result/Statistics";
import { Calendar } from "@/scripts/calendar";
import { getResults, Result } from "@/scripts/counts-by-durations";
import { readFile } from "@/scripts/read-file";
import { scrollToTop } from "@/scripts/scroll";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface ResultProps {
	calendar: Calendar;
	setData: (data: string) => void;
}

export function ResultCards({ calendar, setData }: ResultProps) {
	const [results, setResults] = useState<Result[] | null>(null);
	const statisticsRef = useRef<HTMLDivElement>(null);

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
			readFile(file, setData);
			scrollToTop(100);
		}
	};

	// TODO: add event search

	return (
		<section className="mt-10 flex flex-col items-center gap-6">
			<ScrollToResultButton to={statisticsRef} />
			<ul className="flex max-w-xl flex-col gap-4 rounded-2xl bg-slate-800 p-4">
				{results &&
					results.map((result, index) => (
						<EventsCard result={result} setResults={setResults} key={index} />
					))}
			</ul>
			<Statistics ref={statisticsRef} />
			<input
				type="file"
				id="new-file"
				accept="text/calendar"
				onChange={onFileChange}
				className="hidden"
			/>
			<div className="flex select-none flex-col gap-1">
				<label
					htmlFor="new-file"
					className="text-md cursor-pointer text-center font-medium text-slate-300 underline underline-offset-2"
				>
					다른 파일 선택
				</label>
				<Note text="또는 끌어다 놓기" />
			</div>
		</section>
	);
}
