import { createFileRoute } from "@tanstack/react-router";
import WorkPage from "../components/work/WorkPage";
import { DEFAULT_ABOUT_CONTENT } from "../lib/content/defaults";

export const Route = createFileRoute("/about")({
	component: AboutRoute,
});

function AboutRoute() {
	return <WorkPage content={DEFAULT_ABOUT_CONTENT} />;
}
