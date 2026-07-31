import { createFileRoute } from "@tanstack/react-router";
import CanvasGrid from "../components/CanvasGrid";
import HomeMobile from "../components/home/HomeMobile";
import HomeScene from "../components/home/HomeScene";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main id="home" data-page="home">
			<div className="canvas-page relative isolate hidden overflow-hidden min-[768px]:block">
				<CanvasGrid>
					<HomeScene />
				</CanvasGrid>
			</div>
			<HomeMobile />
		</main>
	);
}
