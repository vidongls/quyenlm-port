import { Link, useRouterState } from "@tanstack/react-router";
import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import "./NavItem.css";

const NAV_ITEMS = [
	{
		id: "home",
		to: "/",
		label: "Home",
		shortLabel: "Home",
		color: "black",
		hint: "Frame / Home",
		tilt: "-1.25deg",
	},
	{
		id: "work",
		to: "/work",
		label: "Selected Work",
		shortLabel: "Work",
		color: "blue",
		hint: "Frame / Work",
		tilt: "1deg",
	},
	{
		id: "about",
		to: "/about",
		label: "Get To Know Me",
		shortLabel: "About",
		color: "purple",
		hint: "Frame / About",
		tilt: "-0.8deg",
	},
	{
		id: "contact",
		to: "/contact",
		label: "Say Hi!",
		shortLabel: "Hi!",
		color: "yellow",
		hint: "Frame / Contact",
		tilt: "1.25deg",
	},
] as const;

export type FloatingNavItemId = (typeof NAV_ITEMS)[number]["id"];

type SelectionPill = {
	ready: boolean;
	width: number;
	x: number;
};

export type FloatingNavProps = {
	activeItem?: FloatingNavItemId;
	className?: string;
	emailHref?: string;
	linkedinHref?: string;
	onItemChange?: (item: FloatingNavItemId) => void;
};

export default function FloatingNav({
	activeItem,
	className = "",
	emailHref = "#contact",
	linkedinHref = "#linkedin",
	onItemChange,
}: FloatingNavProps) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const routeItem = pathname.startsWith("/projects/")
		? "work"
		: (NAV_ITEMS.find((item) => item.to === pathname)?.id ?? "home");
	const selectedItem = activeItem ?? routeItem;
	const selectedColor =
		NAV_ITEMS.find((item) => item.id === selectedItem)?.color ?? "black";
	const linksRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef(
		new Map<FloatingNavItemId, HTMLAnchorElement | null>(),
	);
	const [selectionPill, setSelectionPill] = useState<SelectionPill>({
		ready: false,
		width: 0,
		x: 0,
	});

	useLayoutEffect(() => {
		const links = linksRef.current;
		const selectedLink = itemRefs.current.get(selectedItem);
		if (!links || !selectedLink) return;

		function updateSelectionPill() {
			if (!links || !selectedLink) return;
			setSelectionPill({
				ready: true,
				width: selectedLink.offsetWidth,
				x: selectedLink.offsetLeft,
			});
		}

		updateSelectionPill();
		const resizeObserver = new ResizeObserver(updateSelectionPill);
		resizeObserver.observe(links);

		return () => resizeObserver.disconnect();
	}, [selectedItem]);

	return (
		<nav
			className={`floating-nav fixed bottom-3 left-1/2 z-50 flex max-w-[calc(100vw-16px)] -translate-x-1/2 items-center gap-1 rounded-[20px] border-2 border-[#1e1e1e] bg-white p-2 shadow-[0_12px_16px_rgba(0,0,0,0.08)] sm:bottom-6 sm:gap-2 sm:rounded-[24px] sm:p-3 ${className}`.trim()}
			aria-label="Primary navigation"
			data-node-id="305:6402"
		>
			<div ref={linksRef} className="floating-nav-links relative flex gap-2">
				<span
					className="nav-selection-pill"
					data-color={selectedColor}
					data-ready={selectionPill.ready || undefined}
					style={{
						width: selectionPill.width,
						transform: `translate3d(${selectionPill.x}px, 0, 0)`,
					}}
					aria-hidden="true"
				/>

				{NAV_ITEMS.map((item) => {
					const isSelected = selectedItem === item.id;

					return (
						<Link
							ref={(element) => {
								itemRefs.current.set(item.id, element);
							}}
							key={item.id}
							to={item.to}
							className="nav-item relative z-10 max-[380px]:!px-2 max-sm:!px-3"
							data-selected={isSelected || undefined}
							data-selected-color={item.color}
							style={{ "--nav-hover-tilt": item.tilt } as CSSProperties}
							aria-current={isSelected ? "page" : undefined}
							onClick={() => onItemChange?.(item.id)}
						>
							<span className="nav-item__label sm:hidden">
								{item.shortLabel}
							</span>
							<span className="nav-item__label max-sm:hidden">
								{item.label}
							</span>
							<span className="nav-item__hint" aria-hidden="true">
								{item.hint}
							</span>
							<span className="nav-item__selection-frame" aria-hidden="true">
								<i />
								<i />
								<i />
								<i />
							</span>
						</Link>
					);
				})}
			</div>

			<div
				className="relative h-6 w-0 shrink-0 max-[480px]:hidden"
				aria-hidden="true"
			>
				<img
					src="/assets/nav-divider.svg"
					alt=""
					className="absolute top-1/2 left-1/2 h-0.5 w-6 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90"
				/>
			</div>

			<div className="flex shrink-0 gap-1 max-[480px]:hidden">
				<a
					href={linkedinHref}
					className="floating-nav__social floating-nav__social--linkedin flex size-10 items-center justify-center rounded-xl border-2 border-[#1e1e1e] bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue"
					aria-label="LinkedIn"
				>
					<img src="/assets/nav-linkedin.svg" alt="" className="size-[18px]" />
				</a>
				<a
					href={emailHref}
					className="floating-nav__social floating-nav__social--email flex size-10 items-center justify-center rounded-xl border-2 border-[#1e1e1e] bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight-blue"
					aria-label="Send email"
				>
					<img src="/assets/nav-mail.svg" alt="" className="size-[18px]" />
				</a>
			</div>
		</nav>
	);
}
