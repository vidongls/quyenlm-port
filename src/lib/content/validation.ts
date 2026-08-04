import type {
	AboutContent,
	PageContentMap,
	PageKey,
	ProjectContent,
	ProjectDetailContent,
	ProjectDetailPath,
	ProjectStatus,
	SavePageInput,
	SaveProjectInput,
	SiteSettings,
} from "./types";

function objectValue(value: unknown, label: string): Record<string, unknown> {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${label} must be an object.`);
	}
	return value as Record<string, unknown>;
}

function textValue(
	value: unknown,
	label: string,
	options: { max?: number; min?: number } = {},
) {
	const text = typeof value === "string" ? value.trim() : "";
	const min = options.min ?? 1;
	const max = options.max ?? 500;
	if (text.length < min || text.length > max) {
		throw new Error(`${label} must be between ${min} and ${max} characters.`);
	}
	return text;
}

function arrayValue(value: unknown, label: string, max = 30) {
	if (!Array.isArray(value) || value.length > max) {
		throw new Error(`${label} must be an array with at most ${max} items.`);
	}
	return value;
}

function stringArray(value: unknown, label: string) {
	return arrayValue(value, label).map((item, index) =>
		textValue(item, `${label} ${index + 1}`, { max: 160 }),
	);
}

function urlValue(value: unknown, label: string, allowRelative = false) {
	const text = textValue(value, label, { max: 500 });
	if (allowRelative && text.startsWith("/")) return text;
	try {
		return new URL(text).toString();
	} catch {
		throw new Error(`${label} must be a valid URL.`);
	}
}

export function parseSiteSettings(value: unknown): SiteSettings {
	const input = objectValue(value, "Site settings");
	const email = textValue(input.email, "Email", { max: 160 });
	if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Email is invalid.");

	return {
		name: textValue(input.name, "Name", { max: 100 }),
		role: textValue(input.role, "Role", { max: 160 }),
		headline: textValue(input.headline, "Headline", { max: 100 }),
		highlight: textValue(input.highlight, "Highlighted word", { max: 60 }),
		location: textValue(input.location, "Location", { max: 120 }),
		email,
		linkedinUrl: urlValue(input.linkedinUrl, "LinkedIn URL"),
		resumeUrl: urlValue(input.resumeUrl, "Resume URL", true),
		seoTitle: textValue(input.seoTitle, "SEO title", { max: 70 }),
		seoDescription: textValue(input.seoDescription, "SEO description", {
			max: 180,
		}),
	};
}

export function parseProjectContent(value: unknown): ProjectContent {
	const input = objectValue(value, "Project content");
	const detailPath = textValue(input.detailPath, "Detail path", { max: 100 });
	if (!/^\/projects\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(detailPath)) {
		throw new Error("Detail path is not supported.");
	}

	return {
		title: textValue(input.title, "Project title", { max: 140 }),
		category: textValue(input.category, "Category", { max: 80 }),
		summary: textValue(input.summary, "Summary", { max: 500 }),
		coverUrl: urlValue(input.coverUrl, "Cover URL", true),
		detailPath: detailPath as ProjectDetailPath,
		caseStudyLabel: textValue(input.caseStudyLabel, "Case-study label", {
			max: 40,
		}),
	};
}

export function parseAboutContent(value: unknown): AboutContent {
	const input = objectValue(value, "About page");
	return {
		kicker: textValue(input.kicker, "About kicker", { max: 100 }),
		title: textValue(input.title, "About title", { max: 120 }),
		bioOne: textValue(input.bioOne, "First bio paragraph", { max: 1200 }),
		bioTwo: textValue(input.bioTwo, "Second bio paragraph", { max: 1200 }),
		photoUrl: urlValue(input.photoUrl, "About photo", true),
		photoAlt: textValue(input.photoAlt, "Photo alt text", { max: 240 }),
		photoTitle: textValue(input.photoTitle, "Photo title", { max: 120 }),
		photoSubtitle: textValue(input.photoSubtitle, "Photo subtitle", {
			max: 160,
		}),
		yearsExperience: textValue(input.yearsExperience, "Years experience", {
			max: 20,
		}),
		dailyKit: stringArray(input.dailyKit, "Daily kit"),
		skills: stringArray(input.skills, "Skills"),
		interests: stringArray(input.interests, "Interests"),
		credentials: arrayValue(input.credentials, "Credentials").map(
			(item, index) => {
				const row = objectValue(item, `Credential ${index + 1}`);
				return {
					title: textValue(row.title, "Credential title", { max: 160 }),
					source: textValue(row.source, "Credential source", { max: 240 }),
				};
			},
		),
		journey: arrayValue(input.journey, "Journey").map((item, index) => {
			const row = objectValue(item, `Journey ${index + 1}`);
			return {
				period: textValue(row.period, "Journey period", { max: 80 }),
				role: textValue(row.role, "Journey role", { max: 120 }),
				company: textValue(row.company, "Journey company", { max: 120 }),
				description: textValue(row.description, "Journey description", {
					max: 500,
				}),
			};
		}),
		impact: arrayValue(input.impact, "Impact").map((item, index) => {
			const row = objectValue(item, `Impact ${index + 1}`);
			return {
				icon: urlValue(row.icon, "Impact icon", true),
				tag: textValue(row.tag, "Impact tag", { max: 60 }),
				value: textValue(row.value, "Impact value", { max: 30 }),
				description: textValue(row.description, "Impact description", {
					max: 240,
				}),
			};
		}),
		philosophy: arrayValue(input.philosophy, "Philosophy").map(
			(item, index) => {
				const row = objectValue(item, `Philosophy ${index + 1}`);
				return {
					icon: urlValue(row.icon, "Philosophy icon", true),
					title: textValue(row.title, "Philosophy title", { max: 120 }),
					description: textValue(row.description, "Philosophy description", {
						max: 240,
					}),
				};
			},
		),
	};
}

export function parseProjectDetailContent(
	value: unknown,
): ProjectDetailContent {
	const input = objectValue(value, "Project detail page");
	const simple = (key: keyof ProjectDetailContent, max = 1200) =>
		textValue(input[key], String(key), { max });
	return {
		eyebrow: simple("eyebrow", 100),
		title: simple("title", 140),
		titleAccent: simple("titleAccent", 180),
		lead: simple("lead"),
		coverUrl: urlValue(input.coverUrl, "Cover URL", true),
		coverAlt: simple("coverAlt", 240),
		coverTopNote: simple("coverTopNote", 80),
		coverBottomNote: simple("coverBottomNote", 80),
		briefTitle: simple("briefTitle", 240),
		briefBody: simple("briefBody"),
		howMightWe: simple("howMightWe"),
		researchTitle: simple("researchTitle", 240),
		researchTag: simple("researchTag", 120),
		quote: simple("quote"),
		quoteCite: simple("quoteCite", 160),
		decisionsTitle: simple("decisionsTitle", 240),
		outcomesTitle: simple("outcomesTitle", 240),
		outcomesTag: simple("outcomesTag", 160),
		reflection: simple("reflection"),
		nextTitle: simple("nextTitle", 200),
		meta: arrayValue(input.meta, "Project metadata").map((item, index) => {
			const row = objectValue(item, `Metadata ${index + 1}`);
			return {
				label: textValue(row.label, "Metadata label", { max: 60 }),
				value: textValue(row.value, "Metadata value", { max: 120 }),
			};
		}),
		researchSignals: arrayValue(input.researchSignals, "Research signals").map(
			(item, index) => {
				const row = objectValue(item, `Research signal ${index + 1}`);
				return {
					number: textValue(row.number, "Signal number", { max: 20 }),
					title: textValue(row.title, "Signal title", { max: 160 }),
					body: textValue(row.body, "Signal body", { max: 500 }),
				};
			},
		),
		flowSteps: arrayValue(input.flowSteps, "Flow steps").map((item, index) => {
			const row = objectValue(item, `Flow step ${index + 1}`);
			return {
				step: textValue(row.step, "Flow step number", { max: 20 }),
				title: textValue(row.title, "Flow step title", { max: 160 }),
				body: textValue(row.body, "Flow step body", { max: 500 }),
			};
		}),
		decisionCards: arrayValue(input.decisionCards, "Decision cards").map(
			(item, index) => {
				const row = objectValue(item, `Decision card ${index + 1}`);
				return {
					label: textValue(row.label, "Decision label", { max: 60 }),
					title: textValue(row.title, "Decision title", { max: 160 }),
					body: textValue(row.body, "Decision body", { max: 500 }),
				};
			},
		),
		outcomes: arrayValue(input.outcomes, "Outcomes").map((item, index) => {
			const row = objectValue(item, `Outcome ${index + 1}`);
			return {
				value: textValue(row.value, "Outcome value", { max: 40 }),
				label: textValue(row.label, "Outcome label", { max: 160 }),
			};
		}),
	};
}

export function parsePageContent<K extends PageKey>(
	key: K,
	value: unknown,
): PageContentMap[K] {
	return (
		key === "about"
			? parseAboutContent(value)
			: parseProjectDetailContent(value)
	) as PageContentMap[K];
}

export function parseSavePageInput(value: unknown): SavePageInput {
	const input = objectValue(value, "Page document");
	const key = textValue(input.key, "Page key", { max: 60 });
	if (
		key !== "about" &&
		key !== "fintech-detail" &&
		key !== "hanoi-transit-detail" &&
		key !== "medsync-detail"
	) {
		throw new Error("Page key is not supported.");
	}
	return {
		key,
		content: parsePageContent(key, input.content),
	} as SavePageInput;
}

export function parseSaveProjectInput(value: unknown): SaveProjectInput {
	const input = objectValue(value, "Project");
	const status = textValue(input.status, "Status", { max: 20 });
	if (status !== "draft" && status !== "published" && status !== "archived") {
		throw new Error("Project status is invalid.");
	}

	const sortOrder = Number(input.sortOrder);
	if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 999) {
		throw new Error("Sort order must be an integer between 0 and 999.");
	}

	return {
		id: textValue(input.id, "Project id", { max: 100 }),
		slug: slugValue(input.slug),
		content: parseProjectContent(input.content),
		detailContent: parseProjectDetailContent(input.detailContent),
		featured: input.featured === true,
		sortOrder,
		status: status as ProjectStatus,
	};
}

export function slugValue(value: unknown) {
	const slug = textValue(value, "Project slug", { max: 100 });
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new Error(
			"Slug may only contain lowercase letters, numbers and hyphens.",
		);
	}
	return slug;
}

export function parseEntityId(value: unknown) {
	return textValue(value, "Entity id", { max: 100 });
}

export function parsePageKey(value: unknown): PageKey {
	const key = textValue(value, "Page key", { max: 60 });
	if (
		key !== "about" &&
		key !== "fintech-detail" &&
		key !== "hanoi-transit-detail" &&
		key !== "medsync-detail"
	) {
		throw new Error("Page key is not supported.");
	}
	return key;
}
