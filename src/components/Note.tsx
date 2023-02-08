interface NoteProps {
	text: string;
	moreClasses?: string;
}

export function Note({ text, moreClasses }: NoteProps) {
	return (
		<div className={`text-center text-sm text-zinc-500 ${moreClasses}`}>
			{text}
		</div>
	);
}
