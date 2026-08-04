import { Link } from "@tanstack/react-router";
import "./SiteHeader.css";

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
			className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-3 py-4 sm:px-8 lg:px-16 ${className}`.trim()}
			data-node-id="309:7973"
		>
			<Link
				to="/"
				className="group pointer-events-auto flex items-start rounded-lg border-2 border-tag-border bg-tag px-3 py-2 font-code text-[12px] leading-none font-bold shadow-[4px_4px_0_rgba(30,30,30,0.15)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(30,30,30,0.15)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[6px_6px_0_rgba(30,30,30,0.15)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue motion-reduce:transition-none sm:px-4 sm:text-[13px]"
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
				download="Quyen-Le-Minh-Resume.pdf"
				aria-label="Download Quyen's resume as PDF"
				className="resume-download pointer-events-auto"
			>
				<span className="resume-download__wash" aria-hidden="true" />
				<span className="resume-download__label">
					<span className="sm:hidden">Resume</span>
					<span className="max-sm:hidden">Quyen&apos;s Resume</span>
				</span>
				<span className="resume-download__format" aria-hidden="true">
					PDF
				</span>
				<span className="resume-download__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path d="M12 4v10m0 0 4-4m-4 4-4-4M5 18.5h14" />
					</svg>
				</span>
			</a>
		</header>
	);
}
