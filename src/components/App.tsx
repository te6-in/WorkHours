import { EventsCard } from "@/components/EventsCard";
import { Footer } from "@/components/Footer";
import { Info } from "@/components/Info";
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
		<div className="flex min-h-screen flex-col justify-between">
			<main className="p-6">
				<section>
					<Info onFileChange={onFileChange} />
				</section>
				<section>
					{icalData ? (
						<ul className="mt-12">
							{getCalendar(icalData).map((events, index) => (
								<EventsCard events={events} key={index} />
							))}
						</ul>
					) : null}
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default App;
