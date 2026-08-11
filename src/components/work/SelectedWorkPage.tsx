import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import type { ProjectContent } from "../../lib/content/types";
import "./SelectedWorkPage.css";

const CASE_META = [
	{
		accent: "blue",
		caption: "Making financial progress feel immediate and understandable.",
		methods: ["User Research", "Product Strategy", "Prototype"],
	},
	{
		accent: "purple",
		caption: "Turning an uncertain commute into one clear next action.",
		methods: ["Field Study", "Journey Mapping", "Interface"],
	},
	{
		accent: "yellow",
		caption: "Keeping clinical handoffs calm, visible and lightweight.",
		methods: ["Workflow Mapping", "Systems UX", "Tablet UI"],
	},
] as const;

function ArrowIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M5 12h13m-5-5 5 5-5 5" />
		</svg>
	);
}

export default function SelectedWorkPage({
	projects,
}: {
	projects: ProjectContent[];
}) {
	return (
		<main
			id="work"
			className="selected-work"
			data-page="work"
			data-node-id="309:6732"
		>
			<div className="selected-work__grid" aria-hidden="true" />

			<section className="work-hero" aria-labelledby="work-title">
				<div className="work-hero__copy">
					<p className="work-hero__eyebrow">
						<span aria-hidden="true" />
						Portfolio archive · Selected 03
					</p>
					<h1 id="work-title">
						Selected <span>Work</span>
					</h1>
					<p className="work-hero__intro">
						Three messy problems, the questions behind them, and the decisions
						that made each product clearer.
					</p>
				</div>

				<aside className="work-hero__index" aria-label="Portfolio summary">
					<div>
						<span>Archive status</span>
						<strong>03 / 03</strong>
					</div>
					<ul>
						<li>Research-led</li>
						<li>Systems-minded</li>
						<li>Built to ship</li>
					</ul>
					<span className="work-hero__stamp" aria-hidden="true">
						OPEN FILES
					</span>
				</aside>
			</section>

			<div className="work-ticker" aria-hidden="true">
				<div className="work-ticker__track">
					{(["primary", "clone"] as const).map((group) => (
						<div className="work-ticker__group" key={group}>
							<span>ASK</span>
							<i />
							<span>RESEARCH</span>
							<i />
							<span>FRAME</span>
							<i />
							<span>PROTOTYPE</span>
							<i />
							<span>TEST</span>
							<i />
							<span>SHIP</span>
							<i />
						</div>
					))}
				</div>
			</div>

			<section className="work-cases" aria-label="Selected case studies">
				{projects.map((project, index) => {
					const meta = CASE_META[index % CASE_META.length];
					const slug = project.detailPath.replace("/projects/", "");
					const caseNumber = String(index + 1).padStart(2, "0");

					return (
						<Link
							to="/projects/$slug"
							params={{ slug }}
							key={project.title}
							className="work-case"
							data-accent={meta.accent}
							style={{ "--case-index": index } as CSSProperties}
							aria-labelledby={`work-case-${index}`}
						>
							<span className="work-case__selection" aria-hidden="true">
								<i />
								<i />
								<i />
								<i />
							</span>

							<div className="work-case__visual">
								<img
									src={project.coverUrl}
									alt={`${project.title} project preview`}
									loading={index === 0 ? "eager" : "lazy"}
								/>
								<span className="work-case__number">CASE {caseNumber}</span>
								<span className="work-case__coordinate" aria-hidden="true">
									X {226 + index * 83} · Y {257 + index * 61}
								</span>
							</div>

							<div className="work-case__content">
								<div className="work-case__meta">
									<span>{project.category}</span>
									<small>{project.caseStudyLabel}</small>
								</div>
								<h2 id={`work-case-${index}`}>{project.title}</h2>
								<p className="work-case__caption">{meta.caption}</p>
								<p className="work-case__summary">{project.summary}</p>

								<ul className="work-case__methods" aria-label="Methods used">
									{meta.methods.map((method) => (
										<li key={method}>{method}</li>
									))}
								</ul>

								<span className="work-case__cta">
									Open case file <ArrowIcon />
								</span>
							</div>
						</Link>
					);
				})}
			</section>

			<section className="work-outro" aria-labelledby="work-outro-title">
				<p>{"// END OF SELECTED ARCHIVE"}</p>
				<div>
					<h2 id="work-outro-title">Have a messy problem worth untangling?</h2>
					<Link to="/contact">
						Start a conversation <ArrowIcon />
					</Link>
				</div>
			</section>
		</main>
	);
}
