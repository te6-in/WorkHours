import { readFile } from "@/scripts/read-file";
import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
	setData: (data: string) => void;
	hasFile: boolean;
	children: ReactNode;
}

export function DropZone({ setData, hasFile, children }: DropZoneProps) {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			readFile(file, setData);
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
				<div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-slate-200 bg-opacity-40 backdrop-blur-md">
					<p className="text-xl font-bold text-slate-900">
						{hasFile
							? "새로운 파일을 업로드하려면 여기에 놓으세요."
							: "여기에 *.ics 파일을 놓으세요."}
					</p>
				</div>
			) : null}
		</div>
	);
}
