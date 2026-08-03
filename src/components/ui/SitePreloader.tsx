import { useEffect, useRef, useState } from "react";
import "./SitePreloader.css";

type PreloaderPhase = "idle" | "playing" | "exiting";

type TrailSticker = {
	src: string;
	x: number;
	y: number;
	rotation: number;
	exitX: number;
	exitY: number;
};

const TRAIL_STICKERS: TrailSticker[] = [
	{
		src: "/assets/home-wave.png",
		x: 3,
		y: 49,
		rotation: -13,
		exitX: -74,
		exitY: -132,
	},
	{
		src: "/assets/home-pen.png",
		x: 10,
		y: 43,
		rotation: 10,
		exitX: 46,
		exitY: -176,
	},
	{
		src: "/assets/home-magnifier.png",
		x: 17,
		y: 55,
		rotation: -17,
		exitX: -38,
		exitY: -142,
	},
	{
		src: "/assets/home-portrait.png",
		x: 24,
		y: 46,
		rotation: 7,
		exitX: 72,
		exitY: -188,
	},
	{
		src: "/assets/home-coffee.png",
		x: 31,
		y: 54,
		rotation: -8,
		exitX: -52,
		exitY: -154,
	},
	{
		src: "/assets/home-notebook.png",
		x: 38,
		y: 44,
		rotation: 13,
		exitX: 58,
		exitY: -204,
	},
	{
		src: "/assets/home-palette.png",
		x: 45,
		y: 53,
		rotation: -12,
		exitX: -66,
		exitY: -166,
	},
	{
		src: "/assets/home-laptop.png",
		x: 52,
		y: 45,
		rotation: 8,
		exitX: 44,
		exitY: -192,
	},
	{
		src: "/assets/home-wave.png",
		x: 59,
		y: 54,
		rotation: -6,
		exitX: -48,
		exitY: -148,
	},
	{
		src: "/assets/home-magnifier.png",
		x: 66,
		y: 43,
		rotation: 16,
		exitX: 72,
		exitY: -186,
	},
	{
		src: "/assets/home-coffee.png",
		x: 73,
		y: 52,
		rotation: -10,
		exitX: -34,
		exitY: -210,
	},
	{
		src: "/assets/home-portrait.png",
		x: 80,
		y: 44,
		rotation: 12,
		exitX: 64,
		exitY: -158,
	},
	{
		src: "/assets/home-notebook.png",
		x: 87,
		y: 54,
		rotation: -14,
		exitX: -56,
		exitY: -194,
	},
];

let hasPlayedPreloader = false;

function preloadImages() {
	return Promise.all(
		TRAIL_STICKERS.map(
			({ src }) =>
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
				preloadImages(),
				new Promise<void>((resolve) => window.setTimeout(resolve, 700)),
			]);
			if (cancelled) return;

			setPhase("playing");
			const startedAt = performance.now();
			const duration = 2700;

			const updateCounter = (now: number) => {
				const progress = Math.min((now - startedAt) / duration, 1);
				const eased =
					progress < 0.5
						? 2 * progress * progress
						: 1 - (-2 * progress + 2) ** 2 / 2;
				const value = Math.round(eased * 100);

				if (counterRef.current) {
					counterRef.current.textContent = String(value).padStart(2, "0");
				}

				if (progress < 1) {
					animationFrame = requestAnimationFrame(updateCounter);
					return;
				}

				holdTimer = window.setTimeout(() => {
					root.removeAttribute("data-preloading");
					setPhase("exiting");
					exitTimer = window.setTimeout(() => setVisible(false), 1050);
				}, 350);
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
			<div className="site-preloader__dots" aria-hidden="true" />
			<div className="site-preloader__trail" aria-hidden="true">
				{TRAIL_STICKERS.map((sticker, index) => (
					<img
						key={`${sticker.src}-${sticker.x}`}
						src={sticker.src}
						alt=""
						draggable={false}
						className="site-preloader__sticker"
						style={
							{
								"--sticker-x": `${sticker.x}%`,
								"--sticker-y": `${sticker.y}%`,
								"--sticker-rotation": `${sticker.rotation}deg`,
								"--sticker-delay": `${(index / TRAIL_STICKERS.length) * 2.15}s`,
								"--sticker-exit-delay": `${index * 18}ms`,
								"--sticker-exit-x": `${sticker.exitX}px`,
								"--sticker-exit-y": `${sticker.exitY}px`,
							} as React.CSSProperties
						}
					/>
				))}
			</div>

			<div className="site-preloader__brand" aria-hidden="true">
				<span>GOOD DESIGN&apos;S</span>
				<strong>LOADING</strong>
			</div>

			<div className="site-preloader__progress" aria-hidden="true">
				<span ref={counterRef}>00</span>
				<small>%</small>
			</div>
		</output>
	);
}
