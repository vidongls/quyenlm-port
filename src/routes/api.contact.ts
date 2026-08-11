import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import {
	escapeHtml,
	isContactBodyTooLarge,
	validateContactSubmission,
} from "../lib/contact";

const RECIPIENT = "hello@quyenlm.site";
const SENDER = "hello@quyenlm.site";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const recentRequests = new Map<string, number[]>();

type ContactEmailBinding = {
	send(message: {
		from: string;
		html: string;
		replyTo?: string;
		subject: string;
		text: string;
		to: string;
	}): Promise<unknown>;
};

function jsonResponse(body: Record<string, boolean | string>, status = 200) {
	return Response.json(body, {
		headers: { "Cache-Control": "no-store" },
		status,
	});
}

function methodNotAllowed() {
	return jsonResponse({ error: "METHOD_NOT_ALLOWED", ok: false }, 405);
}

function isSameOrigin(request: Request) {
	const requestOrigin = new URL(request.url).origin;
	const origin = request.headers.get("Origin");
	if (origin) return origin === requestOrigin;

	const referer = request.headers.get("Referer");
	return Boolean(referer && new URL(referer).origin === requestOrigin);
}

function isRateLimited(ip: string) {
	const now = Date.now();
	const recent = (recentRequests.get(ip) ?? []).filter(
		(timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
	);
	if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
		recentRequests.set(ip, recent);
		return true;
	}

	recent.push(now);
	recentRequests.set(ip, recent);
	return false;
}

function buildEmail(data: {
	email: string;
	message: string;
	name: string;
	projectType: string;
	timeline: string;
}) {
	const subject = `[Portfolio] ${data.projectType} — ${data.name}`;
	const text = [
		`New contact brief from ${data.name}`,
		"",
		`Email: ${data.email}`,
		`Project type: ${data.projectType}`,
		`Timing: ${data.timeline}`,
		"",
		data.message,
	].join("\n");
	const html = `
		<div style="font-family:Arial,sans-serif;line-height:1.6;color:#1e1e1e;max-width:640px">
			<h1 style="font-size:24px;margin-bottom:24px">New contact brief</h1>
			<p><strong>From:</strong> ${escapeHtml(data.name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
			<p><strong>Project type:</strong> ${escapeHtml(data.projectType)}</p>
			<p><strong>Timing:</strong> ${escapeHtml(data.timeline)}</p>
			<hr style="border:0;border-top:1px solid #ddd;margin:24px 0" />
			<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
		</div>
	`;

	return { html, subject, text };
}

async function handleContact(request: Request) {
	if (request.method !== "POST") return methodNotAllowed();
	if (!isSameOrigin(request)) {
		return jsonResponse({ error: "FORBIDDEN", ok: false }, 403);
	}

	const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
	if (isRateLimited(ip)) {
		return jsonResponse({ error: "RATE_LIMITED", ok: false }, 429);
	}

	const contentLength = Number(request.headers.get("Content-Length") ?? 0);
	if (contentLength > 16_000) {
		return jsonResponse({ error: "VALIDATION_ERROR", ok: false }, 400);
	}

	let body: string;
	try {
		body = await request.text();
	} catch {
		return jsonResponse({ error: "VALIDATION_ERROR", ok: false }, 400);
	}
	if (isContactBodyTooLarge(body)) {
		return jsonResponse({ error: "VALIDATION_ERROR", ok: false }, 400);
	}

	let payload: unknown;
	try {
		payload = JSON.parse(body);
	} catch {
		return jsonResponse({ error: "VALIDATION_ERROR", ok: false }, 400);
	}

	const result = validateContactSubmission(payload);
	if (!result.data) {
		return jsonResponse({ error: "VALIDATION_ERROR", ok: false }, 400);
	}
	if (result.data.website) {
		return jsonResponse({ ok: true });
	}

	const email = buildEmail(result.data);
	try {
		await (env.EMAIL as unknown as ContactEmailBinding).send({
			from: SENDER,
			html: email.html,
			replyTo: result.data.email,
			subject: email.subject,
			text: email.text,
			to: RECIPIENT,
		});
	} catch {
		return jsonResponse({ error: "SEND_FAILED", ok: false }, 500);
	}

	return jsonResponse({ ok: true });
}

export const Route = createFileRoute("/api/contact")({
	server: {
		handlers: {
			DELETE: ({ request }) => handleContact(request),
			GET: ({ request }) => handleContact(request),
			PATCH: ({ request }) => handleContact(request),
			POST: ({ request }) => handleContact(request),
			PUT: ({ request }) => handleContact(request),
		},
	},
});
