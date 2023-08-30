import { readFile } from "@/scripts/read-file";
import { scrollToTop } from "@/scripts/scroll";
import { AnimatePresence, motion } from "framer-motion";
import { FileUp } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
	setIcalData: (data: string) => void;
	setHideNoneAvailables: Dispatch<SetStateAction<boolean>>;
	uploaded: boolean;
	children: ReactNode;
}

export function DropZone({
	setIcalData,
	setHideNoneAvailables,
	uploaded,
	children,
}: DropZoneProps) {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			scrollToTop(100);
			readFile(file, setIcalData, setHideNoneAvailables);
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
			<AnimatePresence>
				{isDragActive && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className="fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-zinc-200 bg-opacity-40 text-zinc-900 backdrop-blur-md"
					>
						<FileUp width={64} height={64} strokeWidth={1.5} />
						<span className="text-xl font-bold">
							{uploaded
								? "새로운 파일을 업로드하려면 여기에 놓으세요."
								: "여기에 *.ics 파일을 놓으세요."}
						</span>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
