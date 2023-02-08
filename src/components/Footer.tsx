import { ReactNode } from "react";

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
			className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-center text-white"
		>
			{children}
		</Link>
	);
}

function License({ href, text }: { href: string; text: string }) {
	return (
		<Link href={href} className="text-slate-300 underline underline-offset-2">
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
				<Button href="https://github.com/te6-in/WorkHours">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] fill-none stroke-current text-white"
					>
						<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
						<path d="M9 18c-4.51 2-5-2-7-2"></path>
					</svg>
					GitHub 레포지토리
				</Button>
			</div>
			<span className="text-center text-sm leading-6 text-slate-500">
				라이선스: <License href="" text="MPL-2.0"></License>
				{/* TODO: add license url */}
				<br />
				<License
					href="https://github.com/kewisch/ical.js"
					text="ical.js"
				></License>{" "}
				|{" "}
				<License
					href="https://github.com/etesync/ios/blob/master/src/types/ical.js.d.ts"
					text="ical.js.d.ts"
				></License>{" "}
				|{" "}
				<License
					href="https://github.com/react-dropzone/react-dropzone"
					text="react-dropzone"
				></License>{" "}
				| <License href="https://lucide.dev" text="Lucide"></License>
			</span>
		</footer>
	);
}
