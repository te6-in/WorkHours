export type StringsObject = {
	[key: string]: string;
};

export function getEventName(eventName: string) {
	return `work-hours-${eventName}`;
}

export function getEventDataProps(eventData: StringsObject) {
	const eventDataProps: StringsObject = {};

	for (const key in eventData) {
		eventDataProps[`data-umami-event-${key}`] = eventData[key];
	}

	return eventDataProps;
}
