interface NoteProps {
	text: string;
	moreClasses?: string;
}

export function Note({ text, moreClasses }: NoteProps) {
	return (
		<p className={`text-center text-sm text-zinc-500 ${moreClasses}`}>{text}</p>
	);
}
