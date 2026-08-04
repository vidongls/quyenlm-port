import { createFileRoute } from "@tanstack/react-router";
import SelectedWorkPage from "../components/work/SelectedWorkPage";
import {
	getDraftProjectsFn,
	getPublishedProjectsFn,
} from "../lib/content/functions";

type WorkSearch = { preview?: boolean };

export const Route = createFileRoute("/work")({
	validateSearch: (search: Record<string, unknown>): WorkSearch =>
		search.preview === true || search.preview === "1" ? { preview: true } : {},
	loaderDeps: ({ search }) => ({ preview: search.preview }),
	loader: ({ deps }) =>
		deps.preview ? getDraftProjectsFn() : getPublishedProjectsFn(),
	component: WorkRoute,
});

function WorkRoute() {
	const { preview } = Route.useSearch();
	return (
		<>
			{preview && (
				<div className="fixed top-3 left-1/2 z-[100] -translate-x-1/2 rounded-full border-2 border-ink bg-highlight-yellow px-4 py-2 font-ui text-xs font-bold shadow-[3px_3px_0_rgba(30,30,30,.18)]">
					Draft preview · visible only to admin
				</div>
			)}
			<SelectedWorkPage projects={Route.useLoaderData()} />
		</>
	);
}
