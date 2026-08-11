import { createFileRoute, notFound } from "@tanstack/react-router";
import ProjectDetailPage from "../components/project/ProjectDetailPage";
import {
	DEFAULT_HANOI_TRANSIT_DETAIL_CONTENT,
	DEFAULT_MEDSYNC_DETAIL_CONTENT,
	DEFAULT_PROJECT_DETAIL_CONTENT,
} from "../lib/content/defaults";
import type { ProjectDetailContent } from "../lib/content/types";

const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {
	"fintech-hub": DEFAULT_PROJECT_DETAIL_CONTENT,
	"hanoi-transit": DEFAULT_HANOI_TRANSIT_DETAIL_CONTENT,
	medsync: DEFAULT_MEDSYNC_DETAIL_CONTENT,
};

export const Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => PROJECT_DETAILS[params.slug] ?? notFound(),
	component: DynamicProjectDetailRoute,
	head: ({ params }) => ({
		meta: [
			{ title: `${params.slug.replaceAll("-", " ")} — Le Minh Quyen` },
			{
				name: "description",
				content: "A product design case study by Le Minh Quyen.",
			},
		],
	}),
});

function DynamicProjectDetailRoute() {
	const { slug } = Route.useParams();
	const prototypeKind =
		slug === "hanoi-transit"
			? "transit"
			: slug === "medsync"
				? "clinic"
				: "savings";
	return (
		<ProjectDetailPage
			content={Route.useLoaderData()}
			prototypeKind={prototypeKind}
		/>
	);
}
