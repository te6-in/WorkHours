import * as ICAL from "ical.js";
import { ChangeEvent, useEffect, useState } from "react";

function App() {
	const [icalData, setCalendarData] = useState<string | null>(null);

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;

		const file = files ? files[0] : null;

		if (file) {
			const reader = new FileReader();

			reader.addEventListener("load", (readerEvent) => {
				if (
					readerEvent.target &&
					typeof readerEvent.target.result === "string"
				) {
					setCalendarData(readerEvent.target.result);
				}
			});

			reader.readAsText(file);
		}
	};

	useEffect(() => {
		if (icalData) {
			const jcalData = ICAL.parse(icalData);
			const componentData = new ICAL.Component(jcalData);
			const events = componentData.getAllSubcomponents("vevent");

			events.forEach((event) => {
				if (event.getFirstPropertyValue("summary") === "학원") {
					console.log(
						event,
						event.getFirstPropertyValue("dtstart"),
						event.getFirstPropertyValue("dtend")
					);
				}
			});
		}
	}, [icalData]);

	return (
		<div>
			<header>
				<h1>일한시간</h1>
			</header>
			<main>
				<input type="file" onChange={onFileChange} />
			</main>
			<footer>Footer</footer>
		</div>
	);
}

export default App;
