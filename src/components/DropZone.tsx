import { readFile } from "@/scripts/read-file";
import { scrollToTop } from "@/scripts/scroll";
import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
	setICalData: (data: string) => void;
	uploaded: boolean;
	children: ReactNode;
}

export function DropZone({ setICalData, uploaded, children }: DropZoneProps) {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			scrollToTop(100);
			readFile(file, setICalData);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"text/calendar": [".ics"],
		},
		maxFiles: 1,
	});

	return (
		<div
			{...getRootProps({
				onClick: (event) => event.stopPropagation(),
			})}
			className="flex min-h-screen flex-col justify-between"
		>
			<input {...getInputProps()} />
			{children}
			{isDragActive ? (
				<div className="fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-slate-200 bg-opacity-40 text-slate-900 backdrop-blur-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-16 min-h-[4rem] w-16 min-w-[4rem] fill-none stroke-current"
					>
						<path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
						<line x1="16" y1="2" x2="16" y2="6" />
						<line x1="8" y1="2" x2="8" y2="6" />
						<line x1="3" y1="10" x2="21" y2="10" />
						<path d="m16 20 2 2 4-4" />
					</svg>
					<span className="text-xl font-bold">
						{uploaded
							? "새로운 파일을 업로드하려면 여기에 놓으세요."
							: "여기에 *.ics 파일을 놓으세요."}
					</span>
				</div>
			) : null}
		</div>
	);
}
