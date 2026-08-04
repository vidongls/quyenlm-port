import { createServerFn } from "@tanstack/react-start";
import { DEFAULT_PROJECTS, DEFAULT_SITE_SETTINGS } from "./defaults";
import type {
	AdminContent,
	PageContentMap,
	PageKey,
	ProjectContent,
} from "./types";
import {
	parseEntityId,
	parsePageKey,
	parseSavePageInput,
	parseSaveProjectInput,
	parseSiteSettings,
	slugValue,
} from "./validation";

export const getPublishedProjectsFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<ProjectContent[]> => {
		try {
			const { getPublishedProjects } = await import("./content.server");
			return await getPublishedProjects();
		} catch (error) {
			console.error(error);
			return DEFAULT_PROJECTS;
		}
	},
);

export const getDraftProjectsFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<ProjectContent[]> => {
		const { getDraftProjects } = await import("./content.server");
		return getDraftProjects();
	},
);

export const getPublishedProjectDetailFn = createServerFn({ method: "GET" })
	.validator(slugValue)
	.handler(async ({ data }) => {
		const { getPublishedProjectDetail } = await import("./content.server");
		return getPublishedProjectDetail(data);
	});

export const getDraftProjectDetailFn = createServerFn({ method: "GET" })
	.validator(slugValue)
	.handler(async ({ data }) => {
		const { getDraftProjectDetail } = await import("./content.server");
		return getDraftProjectDetail(data);
	});

export const getPublishedSiteSettingsFn = createServerFn({
	method: "GET",
}).handler(async () => {
	try {
		const { getPublishedSiteSettings } = await import("./content.server");
		return await getPublishedSiteSettings();
	} catch (error) {
		console.error(error);
		return DEFAULT_SITE_SETTINGS;
	}
});

export const getPublishedPageFn = createServerFn({ method: "GET" })
	.validator(parsePageKey)
	.handler(async ({ data }): Promise<PageContentMap[PageKey]> => {
		const { getPublishedPage } = await import("./content.server");
		return getPublishedPage(data);
	});

export const getDraftPageFn = createServerFn({ method: "GET" })
	.validator(parsePageKey)
	.handler(async ({ data }): Promise<PageContentMap[PageKey]> => {
		const { getDraftPage } = await import("./content.server");
		return getDraftPage(data);
	});

export const getAdminContentFn = createServerFn({ method: "GET" }).handler(
	async (): Promise<AdminContent> => {
		const { getAdminContent } = await import("./content.server");
		return getAdminContent();
	},
);

export const saveSiteDraftFn = createServerFn({ method: "POST" })
	.validator(parseSiteSettings)
	.handler(async ({ data }) => {
		const { saveSiteDraft } = await import("./content.server");
		return saveSiteDraft(data);
	});

export const publishSiteFn = createServerFn({ method: "POST" }).handler(
	async () => {
		const { publishSite } = await import("./content.server");
		return publishSite();
	},
);

export const saveProjectDraftFn = createServerFn({ method: "POST" })
	.validator(parseSaveProjectInput)
	.handler(async ({ data }) => {
		const { saveProjectDraft } = await import("./content.server");
		return saveProjectDraft(data);
	});

export const publishProjectFn = createServerFn({ method: "POST" })
	.validator(parseEntityId)
	.handler(async ({ data }) => {
		const { publishProject } = await import("./content.server");
		return publishProject(data);
	});

export const createProjectFn = createServerFn({ method: "POST" }).handler(
	async () => {
		const { createProject } = await import("./content.server");
		return createProject();
	},
);

export const deleteProjectFn = createServerFn({ method: "POST" })
	.validator(parseEntityId)
	.handler(async ({ data }) => {
		const { deleteProject } = await import("./content.server");
		return deleteProject(data);
	});

export const savePageDraftFn = createServerFn({ method: "POST" })
	.validator(parseSavePageInput)
	.handler(async ({ data }) => {
		const { savePageDraft } = await import("./content.server");
		return savePageDraft(data.key, data.content);
	});

export const publishPageFn = createServerFn({ method: "POST" })
	.validator(parsePageKey)
	.handler(async ({ data }) => {
		const { publishPage } = await import("./content.server");
		return publishPage(data);
	});

export const restoreRevisionFn = createServerFn({ method: "POST" })
	.validator(parseEntityId)
	.handler(async ({ data }) => {
		const { restoreRevision } = await import("./content.server");
		return restoreRevision(data);
	});
