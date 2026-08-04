import { env } from "cloudflare:workers";
import { insertMediaAsset, requireAdminIdentity } from "./content.server";
import type { MediaAsset } from "./types";

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
	"application/json",
	"application/pdf",
	"application/zip",
	"application/octet-stream",
	"image/avif",
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/svg+xml",
	"image/webp",
]);

function safeFileName(name: string) {
	const normalized = name
		.normalize("NFKD")
		.replace(/[^a-zA-Z0-9._-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")
		.toLowerCase();
	return normalized.slice(0, 120) || "asset";
}

export async function uploadMedia(request: Request): Promise<MediaAsset> {
	const identity = requireAdminIdentity(request);
	const formData = await request.formData();
	const file = formData.get("file");
	const purpose = String(formData.get("purpose") ?? "media");
	const altText = String(formData.get("altText") ?? "")
		.trim()
		.slice(0, 240);

	if (!(file instanceof File)) throw new Error("Choose a file to upload.");
	if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
		throw new Error("File size must be between 1 byte and 15 MB.");
	}
	if (!ALLOWED_MIME_TYPES.has(file.type)) {
		throw new Error("This file type is not supported.");
	}
	if (purpose === "resume" && file.type !== "application/pdf") {
		throw new Error("Resume uploads must be PDF files.");
	}

	const id = crypto.randomUUID();
	const now = new Date();
	const objectKey = `uploads/${now.getUTCFullYear()}/${String(
		now.getUTCMonth() + 1,
	).padStart(2, "0")}/${id}-${safeFileName(file.name)}`;

	await env.MEDIA_BUCKET.put(objectKey, file.stream(), {
		httpMetadata: {
			contentType: file.type,
			cacheControl: "public, max-age=31536000, immutable",
		},
		customMetadata: { originalName: file.name, altText, purpose },
	});

	const asset = {
		id,
		objectKey,
		fileName: file.name,
		mimeType: file.type,
		byteSize: file.size,
		altText,
	};
	await insertMediaAsset(asset, identity.email);

	console.info(
		JSON.stringify({
			event: "content.media.uploaded",
			actor: identity.email,
			objectKey,
			byteSize: file.size,
		}),
	);

	return {
		...asset,
		createdAt: now.toISOString(),
		url: `/api/media?key=${encodeURIComponent(objectKey)}`,
	};
}

export async function getMediaObject(request: Request) {
	const key = new URL(request.url).searchParams.get("key") ?? "";
	if (!key.startsWith("uploads/") || key.includes("..")) return null;
	return env.MEDIA_BUCKET.get(key);
}
