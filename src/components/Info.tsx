import { Note } from "@/components/Note";
import { readFile } from "@/scripts/read-file";
import { scrollToTop } from "@/scripts/scroll";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

interface InfoProps {
	setICalData: (data: string) => void;
	setHideNoneAvailables: Dispatch<SetStateAction<boolean>>;
	uploaded: boolean;
}

function Description({ children }: { children: ReactNode }) {
	return (
		<p className="mt-8 text-center text-xl leading-8 text-zinc-300">
			{children}
		</p>
	);
}

export function Info({
	setICalData,
	setHideNoneAvailables,
	uploaded,
}: InfoProps) {
	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;

		const file = files ? files[0] : null;

		if (file) {
			readFile(file, setICalData, setHideNoneAvailables);
			scrollToTop(100);
		}
	};

	return (
		<>
			<a
				href="/workhours/"
				className="m-auto flex w-fit select-none items-center justify-center gap-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-16 min-h-[4rem] w-16 min-w-[4rem] fill-none stroke-current text-zinc-50"
				>
					<title>시계와 화살표가 결합된 아이콘</title>
					<path d="M10 2h4"></path>
					<path d="M12 14v-4"></path>
					<path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"></path>
					<path d="M9 17H4v5"></path>
				</svg>
				<h1 className="mt-2 mr-2 text-5xl font-bold text-zinc-50">일한시간</h1>
			</a>
			{uploaded ? (
				<>
					<Description>
						필요한 내용을 선택하고
						<br />맨 밑에서 결과를 확인해보세요.
					</Description>
					<Note text="시간 및 횟수 순으로 정렬되었습니다." moreClasses="mt-2" />
				</>
			) : (
				<>
					<Description>
						캘린더 파일을 업로드하세요.
						<br />
						일정 별로 사용한 시간과 시급을 계산해줍니다.
					</Description>
					<Note
						text="업로드한 파일은 브라우저에서만 처리되며 어디에도 저장되지 않습니다."
						moreClasses="mt-2"
					/>
					<input
						type="file"
						id="file"
						accept="text/calendar"
						onChange={onFileChange}
						className="hidden"
					/>
					<div className="mt-10 flex select-none flex-wrap justify-center gap-4">
						<div className="flex flex-col items-center gap-2">
							<label
								htmlFor="file"
								className="cursor-pointer rounded-xl border-2 border-zinc-50 bg-zinc-50 py-3 px-5 text-center text-lg font-semibold text-zinc-800"
							>
								*.ics 파일 선택
							</label>
							<Note text="또는 끌어다 놓기" />
						</div>
						<button className="h-fit rounded-xl border-2 border-zinc-50 py-3 px-5 text-lg text-zinc-50 ">
							파일 받는 법
						</button>
					</div>
				</>
			)}
		</>
	);
}
