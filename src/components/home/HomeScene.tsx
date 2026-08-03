import AboutCard from "./AboutCard";
import HomeCanvasDetails from "./HomeCanvasDetails";
import HomeDecorations from "./HomeDecorations";
import HomeHero from "./HomeHero";
import HomeWidgets from "./HomeWidgets";
import ProjectCard from "./ProjectCard";
import "./HomeMotion.css";

export default function HomeScene() {
	return (
		<div className="home-scene relative size-full" data-node-id="309:7448">
			<HomeCanvasDetails />
			<ProjectCard />
			<HomeDecorations />
			<HomeHero />
			<HomeWidgets />
			<AboutCard />
		</div>
	);
}
