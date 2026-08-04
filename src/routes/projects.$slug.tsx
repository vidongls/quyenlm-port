import { createFileRoute } from "@tanstack/react-router";
import ProjectDetailPage from "../components/project/ProjectDetailPage";
import {
	getDraftProjectDetailFn,
	getPublishedProjectDetailFn,
} from "../lib/content/functions";

type PreviewSearch = { preview?: boolean };

export const Route = createFileRoute("/projects/$slug")({
	validateSearch: (search: Record<string, unknown>): PreviewSearch =>
		search.preview === true || search.preview === "1" ? { preview: true } : {},
	loaderDeps: ({ search }) => ({ preview: search.preview }),
	loader: ({ deps, params }) =>
		deps.preview
			? getDraftProjectDetailFn({ data: params.slug })
			: getPublishedProjectDetailFn({ data: params.slug }),
	component: DynamicProjectDetailRoute,
	head: ({ params }) => ({
		meta: [
			{ title: `${params.slug.replaceAll("-", " ")} — Quyen Le Minh` },
			{
				name: "description",
				content: "A product design case study by Quyen Le Minh.",
			},
		],
	}),
});

function DynamicProjectDetailRoute() {
	const { preview } = Route.useSearch();
	const { slug } = Route.useParams();
	const prototypeKind =
		slug === "hanoi-transit"
			? "transit"
			: slug === "medsync"
				? "clinic"
				: "savings";
	return (
		<>
			{preview && (
				<div className="fixed top-3 left-1/2 z-[100] -translate-x-1/2 rounded-full border-2 border-ink bg-highlight-yellow px-4 py-2 font-ui text-xs font-bold">
					Draft preview · {slug.replaceAll("-", " ")}
				</div>
			)}
			<ProjectDetailPage
				content={Route.useLoaderData()}
				prototypeKind={prototypeKind}
			/>
		</>
	);
}
