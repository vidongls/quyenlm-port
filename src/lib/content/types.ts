export type ProjectDetailPath = `/projects/${string}`;

export type SiteSettings = {
	email: string;
	headline: string;
	highlight: string;
	linkedinUrl: string;
	location: string;
	name: string;
	resumeUrl: string;
	role: string;
	seoDescription: string;
	seoTitle: string;
};

export type ProjectContent = {
	caseStudyLabel: string;
	category: string;
	coverUrl: string;
	detailPath: ProjectDetailPath;
	summary: string;
	title: string;
};

export type AboutContent = {
	bioOne: string;
	bioTwo: string;
	collaboration: {
		body: string;
		strengths: string[];
		title: string;
	};
	credentials: Array<{ source: string; title: string }>;
	dailyKit: string[];
	impact: Array<{
		description: string;
		icon: string;
		tag: string;
		value: string;
	}>;
	interests: string[];
	journey: Array<{
		company: string;
		description: string;
		period: string;
		role: string;
	}>;
	kicker: string;
	leadership: Array<{
		description: string;
		label: string;
		title: string;
	}>;
	operatingRhythm: Array<{
		description: string;
		step: string;
		title: string;
	}>;
	philosophy: Array<{ description: string; icon: string; title: string }>;
	photoAlt: string;
	photoSubtitle: string;
	photoTitle: string;
	photoUrl: string;
	skills: string[];
	title: string;
	yearsExperience: string;
};

export type ProjectDetailContent = {
	briefBody: string;
	briefTitle: string;
	coverAlt: string;
	coverBottomNote: string;
	coverTopNote: string;
	coverUrl: string;
	decisionCards: Array<{ body: string; label: string; title: string }>;
	decisionsTitle: string;
	eyebrow: string;
	flowSteps: Array<{ body: string; step: string; title: string }>;
	howMightWe: string;
	lead: string;
	meta: Array<{ label: string; value: string }>;
	nextTitle: string;
	outcomes: Array<{ label: string; value: string }>;
	outcomesTag: string;
	outcomesTitle: string;
	quote: string;
	quoteCite: string;
	reflection: string;
	researchSignals: Array<{ body: string; number: string; title: string }>;
	researchTag: string;
	researchTitle: string;
	title: string;
	titleAccent: string;
};
