import DraggableSticker from "./DraggableSticker";
import "./HomeCanvasDetails.css";

const PROCESS_STEPS = ["DISCOVER", "DEFINE", "DESIGN", "DELIVER"];

export default function HomeCanvasDetails() {
	return (
		<div className="home-canvas-details pointer-events-none absolute inset-0 z-[6] select-none">
			<div className="home-process-rail" aria-hidden="true">
				<span className="home-process-rail__eyebrow">THE WAY I WORK</span>
				<div className="home-process-rail__track">
					{PROCESS_STEPS.map((step, index) => (
						<div className="home-process-rail__step" key={step}>
							<span>{String(index + 1).padStart(2, "0")}</span>
							<strong>{step}</strong>
						</div>
					))}
					<i className="home-process-rail__pulse" />
				</div>
			</div>

			<DraggableSticker
				ariaLabel="Move design question note"
				className="home-question-note-drag absolute top-[548px] left-[70px]"
			>
				<aside className="home-question-note">
					<div className="home-question-note__header">
						<span>DESIGN QUESTION</span>
						<span>014</span>
					</div>
					<p>
						What would this feel like if the interface{" "}
						<strong>disappeared?</strong>
					</p>
					<div className="home-question-note__footer">
						<span>ASK WHY</span>
						<i />
						<span>THEN SIMPLIFY</span>
					</div>
				</aside>
			</DraggableSticker>

			<DraggableSticker
				ariaLabel="Move current exploration note"
				className="home-exploration-note-drag absolute top-[1020px] left-[1070px]"
			>
				<aside className="home-exploration-note">
					<div className="home-exploration-note__status">
						<i />
						<span>CURRENTLY EXPLORING</span>
					</div>
					<strong>Human × AI research synthesis</strong>
					<p>Finding the signal without losing the human story.</p>
					<svg viewBox="0 0 210 32" fill="none" aria-hidden="true">
						<path d="M1 24C21 24 19 8 38 8s18 17 38 17S94 5 113 5s17 20 37 20 20-13 38-13 13 7 21 7" />
						<circle cx="209" cy="19" r="3" />
					</svg>
				</aside>
			</DraggableSticker>

			<div className="home-token-strip" aria-hidden="true">
				<span className="home-token-strip__label">SYSTEM / 04</span>
				<div className="home-token-strip__colors">
					<i data-color="blue" />
					<i data-color="pink" />
					<i data-color="purple" />
					<i data-color="yellow" />
				</div>
				<span className="home-token-strip__caption">COLOR WITH A JOB</span>
			</div>

			<div
				className="home-canvas-coordinate home-canvas-coordinate--a"
				aria-hidden="true"
			>
				<span />X 324&nbsp;&nbsp;Y 370
			</div>
			<div
				className="home-canvas-coordinate home-canvas-coordinate--b"
				aria-hidden="true"
			>
				SNAP / 5 PX
				<span />
			</div>
		</div>
	);
}
