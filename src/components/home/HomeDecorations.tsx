import DraggableSticker from "./DraggableSticker";
import HoverLottieSticker from "./HoverLottieSticker";

const DECORATIONS = [
	{
		src: "/assets/home-wave.png",
		lottieSrc: "/assets/lottie/avatar_v2.lottie",
		replaceStatic: true,
		alt: "Quyen waving",
		className: "left-[520px] top-[213.8px] h-[200px] w-[400px] rounded-2xl",
	},
	{
		src: "/assets/home-coffee.png",
		lottieSrc: "/assets/lottie/Coffee_Avatar.lottie",
		replaceStatic: true,
		alt: "Quyen pouring coffee",
		className: "left-[1057.3px] top-[412px] h-[200px] w-[460px] rounded-2xl",
	},
	{
		src: "/assets/home-laptop.png",
		lottieSrc: "/assets/lottie/Insight_Avatar.lottie",
		replaceStatic: true,
		alt: "Quyen working with a laptop",
		className: "left-[341.44px] top-[652.6px] h-[200px] w-[450px]",
	},
	{
		src: "/assets/home-magnifier.png",
		alt: "",
		className: "left-[898.56px] top-[658.82px] size-[160px] rounded-2xl",
	},
	{
		src: "/assets/home-notebook.png",
		alt: "",
		className: "left-[1035.5px] top-[820px] size-[160px] rounded-2xl",
	},
	{
		src: "/assets/home-pen.png",
		lottieSrc: "/assets/lottie/home-pen-hover.json",
		alt: "",
		className: "left-[898.56px] top-[-22.77px] size-[160px] rounded-2xl",
	},
	{
		src: "/assets/home-palette.png",
		alt: "",
		className: "left-[1310.1px] top-[724.7px] size-[160px] rounded-2xl",
	},
] as const;

export default function HomeDecorations() {
	return (
		<div className="pointer-events-none absolute inset-0 z-10 select-none">
			{DECORATIONS.map((item, index) => (
				<DraggableSticker
					key={"lottieSrc" in item ? item.lottieSrc : item.src}
					ariaLabel={`Move ${item.alt || "decorative sticker"}`}
					className={`home-decoration absolute ${item.className}`}
				>
					<span
						className="home-decoration__image block size-full"
						style={
							{
								"--home-item-index": index,
							} as React.CSSProperties
						}
					>
						{"lottieSrc" in item ? (
							<HoverLottieSticker
								alt={item.alt}
								fallbackSrc={
									"replaceStatic" in item && item.replaceStatic
										? undefined
										: item.src
								}
								lottieSrc={item.lottieSrc}
							/>
						) : (
							<img
								src={item.src}
								alt={item.alt}
								className="size-full object-cover"
								draggable={false}
							/>
						)}
					</span>
				</DraggableSticker>
			))}
		</div>
	);
}
