import DraggableSticker from "./DraggableSticker";
import RotatingTypewriter from "./RotatingTypewriter";

export default function HomeHero() {
	return (
		<section
			className="home-hero absolute top-[370px] left-[324.5px] z-20 flex w-[791px] flex-col items-center gap-4 text-center"
			data-node-id="309:7981"
		>
			<DraggableSticker
				ariaLabel="Move Product Designer role sticker"
				className="home-role-tag-drag"
			>
				<p className="home-hero__tag rounded-full bg-highlight-yellow px-2.5 py-1 font-ui text-xs leading-[1.4] font-bold text-ink">
					Product Designer · Research &amp; Interfaces
				</p>
			</DraggableSticker>

			<h1 className="home-hero__title w-full font-display text-[88px] leading-[1.05] font-extrabold tracking-[-0.88px] text-ink">
				Good Design&apos;s <span className="text-invisible">Invisible</span>
			</h1>

			<p className="home-hero__subtitle flex w-full items-center justify-center font-code text-[13px] leading-normal font-bold whitespace-nowrap text-muted">
				<span>PRODUCT DESIGNER, RESEARCH &amp; INTERFACE,&nbsp;</span>
				<RotatingTypewriter />
			</p>

			<DraggableSticker
				ariaLabel="Move Build and Ship sticker"
				className="absolute top-[28.86px] left-[616.86px] flex h-[68.27px] w-[94.28px] items-center justify-center"
			>
				<span className="home-build-sticker flex rotate-[30deg] items-center justify-center">
					<span className="rounded-full bg-highlight-yellow px-2.5 py-1 font-ui text-xs leading-[1.4] font-bold whitespace-nowrap text-ink">
						BUILD &amp; SHIP
					</span>
				</span>
			</DraggableSticker>
		</section>
	);
}
