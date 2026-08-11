import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import {
	isContactBodyTooLarge,
	validateContactSubmission,
} from "../lib/contact";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const recentRequests = new Map<string, number[]>();

type TelegramEnv = {
	TELEGRAM_BOT_TOKEN?: string;
	TELEGRAM_CHAT_ID?: string;
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

function buildTelegramMessage(data: {
	email: string;
	message: string;
	name: string;
	projectType: string;
	timeline: string;
}) {
	return [
		"🔔 New portfolio contact",
		"",
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Project: ${data.projectType}`,
		`Timeline: ${data.timeline}`,
		"",
		data.message.slice(0, 3_500),
	].join("\n");
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

	const telegramEnv = env as unknown as TelegramEnv;
	if (!telegramEnv.TELEGRAM_BOT_TOKEN || !telegramEnv.TELEGRAM_CHAT_ID) {
		console.error("Telegram contact secrets are not configured");
		return jsonResponse({ error: "SEND_FAILED", ok: false }, 500);
	}

	try {
		const response = await fetch(
			`https://api.telegram.org/bot${telegramEnv.TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				body: JSON.stringify({
					chat_id: telegramEnv.TELEGRAM_CHAT_ID,
					disable_web_page_preview: true,
					text: buildTelegramMessage(result.data),
				}),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			},
		);
		const telegramResult = (await response.json()) as {
			description?: string;
			ok?: boolean;
		};
		if (!response.ok || !telegramResult.ok) {
			throw new Error(telegramResult.description ?? "Telegram request failed");
		}
	} catch (error) {
		const telegramError = error as { message?: string };
		console.error("Telegram contact notification failed", {
			message: telegramError.message ?? "Unknown Telegram error",
		});
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
