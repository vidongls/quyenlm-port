import { Link } from "@tanstack/react-router";
import DraggableSticker from "./DraggableSticker";

export default function ProjectCard() {
	return (
		<DraggableSticker
			ariaLabel="Move featured project card"
			className="absolute top-[192.1px] left-[-600px] z-0 flex items-center justify-center"
		>
			<div className="home-project-stack relative w-[421px]">
				<span
					aria-hidden="true"
					className="home-project-stack__layer home-project-stack__layer--4"
				/>
				<span
					aria-hidden="true"
					className="home-project-stack__layer home-project-stack__layer--3"
				/>
				<span
					aria-hidden="true"
					className="home-project-stack__layer home-project-stack__layer--2"
				/>
				<span
					aria-hidden="true"
					className="home-project-stack__layer home-project-stack__layer--1"
				/>

				<article className="home-project-card relative z-[5] flex w-full flex-col items-start gap-4 rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[4px_4px_0_rgba(30,30,30,0.15)]">
					<div className="h-[260px] w-full overflow-hidden rounded-[14px] border-2 border-ink">
						<img
							src="/assets/home-project.png"
							alt="FinTech Hub smart savings interface"
							className="size-full object-cover"
						/>
					</div>

					<div className="flex items-center gap-2">
						<span className="rounded-full bg-highlight-yellow px-2.5 py-1 font-ui text-xs leading-[1.4] font-bold text-ink">
							Product Design
						</span>
						<span className="font-ui text-sm leading-[1.5] tracking-[-0.07px] text-muted">
							{"// CASE STUDY"}
						</span>
					</div>

					<div className="flex w-full flex-col gap-2 text-ink">
						<h2 className="font-display text-2xl leading-[1.3] font-extrabold">
							FinTech Hub: Smart Savings
						</h2>
						<p className="truncate font-ui text-sm leading-[1.5] tracking-[-0.07px]">
							An AI-powered micro-investment platform built specifically for the
							Gen-Z market in Southeast Asia, simplifying automated savings.
						</p>
					</div>

					<div className="flex w-full items-center justify-between pt-3">
						<Link
							to="/work"
							className="font-ui text-sm leading-[1.4] font-semibold tracking-[-0.07px] text-highlight-blue focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue"
						>
							Open Board →
						</Link>
						<span className="flex size-7 items-center justify-center rounded-[14px] border-[1.5px] border-ink bg-highlight-pink font-ui text-[13px] leading-[1.4] font-semibold text-ink">
							👍
						</span>
					</div>
				</article>
			</div>
		</DraggableSticker>
	);
}
