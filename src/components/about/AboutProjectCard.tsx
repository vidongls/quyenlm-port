import { Link } from "@tanstack/react-router";
import type { ProjectDetailPath } from "../../lib/content/types";

export type AboutProjectCardProps = {
	description: string;
	featured?: boolean;
	href?: ProjectDetailPath;
	imageUrl?: string;
	tag: string;
	title: string;
};

export default function AboutProjectCard({
	description,
	featured = false,
	href = "/projects/fintech-hub",
	imageUrl = "/assets/about-project.png",
	tag,
	title,
}: AboutProjectCardProps) {
	const slug = href.replace("/projects/", "");
	return (
		<article
			className={`about-project-card group flex min-h-[505px] flex-col items-start gap-4 rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[4px_4px_0_rgba(30,30,30,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_9px_0_rgba(30,30,30,0.13)] motion-reduce:transition-none ${featured ? "lg:-rotate-[1.2deg]" : ""}`.trim()}
		>
			<div className="h-[260px] w-full shrink-0 overflow-hidden rounded-[14px] border-2 border-ink">
				<img
					src={imageUrl}
					alt=""
					className="about-project-card__image size-full object-cover"
				/>
			</div>

			<div className="flex w-full items-center gap-2">
				<span className="about-project-card__tag rounded-full bg-highlight-yellow px-2.5 py-1 font-ui text-xs leading-[1.4] font-bold whitespace-nowrap text-ink">
					{tag}
				</span>
				<span className="font-ui text-sm leading-[1.5] tracking-[-0.07px] whitespace-nowrap text-muted">
					{"// CASE STUDY"}
				</span>
			</div>

			<div className="flex w-full flex-col gap-2 text-ink">
				<h2 className="font-display text-2xl leading-[1.3] font-extrabold">
					{title}
				</h2>
				<p className="font-ui text-sm leading-[1.5] tracking-[-0.07px]">
					{description}
				</p>
			</div>

			<div className="mt-auto flex w-full items-center justify-between pt-3">
				<Link
					to="/projects/$slug"
					params={{ slug }}
					className="about-project-card__link font-ui text-sm leading-[1.4] font-semibold tracking-[-0.07px] text-highlight-blue focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue"
				>
					Open Board <span aria-hidden="true">→</span>
				</Link>
				<span className="about-project-card__like flex size-7 items-center justify-center rounded-[14px] border-[1.5px] border-ink bg-highlight-pink font-ui text-[13px] leading-[1.4] font-semibold text-ink">
					👍
				</span>
			</div>
		</article>
	);
}
