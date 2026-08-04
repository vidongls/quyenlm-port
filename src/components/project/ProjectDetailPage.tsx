import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ProjectDetailContent } from "../../lib/content/types";
import "./ProjectDetailPage.css";

function ArrowIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M5 12h13M14 7l5 5-5 5" />
		</svg>
	);
}

type PrototypeKind = "clinic" | "savings" | "transit";

function SavingsSimulator({ kind }: { kind: PrototypeKind }) {
	const [dailyAmount, setDailyAmount] = useState(4);
	const configurations = {
		savings: {
			heading: "Make the invisible saving habit visible.",
			description:
				"Adjust an amount that feels unnoticeable today. The interface turns it into a concrete future reward.",
			control: "Automatic daily saving",
			value: `$${dailyAmount}`,
			goal: "NEW LAPTOP",
			result: `$${(dailyAmount * 365).toLocaleString("en-US")}`,
			resultLabel: "saved in one year",
			message: "Your daily choice can cover this much of the goal.",
			progress: Math.min(100, Math.round(((dailyAmount * 365) / 1800) * 100)),
		},
		transit: {
			heading: "Make the next transit action unmistakable.",
			description:
				"Increase the amount of landmark and offline context shown with each route instruction.",
			control: "Route context level",
			value: `${dailyAmount}/10`,
			goal: "ROUTE CONFIDENCE",
			result: `${dailyAmount * 10}%`,
			resultLabel: "next-action clarity",
			message: "Clear stop context reduces repeated map checking.",
			progress: dailyAmount * 10,
		},
		clinic: {
			heading: "Make changed patient context easier to spot.",
			description:
				"Adjust how strongly the workspace prioritizes updates from the current clinic shift.",
			control: "Change visibility",
			value: `${dailyAmount}/10`,
			goal: "SHIFT READINESS",
			result: `${dailyAmount * 10}%`,
			resultLabel: "handoff clarity",
			message:
				"Focused changes help the team prepare without rereading everything.",
			progress: dailyAmount * 10,
		},
	} as const;
	const prototype = configurations[kind];
	const progress = prototype.progress;

	return (
		<div className="project-simulator">
			<div className="project-simulator__control">
				<p className="project-detail__mono-label">LIVE PROTOTYPE / TRY IT</p>
				<h3>{prototype.heading}</h3>
				<p>{prototype.description}</p>

				<label htmlFor="daily-saving">
					<span>{prototype.control}</span>
					<strong>{prototype.value}</strong>
				</label>
				<input
					id="daily-saving"
					type="range"
					min="1"
					max="10"
					value={dailyAmount}
					onChange={(event) => setDailyAmount(Number(event.target.value))}
					style={
						{
							"--range-progress": `${(dailyAmount - 1) * 11.111}%`,
						} as React.CSSProperties
					}
				/>
				<div className="project-simulator__range-labels" aria-hidden="true">
					<span>$1</span>
					<span>$10</span>
				</div>
			</div>

			<div className="project-simulator__phone">
				<div className="project-simulator__phone-top">
					<span>Goal space</span>
					<span>{progress}%</span>
				</div>
				<div className="project-simulator__goal">
					<span className="project-simulator__goal-label">
						{prototype.goal}
					</span>
					<strong>{prototype.result}</strong>
					<p>{prototype.resultLabel}</p>
					<div className="project-simulator__progress" aria-hidden="true">
						<span
							className="project-simulator__progress-fill"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
				<div className="project-simulator__message">
					<span className="project-simulator__message-icon" aria-hidden="true">
						↗
					</span>
					<p>
						{prototype.message} <strong>{progress}%</strong>.
					</p>
				</div>
			</div>
		</div>
	);
}

export default function ProjectDetailPage({
	content,
	prototypeKind = "savings",
}: {
	content: ProjectDetailContent;
	prototypeKind?: PrototypeKind;
}) {
	const pageRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const page = pageRef.current;
		if (!page) return;

		const revealItems = Array.from(
			page.querySelectorAll<HTMLElement>(".project-detail__reveal"),
		);
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion || !("IntersectionObserver" in window)) {
			for (const item of revealItems) item.dataset.revealed = "true";
			return;
		}

		page.dataset.motionReady = "true";
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).dataset.revealed = "true";
					observer.unobserve(entry.target);
				}
			},
			{
				rootMargin: "0px 0px -10%",
				threshold: 0.12,
			},
		);

		for (const item of revealItems) observer.observe(item);

		return () => observer.disconnect();
	}, []);

	return (
		<main ref={pageRef} className="project-detail" data-page="project-detail">
			<section className="project-detail__hero" aria-labelledby="project-title">
				<div className="project-detail__hero-copy">
					<Link to="/work" className="project-detail__back">
						<ArrowIcon />
						All selected work
					</Link>
					<p className="project-detail__eyebrow">{content.eyebrow}</p>
					<h1 id="project-title">
						{content.title}
						<span className="project-detail__title-accent">
							{content.titleAccent}
						</span>
					</h1>
					<p className="project-detail__lead">{content.lead}</p>
				</div>

				<div className="project-detail__cover">
					<span className="project-detail__cover-note project-detail__cover-note--top">
						{content.coverTopNote}
					</span>
					<div className="project-detail__cover-window">
						<div className="project-detail__cover-toolbar">
							<i />
							<i />
							<i />
							<strong>final-prototype.fig</strong>
						</div>
						<img src={content.coverUrl} alt={content.coverAlt} />
					</div>
					<span className="project-detail__cover-note project-detail__cover-note--bottom">
						{content.coverBottomNote}
					</span>
				</div>

				<dl className="project-detail__meta">
					{content.meta.map((item) => (
						<div key={item.label}>
							<dt>{item.label}</dt>
							<dd>{item.value}</dd>
						</div>
					))}
				</dl>
			</section>

			<div className="project-detail__case-file">
				<aside
					className="project-detail__rail"
					aria-label="Case study contents"
				>
					<p>ON THIS BOARD</p>
					<nav>
						<a href="#brief">
							<span>01</span> Brief
						</a>
						<a href="#signals">
							<span>02</span> Signals
						</a>
						<a href="#decisions">
							<span>03</span> Decisions
						</a>
						<a href="#prototype">
							<span>04</span> Prototype
						</a>
						<a href="#outcome">
							<span>05</span> Outcome
						</a>
					</nav>
				</aside>

				<div className="project-detail__story">
					<section
						id="brief"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">01 / THE BRIEF</p>
						<h2>{content.briefTitle}</h2>
						<div className="project-detail__two-column">
							<p className="project-detail__large-copy">{content.briefBody}</p>
							<div className="project-detail__brief-card">
								<span className="project-detail__brief-label">
									HOW MIGHT WE
								</span>
								<p>{content.howMightWe}</p>
							</div>
						</div>
					</section>

					<section
						id="signals"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">
							02 / RESEARCH SIGNALS
						</p>
						<div className="project-detail__heading-row">
							<h2>{content.researchTitle}</h2>
							<span className="project-detail__heading-tag">
								{content.researchTag}
							</span>
						</div>
						<div className="project-detail__signal-grid">
							{content.researchSignals.map((signal) => (
								<article key={signal.number}>
									<span>{signal.number}</span>
									<h3>{signal.title}</h3>
									<p>{signal.body}</p>
								</article>
							))}
						</div>
						<blockquote>
							<span>“</span>
							<p>{content.quote}</p>
							<cite>{content.quoteCite}</cite>
						</blockquote>
					</section>

					<section
						id="decisions"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">
							03 / DESIGN DECISIONS
						</p>
						<h2>{content.decisionsTitle}</h2>
						<ol
							className="project-detail__flow"
							aria-label="Three-step product flow"
						>
							{content.flowSteps.map((item, index) => (
								<li key={item.step}>
									<div>
										<span>{item.step}</span>
										{index < content.flowSteps.length - 1 && <ArrowIcon />}
									</div>
									<h3>{item.title}</h3>
									<p>{item.body}</p>
								</li>
							))}
						</ol>
						<div className="project-detail__decision-pair">
							{content.decisionCards.map((card) => (
								<article key={card.label}>
									<p className="project-detail__mono-label">{card.label}</p>
									<h3>{card.title}</h3>
									<p>{card.body}</p>
								</article>
							))}
						</div>
					</section>

					<section
						id="prototype"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">
							04 / PROTOTYPE MOMENT
						</p>
						<SavingsSimulator kind={prototypeKind} />
					</section>

					<section
						id="outcome"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">05 / OUTCOME</p>
						<div className="project-detail__heading-row">
							<h2>{content.outcomesTitle}</h2>
							<span className="project-detail__heading-tag">
								{content.outcomesTag}
							</span>
						</div>
						<div className="project-detail__outcomes">
							{content.outcomes.map((outcome) => (
								<article key={outcome.label}>
									<strong>{outcome.value}</strong>
									<span className="project-detail__outcome-label">
										{outcome.label}
									</span>
								</article>
							))}
						</div>
						<div className="project-detail__reflection">
							<p className="project-detail__mono-label">
								WHAT I WOULD TEST NEXT
							</p>
							<p className="project-detail__reflection-copy">
								{content.reflection}
							</p>
						</div>
					</section>
				</div>
			</div>

			<section className="project-detail__next project-detail__reveal">
				<p>CASE FILE COMPLETE</p>
				<h2>{content.nextTitle}</h2>
				<Link to="/work">
					Explore selected work <ArrowIcon />
				</Link>
			</section>
		</main>
	);
}
