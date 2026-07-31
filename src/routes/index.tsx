import { createFileRoute } from "@tanstack/react-router";
import CanvasGrid from "../components/CanvasGrid";
import HomeScene from "../components/home/HomeScene";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main
			id="home"
			className="canvas-page relative isolate overflow-hidden"
			data-page="home"
		>
			<CanvasGrid>
				<HomeScene />
			</CanvasGrid>
			<h1 className="sr-only">Home</h1>
		</main>
	);
}
