interface NoteProps {
	text: string;
	moreClasses?: string;
}

export function Note({ text, moreClasses }: NoteProps) {
	return (
		<div className={`text-center text-sm text-slate-500 ${moreClasses}`}>
			{text}
		</div>
	);
}
