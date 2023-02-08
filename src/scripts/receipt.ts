import { Result } from "@/scripts/counts-by-durations";

type Receipt = {
	summary: string;
	total: number;
}[];

export function getReceipt(results: Result[]) {
	const totalSelectedDuration = results.reduce(
		(total, result) =>
			total +
			result.countsByDurations.reduce(
				(total, countByDuration) =>
					total +
					(countByDuration.checked
						? countByDuration.count * countByDuration.duration
						: 0),
				0
			),
		0
	);

	const receipt: Receipt = [];

	results.forEach((result) => {
		const total = result.countsByDurations.reduce(
			(total, countByDuration) =>
				total +
				(countByDuration.checked
					? countByDuration.count * countByDuration.duration
					: 0),
			0
		);

		if (total > 0) {
			receipt.push({
				summary: result.summary,
				total,
			});
		}
	});

	receipt.sort((a, b) => {
		if (a.total === b.total) {
			return a.summary.localeCompare(b.summary);
		} else {
			return b.total - a.total;
		}
	});

	return { receipt, totalSelectedDuration };
}
