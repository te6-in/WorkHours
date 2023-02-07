import { DurationItem } from "@/components/DurationItem";
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

	// sort by count and then duration
	countsByDuration.sort((a, b) => {
		if (a.count === b.count) {
			return b.duration - a.duration;
		} else {
			return b.count - a.count;
		}
	});

	return (
		<li>
			{events.summary} (
			{getHumanStringFromMilliseconds(events.durationMilliseconds)})<br />
			<ul>
				{countsByDuration.map((countByDuration, index) => (
					<DurationItem
						key={index}
						duration={countByDuration.duration}
						count={countByDuration.count}
					/>
				))}
			</ul>
		</li>
	);
}
