import type {
	AboutContent,
	ProjectContent,
	ProjectDetailContent,
	SiteSettings,
} from "./types";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
	name: "Quyen Le Minh",
	role: "Product Designer · Research & Interfaces",
	headline: "Good Design's",
	highlight: "Invisible",
	location: "Ha Noi, Viet Nam",
	email: "hello@quyenlee.design",
	linkedinUrl: "https://www.linkedin.com",
	resumeUrl: "/resume.pdf",
	seoTitle: "Quyen Le Minh — Product Designer",
	seoDescription:
		"Product designer focused on research, interfaces and invisible design.",
};

export const DEFAULT_PROJECTS: ProjectContent[] = [
	{
		title: "FinTech Hub: Smart Savings",
		category: "Product Design",
		summary:
			"An AI-powered micro-investment platform built specifically for the Gen-Z market in Southeast Asia, simplifying automated savings.",
		coverUrl: "/assets/home-project.png",
		detailPath: "/projects/fintech-hub",
		caseStudyLabel: "CASE STUDY",
	},
	{
		title: "Hanoi Transit: Route Planner",
		category: "UX Research & UI",
		summary:
			"Restructuring the local city bus routing experience through rigorous field research and a contextual offline-first map interface.",
		coverUrl: "/assets/about-project.png",
		detailPath: "/projects/hanoi-transit",
		caseStudyLabel: "CASE STUDY",
	},
	{
		title: "MedSync: Clinic Management",
		category: "Interface Design",
		summary:
			"Designing an invisible, lightweight tablet dashboard for local clinics to schedule and diagnose without screen friction.",
		coverUrl: "/assets/about-project.png",
		detailPath: "/projects/medsync",
		caseStudyLabel: "CASE STUDY",
	},
];

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
	kicker: "Senior Product Designer · Hanoi",
	title: "Designing clarity in the messy middle.",
	bioOne:
		"I’m a senior product designer based in Hanoi, working across discovery, product strategy, interaction design and delivery. I turn ambiguous product questions and complex systems into clear decisions teams can confidently build.",
	bioTwo:
		'My role is not to own every answer. It is to ask sharper questions, bring user evidence into the room, align product and engineering around the right trade-offs, and help the team ship an experience that feels "invisible" because it does its job exceptionally well.',
	photoUrl: "/assets/work-photo-1.png",
	photoAlt: "Quyen in a product design studio",
	photoTitle: "Quyen in Ha Noi",
	photoSubtitle: "Senior Product Designer · Research & Systems",
	yearsExperience: "5",
	dailyKit: ["Figma", "AI for synthesis", "Miro / FigJam"],
	leadership: [
		{
			label: "01 / DIRECTION",
			title: "Frame the right problem",
			description:
				"Turn broad business goals, user pain and technical constraints into a focused product question with clear success criteria.",
		},
		{
			label: "02 / EVIDENCE",
			title: "Make research actionable",
			description:
				"Choose the smallest useful study, synthesize patterns and connect evidence directly to product decisions—not a report that gathers dust.",
		},
		{
			label: "03 / SYSTEMS",
			title: "Design beyond one screen",
			description:
				"Model flows, states, edge cases and reusable patterns so the experience stays coherent as the product and team grow.",
		},
		{
			label: "04 / LEVERAGE",
			title: "Raise the team’s clarity",
			description:
				"Facilitate critique, document trade-offs, mentor through the work and create shared ownership with product and engineering.",
		},
	],
	operatingRhythm: [
		{
			step: "01",
			title: "Frame",
			description: "Align on the decision, constraints and evidence we need.",
		},
		{
			step: "02",
			title: "Learn",
			description: "Talk to users, inspect data and map the real workflow.",
		},
		{
			step: "03",
			title: "Align",
			description: "Make trade-offs visible before investing in fidelity.",
		},
		{
			step: "04",
			title: "Make",
			description: "Prototype the riskiest interaction and test it early.",
		},
		{
			step: "05",
			title: "Measure",
			description: "Ship with a learning plan and improve from real behavior.",
		},
	],
	collaboration: {
		title: "The kind of room where I do my best work",
		body: "A cross-functional team that shares context early, debates the problem honestly and treats design as a way to make better product decisions—not a service at the end of the process.",
		strengths: [
			"Early product shaping",
			"Direct, kind critique",
			"Shared ownership with engineering",
			"Decision logs over design theatre",
		],
	},
	credentials: [
		{
			title: "B.Sc. in Interaction Design",
			source: "Ha Noi University of Science & Technology",
		},
		{
			title: "UX Research Certified",
			source: "Maze Academy & NN/g Courses",
		},
	],
	skills: [
		"Product Strategy",
		"Problem Framing",
		"Research Planning",
		"User Research",
		"Research Synthesis",
		"Interaction Design",
		"Interactive Prototyping",
		"Design Systems",
		"Accessibility",
		"Usability Testing",
		"Information Architecture",
		"Workshop Facilitation",
		"Stakeholder Management",
		"Design Critique",
		"Mentoring",
		"Outcome Definition",
	],
	journey: [
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
	],
	impact: [
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
	],
	philosophy: [
		{
			icon: "/assets/work-icon-research.svg",
			title: "Research before certainty",
			description: "Every pixel is backed by real user insight.",
		},
		{
			icon: "/assets/work-icon-sparkles.svg",
			title: "Invisible by intention",
			description: "The best interface is one you never notice.",
		},
		{
			icon: "/assets/work-icon-rocket.svg",
			title: "Ship to keep learning",
			description: "Perfect is the enemy of shipped — move fast, learn faster.",
		},
	],
	interests: [
		"Coffee Explorer",
		"Sticker Collector",
		"Street Sketcher",
		"Podcast Notes",
		"Cat Person",
	],
};

export const DEFAULT_PROJECT_DETAIL_CONTENT: ProjectDetailContent = {
	eyebrow: "CASE FILE 01 / FINTECH",
	title: "Smart savings,",
	titleAccent: "without the mental overhead.",
	lead: "A concept for turning spare change into visible momentum—designed for Gen-Z users who want to save, but do not want another finance chore.",
	coverUrl: "/assets/home-project.png",
	coverAlt:
		"FinTech Flow mobile dashboard showing balance and investment portfolio",
	coverTopNote: "ONE SMALL ACTION",
	coverBottomNote: "VISIBLE PROGRESS",
	meta: [
		{ label: "Role", value: "Product Designer" },
		{ label: "Scope", value: "Research → Prototype" },
		{ label: "Timeline", value: "8 weeks" },
		{ label: "Status", value: "Concept case study" },
	],
	briefTitle: "Saving was not the real problem. Feeling progress was.",
	briefBody:
		"Young earners already knew they should save. What stopped them was a loop of delayed rewards, intimidating language, and tools that demanded too much attention.",
	howMightWe:
		"Make saving feel rewarding now, while keeping automation calm, transparent and reversible?",
	researchTitle: "Three frictions kept showing up.",
	researchTag: "12 interviews / concept exercise",
	researchSignals: [
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
	],
	quote:
		"I do not want to become an investor. I just want future me to have options.",
	quoteCite: "— Synthesized research insight",
	decisionsTitle: "Reduce the decisions before reducing the taps.",
	flowSteps: [
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
	],
	decisionCards: [
		{
			label: "DECISION A",
			title: "Goals before portfolios",
			body: "The product speaks in outcomes—laptop, trip, emergency buffer—before introducing investment mechanics.",
		},
		{
			label: "DECISION B",
			title: "Automation with an escape hatch",
			body: "Every rule exposes its limit, next action and pause control—building trust through reversibility.",
		},
	],
	outcomesTitle: "The concept became easier to explain—and easier to trust.",
	outcomesTag: "Prototype validation / directional",
	outcomes: [
		{ value: "42%", label: "faster goal setup" },
		{ value: "8/10", label: "understood the saving rule" },
		{ value: "3", label: "usability iterations" },
	],
	reflection:
		"Move beyond comprehension into behavior: measure whether transparent automation improves 30-day retention without increasing financial anxiety.",
	nextTitle: "Want to see the rest of the board?",
};

export const DEFAULT_HANOI_TRANSIT_DETAIL_CONTENT: ProjectDetailContent = {
	...DEFAULT_PROJECT_DETAIL_CONTENT,
	coverUrl: "/assets/about-project.png",
	eyebrow: "CASE FILE 02 / URBAN MOBILITY",
	title: "Finding the next bus,",
	titleAccent: "without second-guessing the route.",
	lead: "A route-planning experience built from field research with Hanoi commuters—designed to stay useful when connectivity and confidence both run low.",
	coverAlt: "Hanoi Transit route-planning interface",
	coverTopNote: "ONE CLEAR ROUTE",
	coverBottomNote: "LESS TRAVEL ANXIETY",
	meta: [
		{ label: "Role", value: "UX Research & UI" },
		{ label: "Scope", value: "Field study → Prototype" },
		{ label: "Timeline", value: "6 weeks" },
		{ label: "Status", value: "Mobility case study" },
	],
	briefTitle: "The route existed. Confidence in it did not.",
	briefBody:
		"Commuters could find a bus number, but fragmented stop information, unstable connectivity and unfamiliar transfer points made every journey feel uncertain.",
	howMightWe:
		"Help riders understand the next useful action even when the network, signage or connection is unreliable?",
	researchTitle: "Three moments created most of the anxiety.",
	researchTag: "18 intercept interviews / route shadowing",
	researchSignals: [
		{
			number: "01",
			title: "Stops lack a shared language",
			body: "Names in apps, signs and everyday speech often describe the same place differently.",
		},
		{
			number: "02",
			title: "Transfers feel irreversible",
			body: "Riders hesitate when they cannot see what happens immediately after leaving a bus.",
		},
		{
			number: "03",
			title: "Offline is the real commute",
			body: "The most important instruction must survive tunnels, weak data and a locked screen.",
		},
	],
	quote:
		"I know the bus number. I just do not know if this is the right side of the road.",
	quoteCite: "— Commuter interview, Hanoi",
	decisionsTitle: "Design the journey around certainty, not map complexity.",
	flowSteps: [
		{
			step: "01",
			title: "Choose the intent",
			body: "Start with destination and arrival need instead of transport terminology.",
		},
		{
			step: "02",
			title: "Confirm the stop",
			body: "Pair landmark, walking direction and side-of-road context.",
		},
		{
			step: "03",
			title: "Carry the route offline",
			body: "Keep the next action visible without requiring a network refresh.",
		},
	],
	decisionCards: [
		{
			label: "DECISION A",
			title: "Landmarks before coordinates",
			body: "Instructions use recognizable street context before exposing geographic precision.",
		},
		{
			label: "DECISION B",
			title: "One next action",
			body: "The active journey emphasizes only the instruction the rider can act on now.",
		},
	],
	outcomesTitle: "Riders understood the route with less map checking.",
	outcomesTag: "Moderated route simulation",
	outcomes: [
		{ value: "35%", label: "faster stop confirmation" },
		{ value: "9/10", label: "understood the next action" },
		{ value: "4", label: "field iterations" },
	],
	reflection:
		"Test the offline route card during real service disruptions and validate language with riders outside the central districts.",
	nextTitle: "Explore another case file?",
};

export const DEFAULT_MEDSYNC_DETAIL_CONTENT: ProjectDetailContent = {
	...DEFAULT_PROJECT_DETAIL_CONTENT,
	coverUrl: "/assets/about-project.png",
	eyebrow: "CASE FILE 03 / HEALTHCARE",
	title: "A calmer clinic day,",
	titleAccent: "without another heavy dashboard.",
	lead: "A lightweight tablet workspace for local clinics—designed to coordinate appointments, patient context and follow-ups without pulling attention away from care.",
	coverAlt: "MedSync clinic-management tablet dashboard",
	coverTopNote: "PATIENT CONTEXT",
	coverBottomNote: "CALMER HANDOFFS",
	meta: [
		{ label: "Role", value: "Interface Designer" },
		{ label: "Scope", value: "Workflow mapping → UI" },
		{ label: "Timeline", value: "7 weeks" },
		{ label: "Status", value: "Healthcare concept" },
	],
	briefTitle: "The clinic did not need more data. It needed a clearer handoff.",
	briefBody:
		"Staff moved between paper notes, chat messages and scheduling tools. The fragmentation created repeated questions and made small changes harder to see.",
	howMightWe:
		"Keep the whole care team aligned while preserving a calm, patient-first consultation experience?",
	researchTitle: "Three workflow breaks repeated across the day.",
	researchTag: "9 staff interviews / service blueprint",
	researchSignals: [
		{
			number: "01",
			title: "Context arrives too late",
			body: "Important notes are often discovered only after the patient enters the room.",
		},
		{
			number: "02",
			title: "Small delays cascade",
			body: "A single schedule change creates repeated manual updates across the team.",
		},
		{
			number: "03",
			title: "Alerts compete with care",
			body: "Urgency loses meaning when every update demands the same visual attention.",
		},
	],
	quote: "I want to know what changed, not reread the whole patient record.",
	quoteCite: "— Clinic coordinator interview",
	decisionsTitle:
		"Make changed context visible while keeping the interface quiet.",
	flowSteps: [
		{
			step: "01",
			title: "Scan the day",
			body: "See schedule health, delays and preparation needs in one pass.",
		},
		{
			step: "02",
			title: "Open patient context",
			body: "Surface only information relevant to the current visit.",
		},
		{
			step: "03",
			title: "Close the handoff",
			body: "Assign the follow-up and confirm ownership before moving on.",
		},
	],
	decisionCards: [
		{
			label: "DECISION A",
			title: "Changes before completeness",
			body: "The workspace highlights what is new before exposing the full patient history.",
		},
		{
			label: "DECISION B",
			title: "Quiet by default",
			body: "Visual priority is reserved for issues that require action during the current shift.",
		},
	],
	outcomesTitle: "The daily schedule became easier to scan and hand off.",
	outcomesTag: "Workflow prototype / directional",
	outcomes: [
		{ value: "31%", label: "faster schedule scan" },
		{ value: "8/9", label: "found changed context" },
		{ value: "3", label: "workflow iterations" },
	],
	reflection:
		"Validate permission boundaries and notification priority with a broader mix of clinical roles before testing in a live shift.",
	nextTitle: "See the rest of the selected work?",
};
