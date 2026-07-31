import { type ReactNode, useEffect, useRef, useState } from "react";
import "./CanvasGrid.css";

const BASE_GRID_SIZE = 51.444444444;
const GRID_SUBDIVISIONS = 5;
const BASE_DOT_GRID_WIDTH = 51.444444444;
const BASE_DOT_GRID_HEIGHT = 71.117647059;
const BASE_DOT_SIZE = 5;
const CANVAS_WIDTH = 1440;
const INITIAL_ZOOM_SCALE = 0.8;
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 8;
const GRID_FULLY_VISIBLE_ZOOM = 1.25;
const DOT_GRID_INSET = 24;

type Point = {
	x: number;
	y: number;
};

type DragState = Point & {
	pointerId: number;
	originX: number;
	originY: number;
};

type PinchState = {
	center: Point;
	distance: number;
	offset: Point;
	zoom: number;
};

function getPinchMetrics(points: Point[]) {
	const [first, second] = points;
	return {
		center: {
			x: (first.x + second.x) / 2,
			y: (first.y + second.y) / 2,
		},
		distance: Math.hypot(second.x - first.x, second.y - first.y),
	};
}

export type CanvasGridProps = {
	children?: ReactNode;
};

export default function CanvasGrid({ children }: CanvasGridProps) {
	const gridRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const offsetRef = useRef(offset);
	const zoomRef = useRef(zoom);
	const dragStart = useRef<DragState | null>(null);
	const pinchStart = useRef<PinchState | null>(null);
	const touchPoints = useRef(new Map<number, Point>());
	const spacePressed = useRef(false);
	const gridOpacity = Math.min(
		1,
		Math.max(0, (zoom - 1) / (GRID_FULLY_VISIBLE_ZOOM - 1)),
	);

	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const canvasElement = grid.closest<HTMLElement>(".canvas-page");
		if (!canvasElement) return;
		const canvas: HTMLElement = canvasElement;
		const initialBounds = canvas.getBoundingClientRect();
		const initialZoom = Math.max(
			MIN_ZOOM,
			Math.min(1, initialBounds.width / CANVAS_WIDTH) * INITIAL_ZOOM_SCALE,
		);
		const initialOffset = {
			x: (initialBounds.width - CANVAS_WIDTH * initialZoom) / 2,
			y: 0,
		};

		offsetRef.current = initialOffset;
		zoomRef.current = initialZoom;
		setOffset(initialOffset);
		setZoom(initialZoom);

		function updateTransform(nextOffset: Point, nextZoom = zoomRef.current) {
			offsetRef.current = nextOffset;
			zoomRef.current = nextZoom;
			setOffset(nextOffset);
			setZoom(nextZoom);
		}

		function zoomAtPoint(nextZoom: number, point: Point) {
			const currentZoom = zoomRef.current;
			const scale = nextZoom / currentZoom;
			const currentOffset = offsetRef.current;

			updateTransform(
				{
					x: point.x - (point.x - currentOffset.x) * scale,
					y: point.y - (point.y - currentOffset.y) * scale,
				},
				nextZoom,
			);
		}

		function handleWheel(event: WheelEvent) {
			event.preventDefault();

			const bounds = canvas.getBoundingClientRect();
			if (event.ctrlKey || event.metaKey) {
				const nextZoom = Math.min(
					MAX_ZOOM,
					Math.max(MIN_ZOOM, zoomRef.current * Math.exp(-event.deltaY * 0.01)),
				);
				zoomAtPoint(nextZoom, {
					x: event.clientX - bounds.left,
					y: event.clientY - bounds.top,
				});
				return;
			}

			const horizontalDelta = event.shiftKey ? event.deltaY : event.deltaX;
			const verticalDelta = event.shiftKey ? 0 : event.deltaY;
			const currentOffset = offsetRef.current;
			updateTransform({
				x: currentOffset.x - horizontalDelta,
				y: currentOffset.y - verticalDelta,
			});
		}

		function handleKeyDown(event: KeyboardEvent) {
			const target = event.target as HTMLElement | null;
			const isTyping = target?.matches(
				"input, textarea, select, [contenteditable]",
			);
			if (event.code !== "Space" || isTyping) return;

			event.preventDefault();
			spacePressed.current = true;
			canvas.classList.add("canvas-is-pannable");
		}

		function releaseSpace() {
			spacePressed.current = false;
			canvas.classList.remove("canvas-is-pannable");
		}

		function handleKeyUp(event: KeyboardEvent) {
			if (event.code === "Space") releaseSpace();
		}

		function handlePointerDown(event: PointerEvent) {
			const isTouch = event.pointerType === "touch";
			const target = event.target as HTMLElement | null;
			const isInteractive = target?.closest(
				'a, button, input, textarea, select, [role="button"], [data-draggable-sticker]',
			);
			const canPanWithMouse =
				event.button === 1 || (event.button === 0 && spacePressed.current);
			if ((!isTouch && !canPanWithMouse) || (isTouch && isInteractive)) return;

			event.preventDefault();
			canvas.setPointerCapture(event.pointerId);
			canvas.classList.add("canvas-is-panning");

			const bounds = canvas.getBoundingClientRect();
			const point = {
				x: event.clientX - bounds.left,
				y: event.clientY - bounds.top,
			};
			if (isTouch) {
				touchPoints.current.set(event.pointerId, point);
			}

			if (touchPoints.current.size === 2) {
				const metrics = getPinchMetrics([...touchPoints.current.values()]);
				pinchStart.current = {
					...metrics,
					offset: offsetRef.current,
					zoom: zoomRef.current,
				};
				dragStart.current = null;
				return;
			}

			dragStart.current = {
				...point,
				pointerId: event.pointerId,
				originX: offsetRef.current.x,
				originY: offsetRef.current.y,
			};
		}

		function handlePointerMove(event: PointerEvent) {
			const bounds = canvas.getBoundingClientRect();
			const point = {
				x: event.clientX - bounds.left,
				y: event.clientY - bounds.top,
			};

			if (
				event.pointerType === "touch" &&
				touchPoints.current.has(event.pointerId)
			) {
				touchPoints.current.set(event.pointerId, point);
			}

			if (pinchStart.current && touchPoints.current.size >= 2) {
				const metrics = getPinchMetrics([...touchPoints.current.values()]);
				const start = pinchStart.current;
				const nextZoom = Math.min(
					MAX_ZOOM,
					Math.max(MIN_ZOOM, start.zoom * (metrics.distance / start.distance)),
				);
				const scale = nextZoom / start.zoom;

				updateTransform(
					{
						x: metrics.center.x - (start.center.x - start.offset.x) * scale,
						y: metrics.center.y - (start.center.y - start.offset.y) * scale,
					},
					nextZoom,
				);
				return;
			}

			const drag = dragStart.current;
			if (!drag || drag.pointerId !== event.pointerId) return;
			updateTransform({
				x: drag.originX + point.x - drag.x,
				y: drag.originY + point.y - drag.y,
			});
		}

		function handlePointerEnd(event: PointerEvent) {
			touchPoints.current.delete(event.pointerId);
			if (canvas.hasPointerCapture(event.pointerId)) {
				canvas.releasePointerCapture(event.pointerId);
			}

			pinchStart.current = null;
			dragStart.current = null;

			const remainingTouch = [...touchPoints.current.entries()][0];
			if (remainingTouch) {
				const [pointerId, point] = remainingTouch;
				dragStart.current = {
					...point,
					pointerId,
					originX: offsetRef.current.x,
					originY: offsetRef.current.y,
				};
			} else {
				canvas.classList.remove("canvas-is-panning");
			}
		}

		canvas.addEventListener("wheel", handleWheel, { passive: false });
		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", handlePointerEnd);
		canvas.addEventListener("pointercancel", handlePointerEnd);
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("blur", releaseSpace);

		return () => {
			canvas.removeEventListener("wheel", handleWheel);
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", handlePointerEnd);
			canvas.removeEventListener("pointercancel", handlePointerEnd);
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("blur", releaseSpace);
			canvas.classList.remove("canvas-is-pannable", "canvas-is-panning");
		};
	}, []);

	return (
		<>
			<div
				ref={gridRef}
				className="canvas-grid"
				style={
					{
						"--canvas-grid-size": `${
							(BASE_GRID_SIZE * zoom) / GRID_SUBDIVISIONS
						}px`,
						"--canvas-grid-x": `${offset.x}px`,
						"--canvas-grid-y": `${offset.y}px`,
						"--canvas-grid-opacity": gridOpacity,
					} as React.CSSProperties
				}
				aria-hidden="true"
			/>
			<div
				className="canvas-dots"
				style={
					{
						"--canvas-dot-grid-width": `${BASE_DOT_GRID_WIDTH * zoom}px`,
						"--canvas-dot-grid-height": `${BASE_DOT_GRID_HEIGHT * zoom}px`,
						"--canvas-dot-radius": `${(BASE_DOT_SIZE * zoom) / 2}px`,
						"--canvas-dot-edge": `${(BASE_DOT_SIZE * zoom) / 2 + 0.25}px`,
						"--canvas-dot-opacity": gridOpacity,
						"--canvas-dot-x": `${
							offset.x +
							DOT_GRID_INSET * zoom -
							(BASE_DOT_GRID_WIDTH * zoom) / 2
						}px`,
						"--canvas-dot-y": `${
							offset.y +
							DOT_GRID_INSET * zoom -
							(BASE_DOT_GRID_HEIGHT * zoom) / 2
						}px`,
					} as React.CSSProperties
				}
				aria-hidden="true"
			/>
			{children ? (
				<div
					className="canvas-content"
					style={{
						transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
					}}
				>
					{children}
				</div>
			) : null}
		</>
	);
}
