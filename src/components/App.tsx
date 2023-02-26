import { DropZone } from "@/components/DropZone";
import { Footer } from "@/components/Footer";
import { Info } from "@/components/Info";
import { ResultCards } from "@/components/Result/ResultCards";
import {
	Calendar,
	getCalendar,
	getDateFromPickerString,
} from "@/scripts/calendar";
import { useEffect, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

function App() {
	const [icalData, setICalData] = useState<string | null>(null);
	const [calendar, setCalendar] = useState<Calendar | null>(null);
	// TODO: default values
	const [duration, setDuration] = useState<DateValueType>({
		startDate: null,
		endDate: null,
	});
	const [hideNoneAvailables, setHideNotAvailables] = useState(true);

	useEffect(() => {
		if (icalData) {
			console.log(duration);
			setCalendar(getCalendar(icalData, getDateFromPickerString(duration)));
		}
	}, [icalData, duration]);

	return (
		<DropZone
			setICalData={setICalData}
			setHideNoneAvailables={setHideNotAvailables}
			uploaded={!!icalData}
		>
			<main className="px-6 pt-12">
				<section>
					<Info
						setICalData={setICalData}
						setHideNoneAvailables={setHideNotAvailables}
						uploaded={!!icalData}
					/>
				</section>
				{/* TODO: add an example */}
				{calendar && (
					<ResultCards
						calendar={calendar}
						duration={duration}
						setDuration={setDuration}
						hideNoneAvailables={hideNoneAvailables}
						setHideNoneAvailables={setHideNotAvailables}
						setData={setICalData}
					/>
				)}
			</main>
			<Footer />
		</DropZone>
	);
}

// TODO: add how to get ics file
// TODO: add an english version
// TODO: add microinteractions
// TODO: add filters
// TODO: accessibility
// TODO: SEO and analytics

export default App;
