import { Note } from "@/components/Note";
import { j } from "@/scripts/join-classes";
import {
	StringsObject,
	getEventDataProps,
	getEventName,
} from "@/scripts/umami";
import { LucideIcon } from "lucide-react";
import { Fragment } from "react";

interface ButtonProps {
	isPrimary?: boolean;
	isDisabled?: boolean;
	isLabelForFile?: boolean;
	Icon: LucideIcon;
	text: string;
	note?: string;
	eventName?: string;
	eventData?: StringsObject;
	onClick?: () => void;
}

export function Button({
	isPrimary,
	isDisabled,
	isLabelForFile,
	Icon,
	text,
	note,
	eventName,
	eventData,
	onClick,
}: ButtonProps) {
	const ContainerTag = note ? "div" : Fragment;
	const ButtonTag = isLabelForFile ? "label" : "button";

	return (
		<ContainerTag className="flex flex-col items-center gap-2">
			<ButtonTag
				onClick={onClick}
				htmlFor={isLabelForFile ? "file" : undefined}
				data-umami-event={eventName && getEventName(eventName)}
				{...(eventData && getEventDataProps(eventData))}
				className={j(
					"flex h-fit items-center gap-2 rounded-xl border-2 border-zinc-50 px-4 py-3 text-lg",
					isPrimary ? "bg-zinc-50 font-semibold text-zinc-800" : "text-zinc-50",
					isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
				)}
			>
				<Icon />
				<span>{text}</span>
			</ButtonTag>
			{note && <Note text={note} />}
		</ContainerTag>
	);
}
