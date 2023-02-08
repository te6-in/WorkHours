import { DropZone } from "@/components/DropZone";
import { Footer } from "@/components/Footer";
import { Info } from "@/components/Info";
import { ResultCards } from "@/components/Result/ResultCards";
import { Calendar, getCalendar } from "@/scripts/calendar";
import { useEffect, useState } from "react";

function App() {
	const [icalData, setICalData] = useState<string | null>(null);
	const [calendar, setCalendar] = useState<Calendar | null>(null);

	useEffect(() => {
		if (icalData) {
			setCalendar(getCalendar(icalData));
		}
	}, [icalData]);

	return (
		<DropZone setICalData={setICalData} uploaded={!!icalData}>
			<main className="px-6 pt-12">
				<section>
					<Info setICalData={setICalData} uploaded={!!icalData} />
				</section>
				{/* TODO: add an example */}
				{calendar && <ResultCards calendar={calendar} setData={setICalData} />}
			</main>
			<Footer />
		</DropZone>
	);
}

// TODO: add a scroll to bottom button
// TODO: add how to get ics file
// TODO: add an english version
// TODO: add microinteractions
// TODO: accessibility
// TODO: SEO and analytics

export default App;
