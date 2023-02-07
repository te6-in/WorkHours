import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";

export function DurationItem({
	duration,
	count,
}: {
	duration: number;
	count: number;
}) {
	return (
		<li>
			<label className="block p-2">
				<input type="checkbox" className="mr-2" />
				{getHumanStringFromMilliseconds(duration)} x {count}회
			</label>
		</li>
	);
}
