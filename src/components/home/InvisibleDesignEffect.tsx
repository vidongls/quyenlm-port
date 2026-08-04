import "./InvisibleDesignEffect.css";

const FRICTION_WORDS = [
	{ label: "CONFUSION", modifier: "confusion" },
	{ label: "WAITING", modifier: "waiting" },
	{ label: "ERRORS", modifier: "errors" },
	{ label: "GUESSWORK", modifier: "guesswork" },
] as const;

export default function InvisibleDesignEffect({
	word = "Invisible",
}: {
	word?: string;
}) {
	return (
		<span className="invisible-design-effect">
			<span className="invisible-design-effect__word">{word}</span>

			<span className="invisible-design-effect__friction" aria-hidden="true">
				{FRICTION_WORDS.map(({ label, modifier }) => (
					<span
						key={label}
						className={
							"invisible-design-effect__token invisible-design-effect__token--" +
							modifier
						}
					>
						{label}
					</span>
				))}
			</span>

			<span className="invisible-design-effect__scan" aria-hidden="true" />
		</span>
	);
}
