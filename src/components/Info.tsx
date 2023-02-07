import { ChangeEvent } from "react";

interface InfoProps {
	onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Info({ onFileChange }: InfoProps) {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="m-auto mt-4 h-24 w-24 fill-none stroke-current text-white"
			>
				<title>시계와 화살표가 결합된 아이콘</title>
				<path d="M10 2h4"></path>
				<path d="M12 14v-4"></path>
				<path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"></path>
				<path d="M9 17H4v5"></path>
			</svg>
			<h1 className="mt-6 text-center text-5xl font-bold text-white">
				일한시간
			</h1>
			<p className="mt-8 text-center text-xl leading-8 text-slate-400">
				캘린더 파일을 업로드하세요.
				<br />
				일정 별로 사용한 시간과 시급을 계산해줍니다.
			</p>
			<p className="mt-2 text-center text-sm font-medium text-slate-600">
				업로드한 파일은 어디에도 저장되지 않습니다.
			</p>
			<input type="file" id="file" onChange={onFileChange} className="hidden" />
			<div className="mt-10 flex flex-wrap justify-center gap-4 ">
				<div className="flex flex-col items-center gap-2">
					<label
						htmlFor="file"
						className="cursor-pointer rounded-xl border-2 border-white bg-white py-3 px-5 text-center text-lg font-semibold text-slate-800"
					>
						ics 파일 선택
					</label>
					<span className="text-sm text-slate-400">또는 끌어다 놓기</span>
				</div>
				<button className="h-fit rounded-xl border-2 border-white py-3 px-5 text-lg text-white ">
					캘린더 파일 받는 법
				</button>
			</div>
		</>
	);
}
