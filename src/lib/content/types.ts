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

export type ProjectStatus = "archived" | "draft" | "published";

export type AboutContent = {
	bioOne: string;
	bioTwo: string;
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

export type PageContentMap = {
	about: AboutContent;
	"fintech-detail": ProjectDetailContent;
	"hanoi-transit-detail": ProjectDetailContent;
	"medsync-detail": ProjectDetailContent;
};

export type PageKey = keyof PageContentMap;

export type AdminPageDocument = {
	[K in PageKey]: {
		content: PageContentMap[K];
		key: K;
		publishedAt: string | null;
		updatedAt: string;
	};
}[PageKey];

export type AdminProject = {
	content: ProjectContent;
	detailContent: ProjectDetailContent;
	featured: boolean;
	id: string;
	publishedAt: string | null;
	slug: string;
	sortOrder: number;
	status: ProjectStatus;
	updatedAt: string;
};

export type ContentRevision = {
	action: "draft_saved" | "published" | "restored";
	actorEmail: string;
	contentJson: string;
	createdAt: string;
	entityId: string;
	entityType: "project" | "site";
	id: string;
};

export type MediaAsset = {
	altText: string;
	byteSize: number;
	createdAt: string;
	fileName: string;
	id: string;
	mimeType: string;
	objectKey: string;
	url: string;
};

export type AdminContent = {
	identity: {
		email: string;
		mode: "cloudflare-access" | "local-development";
	};
	media: MediaAsset[];
	pages: AdminPageDocument[];
	projects: AdminProject[];
	revisions: ContentRevision[];
	settings: SiteSettings;
};

export type SaveProjectInput = {
	content: ProjectContent;
	detailContent: ProjectDetailContent;
	featured: boolean;
	id: string;
	slug: string;
	sortOrder: number;
	status: ProjectStatus;
};

export type SavePageInput<K extends PageKey = PageKey> = {
	content: PageContentMap[K];
	key: K;
};
