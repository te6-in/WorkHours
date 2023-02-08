import { Dispatch, SetStateAction } from "react";

export function readFile(
	file: File,
	setData: (data: string) => void,
	setHideNoneAvailables: Dispatch<SetStateAction<boolean>>
) {
	const reader = new FileReader();

	reader.addEventListener("load", (readerEvent) => {
		if (readerEvent.target && typeof readerEvent.target.result === "string") {
			setData(readerEvent.target.result);
			setHideNoneAvailables(true);
		}
	});

	reader.readAsText(file);
}

// TODO: handle error
