import { createFileRoute } from "@tanstack/react-router";
import WorkPage from "../components/work/WorkPage";
import { getDraftPageFn, getPublishedPageFn } from "../lib/content/functions";
import type { AboutContent } from "../lib/content/types";

type PreviewSearch = { preview?: boolean };

export const Route = createFileRoute("/about")({
	validateSearch: (search: Record<string, unknown>): PreviewSearch =>
		search.preview === true || search.preview === "1" ? { preview: true } : {},
	loaderDeps: ({ search }) => ({ preview: search.preview }),
	loader: ({ deps }) =>
		deps.preview
			? getDraftPageFn({ data: "about" })
			: getPublishedPageFn({ data: "about" }),
	component: AboutRoute,
});

function AboutRoute() {
	const { preview } = Route.useSearch();
	return (
		<>
			{preview && (
				<div className="fixed top-3 left-1/2 z-[100] -translate-x-1/2 rounded-full border-2 border-ink bg-highlight-yellow px-4 py-2 font-ui text-xs font-bold">
					Draft preview · About
				</div>
			)}
			<WorkPage content={Route.useLoaderData() as AboutContent} />
		</>
	);
}
