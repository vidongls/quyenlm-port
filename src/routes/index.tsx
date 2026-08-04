import { createFileRoute } from "@tanstack/react-router";
import CanvasGrid from "../components/CanvasGrid";
import HomeMobile from "../components/home/HomeMobile";
import HomeScene from "../components/home/HomeScene";
import { DEFAULT_SITE_SETTINGS } from "../lib/content/defaults";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const settings = DEFAULT_SITE_SETTINGS;
	return (
		<main id="home" data-page="home">
			<div className="canvas-page relative isolate hidden overflow-hidden min-[768px]:block">
				<CanvasGrid>
					<HomeScene settings={settings} />
				</CanvasGrid>
			</div>
			<HomeMobile settings={settings} />
		</main>
	);
}
