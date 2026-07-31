import { useEffect, useState } from "react";
import "./RotatingTypewriter.css";

const PHRASES = [
	"MADE ON TOO MUCH COFFEE",
	'MADE WHILE ASKING "WHY"',
	"MADE INVISIBLE ON PURPOSE",
	"MADE AFTER 100 ITERATIONS",
	"MADE IN VIET NAM",
] as const;

type Phase = "deleting" | "pausing" | "typing";

const TYPE_DELAY = 65;
const DELETE_DELAY = 32;
const PAUSE_DELAY = 1400;
const NEXT_PHRASE_DELAY = 220;

export default function RotatingTypewriter() {
	const [phraseIndex, setPhraseIndex] = useState(0);
	const [characterCount, setCharacterCount] = useState(0);
	const [phase, setPhase] = useState<Phase>("typing");
	const [reduceMotion, setReduceMotion] = useState(false);
	const phrase = PHRASES[phraseIndex];

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		function syncMotionPreference() {
			setReduceMotion(mediaQuery.matches);
		}

		syncMotionPreference();
		mediaQuery.addEventListener("change", syncMotionPreference);
		return () => mediaQuery.removeEventListener("change", syncMotionPreference);
	}, []);

	useEffect(() => {
		if (reduceMotion) return;

		let delay = TYPE_DELAY;
		if (phase === "pausing") delay = PAUSE_DELAY;
		if (phase === "deleting") {
			delay = characterCount === 0 ? NEXT_PHRASE_DELAY : DELETE_DELAY;
		}

		const timeout = window.setTimeout(() => {
			if (phase === "typing") {
				if (characterCount < phrase.length) {
					setCharacterCount((count) => count + 1);
					return;
				}
				setPhase("pausing");
				return;
			}

			if (phase === "pausing") {
				setPhase("deleting");
				return;
			}

			if (characterCount > 0) {
				setCharacterCount((count) => count - 1);
				return;
			}

			setPhraseIndex((index) => (index + 1) % PHRASES.length);
			setPhase("typing");
		}, delay);

		return () => window.clearTimeout(timeout);
	}, [characterCount, phase, phrase, reduceMotion]);

	const displayedPhrase = reduceMotion
		? PHRASES[0]
		: phrase.slice(0, characterCount);

	return (
		<span className="typewriter">
			<span className="sr-only">{reduceMotion ? PHRASES[0] : phrase}</span>
			<span aria-hidden="true">{displayedPhrase}</span>
			<span className="typewriter__caret" aria-hidden="true" />
		</span>
	);
}
