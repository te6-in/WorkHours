declare module "ical-expander" {
	import * as ICAL from "ical.js";

	interface Options {
		ics: string;
		maxIterations?: number;
	}

	interface Result {
		events: ICAL.Event[];
		occurrences: {
			startDate: ICAL.Time;
			endDate: ICAL.Time;
			recurrenceId: ICAL.Time;
			item: ICAL.Event;
		}[];
	}

	export default class IcalExpander {
		maxIterations: number;
		skipInvalidDates: boolean;
		jCalData: ICAL.Component;
		component: ICAL.Component;
		events: ICAL.Event[];

		constructor(opts: Options);

		between(after?: Date, before?: Date): Result;
		before(before: Date): Result;
		after(after: Date): Result;
		all(): Result;
	}
}
