import { env } from "cloudflare:workers";
import { getRequest } from "@tanstack/react-start/server";
import {
	DEFAULT_ABOUT_CONTENT,
	DEFAULT_HANOI_TRANSIT_DETAIL_CONTENT,
	DEFAULT_MEDSYNC_DETAIL_CONTENT,
	DEFAULT_PROJECT_DETAIL_CONTENT,
	DEFAULT_PROJECTS,
	DEFAULT_SITE_SETTINGS,
} from "./defaults";
import type {
	AdminContent,
	AdminPageDocument,
	AdminProject,
	ContentRevision,
	MediaAsset,
	PageContentMap,
	PageKey,
	ProjectContent,
	SaveProjectInput,
	SiteSettings,
} from "./types";
import {
	parsePageContent,
	parseProjectContent,
	parseProjectDetailContent,
	parseSiteSettings,
} from "./validation";

type SiteRow = {
	draft_json: string;
	published_json: string;
};

type ProjectRow = {
	detail_draft_json: string;
	detail_published_json: string;
	draft_json: string;
	featured: number;
	id: string;
	published_at: string | null;
	published_json: string;
	slug: string;
	sort_order: number;
	status: AdminProject["status"];
	updated_at: string;
};

function defaultProjectDetail(slug: string) {
	if (slug === "hanoi-transit") return DEFAULT_HANOI_TRANSIT_DETAIL_CONTENT;
	if (slug === "medsync") return DEFAULT_MEDSYNC_DETAIL_CONTENT;
	return DEFAULT_PROJECT_DETAIL_CONTENT;
}

function parseProjectDetailOrDefault(json: string, slug: string) {
	try {
		return parseJson(json, parseProjectDetailContent);
	} catch {
		return defaultProjectDetail(slug);
	}
}

type RevisionRow = {
	action: ContentRevision["action"];
	actor_email: string;
	content_json: string;
	created_at: string;
	entity_id: string;
	entity_type: ContentRevision["entityType"];
	id: string;
};

type MediaRow = {
	alt_text: string;
	byte_size: number;
	created_at: string;
	file_name: string;
	id: string;
	mime_type: string;
	object_key: string;
};

type PageRow = {
	draft_json: string;
	key: PageKey;
	published_at: string | null;
	published_json: string;
	updated_at: string;
};

function defaultPage<K extends PageKey>(key: K): PageContentMap[K] {
	const defaults: PageContentMap = {
		about: DEFAULT_ABOUT_CONTENT,
		"fintech-detail": DEFAULT_PROJECT_DETAIL_CONTENT,
		"hanoi-transit-detail": DEFAULT_HANOI_TRANSIT_DETAIL_CONTENT,
		"medsync-detail": DEFAULT_MEDSYNC_DETAIL_CONTENT,
	};
	return defaults[key];
}

function parsePageOrDefault<K extends PageKey>(
	key: K,
	json: string,
): PageContentMap[K] {
	try {
		return parseJson(json, (value) => parsePageContent(key, value));
	} catch {
		return defaultPage(key);
	}
}

function parseJson<T>(json: string, parser: (value: unknown) => T): T {
	return parser(JSON.parse(json));
}

export function requireAdminIdentity(request = getRequest()) {
	const hostname = new URL(request.url).hostname;
	if (hostname === "localhost" || hostname === "127.0.0.1") {
		return {
			email: "local-admin@quyenlee.design",
			mode: "local-development" as const,
		};
	}

	const email = request.headers.get("cf-access-authenticated-user-email");
	const assertion = request.headers.get("cf-access-jwt-assertion");
	if (!email || !assertion) {
		throw new Error("Admin access requires a valid Cloudflare Access session.");
	}

	return { email, mode: "cloudflare-access" as const };
}

export async function getPublishedProjects(): Promise<ProjectContent[]> {
	try {
		const result = await env.CONTENT_DB.prepare(
			"SELECT published_json FROM projects WHERE status = 'published' ORDER BY sort_order ASC, created_at ASC",
		).all<Pick<ProjectRow, "published_json">>();
		const projects = result.results.map((row) =>
			parseJson(row.published_json, parseProjectContent),
		);
		return projects.length > 0 ? projects : DEFAULT_PROJECTS;
	} catch (error) {
		console.error(
			JSON.stringify({ event: "content.projects.fallback", error }),
		);
		return DEFAULT_PROJECTS;
	}
}

export async function getDraftProjects(): Promise<ProjectContent[]> {
	requireAdminIdentity();
	const result = await env.CONTENT_DB.prepare(
		"SELECT draft_json FROM projects WHERE status != 'archived' ORDER BY sort_order ASC, created_at ASC",
	).all<Pick<ProjectRow, "draft_json">>();
	return result.results.map((row) =>
		parseJson(row.draft_json, parseProjectContent),
	);
}

export async function getPublishedProjectDetail(slug: string) {
	const row = await env.CONTENT_DB.prepare(
		"SELECT slug, detail_published_json FROM projects WHERE slug = ? AND status = 'published'",
	)
		.bind(slug)
		.first<Pick<ProjectRow, "detail_published_json" | "slug">>();
	if (!row) throw new Error("Published project was not found.");
	return parseProjectDetailOrDefault(row.detail_published_json, row.slug);
}

export async function getDraftProjectDetail(slug: string) {
	requireAdminIdentity();
	const row = await env.CONTENT_DB.prepare(
		"SELECT slug, detail_draft_json FROM projects WHERE slug = ?",
	)
		.bind(slug)
		.first<Pick<ProjectRow, "detail_draft_json" | "slug">>();
	if (!row) throw new Error("Project draft was not found.");
	return parseProjectDetailOrDefault(row.detail_draft_json, row.slug);
}

export async function getPublishedSiteSettings(): Promise<SiteSettings> {
	try {
		const row = await env.CONTENT_DB.prepare(
			"SELECT published_json FROM site_settings WHERE key = 'global'",
		).first<Pick<SiteRow, "published_json">>();
		return row
			? parseJson(row.published_json, parseSiteSettings)
			: DEFAULT_SITE_SETTINGS;
	} catch (error) {
		console.error(JSON.stringify({ event: "content.site.fallback", error }));
		return DEFAULT_SITE_SETTINGS;
	}
}

export async function getPublishedPage<K extends PageKey>(
	key: K,
): Promise<PageContentMap[K]> {
	try {
		const row = await env.CONTENT_DB.prepare(
			"SELECT published_json FROM page_documents WHERE key = ?",
		)
			.bind(key)
			.first<Pick<PageRow, "published_json">>();
		return row ? parsePageOrDefault(key, row.published_json) : defaultPage(key);
	} catch (error) {
		console.error(
			JSON.stringify({ event: "content.page.fallback", key, error }),
		);
		return defaultPage(key);
	}
}

export async function getDraftPage<K extends PageKey>(
	key: K,
): Promise<PageContentMap[K]> {
	requireAdminIdentity();
	const row = await env.CONTENT_DB.prepare(
		"SELECT draft_json FROM page_documents WHERE key = ?",
	)
		.bind(key)
		.first<Pick<PageRow, "draft_json">>();
	return row ? parsePageOrDefault(key, row.draft_json) : defaultPage(key);
}

export async function getAdminContent(): Promise<AdminContent> {
	const identity = requireAdminIdentity();
	const [siteRow, projectRows, pageRows, revisionRows, mediaRows] =
		await Promise.all([
			env.CONTENT_DB.prepare(
				"SELECT draft_json, published_json FROM site_settings WHERE key = 'global'",
			).first<SiteRow>(),
			env.CONTENT_DB.prepare(
				"SELECT id, slug, draft_json, published_json, detail_draft_json, detail_published_json, status, sort_order, featured, updated_at, published_at FROM projects ORDER BY sort_order ASC, created_at ASC",
			).all<ProjectRow>(),
			env.CONTENT_DB.prepare(
				"SELECT key, draft_json, published_json, updated_at, published_at FROM page_documents ORDER BY key ASC",
			).all<PageRow>(),
			env.CONTENT_DB.prepare(
				"SELECT id, entity_type, entity_id, content_json, action, actor_email, created_at FROM content_revisions ORDER BY created_at DESC LIMIT 20",
			).all<RevisionRow>(),
			env.CONTENT_DB.prepare(
				"SELECT id, object_key, file_name, mime_type, byte_size, alt_text, created_at FROM media_assets ORDER BY created_at DESC LIMIT 100",
			).all<MediaRow>(),
		]);

	return {
		identity,
		settings: siteRow
			? parseJson(siteRow.draft_json, parseSiteSettings)
			: DEFAULT_SITE_SETTINGS,
		projects: projectRows.results.map((row) => ({
			id: row.id,
			slug: row.slug,
			content: parseJson(row.draft_json, parseProjectContent),
			detailContent: parseProjectDetailOrDefault(
				row.detail_draft_json,
				row.slug,
			),
			status: row.status,
			sortOrder: row.sort_order,
			featured: row.featured === 1,
			updatedAt: row.updated_at,
			publishedAt: row.published_at,
		})),
		pages: (["about"] as const).map((key) => {
			const row = pageRows.results.find((page) => page.key === key);
			return {
				key,
				content: row
					? parsePageOrDefault(key, row.draft_json)
					: defaultPage(key),
				updatedAt: row?.updated_at ?? new Date(0).toISOString(),
				publishedAt: row?.published_at ?? null,
			} as AdminPageDocument;
		}),
		revisions: revisionRows.results.map((row) => ({
			id: row.id,
			entityType: row.entity_type,
			entityId: row.entity_id,
			action: row.action,
			actorEmail: row.actor_email,
			contentJson: row.content_json,
			createdAt: row.created_at,
		})),
		media: mediaRows.results.map((row) => ({
			id: row.id,
			objectKey: row.object_key,
			fileName: row.file_name,
			mimeType: row.mime_type,
			byteSize: row.byte_size,
			altText: row.alt_text,
			createdAt: row.created_at,
			url: `/api/media?key=${encodeURIComponent(row.object_key)}`,
		})),
	};
}

export async function saveSiteDraft(settings: SiteSettings) {
	const identity = requireAdminIdentity();
	const json = JSON.stringify(settings);
	const revisionId = crypto.randomUUID();
	const auditId = crypto.randomUUID();

	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"UPDATE site_settings SET draft_json = ?, updated_at = CURRENT_TIMESTAMP WHERE key = 'global'",
		).bind(json),
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, 'site', 'global', ?, 'draft_saved', ?)",
		).bind(revisionId, json, identity.email),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'draft_saved', 'site', 'global')",
		).bind(auditId, identity.email),
	]);

	return { savedAt: new Date().toISOString() };
}

export async function publishSite() {
	const identity = requireAdminIdentity();
	const row = await env.CONTENT_DB.prepare(
		"SELECT draft_json FROM site_settings WHERE key = 'global'",
	).first<Pick<SiteRow, "draft_json">>();
	if (!row) throw new Error("Site settings were not found.");

	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"UPDATE site_settings SET published_json = draft_json, published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE key = 'global'",
		),
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, 'site', 'global', ?, 'published', ?)",
		).bind(crypto.randomUUID(), row.draft_json, identity.email),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'published', 'site', 'global')",
		).bind(crypto.randomUUID(), identity.email),
	]);

	return { publishedAt: new Date().toISOString() };
}

export async function saveProjectDraft(input: SaveProjectInput) {
	const identity = requireAdminIdentity();
	const json = JSON.stringify(input.content);
	const detailJson = JSON.stringify(input.detailContent);
	const revisionJson = JSON.stringify({
		card: input.content,
		detail: input.detailContent,
		slug: input.slug,
	});
	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"UPDATE projects SET slug = ?, draft_json = ?, detail_draft_json = ?, status = ?, sort_order = ?, featured = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
		).bind(
			input.slug,
			json,
			detailJson,
			input.status,
			input.sortOrder,
			input.featured ? 1 : 0,
			input.id,
		),
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, 'project', ?, ?, 'draft_saved', ?)",
		).bind(crypto.randomUUID(), input.id, revisionJson, identity.email),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'draft_saved', 'project', ?)",
		).bind(crypto.randomUUID(), identity.email, input.id),
	]);

	return { savedAt: new Date().toISOString() };
}

export async function publishProject(id: string) {
	const identity = requireAdminIdentity();
	const row = await env.CONTENT_DB.prepare(
		"SELECT draft_json, detail_draft_json FROM projects WHERE id = ?",
	)
		.bind(id)
		.first<Pick<ProjectRow, "detail_draft_json" | "draft_json">>();
	if (!row) throw new Error("Project was not found.");

	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"UPDATE projects SET published_json = draft_json, detail_published_json = detail_draft_json, status = 'published', published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
		).bind(id),
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, 'project', ?, ?, 'published', ?)",
		).bind(
			crypto.randomUUID(),
			id,
			JSON.stringify({
				card: JSON.parse(row.draft_json),
				detail: JSON.parse(row.detail_draft_json),
			}),
			identity.email,
		),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'published', 'project', ?)",
		).bind(crypto.randomUUID(), identity.email, id),
	]);

	return { publishedAt: new Date().toISOString() };
}

export async function createProject() {
	const identity = requireAdminIdentity();
	const id = crypto.randomUUID();
	const slug = `new-project-${id.slice(0, 8)}`;
	const content: ProjectContent = {
		title: "Untitled project",
		category: "Product Design",
		summary: "Add a concise summary for this project before publishing.",
		coverUrl: "/assets/about-project.png",
		detailPath: `/projects/${slug}`,
		caseStudyLabel: "CASE STUDY",
	};
	const json = JSON.stringify(content);
	const detailContent = {
		...DEFAULT_PROJECT_DETAIL_CONTENT,
		eyebrow: "NEW CASE FILE / DRAFT",
		title: "Untitled case study,",
		titleAccent: "ready for its story.",
		lead: "Add the project context, research and decisions before publishing this case study.",
	};
	const detailJson = JSON.stringify(detailContent);
	const sortRow = await env.CONTENT_DB.prepare(
		"SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM projects",
	).first<{ next_order: number }>();
	const sortOrder = sortRow?.next_order ?? 0;

	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"INSERT INTO projects (id, slug, draft_json, published_json, detail_draft_json, detail_published_json, status, sort_order, featured) VALUES (?, ?, ?, ?, ?, ?, 'draft', ?, 0)",
		).bind(id, slug, json, json, detailJson, detailJson, sortOrder),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'created', 'project', ?)",
		).bind(crypto.randomUUID(), identity.email, id),
	]);

	return {
		id,
		slug,
		content,
		detailContent,
		status: "draft" as const,
		sortOrder,
		featured: false,
		updatedAt: new Date().toISOString(),
		publishedAt: null,
	};
}

export async function deleteProject(id: string) {
	const identity = requireAdminIdentity();
	const project = await env.CONTENT_DB.prepare(
		"SELECT slug FROM projects WHERE id = ?",
	)
		.bind(id)
		.first<Pick<ProjectRow, "slug">>();
	if (!project) throw new Error("Project was not found.");

	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare("DELETE FROM projects WHERE id = ?").bind(id),
		env.CONTENT_DB.prepare(
			"DELETE FROM content_revisions WHERE entity_type = 'project' AND entity_id = ?",
		).bind(id),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id, metadata_json) VALUES (?, ?, 'deleted', 'project', ?, ?)",
		).bind(
			crypto.randomUUID(),
			identity.email,
			id,
			JSON.stringify({ slug: project.slug }),
		),
	]);
	return { deletedId: id };
}

export async function savePageDraft<K extends PageKey>(
	key: K,
	content: PageContentMap[K],
) {
	const identity = requireAdminIdentity();
	const json = JSON.stringify(content);
	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"INSERT INTO page_documents (key, draft_json, published_json) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET draft_json = excluded.draft_json, updated_at = CURRENT_TIMESTAMP",
		).bind(key, json, json),
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, 'site', ?, ?, 'draft_saved', ?)",
		).bind(crypto.randomUUID(), `page:${key}`, json, identity.email),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'draft_saved', 'page', ?)",
		).bind(crypto.randomUUID(), identity.email, key),
	]);
	return { savedAt: new Date().toISOString() };
}

export async function publishPage(key: PageKey) {
	const identity = requireAdminIdentity();
	const row = await env.CONTENT_DB.prepare(
		"SELECT draft_json FROM page_documents WHERE key = ?",
	)
		.bind(key)
		.first<Pick<PageRow, "draft_json">>();
	if (!row) throw new Error("Page document was not found.");
	parsePageContent(key, JSON.parse(row.draft_json));

	await env.CONTENT_DB.batch([
		env.CONTENT_DB.prepare(
			"UPDATE page_documents SET published_json = draft_json, published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE key = ?",
		).bind(key),
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, 'site', ?, ?, 'published', ?)",
		).bind(crypto.randomUUID(), `page:${key}`, row.draft_json, identity.email),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id) VALUES (?, ?, 'published', 'page', ?)",
		).bind(crypto.randomUUID(), identity.email, key),
	]);
	return { publishedAt: new Date().toISOString() };
}

export async function restoreRevision(id: string) {
	const identity = requireAdminIdentity();
	const revision = await env.CONTENT_DB.prepare(
		"SELECT entity_type, entity_id, content_json FROM content_revisions WHERE id = ?",
	)
		.bind(id)
		.first<Pick<RevisionRow, "content_json" | "entity_id" | "entity_type">>();
	if (!revision) throw new Error("Revision was not found.");

	const pageKey = revision.entity_id.startsWith("page:")
		? revision.entity_id.slice(5)
		: null;
	let update: D1PreparedStatement;
	if (pageKey) {
		update = env.CONTENT_DB.prepare(
			"UPDATE page_documents SET draft_json = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?",
		).bind(revision.content_json, pageKey);
	} else if (revision.entity_type === "site") {
		update = env.CONTENT_DB.prepare(
			"UPDATE site_settings SET draft_json = ?, updated_at = CURRENT_TIMESTAMP WHERE key = 'global'",
		).bind(revision.content_json);
	} else {
		const payload: unknown = JSON.parse(revision.content_json);
		if (
			payload &&
			typeof payload === "object" &&
			"card" in payload &&
			"detail" in payload
		) {
			const card = parseProjectContent(payload.card);
			const detail = parseProjectDetailContent(payload.detail);
			const slug =
				"slug" in payload && typeof payload.slug === "string"
					? payload.slug
					: null;
			update = env.CONTENT_DB.prepare(
				"UPDATE projects SET draft_json = ?, detail_draft_json = ?, slug = COALESCE(?, slug), status = 'draft', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
			).bind(
				JSON.stringify(card),
				JSON.stringify(detail),
				slug,
				revision.entity_id,
			);
		} else {
			const card = parseProjectContent(payload);
			update = env.CONTENT_DB.prepare(
				"UPDATE projects SET draft_json = ?, status = 'draft', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
			).bind(JSON.stringify(card), revision.entity_id);
		}
	}

	await env.CONTENT_DB.batch([
		update,
		env.CONTENT_DB.prepare(
			"INSERT INTO content_revisions (id, entity_type, entity_id, content_json, action, actor_email) VALUES (?, ?, ?, ?, 'restored', ?)",
		).bind(
			crypto.randomUUID(),
			revision.entity_type,
			revision.entity_id,
			revision.content_json,
			identity.email,
		),
		env.CONTENT_DB.prepare(
			"INSERT INTO audit_logs (id, actor_email, action, entity_type, entity_id, metadata_json) VALUES (?, ?, 'restored', ?, ?, ?)",
		).bind(
			crypto.randomUUID(),
			identity.email,
			revision.entity_type,
			revision.entity_id,
			JSON.stringify({ sourceRevisionId: id }),
		),
	]);

	return { restoredAt: new Date().toISOString() };
}

export async function insertMediaAsset(
	asset: Omit<MediaAsset, "createdAt" | "url">,
	actorEmail: string,
) {
	await env.CONTENT_DB.prepare(
		"INSERT INTO media_assets (id, object_key, file_name, mime_type, byte_size, alt_text, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
	)
		.bind(
			asset.id,
			asset.objectKey,
			asset.fileName,
			asset.mimeType,
			asset.byteSize,
			asset.altText,
			actorEmail,
		)
		.run();
}
