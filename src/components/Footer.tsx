import { Github } from "lucide-react";
import { ReactNode } from "react";

const data = [
	{ name: "ical.js", url: "https://github.com/kewisch/ical.js" },
	{
		name: "ical.js.d.ts",
		url: "https://github.com/etesync/ios/blob/master/src/types/ical.js.d.ts",
	},
	{
		name: "ical-expander",
		url: "https://github.com/mifi/ical-expander",
	},
	{
		name: "react-dropzone",
		url: "https://github.com/react-dropzone/react-dropzone",
	},
	{
		name: "react-tailwindcss-datepicker",
		url: "https://github.com/onesine/react-tailwindcss-datepicker",
	},
	{ name: "Lucide", url: "https://lucide.dev" },
];

interface LinkProps {
	href: string;
	className?: string;
	children: ReactNode;
}

function Link({ href, className, children }: LinkProps) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
		>
			{children}
		</a>
	);
}

function Button({ href, children }: { href: string; children: ReactNode }) {
	return (
		<Link
			href={href}
			className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-3 text-center text-zinc-50"
		>
			{children}
		</Link>
	);
}

function License({ href, text }: { href: string; text: string }) {
	return (
		<Link
			href={href}
			className="inline-block text-zinc-300 underline underline-offset-2"
		>
			{text}
		</Link>
	);
}

export function Footer() {
	return (
		<footer className="mt-8 flex flex-col items-center gap-4 px-6 py-8">
			<div className="flex select-none flex-wrap items-center justify-center gap-2">
				<Button href="https://blog.te6.in">
					<img
						src="https://blog.te6.in/favicon.ico"
						alt="상어 모양의 te6.in 로고"
						className="mr-1 h-5 w-5"
					/>
					te6.in 개발·디자인 블로그
				</Button>
				<Button href="https://github.com/te6-in/work-hours">
					<Github width={20} height={20} />
					GitHub 레포지토리
				</Button>
			</div>
			<Link href="https://github.com/te6-in/work-hours/">
				<img
					alt="GitHub 레포지토리 Stars 수"
					src="https://img.shields.io/github/stars/te6-in/work-hours?style=social"
				/>
			</Link>
			<span className="text-center text-sm leading-6 text-zinc-500">
				라이선스:{" "}
				<License
					href="https://github.com/te6-in/work-hours/blob/main/LICENSE"
					text="MPL-2.0"
				/>
				<br />
				{data.map((item, index) => (
					<span key={index}>
						<License href={item.url} text={item.name} />
						{index !== data.length - 1 && " | "}
					</span>
				))}
			</span>
		</footer>
	);
}
