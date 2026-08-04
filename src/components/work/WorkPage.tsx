import "./WorkPage.css";
import type { AboutContent } from "../../lib/content/types";
import DraggableSticker from "../home/DraggableSticker";

function ProfileBoard({ content }: { content: AboutContent }) {
	return (
		<div className="work-profile">
			<DraggableSticker
				ariaLabel="Move Build and Ship sticker"
				className="work-profile-stamp-drag"
			>
				<span className="work-profile__stamp">BUILD &amp; SHIP</span>
			</DraggableSticker>

			<article className="work-polaroid">
				<div className="work-polaroid__photo">
					<img src={content.photoUrl} alt={content.photoAlt} />
				</div>
				<h2>{content.photoTitle}</h2>
				<p>{content.photoSubtitle}</p>
			</article>

			<DraggableSticker
				ariaLabel="Move years of experience sticker"
				className="work-sticker-drag work-sticker-drag--experience"
			>
				<aside className="work-sticker work-sticker--experience">
					<strong>{content.yearsExperience}</strong>
					<span>Years Exp</span>
				</aside>
			</DraggableSticker>

			<DraggableSticker
				ariaLabel="Move daily toolkit sticker"
				className="work-sticker-drag work-sticker-drag--tools"
			>
				<aside className="work-sticker work-sticker--tools">
					<strong>My Daily Kit:</strong>
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
		<section className="work-intro" aria-labelledby="work-title">
			<ProfileBoard content={content} />

			<div className="work-intro__copy">
				<p className="work-kicker">{content.kicker}</p>
				<h1 id="work-title">{content.title}</h1>
				<div className="work-intro__bio">
					<p>{content.bioOne}</p>
					<p>{content.bioTwo}</p>
				</div>

				<article className="work-credentials">
					<h2>🎓 Credentials &amp; Roots</h2>
					{content.credentials.map((credential) => (
						<p key={credential.title}>
							<strong>{credential.title}</strong> - {credential.source}
						</p>
					))}
				</article>
			</div>
		</section>
	);
}

function Journey({ content }: { content: AboutContent }) {
	return (
		<section className="work-journey">
			<div>
				<h2 className="work-section-title">Skills &amp; Toolkit</h2>
				<div className="work-badges">
					{content.skills.map((skill, index) => (
						<span
							key={skill}
							className="work-badge"
							style={{ "--item-index": index } as React.CSSProperties}
						>
							{skill}
						</span>
					))}
				</div>
			</div>

			<div>
				<h2 className="work-section-title work-section-title--large">
					My Journey
				</h2>
				<div className="work-timeline">
					{content.journey.map((item, index) => (
						<article
							key={item.period}
							className="work-timeline__item"
							style={{ "--item-index": index } as React.CSSProperties}
						>
							<time>{item.period}</time>
							<div>
								<h3>{item.role}</h3>
								<p className="work-timeline__company">{item.company}</p>
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
		<section aria-labelledby="impact-title">
			<h2
				id="impact-title"
				className="work-section-title work-section-title--large"
			>
				Impact by Numbers
			</h2>
			<div className="work-impact-grid">
				{content.impact.map((item, index) => (
					<article
						key={item.tag}
						className="work-impact-card"
						style={{ "--item-index": index } as React.CSSProperties}
					>
						<div className="work-impact-card__top">
							<span className="work-icon">
								<img src={item.icon} alt="" />
							</span>
							<span className="work-kicker">{item.tag}</span>
						</div>
						<strong className="work-impact-card__value">{item.value}</strong>
						<p>{item.description}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function Philosophy({ content }: { content: AboutContent }) {
	return (
		<section className="work-philosophy" aria-labelledby="philosophy-title">
			<h2
				id="philosophy-title"
				className="work-section-title work-section-title--large"
			>
				Design Philosophy
			</h2>
			<div className="work-philosophy__grid">
				{content.philosophy.map((item) => (
					<article key={item.title} className="work-philosophy-card">
						<span className="work-icon">
							<img src={item.icon} alt="" />
						</span>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default function WorkPage({ content }: { content: AboutContent }) {
	return (
		<main
			id="about"
			className="work-page"
			data-page="about"
			data-node-id="309:6600"
		>
			<div className="work-page__inner">
				<Intro content={content} />
				<Journey content={content} />
				<div className="work-recruiter">
					<Impact content={content} />
					<Philosophy content={content} />
					<section aria-labelledby="interests-title">
						<h2
							id="interests-title"
							className="work-section-title work-section-title--large"
						>
							Beyond the Screen
						</h2>
						<div className="work-badges">
							{content.interests.map((interest, index) => (
								<span
									key={interest}
									className="work-badge"
									style={{ "--item-index": index } as React.CSSProperties}
								>
									{interest}
								</span>
							))}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
