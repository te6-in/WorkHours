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
	const [icalData, setIcalData] = useState<string | null>(null);
	const [calendar, setCalendar] = useState<Calendar | null>(null);
	// TODO: default values
	const [duration, setDuration] = useState<DateValueType>({
		startDate: null,
		endDate: null,
	});
	const [hideNoneAvailables, setHideNotAvailables] = useState(true);

	useEffect(() => {
		if (icalData) {
			setCalendar(getCalendar(icalData, getDateFromPickerString(duration)));
		}
	}, [icalData, duration]);

	return (
		<DropZone
			setIcalData={setIcalData}
			setHideNoneAvailables={setHideNotAvailables}
			uploaded={!!icalData}
		>
			<main className="px-6 pt-12">
				<section>
					<Info
						setIcalData={setIcalData}
						setHideNoneAvailables={setHideNotAvailables}
						uploaded={!!icalData}
					/>
				</section>
				{/* TODO: add an example */}
				{calendar && (
					<ResultCards
						icalData={icalData}
						calendar={calendar}
						duration={duration}
						setDuration={setDuration}
						hideNoneAvailables={hideNoneAvailables}
						setHideNoneAvailables={setHideNotAvailables}
						setData={setIcalData}
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
