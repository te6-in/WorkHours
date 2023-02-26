import { icalDurationToMilliseconds } from "@/scripts/time-conversions";
import IcalExpander from "ical-expander";
import * as ICAL from "ical.js";
import {
	DateRangeType,
	DateValueType,
} from "react-tailwindcss-datepicker/dist/types";

export interface DatesDuration {
	after?: Date;
	before?: Date;
}

export class Event {
	readonly durationMilliseconds: number;

	constructor(readonly start: ICAL.Time, readonly end: ICAL.Time) {
		const period = new ICAL.Period({ start, end });

		this.durationMilliseconds = icalDurationToMilliseconds(
			period.getDuration()
		);
	}
}

export class EventsBySummary {
	durationMilliseconds: number;

	constructor(readonly summary: string, readonly events: Event[]) {
		this.durationMilliseconds = 0;
	}

	setDurationMilliseconds() {
		this.durationMilliseconds = this.events.reduce(
			(accumulator, event) => accumulator + event.durationMilliseconds,
			0
		);
	}
}

export type Calendar = EventsBySummary[];

function addToCalendar(
	calendar: Calendar,
	summary: string,
	{ startDate, endDate }: { startDate: ICAL.Time; endDate: ICAL.Time }
) {
	const newEvent = new Event(startDate, endDate);

	const index = calendar.findIndex(
		(calendarEvents) => calendarEvents.summary === summary
	);

	if (index === -1) {
		calendar.push(new EventsBySummary(summary, [newEvent]));
	} else {
		calendar[index].events.push(newEvent);
	}
}

export function getCalendar(
	icalData: string,
	{ after, before }: DatesDuration
): Calendar {
	const calendar: Calendar = [];
	const expander = new IcalExpander({
		ics: icalData,
	});

	// TODO: set proper before date
	const expandedData = expander.between(after, before);

	expandedData.events.forEach((event) => {
		const summary = event.component.getFirstPropertyValue("summary");
		const { startDate, endDate } = event;

		addToCalendar(calendar, summary, { startDate, endDate });
	});

	expandedData.occurrences.forEach((occurrence) => {
		const summary = occurrence.item.component.getFirstPropertyValue("summary");
		const { startDate, endDate } = occurrence;

		addToCalendar(calendar, summary, { startDate, endDate });
	});

	calendar.forEach((eventsBySummary) => {
		eventsBySummary.setDurationMilliseconds();
	});

	calendar.sort((a, b) => {
		if (a.durationMilliseconds === b.durationMilliseconds) {
			return a.summary.localeCompare(b.summary);
		} else {
			return b.durationMilliseconds - a.durationMilliseconds;
		}
	});

	return calendar;
}

export function getDateFromPickerString(duration: DateValueType) {
	const result: DatesDuration = {
		after: undefined,
		before: undefined,
	};

	if (duration) {
		if (duration.startDate && typeof duration.startDate === "string") {
			const [year, month, day] = duration.startDate
				.split("-")
				.map((value) => parseInt(value));

			result.after = new Date(year, month - 1, day, 0, 0, 0, 0);
		}

		if (duration.endDate && typeof duration.endDate === "string") {
			const [year, month, day] = duration.endDate
				.split("-")
				.map((value) => parseInt(value));

			result.before = new Date(year, month - 1, day, 23, 59, 59, 999);
		}
	}

	return result;
}

export function getPickerStringFromDate(duration: DatesDuration) {
	const result: DateRangeType = {
		startDate: null,
		endDate: null,
	};

	if (duration.after) {
		result.startDate = `${duration.after.getFullYear()}-${
			duration.after.getMonth() + 1
		}-${duration.after.getDate()}`;
	}

	if (duration.before) {
		result.endDate = `${duration.before.getFullYear()}-${
			duration.before.getMonth() + 1
		}-${duration.before.getDate()}`;
	}

	return result;
}
