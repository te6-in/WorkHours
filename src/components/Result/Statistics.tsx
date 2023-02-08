import { forwardRef } from "react";

export const Statistics = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div ref={ref} className="w-full max-w-xl rounded-2xl bg-slate-100 p-4">
			결과
		</div>
	);
});
