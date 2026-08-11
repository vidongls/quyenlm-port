import { Link } from "@tanstack/react-router";
import { type CSSProperties, useEffect, useRef } from "react";
import type { AboutContent } from "../../lib/content/types";
import DraggableSticker from "../home/DraggableSticker";
import "./WorkPage.css";

function ArrowIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M5 12h13m-5-5 5 5-5 5" />
		</svg>
	);
}

function EducationIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="m3 9 9-5 9 5-9 5-9-5Zm4 2.5V17c3 2 7 2 10 0v-5.5M21 9v7" />
		</svg>
	);
}

function SectionHeading({
	eyebrow,
	id,
	title,
}: {
	eyebrow: string;
	id: string;
	title: string;
}) {
	return (
		<header className="about-section-heading" data-reveal>
			<p>{eyebrow}</p>
			<h2 id={id}>{title}</h2>
		</header>
	);
}

function ProfileBoard({ content }: { content: AboutContent }) {
	return (
		<div className="about-profile" data-reveal>
			<DraggableSticker
				ariaLabel="Move Build and Ship sticker"
				className="about-profile__stamp-drag"
			>
				<span className="about-profile__stamp">BUILD &amp; SHIP</span>
			</DraggableSticker>

			<article className="about-polaroid">
				<div className="about-polaroid__photo">
					<img src={content.photoUrl} alt={content.photoAlt} />
				</div>
				<h2>{content.photoTitle}</h2>
				<p>{content.photoSubtitle}</p>
			</article>

			<DraggableSticker
				ariaLabel="Move years of experience sticker"
				className="about-sticker-drag about-sticker-drag--experience"
			>
				<aside className="about-sticker about-sticker--experience">
					<strong>{content.yearsExperience}+</strong>
					<span>Years of practice</span>
				</aside>
			</DraggableSticker>

			<DraggableSticker
				ariaLabel="Move daily toolkit sticker"
				className="about-sticker-drag about-sticker-drag--tools"
			>
				<aside className="about-sticker about-sticker--tools">
					<strong>Current toolkit</strong>
					{content.dailyKit.map((tool) => (
						<span key={tool}>{tool}</span>
					))}
				</aside>
			</DraggableSticker>
		</div>
	);
}

function Intro({ content }: { content: AboutContent }) {
	return (
		<section className="about-intro" aria-labelledby="about-title">
			<div className="about-intro__copy" data-reveal>
				<p className="about-kicker">{content.kicker}</p>
				<h1 id="about-title">{content.title}</h1>
				<p className="about-intro__signal">
					Research depth <i /> Product judgment <i /> Team momentum
				</p>
				<div className="about-intro__bio">
					<p>{content.bioOne}</p>
					<p>{content.bioTwo}</p>
				</div>

				<article className="about-credentials">
					<span className="about-credentials__icon">
						<EducationIcon />
					</span>
					<div>
						<h2>Credentials &amp; roots</h2>
						{content.credentials.map((credential) => (
							<p key={credential.title}>
								<strong>{credential.title}</strong> — {credential.source}
							</p>
						))}
					</div>
				</article>
			</div>

			<ProfileBoard content={content} />
		</section>
	);
}

function Leadership({ content }: { content: AboutContent }) {
	return (
		<section className="about-leadership" aria-labelledby="leadership-title">
			<SectionHeading
				eyebrow="02 / SENIOR SCOPE"
				id="leadership-title"
				title="How I create leverage"
			/>
			<div className="about-leadership__grid">
				{content.leadership.map((item, index) => (
					<article
						className="about-leadership-card"
						data-reveal
						key={item.label}
						style={{ "--item-index": index } as CSSProperties}
					>
						<span>{item.label}</span>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
						<i aria-hidden="true" />
					</article>
				))}
			</div>
		</section>
	);
}

function OperatingRhythm({ content }: { content: AboutContent }) {
	return (
		<section className="about-rhythm" aria-labelledby="rhythm-title">
			<SectionHeading
				eyebrow="03 / OPERATING RHYTHM"
				id="rhythm-title"
				title="How the work moves"
			/>
			<ol className="about-rhythm__track">
				{content.operatingRhythm.map((item, index) => (
					<li
						data-reveal
						key={item.step}
						style={{ "--item-index": index } as CSSProperties}
					>
						<span>{item.step}</span>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</li>
				))}
			</ol>
		</section>
	);
}

function Journey({ content }: { content: AboutContent }) {
	return (
		<section className="about-journey" aria-labelledby="journey-title">
			<div className="about-journey__skills" data-reveal>
				<p>{"// CAPABILITY MAP"}</p>
				<h2>Senior design is more than craft.</h2>
				<div className="about-badges">
					{content.skills.map((skill, index) => (
						<span
							key={skill}
							className="about-badge"
							style={{ "--item-index": index } as CSSProperties}
						>
							{skill}
						</span>
					))}
				</div>
			</div>

			<div className="about-journey__timeline">
				<SectionHeading
					eyebrow="04 / EXPERIENCE"
					id="journey-title"
					title="The path so far"
				/>
				<div className="about-timeline">
					{content.journey.map((item, index) => (
						<article
							data-reveal
							key={item.period}
							style={{ "--item-index": index } as CSSProperties}
						>
							<time>{item.period}</time>
							<div>
								<h3>{item.role}</h3>
								<p className="about-timeline__company">{item.company}</p>
								<p>{item.description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

function Impact({ content }: { content: AboutContent }) {
	return (
		<section className="about-impact" aria-labelledby="impact-title">
			<SectionHeading
				eyebrow="05 / SELECTED SIGNALS"
				id="impact-title"
				title="Impact, made visible"
			/>
			<div className="about-impact__grid">
				{content.impact.map((item, index) => (
					<article
						data-reveal
						key={item.tag}
						style={{ "--item-index": index } as CSSProperties}
					>
						<div className="about-impact__top">
							<span className="about-icon">
								<img src={item.icon} alt="" />
							</span>
							<span className="about-kicker">{item.tag}</span>
						</div>
						<strong>{item.value}</strong>
						<p>{item.description}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function Collaboration({ content }: { content: AboutContent }) {
	return (
		<section
			className="about-collaboration"
			aria-labelledby="collaboration-title"
			data-reveal
		>
			<div>
				<p>{"06 / COLLABORATION CONTRACT"}</p>
				<h2 id="collaboration-title">{content.collaboration.title}</h2>
				<p className="about-collaboration__body">
					{content.collaboration.body}
				</p>
			</div>
			<ul>
				{content.collaboration.strengths.map((strength) => (
					<li key={strength}>
						<span aria-hidden="true">✓</span>
						{strength}
					</li>
				))}
			</ul>
		</section>
	);
}

function PhilosophyAndLife({ content }: { content: AboutContent }) {
	return (
		<section className="about-closing">
			<section className="about-philosophy" aria-labelledby="philosophy-title">
				<SectionHeading
					eyebrow="07 / PRINCIPLES"
					id="philosophy-title"
					title="What stays constant"
				/>
				<div className="about-philosophy__grid">
					{content.philosophy.map((item, index) => (
						<article
							data-reveal
							key={item.title}
							style={{ "--item-index": index } as CSSProperties}
						>
							<span className="about-icon">
								<img src={item.icon} alt="" />
							</span>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</article>
					))}
				</div>
			</section>

			<div className="about-life" data-reveal>
				<p>{"// BEYOND THE SCREEN"}</p>
				<h2>A whole person makes better products.</h2>
				<div className="about-badges about-badges--life">
					{content.interests.map((interest) => (
						<span key={interest}>{interest}</span>
					))}
				</div>
				<div className="about-life__actions">
					<Link to="/work">
						Explore my work <ArrowIcon />
					</Link>
					<Link to="/contact">
						Start a conversation <ArrowIcon />
					</Link>
				</div>
			</div>
		</section>
	);
}

export default function WorkPage({ content }: { content: AboutContent }) {
	const pageRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const page = pageRef.current;
		if (!page) return;
		page.dataset.revealReady = "true";
		const items = page.querySelectorAll<HTMLElement>("[data-reveal]");
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			for (const item of items) item.dataset.visible = "true";
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					(entry.target as HTMLElement).dataset.visible = "true";
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -8%", threshold: 0.12 },
		);
		for (const item of items) observer.observe(item);
		return () => observer.disconnect();
	}, []);

	return (
		<main
			ref={pageRef}
			id="about"
			className="work-page"
			data-page="about"
			data-node-id="309:6600"
		>
			<div className="work-page__grid" aria-hidden="true" />
			<div className="work-page__inner">
				<Intro content={content} />
				<Leadership content={content} />
				<OperatingRhythm content={content} />
				<Journey content={content} />
				<Impact content={content} />
				<Collaboration content={content} />
				<PhilosophyAndLife content={content} />
			</div>
		</main>
	);
}
