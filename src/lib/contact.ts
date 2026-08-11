export const CONTACT_PROJECT_TYPES = [
	"Hiring / Recruitment",
	"New product",
	"Improve a flow",
	"Research",
	"Design system",
	"Just saying hi",
] as const;

export const CONTACT_TIMELINES = [
	"Flexible",
	"This month",
	"This quarter",
	"Exploring for later",
] as const;

export type ContactSubmission = {
	email: string;
	message: string;
	name: string;
	projectType: string;
	timeline: string;
	website: string;
};

export type ValidContactSubmission = Omit<ContactSubmission, "email"> & {
	email: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_LENGTH = 16_000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4_000;

export function validateContactSubmission(value: unknown): {
	data?: ValidContactSubmission;
	error?: string;
} {
	if (!value || typeof value !== "object") {
		return { error: "Invalid request body." };
	}

	const input = value as Partial<ContactSubmission>;
	const name = typeof input.name === "string" ? input.name.trim() : "";
	const email = typeof input.email === "string" ? input.email.trim() : "";
	const message = typeof input.message === "string" ? input.message.trim() : "";
	const projectType =
		typeof input.projectType === "string" ? input.projectType.trim() : "";
	const timeline =
		typeof input.timeline === "string" ? input.timeline.trim() : "";
	const website = typeof input.website === "string" ? input.website.trim() : "";

	if (!name || name.length > MAX_NAME_LENGTH) {
		return { error: "Please provide a valid name." };
	}
	if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
		return { error: "Please provide a valid email address." };
	}
	if (!message || message.length > MAX_MESSAGE_LENGTH) {
		return { error: "Please provide a message under 4,000 characters." };
	}
	if (
		!CONTACT_PROJECT_TYPES.includes(
			projectType as (typeof CONTACT_PROJECT_TYPES)[number],
		)
	) {
		return { error: "Please select a valid project type." };
	}
	if (
		!CONTACT_TIMELINES.includes(timeline as (typeof CONTACT_TIMELINES)[number])
	) {
		return { error: "Please select a valid timeline." };
	}

	return {
		data: { email, message, name, projectType, timeline, website },
	};
}

export function isContactBodyTooLarge(body: string) {
	return new TextEncoder().encode(body).byteLength > MAX_BODY_LENGTH;
}

export function escapeHtml(value: string) {
	return value.replace(
		/[&<>"']/g,
		(character) =>
			(
				({
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#039;",
				}) as Record<string, string>
			)[character] ?? character,
	);
}
