import { Link } from "@tanstack/react-router";
import DraggableSticker from "./DraggableSticker";

export default function AboutCard() {
	return (
		<DraggableSticker
			ariaLabel="Move about card"
			className="absolute top-[793px] left-[-103.67px] z-20"
		>
			<article className="home-about-card flex w-[260px] flex-col items-start gap-4 rounded-[20px] border-[3px] border-ink bg-white p-5 shadow-[4px_4px_0_rgba(30,30,30,0.15)]">
				<div className="h-[200px] w-full overflow-hidden rounded-xl border-2 border-ink">
					<img
						src="/assets/home-portrait.png"
						alt="Portrait of Quyen in Ha Noi"
						className="size-full object-cover"
					/>
				</div>

				<div className="flex w-full flex-col items-start gap-1">
					<p className="flex items-center gap-2 font-ui text-[13px] leading-[1.4] font-semibold tracking-[-0.065px] text-muted">
						<img src="/assets/home-map-pin.svg" alt="" className="size-3.5" />
						Ha Noi, Viet Nam
					</p>
					<h2 className="font-display text-lg leading-[1.3] font-extrabold whitespace-nowrap text-ink">
						Hi I&apos;m Quyen
					</h2>
					<Link
						to="/about"
						className="flex items-center gap-1 font-ui text-sm leading-[1.5] tracking-[-0.07px] text-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-purple"
					>
						Get to know me
						<img src="/assets/home-arrow.svg" alt="" className="size-4" />
					</Link>
				</div>
			</article>

			<DraggableSticker
				ariaLabel="Move coffee sticker"
				className="absolute top-[279px] left-[99.48px] flex h-[73.7px] w-[192.85px] items-center justify-center"
			>
				<p className="home-coffee-sticker w-max -rotate-8 rounded-xl border-2 border-ink bg-white p-3.5 font-ui text-sm leading-[1.4] font-semibold tracking-[-0.07px] whitespace-nowrap text-ink shadow-[4px_4px_0_rgba(30,30,30,0.15)]">
					Powered by Ca Phe Den☕️
				</p>
			</DraggableSticker>
		</DraggableSticker>
	);
}
