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
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

interface ResultProps {
	calendar: Calendar;
	setCalendar: Dispatch<SetStateAction<Calendar | null>>;
	duration: DateValueType;
	setDuration: Dispatch<SetStateAction<DateValueType>>;
	hideNoneAvailables: boolean;
	setHideNoneAvailables: Dispatch<SetStateAction<boolean>>;
	setData: (data: string) => void;
}

function PresetButton({ text }: { text: string }) {
	return (
		<button className="rounded-xl bg-zinc-300 px-3 py-2 text-sm font-medium text-zinc-900">
			{text}
		</button>
	);
}

export function ResultCards({
	calendar,
	setCalendar,
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
			{results && (
				<>
					{results.length > 0 && (
						<>
							<div className="w-full max-w-xl rounded-2xl bg-zinc-200 p-4">
								<div>필터</div>
								<p>
									필터를 변경하면 기존에 선택한 내용은 모두 선택 해제됩니다.
								</p>
								<Datepicker
									placeholder="기간을 선택하세요."
									value={duration}
									readOnly={true}
									useRange={false}
									showFooter={true}
									inputClassName="text-center pl-2.5 pr-2.5 rounded-xl"
									toggleClassName="hidden"
									i18n="ko"
									displayFormat="YYYY년 MM월 DD일"
									// primaryColor="emerald"
									// TODO: add theme
									// TODO: min date and max date
									configs={{
										footer: {
											cancel: "취소",
											apply: "확인",
										},
									}}
									onChange={(newDuration) => setDuration(newDuration)}
								/>
								<div className="grid grid-cols-4 gap-2">
									<PresetButton text="오늘" />
									<PresetButton text="지난 7일" />
									<PresetButton text="지난 30일" />
									<PresetButton text="지난 1년" />
									<PresetButton text="이번 달 오늘까지" />
									<PresetButton text="이번 달 전체" />
									<PresetButton text="올해 오늘까지" />
									<PresetButton text="모든 이벤트" />
								</div>
							</div>
							<ul className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-zinc-800 p-4">
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
						</>
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
