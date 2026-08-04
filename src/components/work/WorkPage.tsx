import "./WorkPage.css";
import DraggableSticker from "../home/DraggableSticker";

const SKILLS = [
	"Figma",
	"User Research",
	"Interactive Prototyping",
	"Wireframing",
	"Design Systems",
	"Usability Testing",
	"Design Thinking",
	"Information Architecture",
	"Stakeholder Management",
] as const;

const JOURNEY = [
	{
		period: "2024 - Present",
		role: "Senior Product Designer",
		company: "Levelset Studio",
		description:
			"Leading visual & UX architecture for big-data pipelines, complex dashboards, and next-gen collaborative tools.",
	},
	{
		period: "2022 - 2024",
		role: "UX / UI Designer",
		company: "Aura Digital",
		description:
			"Designed mobile-first consumer applications and transactional flows with a major focus on interaction fidelity.",
	},
	{
		period: "2020 - 2022",
		role: "Junior Visual Designer",
		company: "Meridian Group",
		description:
			"Established typography systems, marketing collateral, and foundational brand guidelines.",
	},
] as const;

const IMPACT = [
	{
		icon: "/assets/work-icon-package.svg",
		tag: "Shipped",
		value: "12+",
		description: "Products shipped across web and mobile",
	},
	{
		icon: "/assets/work-icon-users.svg",
		tag: "Users",
		value: "50K+",
		description: "Users impacted by improved experiences",
	},
	{
		icon: "/assets/work-icon-zap.svg",
		tag: "Speed",
		value: "3x",
		description: "Faster onboarding for new users",
	},
	{
		icon: "/assets/work-icon-award.svg",
		tag: "Quality",
		value: "98%",
		description: "Usability score across recent launches",
	},
] as const;

const PHILOSOPHY = [
	{
		icon: "/assets/work-icon-research.svg",
		title: "Research First 🔍",
		description: "Every pixel is backed by real user insight.",
	},
	{
		icon: "/assets/work-icon-sparkles.svg",
		title: "Invisible UX ✨",
		description: "The best interface is one you never notice.",
	},
	{
		icon: "/assets/work-icon-rocket.svg",
		title: "Ship & Iterate 🚀",
		description: "Perfect is the enemy of shipped — move fast, learn faster.",
	},
] as const;

const INTERESTS = [
	"Coffee Explorer ☕",
	"Sticker Collector 🎨",
	"Street Sketcher ✏️",
	"Podcast Junkie 🎧",
	"Cat Person 🐱",
] as const;

function ProfileBoard() {
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
					<img
						src="/assets/work-photo-1.png"
						alt="Quyen in a product design studio"
					/>
				</div>
				<h2>Quyen in Ha Noi ☕️</h2>
				<p>Product Designer · Research &amp; Interfaces</p>
			</article>

			<DraggableSticker
				ariaLabel="Move years of experience sticker"
				className="work-sticker-drag work-sticker-drag--experience"
			>
				<aside className="work-sticker work-sticker--experience">
					<strong>5</strong>
					<span>Years Exp</span>
				</aside>
			</DraggableSticker>

			<DraggableSticker
				ariaLabel="Move daily toolkit sticker"
				className="work-sticker-drag work-sticker-drag--tools"
			>
				<aside className="work-sticker work-sticker--tools">
					<strong>My Daily Kit:</strong>
					<span>⚡ Figma</span>
					<span>✨ AI (Research)</span>
					<span>🎨 Miro / FigJam</span>
				</aside>
			</DraggableSticker>
		</div>
	);
}

function Intro() {
	return (
		<section className="work-intro" aria-labelledby="work-title">
			<ProfileBoard />

			<div className="work-intro__copy">
				<p className="work-kicker">Xin Chào! I am Quyen</p>
				<h1 id="work-title">Get to know me</h1>
				<div className="work-intro__bio">
					<p>
						I&apos;m a product designer based in the heart of Hanoi, Vietnam. I
						specialize in{" "}
						<strong className="work-blue">deep user research</strong> and
						turning complex data flows into{" "}
						<strong className="work-coral">pixel-perfect interfaces</strong>{" "}
						that feel entirely natural to use.
					</p>
					<p>
						I believe in &quot;invisible design&quot; — where the user reaches
						their goal seamlessly without ever having to think about the
						interface itself. When I&apos;m not interviewing users or pushing
						vectors in Figma, you&apos;ll find me sketching at a local sidewalk
						coffee shop or collecting sticker packs.
					</p>
				</div>

				<article className="work-credentials">
					<h2>🎓 Credentials &amp; Roots</h2>
					<p>
						<strong>B.Sc. in Interaction Design</strong> - Ha Noi University of
						Science &amp; Technology
					</p>
					<p>
						<strong>UX Research Certified</strong> - Maze Academy &amp; NN/g
						Courses
					</p>
				</article>
			</div>
		</section>
	);
}

function Journey() {
	return (
		<section className="work-journey">
			<div>
				<h2 className="work-section-title">Skills &amp; Toolkit</h2>
				<div className="work-badges">
					{SKILLS.map((skill, index) => (
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
					{JOURNEY.map((item, index) => (
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

function Impact() {
	return (
		<section aria-labelledby="impact-title">
			<h2
				id="impact-title"
				className="work-section-title work-section-title--large"
			>
				Impact by Numbers
			</h2>
			<div className="work-impact-grid">
				{IMPACT.map((item, index) => (
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

function Philosophy() {
	return (
		<section className="work-philosophy" aria-labelledby="philosophy-title">
			<h2
				id="philosophy-title"
				className="work-section-title work-section-title--large"
			>
				Design Philosophy
			</h2>
			<div className="work-philosophy__grid">
				{PHILOSOPHY.map((item) => (
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

export default function WorkPage() {
	return (
		<main
			id="about"
			className="work-page"
			data-page="about"
			data-node-id="309:6600"
		>
			<div className="work-page__inner">
				<Intro />
				<Journey />
				<div className="work-recruiter">
					<Impact />
					<Philosophy />
					<section aria-labelledby="interests-title">
						<h2
							id="interests-title"
							className="work-section-title work-section-title--large"
						>
							Beyond the Screen
						</h2>
						<div className="work-badges">
							{INTERESTS.map((interest, index) => (
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
