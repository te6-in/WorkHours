import { DurationChip } from "@/components/DurationChip";
import { Events } from "@/scripts/calendar";
import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";

interface CountByDuration {
	duration: number;
	count: number;
}

export function EventsCard({ events }: { events: Events }) {
	const countsByDuration: CountByDuration[] = [];

	events.events.forEach((event) => {
		let isExist = false;

		countsByDuration.forEach((countByDuration) => {
			if (countByDuration.duration === event.durationMilliseconds) {
				countByDuration.count += 1;
				isExist = true;
			}
		});

		if (!isExist) {
			countsByDuration.push({
				duration: event.durationMilliseconds,
				count: 1,
			});
		}
	});

	countsByDuration.sort((a, b) => {
		if (a.count === b.count) {
			return b.duration - a.duration;
		} else {
			return b.count - a.count;
		}
	});

	return (
		<li className="rounded-xl bg-slate-400 p-4 shadow-md">
			<div className="mb-3 ml-[0.125rem] flex flex-wrap items-center justify-between text-lg font-semibold text-slate-900">
				<label>
					<input type="checkbox" className="mr-2 accent-slate-800" />
					{events.summary}
				</label>
				<div className="ml-auto text-right text-base font-medium text-slate-600">
					{`${getHumanStringFromMilliseconds(events.durationMilliseconds)}(${
						events.events.length
					}회) / ${getHumanStringFromMilliseconds(
						events.durationMilliseconds
					)}(${events.events.length}회)`}
				</div>
			</div>
			<ul className="flex flex-wrap gap-2">
				{countsByDuration.map((countByDuration, index) => (
					<DurationChip
						key={index}
						duration={countByDuration.duration}
						count={countByDuration.count}
					/>
				))}
			</ul>
		</li>
	);
}
