import {
	getCalendar,
	getFirstAndLastEventDate,
	getPickerStringFromDate,
} from "@/scripts/calendar";
import {
	Dispatch,
	MouseEventHandler,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {
	DateRangeType,
	DateValueType,
} from "react-tailwindcss-datepicker/dist/types";

interface FilterProps {
	icalData: string | null;
	duration: DateValueType;
	setDuration: Dispatch<SetStateAction<DateValueType>>;
}

interface ButtonProps {
	text: string;
	on?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface PresetDuration {
	text: string;
	on: boolean;
	duration: DateRangeType;
}

interface PresetButtonProps {
	presetDuration: PresetDuration;
	setDuration: Dispatch<SetStateAction<DateValueType>>;
	setIsCustomDuration: Dispatch<SetStateAction<boolean>>;
}

function Button({ text, on = false, onClick }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`rounded-xl px-3 py-2 text-sm  ${
				on ? "bg-zinc-800 text-zinc-100" : "bg-zinc-300 text-zinc-900"
			}`}
		>
			{text}
		</button>
	);
}

function PresetButton({
	presetDuration,
	setDuration,
	setIsCustomDuration,
}: PresetButtonProps) {
	const onClick = () => {
		setIsCustomDuration(false);

		presetDurations.forEach((presetDuration) => {
			presetDuration.on = false;
		});

		presetDuration.on = true;

		setDuration({
			startDate: presetDuration.duration.startDate,
			endDate: presetDuration.duration.endDate,
		});
	};

	return (
		<Button
			text={presetDuration.text}
			on={presetDuration.on}
			onClick={onClick}
		/>
	);
}

const presetDurations: PresetDuration[] = [
	{
		text: "오늘",
		on: false,
		duration: getPickerStringFromDate({
			after: new Date(),
			before: new Date(),
		}),
	},
	{
		text: "지난 7일",
		on: false,
		duration: getPickerStringFromDate({
			after: new Date(new Date().setDate(new Date().getDate() - 6)),
			before: new Date(),
		}),
	},
	{
		text: "지난 30일",
		on: false,
		duration: getPickerStringFromDate({
			after: new Date(new Date().setDate(new Date().getDate() - 29)),
			before: new Date(),
		}),
	},
	{
		text: "지난 1년",
		on: false,
		duration: getPickerStringFromDate({
			after: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
			before: new Date(),
		}),
	},
	{
		text: "이번 달 오늘까지",
		on: false,
		duration: getPickerStringFromDate({
			after: new Date(new Date().setDate(1)),
			before: new Date(),
		}),
	},
	{
		text: "이번 달 전체",
		on: false,
		duration: getPickerStringFromDate({
			after: new Date(new Date().setDate(1)),
			before: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
		}),
	},
	{
		text: "모든 일정",
		on: true,
		duration: {
			startDate: null,
			endDate: null,
		},
	},
];

export function Filter({ icalData, duration, setDuration }: FilterProps) {
	const [isCustomDuration, setIsCustomDuration] = useState(false);
	let minDate, maxDate;

	if (icalData) {
		const fullCalendar = getCalendar(icalData, {
			after: undefined,
			before: undefined,
		});

		if (fullCalendar) {
			const dates = getFirstAndLastEventDate(fullCalendar);

			if (dates) {
				minDate = dates.first ?? undefined;
				maxDate = dates.last ?? undefined;
			}
		}
	}

	const handleCustomDurationClick = () => {
		setIsCustomDuration(true);

		presetDurations.forEach((presetDuration) => {
			presetDuration.on = false;
		});
	};

	useEffect(() => {
		setDuration({
			startDate: null,
			endDate: null,
		});

		setIsCustomDuration(false);

		presetDurations.forEach((presetDuration) => {
			presetDuration.on = false;
		});

		presetDurations[presetDurations.length - 1].on = true;
	}, [icalData]);

	return (
		<div className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-zinc-100 p-4 shadow-lg">
			<div>
				<div className="flex items-center justify-center gap-1 text-lg font-bold text-zinc-900">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mr-0.5 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] fill-none stroke-current"
					>
						<path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5"></path>
						<path d="M16 2v4"></path>
						<path d="M8 2v4"></path>
						<path d="M3 10h18"></path>
						<path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z"></path>
						<path d="m22 22-1.5-1.5"></path>
					</svg>
					<h2>필터</h2>
				</div>
				<p className="mt-1 text-center text-sm text-zinc-600">
					필터를 변경하면 기존에 선택한 내용은 모두 선택 해제됩니다.
				</p>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{presetDurations.map((presetDuration, index) => (
					<PresetButton
						presetDuration={presetDuration}
						setDuration={setDuration}
						setIsCustomDuration={setIsCustomDuration}
						key={index}
					/>
				))}
				<Button
					text="직접 선택"
					on={isCustomDuration}
					onClick={handleCustomDurationClick}
				/>
			</div>
			{isCustomDuration && (
				<Datepicker
					placeholder="여기를 눌러 기간을 직접 선택하세요."
					value={duration}
					useRange={false}
					showFooter={true}
					inputClassName="text-center pl-2.5 pr-2.5 rounded-xl bg-zinc-50 text-zinc-900 font-semibold text-lg"
					i18n="ko"
					// primaryColor="emerald"
					// TODO: add theme
					minDate={minDate}
					maxDate={maxDate}
					configs={{
						footer: {
							cancel: "취소",
							apply: "확인",
						},
					}}
					onChange={(newDuration) => setDuration(newDuration)}
				/>
			)}
		</div>
	);
}
