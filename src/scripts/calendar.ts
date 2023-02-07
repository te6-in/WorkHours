import * as ICAL from "ical.js";

class Event {
	readonly durationMilliseconds: number;

	constructor(
		readonly start: Date,
		readonly end: Date,
		readonly recurRules: any, // TODO
		readonly excludedDates: Date[] | null
	) {
		if (recurRules === null) {
			this.durationMilliseconds = this.end.getTime() - this.start.getTime();
		} else {
			this.durationMilliseconds = 0; // TODO
		}
	}
}

class Events {
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

function getDate(data: ICAL.Time) {
	return new Date(
		data.year,
		data.month - 1,
		data.day,
		data.hour,
		data.minute,
		data.second
	);
}

export function getCalendar(icalData: string) {
	const calendar: Events[] = [];

	const jcalData = ICAL.parse(icalData);
	const componentData = new ICAL.Component(jcalData);
	const events = componentData.getAllSubcomponents("vevent");

	events.forEach((event) => {
		const summary = event.getFirstPropertyValue("summary");
		const excludedDates =
			event.getAllProperties("exdate").length === 0
				? null
				: event.getAllProperties("exdate").map((exdate) => {
						const excludeData = exdate.getFirstValue()._time as ICAL.Time;
						return getDate(excludeData);
				  });

		const newEvent = new Event(
			getDate(event.getFirstPropertyValue("dtstart")._time),
			getDate(event.getFirstPropertyValue("dtend")._time),
			event.getFirstPropertyValue("rrule"),
			excludedDates
		);

		const index = calendar.findIndex(
			(calendarEvent) => calendarEvent.summary === summary
		);

		if (index === -1) {
			calendar.push(new Events(summary, [newEvent]));
		} else {
			calendar[index].events.push(newEvent);
		}
	});

	calendar.forEach((events) => {
		events.setDurationMilliseconds();
	});

	return calendar;
}
