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
			<label className="block rounded-lg bg-slate-100 px-3 py-2 text-slate-800">
				<input type="checkbox" className="mr-2" />
				{getHumanStringFromMilliseconds(duration)} * {count}회
			</label>
		</li>
	);
}
