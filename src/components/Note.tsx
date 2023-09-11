import { j } from "@/scripts/join-classes";

interface NoteProps {
	text: string;
	moreClasses?: string;
}

export function Note({ text, moreClasses }: NoteProps) {
	return (
		<p
			className={j(
				"text-center text-sm text-zinc-500",
				moreClasses ? moreClasses : ""
			)}
		>
			{text}
		</p>
	);
}
