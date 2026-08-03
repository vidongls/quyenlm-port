import { createFileRoute } from "@tanstack/react-router";
import ProjectDetailPage from "../components/project/ProjectDetailPage";

export const Route = createFileRoute("/projects/fintech-hub")({
	component: ProjectDetailPage,
	head: () => ({
		meta: [
			{ title: "FinTech Hub Case Study — Quyen Le Minh" },
			{
				name: "description",
				content:
					"A product design case study exploring calm, transparent automated savings for Gen-Z users.",
			},
		],
	}),
});
