// biome-ignore-all lint/a11y/noNoninteractiveTabindex: Draggable canvas items provide arrow-key movement and Escape reset.
import {
	type CSSProperties,
	type KeyboardEvent,
	type PointerEvent,
	type ReactNode,
	useRef,
	useState,
} from "react";
import { notifyCustomCursorMove } from "../ui/customCursorEvents";
import "./DraggableSticker.css";

type Point = {
	x: number;
	y: number;
};

type DragStart = Point & {
	offset: Point;
	pointerId: number;
	scale: number;
};

export type DraggableStickerProps = {
	ariaLabel: string;
	children: ReactNode;
	className?: string;
};

const KEYBOARD_STEP = 10;

export default function DraggableSticker({
	ariaLabel,
	children,
	className = "",
}: DraggableStickerProps) {
	const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const dragStart = useRef<DragStart | null>(null);
	const hasMoved = offset.x !== 0 || offset.y !== 0;

	function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
		if (event.pointerType === "mouse" && event.button !== 0) return;

		const target = event.target as HTMLElement;
		const interactiveChild = target.closest(
			"a, button, input, textarea, select, [contenteditable]",
		);
		if (interactiveChild) return;

		event.preventDefault();
		event.stopPropagation();
		notifyCustomCursorMove(event.clientX, event.clientY);

		const canvasContent =
			event.currentTarget.closest<HTMLElement>(".canvas-content");
		const scale = canvasContent
			? canvasContent.getBoundingClientRect().width / canvasContent.offsetWidth
			: 1;

		event.currentTarget.setPointerCapture(event.pointerId);
		dragStart.current = {
			x: event.clientX,
			y: event.clientY,
			offset,
			pointerId: event.pointerId,
			scale: scale || 1,
		};
		setIsDragging(true);
	}

	function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
		const start = dragStart.current;
		if (!start || start.pointerId !== event.pointerId) return;

		event.preventDefault();
		event.stopPropagation();
		notifyCustomCursorMove(event.clientX, event.clientY);
		setOffset({
			x: start.offset.x + (event.clientX - start.x) / start.scale,
			y: start.offset.y + (event.clientY - start.y) / start.scale,
		});
	}

	function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
		if (dragStart.current?.pointerId !== event.pointerId) return;

		event.preventDefault();
		event.stopPropagation();
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		dragStart.current = null;
		setIsDragging(false);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		const distance = event.shiftKey ? 1 : KEYBOARD_STEP;
		const movement: Record<string, Point> = {
			ArrowUp: { x: 0, y: -distance },
			ArrowRight: { x: distance, y: 0 },
			ArrowDown: { x: 0, y: distance },
			ArrowLeft: { x: -distance, y: 0 },
		};

		if (event.key === "Escape") {
			event.preventDefault();
			setOffset({ x: 0, y: 0 });
			return;
		}

		const delta = movement[event.key];
		if (!delta) return;
		event.preventDefault();
		setOffset((current) => ({
			x: current.x + delta.x,
			y: current.y + delta.y,
		}));
	}

	return (
		<div
			className={`draggable-sticker ${className}`.trim()}
			style={
				{
					"--sticker-x": `${offset.x}px`,
					"--sticker-y": `${offset.y}px`,
				} as CSSProperties
			}
			data-dragging={isDragging || undefined}
			data-moved={hasMoved || undefined}
			data-draggable-sticker
			role="application"
			tabIndex={0}
			aria-label={ariaLabel}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerEnd}
			onPointerCancel={handlePointerEnd}
			onKeyDown={handleKeyDown}
		>
			{children}
		</div>
	);
}
