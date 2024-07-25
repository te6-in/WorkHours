import { Button } from "@/components/Button";
import { Note } from "@/components/Note";
import { readFile } from "@/scripts/read-file";
import { scrollToTop } from "@/scripts/scroll";
import { Download, GanttChartSquare, TimerReset, Upload } from "lucide-react";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

interface InfoProps {
	setIcalData: (data: string) => void;
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
	setIcalData,
	setHideNoneAvailables,
	uploaded,
}: InfoProps) {
	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;

		const file = files ? files[0] : null;

		if (file) {
			readFile(file, setIcalData, setHideNoneAvailables);
			scrollToTop(100);
		}
	};

	const setExampleIcalData = () => {
		fetch("/example.ics")
			.then((response) => response.text())
			.then((data) => setIcalData(data));

		scrollToTop(100);
	};

	return (
		<>
			<a
				href="/work-hours/"
				className="m-auto flex w-fit select-none items-center justify-center gap-2 text-zinc-50"
			>
				<TimerReset
					width={64}
					height={64}
					role="img"
					aria-label="시계와 화살표가 결합된 아이콘"
				/>
				<h1 className="mr-2 mt-2 text-5xl font-bold">일한시간</h1>
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
						text="업로드한 파일은 브라우저에서만 처리되며 온라인으로 전송되지 않습니다."
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
						<Button
							isPrimary
							isLabelForFile
							Icon={Upload}
							text="*.ics 파일 선택"
							note="또는 끌어다 놓기"
							eventName="upload-file"
						/>
						<Button
							Icon={GanttChartSquare}
							text="예시 확인"
							onClick={setExampleIcalData}
							eventName="see-example"
						/>
						<Button
							isDisabled
							Icon={Download}
							text="파일 받는 법"
							eventName="how-to-get-ics"
						/>
					</div>
				</>
			)}
		</>
	);
}
