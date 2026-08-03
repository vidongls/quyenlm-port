import { useEffect, useRef, useState } from "react";
import "./SitePreloader.css";

type PreloaderPhase = "idle" | "playing" | "exiting";

const PRELOADER_ASSETS = [
	"/assets/home-pointer.svg",
	"/assets/home-portrait.png",
	"/assets/home-pen.png",
];

let hasPlayedPreloader = false;

function preloadAssets() {
	return Promise.all(
		PRELOADER_ASSETS.map(
			(src) =>
				new Promise<void>((resolve) => {
					const image = new Image();
					image.onload = () => resolve();
					image.onerror = () => resolve();
					image.src = src;
				}),
		),
	);
}

export default function SitePreloader() {
	const [visible, setVisible] = useState(true);
	const [phase, setPhase] = useState<PreloaderPhase>("idle");
	const counterRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const root = document.documentElement;
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (hasPlayedPreloader || reducedMotion) {
			hasPlayedPreloader = true;
			root.removeAttribute("data-preloading");
			setVisible(false);
			return;
		}

		hasPlayedPreloader = true;
		root.setAttribute("data-preloading", "true");

		let animationFrame = 0;
		let holdTimer = 0;
		let exitTimer = 0;
		let cancelled = false;

		const start = async () => {
			await Promise.race([
				preloadAssets(),
				new Promise<void>((resolve) => window.setTimeout(resolve, 650)),
			]);
			if (cancelled) return;

			setPhase("playing");
			const startedAt = performance.now();
			const duration = 2850;

			const updateCounter = (now: number) => {
				const progress = Math.min((now - startedAt) / duration, 1);
				const eased = 1 - (1 - progress) ** 3;
				const value = Math.round(eased * 100);

				if (counterRef.current) {
					counterRef.current.textContent = String(value).padStart(3, "0");
				}

				if (progress < 1) {
					animationFrame = requestAnimationFrame(updateCounter);
					return;
				}

				holdTimer = window.setTimeout(() => {
					root.removeAttribute("data-preloading");
					setPhase("exiting");
					exitTimer = window.setTimeout(() => setVisible(false), 950);
				}, 320);
			};

			animationFrame = requestAnimationFrame(updateCounter);
		};

		void start();

		return () => {
			cancelled = true;
			cancelAnimationFrame(animationFrame);
			window.clearTimeout(holdTimer);
			window.clearTimeout(exitTimer);
			root.removeAttribute("data-preloading");
		};
	}, []);

	if (!visible) return null;

	return (
		<output
			className="site-preloader"
			data-phase={phase}
			aria-live="polite"
			aria-label="Loading Quyen's portfolio"
		>
			<span className="sr-only">Loading Quyen&apos;s portfolio</span>

			<div className="site-preloader__grid" aria-hidden="true" />
			<div className="site-preloader__topbar" aria-hidden="true">
				<span>quyenlee.design</span>
				<span>HOME / HERO</span>
			</div>

			<div className="site-preloader__stage" aria-hidden="true">
				<div className="site-preloader__frame">
					<span className="site-preloader__frame-name">FRAME 001</span>
					<span className="site-preloader__handle site-preloader__handle--tl" />
					<span className="site-preloader__handle site-preloader__handle--tr" />
					<span className="site-preloader__handle site-preloader__handle--bl" />
					<span className="site-preloader__handle site-preloader__handle--br" />
					<span className="site-preloader__scanline" />

					<div className="site-preloader__copy">
						<span className="site-preloader__role">
							PRODUCT DESIGNER · RESEARCH &amp; INTERFACES
						</span>
						<p>
							<span>GOOD DESIGN&apos;S</span>
							<strong>INVISIBLE</strong>
						</p>
						<small>MADE IN VIET NAM · BUILT WITH CURIOSITY</small>
					</div>

					<img
						src="/assets/home-portrait.png"
						alt=""
						draggable={false}
						className="site-preloader__portrait"
					/>
				</div>

				<div className="site-preloader__cursor">
					<img src="/assets/home-pointer.svg" alt="" draggable={false} />
					<span className="site-preloader__cursor-label">
						Composing the invisible…
					</span>
				</div>

				<img
					src="/assets/home-pen.png"
					alt=""
					draggable={false}
					className="site-preloader__pen"
				/>
			</div>

			<div className="site-preloader__coordinates" aria-hidden="true">
				<span>X 226</span>
				<span>Y 257</span>
			</div>

			<div className="site-preloader__progress" aria-hidden="true">
				<small>CANVAS ZOOM</small>
				<div>
					<span ref={counterRef}>000</span>
					<strong className="site-preloader__progress-symbol">%</strong>
				</div>
			</div>
		</output>
	);
}
