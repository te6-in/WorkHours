export function readFile(file: File, setData: (data: string) => void) {
	const reader = new FileReader();

	reader.addEventListener("load", (readerEvent) => {
		if (readerEvent.target && typeof readerEvent.target.result === "string") {
			setData(readerEvent.target.result);
		}
	});

	reader.readAsText(file);
}
