import { EventsCard } from "@/components/EventsCard";
import { getCalendar } from "@/scripts/calendar";
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
			console.log(getCalendar(icalData));
		}
	}, [icalData]);

	return (
		<>
			<header>
				<h1>일한시간</h1>
			</header>
			<main>
				<input type="file" onChange={onFileChange} />
				{icalData ? (
					<ul>
						{getCalendar(icalData).map((events, index) => (
							<EventsCard events={events} key={index} />
						))}
					</ul>
				) : null}
			</main>
			<footer>Footer</footer>
		</>
	);
}

export default App;
