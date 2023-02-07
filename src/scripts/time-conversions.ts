export function millisecondsToHumanUnits(milliseconds: number) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds %= 60;
	minutes %= 60;

	return { hours, minutes, seconds };
}

export function getHumanString({
	hours,
	minutes,
	seconds,
}: {
	hours: number;
	minutes: number;
	seconds: number;
}) {
	if (hours === 0 && minutes === 0 && seconds === 0) {
		return "기간 없음";
	}

	const hoursString = hours === 0 ? "" : `${hours}시간`;
	// 1시간 3초 (x) 1시간 0분 3초 (o)
	const minutesString = minutes === 0 && seconds === 0 ? "" : `${minutes}분`;
	const secondsString = seconds === 0 ? "" : `${seconds}초`;

	return `${hoursString} ${minutesString} ${secondsString}`.trim();
}

export function getHumanStringFromMilliseconds(milliseconds: number) {
	const { hours, minutes, seconds } = millisecondsToHumanUnits(milliseconds);
	return getHumanString({ hours, minutes, seconds });
}
