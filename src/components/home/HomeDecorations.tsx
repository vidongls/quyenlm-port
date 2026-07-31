import DraggableSticker from "./DraggableSticker";

const DECORATIONS = [
	{
		src: "/assets/home-wave.png",
		alt: "Quyen waving",
		className: "left-[620px] top-[213.8px] size-[200px] rounded-2xl",
	},
	{
		src: "/assets/home-coffee.png",
		alt: "Quyen pouring coffee",
		className: "left-[1057.3px] top-[412px] size-[200px] rounded-2xl",
	},
	{
		src: "/assets/home-laptop.png",
		alt: "Quyen working with a laptop",
		className: "left-[341.44px] top-[652.6px] size-[200px]",
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
					key={item.src}
					ariaLabel={`Move ${item.alt || "decorative sticker"}`}
					className={`home-decoration absolute ${item.className}`}
				>
					<img
						src={item.src}
						alt={item.alt}
						className="home-decoration__image size-full object-cover"
						style={
							{
								"--home-item-index": index,
							} as React.CSSProperties
						}
						draggable={false}
					/>
				</DraggableSticker>
			))}
		</div>
	);
}
