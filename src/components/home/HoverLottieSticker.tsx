import { type DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRef } from "react";

type HoverLottieStickerProps = {
	alt: string;
	fallbackSrc?: string;
	lottieSrc: string;
};

export default function HoverLottieSticker({
	alt,
	fallbackSrc,
	lottieSrc,
}: HoverLottieStickerProps) {
	const playerRef = useRef<DotLottie | null>(null);

	function playFromStart() {
		const player = playerRef.current;
		if (!player) return;
		player.stop();
		player.setFrame(0);
		player.play();
	}

	function resetToStart() {
		const player = playerRef.current;
		if (!player) return;
		player.stop();
		player.setFrame(0);
	}

	return (
		<span className="hover-lottie-sticker">
			{fallbackSrc ? (
				<img
					src={fallbackSrc}
					alt={alt}
					className="hover-lottie-sticker__fallback"
					draggable={false}
				/>
			) : (
				<span className="sr-only">{alt}</span>
			)}
			<DotLottieReact
				src={lottieSrc}
				autoplay={false}
				loop={false}
				dotLottieRefCallback={(player) => {
					playerRef.current = player;
				}}
				onMouseEnter={playFromStart}
				onMouseLeave={resetToStart}
				className="hover-lottie-sticker__player"
				aria-hidden="true"
			/>
		</span>
	);
}
