import { EventsCard } from "@/components/EventsCard";
import { Note } from "@/components/Note";
import { Statistics } from "@/components/Statistics";
import { getCalendar } from "@/scripts/calendar";
import { readFile } from "@/scripts/read-file";
import { ChangeEvent } from "react";

interface ResultProps {
	icalData: string;
	setData: (data: string) => void;
}

export function Result({ icalData, setData }: ResultProps) {
	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;

		const file = files ? files[0] : null;

		if (file) {
			readFile(file, setData);
		}
	};

	// TODO: add search

	return (
		<section className="mt-10 flex flex-col items-center gap-6">
			<ul className="flex max-w-xl flex-col gap-4 rounded-2xl bg-slate-800 p-4">
				{getCalendar(icalData).map((events, index) => (
					<EventsCard events={events} key={index} />
				))}
			</ul>
			<Statistics />
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
