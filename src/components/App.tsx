import { DropZone } from "@/components/DropZone";
import { Footer } from "@/components/Footer";
import { Info } from "@/components/Info";
import { Result } from "@/components/Result";
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
			<main className="px-6 pt-12">
				<section>
					<Info setData={setCalendarData} uploaded={!!icalData} />
				</section>
				{/* TODO: add an example */}
				{icalData && <Result icalData={icalData} setData={setCalendarData} />}
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
