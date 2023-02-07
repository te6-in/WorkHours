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
			{getHumanStringFromMilliseconds(duration)} x {count}회
		</li>
	);
}
