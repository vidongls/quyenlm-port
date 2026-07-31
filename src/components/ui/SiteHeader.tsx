import { Link } from "@tanstack/react-router";

export type SiteHeaderProps = {
	className?: string;
	resumeHref?: string;
};

export default function SiteHeader({
	className = "",
	resumeHref = "/resume.pdf",
}: SiteHeaderProps) {
	return (
		<header
			className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-8 lg:px-16 ${className}`.trim()}
			data-node-id="309:7973"
		>
			<Link
				to="/"
				className="group pointer-events-auto flex items-start rounded-lg border-2 border-tag-border bg-tag px-4 py-2 font-code text-[13px] leading-none font-bold shadow-[4px_4px_0_rgba(30,30,30,0.15)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(30,30,30,0.15)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[6px_6px_0_rgba(30,30,30,0.15)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue motion-reduce:transition-none"
				aria-label="Quyenlee Design — Home"
			>
				<span className="whitespace-nowrap text-white transition-colors duration-200 group-hover:text-highlight-pink group-focus-visible:text-highlight-pink motion-reduce:transition-none">
					quyenlee
				</span>
				<span className="flex h-[24.5px] w-[57px] shrink-0 items-center justify-center">
					<span className="-rotate-[8deg] whitespace-nowrap text-ink transition-transform duration-200 group-hover:-rotate-[2deg] group-focus-visible:-rotate-[2deg] motion-reduce:transition-none">
						.design
					</span>
				</span>
			</Link>

			<a
				href={resumeHref}
				className="pointer-events-auto flex min-h-12 items-center justify-center rounded-xl border-2 border-ink bg-white px-6 py-3.5 font-ui text-sm leading-[1.4] font-bold tracking-[-0.07px] whitespace-nowrap transition-shadow duration-200 hover:shadow-[4px_4px_0_rgba(30,30,30,0.15)] focus-visible:shadow-[4px_4px_0_rgba(30,30,30,0.15)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue motion-reduce:transition-none"
			>
				Quyen&apos;s Resume
			</a>
		</header>
	);
}
