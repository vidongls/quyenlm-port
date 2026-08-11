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
	email: "hello@quyenlm.site",
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
			"A simpler way for Gen-Z users in Southeast Asia to automate savings and see progress.",
		coverUrl: "/assets/home-project.png",
		detailPath: "/projects/fintech-hub",
		caseStudyLabel: "CASE STUDY",
	},
	{
		title: "Hanoi Transit: Route Planner",
		category: "UX Research & UI",
		summary:
			"A field-researched bus route planner that stays useful when connectivity is low.",
		coverUrl: "/assets/about-project.png",
		detailPath: "/projects/hanoi-transit",
		caseStudyLabel: "CASE STUDY",
	},
	{
		title: "MedSync: Clinic Management",
		category: "Interface Design",
		summary:
			"A lightweight clinic dashboard for calmer scheduling, handoffs, and follow-ups.",
		coverUrl: "/assets/about-project.png",
		detailPath: "/projects/medsync",
		caseStudyLabel: "CASE STUDY",
	},
];

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
	kicker: "Product Designer · Hanoi, Vietnam",
	title: "Designing clarity in the messy middle.",
	bioOne:
		"I’m a Product Designer with 5 years across finance, banking, cybersecurity, and e-commerce. I work from discovery to delivery.",
	bioTwo:
		"I turn complex requirements into clear, scalable experiences that work for customers, teams, and the business.",
	photoUrl: "/assets/home-portrait.png",
	photoAlt: "Le Minh Quyen in Hanoi",
	photoTitle: "Le Minh Quyen",
	photoSubtitle: "Product Designer · Research & Systems",
	yearsExperience: "5",
	dailyKit: ["Figma", "FigJam", "Jira / Confluence"],
	leadership: [
		{
			label: "01 / DISCOVERY",
			title: "Understand the real problem",
			description:
				"Use user research, market research, and competitive analysis to uncover customer needs and frame the right product opportunity.",
		},
		{
			label: "02 / VALIDATION",
			title: "Turn evidence into decisions",
			description:
				"Conduct interviews and usability testing, synthesize patterns, and connect evidence directly to product decisions throughout the lifecycle.",
		},
		{
			label: "03 / SYSTEMS",
			title: "Design for scale",
			description:
				"Create information architecture, user flows, prototypes, and reusable design system patterns that keep products coherent as they grow.",
		},
		{
			label: "04 / COLLABORATION",
			title: "Make complexity easier to build",
			description:
				"Partner with Product, Business, BA, Engineering, Marketing, and domain specialists to align customer needs with business and technical constraints.",
		},
	],
	operatingRhythm: [
		{
			step: "01",
			title: "Discover",
			description: "Understand users, context, requirements, and constraints.",
		},
		{
			step: "02",
			title: "Define",
			description: "Frame the problem and map the journey or workflow.",
		},
		{
			step: "03",
			title: "Explore",
			description:
				"Create flows, wireframes, and prototypes for key scenarios.",
		},
		{
			step: "04",
			title: "Validate",
			description: "Test concepts and interactions with real users.",
		},
		{
			step: "05",
			title: "Deliver",
			description:
				"Align with teams and support production-ready implementation.",
		},
	],
	collaboration: {
		title: "Design works best as a team sport",
		body: "I collaborate closely with Product, Business, BA, Engineering, Marketing, and domain specialists to make complex requirements clear, useful, and feasible.",
		strengths: [
			"End-to-end product design",
			"Research-led decisions",
			"Shared ownership with engineering",
			"Scalable design systems",
		],
	},
	credentials: [
		{
			title: "Electronics and Telecommunications",
			source: "University of Engineering and Technology — VNU · 2018–2022",
		},
		{
			title: "User Experience Design",
			source: "UX Foundation Vietnam",
		},
		{
			title: "Google UX Design",
			source: "Coursera",
		},
		{
			title: "Graphic Design & UI/UX Design",
			source: "Keyframe Multimedia School",
		},
	],
	skills: [
		"Product Discovery",
		"Interaction Design",
		"Information Architecture",
		"Customer Journey Mapping",
		"User Flows",
		"Wireframing",
		"Prototyping",
		"UX Writing",
		"Design Systems",
		"Accessibility",
		"User Research",
		"Usability Testing",
		"User Interviews",
		"Qualitative Research",
		"Market Research",
		"Competitive Analysis",
		"Research Synthesis",
		"Business Requirement Analysis",
		"Stakeholder Collaboration",
		"Agile / Scrum",
	],
	journey: [
		{
			period: "2026 – Present",
			role: "Product Designer",
			company: "SHB — Saigon-Hanoi Commercial Joint Stock Bank",
			description:
				"Leading end-to-end product design across retail banking and financial products, including savings, investment, insurance, merchant services, and wealth-growth products.",
		},
		{
			period: "01/2025 – 2026",
			role: "UI/UX Designer",
			company: "Viettel Cyber Security",
			description:
				"Designed complex enterprise cybersecurity products, transforming technical workflows and high-density information into clear, usable experiences.",
		},
		{
			period: "06/2022 – 01/2025",
			role: "Product Designer / UI/UX Designer",
			company: "Velacorp — SaboMall",
			description:
				"Designed end-to-end web, mobile, and e-commerce tools supporting sourcing, purchasing, logistics, and order-management workflows.",
		},
		{
			period: "12/2021 – 06/2022",
			role: "UI/UX Designer",
			company: "+84 Soft",
			description:
				"Designed websites, landing pages, and mobile product experiences for clients across different industries.",
		},
		{
			period: "06/2019 – 06/2020",
			role: "Graphic Designer",
			company: "PDCA Company",
			description:
				"Designed visual communication and marketing materials across social media, events, banners, and promotional campaigns.",
		},
	],
	impact: [
		{
			icon: "/assets/work-icon-package.svg",
			tag: "Experience",
			value: "5+",
			description: "Years designing digital products",
		},
		{
			icon: "/assets/work-icon-users.svg",
			tag: "Domains",
			value: "4",
			description: "Finance, banking, cybersecurity, and e-commerce",
		},
		{
			icon: "/assets/work-icon-zap.svg",
			tag: "Platforms",
			value: "3",
			description: "Web, mobile, and enterprise tools",
		},
		{
			icon: "/assets/work-icon-award.svg",
			tag: "Focus",
			value: "E2E",
			description: "Research, design, testing, and delivery",
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
		"Product Discovery",
		"Complex Workflows",
		"Research & Testing",
		"Design Systems",
		"Accessible Interfaces",
	],
};

export const DEFAULT_PROJECT_DETAIL_CONTENT: ProjectDetailContent = {
	eyebrow: "CASE FILE 01 / FINTECH",
	title: "Smart savings,",
	titleAccent: "without the mental overhead.",
	lead: "A calmer way for Gen-Z users to save spare change and see momentum.",
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
		"Young earners knew they should save. Delayed rewards and intimidating tools made it hard to start.",
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
	lead: "A field-researched route planner for Hanoi commuters with low connectivity and low confidence.",
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
	lead: "A lightweight clinic workspace for appointments, patient context, and follow-ups.",
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
