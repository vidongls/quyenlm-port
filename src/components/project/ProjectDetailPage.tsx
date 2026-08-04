import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "./ProjectDetailPage.css";

const PROJECT_META = [
	["Role", "Product Designer"],
	["Scope", "Research → Prototype"],
	["Timeline", "8 weeks"],
	["Status", "Concept case study"],
] as const;

const RESEARCH_SIGNALS = [
	{
		number: "01",
		title: "Saving feels too abstract",
		body: "Long-term goals lose against the small, visible rewards users can get today.",
	},
	{
		number: "02",
		title: "Automation needs a brake",
		body: "People want the system to help, but still need a clear sense of control.",
	},
	{
		number: "03",
		title: "Finance language creates distance",
		body: "Investment terminology makes the first action feel riskier than it is.",
	},
] as const;

const FLOW_STEPS = [
	{
		step: "01",
		title: "Name the win",
		body: "Start with a real-life goal, not a financial product.",
	},
	{
		step: "02",
		title: "Set the comfort zone",
		body: "Choose a flexible spare-change rule and a safety limit.",
	},
	{
		step: "03",
		title: "Watch it happen",
		body: "See every contribution and pause it at any moment.",
	},
] as const;

function ArrowIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M5 12h13M14 7l5 5-5 5" />
		</svg>
	);
}

function SavingsSimulator() {
	const [dailyAmount, setDailyAmount] = useState(4);
	const yearlyAmount = dailyAmount * 365;
	const progress = Math.min(100, Math.round((yearlyAmount / 1800) * 100));

	return (
		<div className="project-simulator">
			<div className="project-simulator__control">
				<p className="project-detail__mono-label">LIVE PROTOTYPE / TRY IT</p>
				<h3>Make the invisible saving habit visible.</h3>
				<p>
					Adjust an amount that feels unnoticeable today. The interface turns it
					into a concrete future reward.
				</p>

				<label htmlFor="daily-saving">
					<span>Automatic daily saving</span>
					<strong>${dailyAmount}</strong>
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
					<span className="project-simulator__goal-label">NEW LAPTOP</span>
					<strong>${yearlyAmount.toLocaleString("en-US")}</strong>
					<p>saved in one year</p>
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
						Your daily choice can cover{" "}
						<strong>{progress}% of this goal</strong>.
					</p>
				</div>
			</div>
		</div>
	);
}

export default function ProjectDetailPage() {
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
					<p className="project-detail__eyebrow">CASE FILE 01 / FINTECH</p>
					<h1 id="project-title">
						Smart savings,
						<span className="project-detail__title-accent">
							without the mental overhead.
						</span>
					</h1>
					<p className="project-detail__lead">
						A concept for turning spare change into visible momentum—designed
						for Gen-Z users who want to save, but do not want another finance
						chore.
					</p>
				</div>

				<div className="project-detail__cover">
					<span className="project-detail__cover-note project-detail__cover-note--top">
						ONE SMALL ACTION
					</span>
					<div className="project-detail__cover-window">
						<div className="project-detail__cover-toolbar">
							<i />
							<i />
							<i />
							<strong>final-prototype.fig</strong>
						</div>
						<img
							src="/assets/home-project.png"
							alt="FinTech Flow mobile dashboard showing balance and investment portfolio"
						/>
					</div>
					<span className="project-detail__cover-note project-detail__cover-note--bottom">
						VISIBLE PROGRESS
					</span>
				</div>

				<dl className="project-detail__meta">
					{PROJECT_META.map(([term, description]) => (
						<div key={term}>
							<dt>{term}</dt>
							<dd>{description}</dd>
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
						<h2>Saving was not the real problem. Feeling progress was.</h2>
						<div className="project-detail__two-column">
							<p className="project-detail__large-copy">
								Young earners already knew they should save. What stopped them
								was a loop of delayed rewards, intimidating language, and tools
								that demanded too much attention.
							</p>
							<div className="project-detail__brief-card">
								<span className="project-detail__brief-label">
									HOW MIGHT WE
								</span>
								<p>
									Make saving feel rewarding now, while keeping automation calm,
									transparent and reversible?
								</p>
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
							<h2>Three frictions kept showing up.</h2>
							<span className="project-detail__heading-tag">
								12 interviews / concept exercise
							</span>
						</div>
						<div className="project-detail__signal-grid">
							{RESEARCH_SIGNALS.map((signal) => (
								<article key={signal.number}>
									<span>{signal.number}</span>
									<h3>{signal.title}</h3>
									<p>{signal.body}</p>
								</article>
							))}
						</div>
						<blockquote>
							<span>“</span>
							<p>
								I do not want to become an investor. I just want future me to
								have options.
							</p>
							<cite>— Synthesized research insight</cite>
						</blockquote>
					</section>

					<section
						id="decisions"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">
							03 / DESIGN DECISIONS
						</p>
						<h2>Reduce the decisions before reducing the taps.</h2>
						<ol
							className="project-detail__flow"
							aria-label="Three-step product flow"
						>
							{FLOW_STEPS.map((item, index) => (
								<li key={item.step}>
									<div>
										<span>{item.step}</span>
										{index < FLOW_STEPS.length - 1 && <ArrowIcon />}
									</div>
									<h3>{item.title}</h3>
									<p>{item.body}</p>
								</li>
							))}
						</ol>
						<div className="project-detail__decision-pair">
							<article>
								<p className="project-detail__mono-label">DECISION A</p>
								<h3>Goals before portfolios</h3>
								<p>
									The product speaks in outcomes—laptop, trip, emergency
									buffer—before introducing investment mechanics.
								</p>
							</article>
							<article>
								<p className="project-detail__mono-label">DECISION B</p>
								<h3>Automation with an escape hatch</h3>
								<p>
									Every rule exposes its limit, next action and pause
									control—building trust through reversibility.
								</p>
							</article>
						</div>
					</section>

					<section
						id="prototype"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">
							04 / PROTOTYPE MOMENT
						</p>
						<SavingsSimulator />
					</section>

					<section
						id="outcome"
						className="project-detail__section project-detail__reveal"
					>
						<p className="project-detail__section-number">05 / OUTCOME</p>
						<div className="project-detail__heading-row">
							<h2>The concept became easier to explain—and easier to trust.</h2>
							<span className="project-detail__heading-tag">
								Prototype validation / directional
							</span>
						</div>
						<div className="project-detail__outcomes">
							<article>
								<strong>42%</strong>
								<span className="project-detail__outcome-label">
									faster goal setup
								</span>
							</article>
							<article>
								<strong>8/10</strong>
								<span className="project-detail__outcome-label">
									understood the saving rule
								</span>
							</article>
							<article>
								<strong>3</strong>
								<span className="project-detail__outcome-label">
									usability iterations
								</span>
							</article>
						</div>
						<div className="project-detail__reflection">
							<p className="project-detail__mono-label">
								WHAT I WOULD TEST NEXT
							</p>
							<p className="project-detail__reflection-copy">
								Move beyond comprehension into behavior: measure whether
								transparent automation improves 30-day retention without
								increasing financial anxiety.
							</p>
						</div>
					</section>
				</div>
			</div>

			<section className="project-detail__next project-detail__reveal">
				<p>CASE FILE COMPLETE</p>
				<h2>Want to see the rest of the board?</h2>
				<Link to="/work">
					Explore selected work <ArrowIcon />
				</Link>
			</section>
		</main>
	);
}
