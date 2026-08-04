import { createFileRoute } from "@tanstack/react-router";
import SelectedWorkPage from "../components/work/SelectedWorkPage";
import { DEFAULT_PROJECTS } from "../lib/content/defaults";

export const Route = createFileRoute("/work")({
	component: WorkRoute,
});

function WorkRoute() {
	return <SelectedWorkPage projects={DEFAULT_PROJECTS} />;
}
