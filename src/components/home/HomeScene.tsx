import AboutCard from "./AboutCard";
import HomeCanvasDetails from "./HomeCanvasDetails";
import HomeDecorations from "./HomeDecorations";
import HomeHero from "./HomeHero";
import HomeWidgets from "./HomeWidgets";
import ProjectCard from "./ProjectCard";
import "./HomeMotion.css";
import type { SiteSettings } from "../../lib/content/types";

export default function HomeScene({ settings }: { settings: SiteSettings }) {
	return (
		<div className="home-scene relative size-full" data-node-id="309:7448">
			<HomeCanvasDetails />
			<ProjectCard />
			<HomeDecorations />
			<HomeHero settings={settings} />
			<HomeWidgets />
			<AboutCard />
		</div>
	);
}
