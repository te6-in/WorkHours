import { getHumanStringFromMilliseconds } from "@/scripts/time-conversions";

export function DurationChip({
	duration,
	count,
}: {
	duration: number;
	count: number;
}) {
	return (
		<li>
			<label className="chip flex items-center rounded-lg bg-slate-100 px-3 py-2 text-slate-800">
				<input type="checkbox" className="mr-2.5 accent-slate-100" />
				<span className="mt-[2px]">
					{getHumanStringFromMilliseconds(duration)} * {count}회
				</span>
			</label>
		</li>
	);
}
