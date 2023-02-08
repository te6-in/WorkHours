import { DropZone } from "@/components/DropZone";
import { EventsCard } from "@/components/EventsCard";
import { Footer } from "@/components/Footer";
import { Info } from "@/components/Info";
import { getCalendar } from "@/scripts/calendar";
import { useEffect, useState } from "react";

function App() {
	const [icalData, setCalendarData] = useState<string | null>(null);

	useEffect(() => {
		if (icalData) {
			console.log(getCalendar(icalData));
		}
	}, [icalData]);

	return (
		<DropZone setData={setCalendarData} hasFile={!!icalData}>
			<main className="px-6 py-12">
				<section>
					<Info setData={setCalendarData} uploaded={!!icalData} />
				</section>
				<section>
					{icalData ? (
						<ul className="m-auto mt-12 flex max-w-xl flex-col gap-4 rounded-2xl bg-slate-800 p-4">
							{getCalendar(icalData).map((events, index) => (
								<EventsCard events={events} key={index} />
							))}
						</ul>
					) : null}
				</section>
			</main>
			<Footer />
		</DropZone>
	);
}

export default App;
