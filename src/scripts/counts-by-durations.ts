import { Calendar, Events } from "@/scripts/calendar";

export interface CountByDuration {
	duration: number;
	count: number;
	selected: boolean;
}

export interface Result {
	summary: string;
	countsByDurations: CountByDuration[];
}

export function getCountsByDuration(events: Events): CountByDuration[] {
	const countsByDurations: CountByDuration[] = [];

	events.events.forEach((event) => {
		let isExist = false;

		countsByDurations.forEach((countByDuration) => {
			if (countByDuration.duration === event.durationMilliseconds) {
				countByDuration.count += 1;
				isExist = true;
			}
		});

		if (!isExist) {
			countsByDurations.push({
				duration: event.durationMilliseconds,
				count: 1,
				selected: false,
			});
		}
	});

	countsByDurations.sort((a, b) => {
		if (a.count === b.count) {
			return b.duration - a.duration;
		} else {
			return b.count - a.count;
		}
	});

	return countsByDurations;
}

export function getResults(calendar: Calendar): Result[] {
	const results: Result[] = [];

	calendar.forEach((events) => {
		results.push({
			summary: events.summary,
			countsByDurations: getCountsByDuration(events),
		});
	});

	return results;
}
