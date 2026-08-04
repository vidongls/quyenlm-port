import { useEffect, useRef } from "react";
import "./CustomCursor.css";
import {
	CUSTOM_CURSOR_MOVE_EVENT,
	type CustomCursorMoveDetail,
} from "./customCursorEvents";

type CursorMode =
	| "default"
	| "action"
	| "drag"
	| "dragging"
	| "pan"
	| "panning";

const ACTION_SELECTOR = "a, button, input, select, textarea, [role='button']";
const DRAG_SELECTOR = "[data-draggable-sticker]";
const CANVAS_SELECTOR = ".canvas-page";

function getCursorMode(target: Element | null): CursorMode {
	if (!target) return "default";

	const draggable = target.closest(DRAG_SELECTOR);
	const action = target.closest(ACTION_SELECTOR);
	const isNestedAction = Boolean(
		draggable && action && action !== draggable && draggable.contains(action),
	);

	if (draggable && !isNestedAction) {
		return draggable.hasAttribute("data-dragging") ? "dragging" : "drag";
	}

	if (action) return "action";

	const canvas = target.closest(CANVAS_SELECTOR);
	if (canvas) {
		return canvas.classList.contains("canvas-is-panning") ? "panning" : "pan";
	}

	return "default";
}

export default function CustomCursor() {
	const cursorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		const root = document.documentElement;
		const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

		function setVisible(visible: boolean) {
			if (cursor) cursor.dataset.visible = String(visible);
		}

		function setMode(mode: CursorMode) {
			if (cursor) cursor.dataset.mode = mode;
		}

		function moveCursor(x: number, y: number) {
			if (!cursor) return;
			cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
			setVisible(true);
		}

		function syncModeAt(x: number, y: number, preserveDragStart = true) {
			const activeDrag = document.querySelector(
				`${DRAG_SELECTOR}[data-dragging]`,
			);
			const nextMode = getCursorMode(document.elementFromPoint(x, y));
			const justStartedDragging =
				preserveDragStart &&
				cursor?.dataset.mode === "dragging" &&
				nextMode === "drag";
			setMode(activeDrag || justStartedDragging ? "dragging" : nextMode);
		}

		function handlePointerMove(event: PointerEvent) {
			if (!finePointer.matches || event.pointerType === "touch") {
				setVisible(false);
				return;
			}

			setMode(getCursorMode(event.target as Element | null));
			moveCursor(event.clientX, event.clientY);
		}

		function handlePointerDown(event: PointerEvent) {
			if (!finePointer.matches || event.pointerType === "touch") return;
			const mode = getCursorMode(event.target as Element | null);
			setMode(mode === "drag" ? "dragging" : mode === "pan" ? "panning" : mode);
		}

		function handlePointerEnd(event: PointerEvent) {
			if (!finePointer.matches) return;
			requestAnimationFrame(() =>
				syncModeAt(event.clientX, event.clientY, false),
			);
		}

		function handleForcedMove(event: Event) {
			if (!finePointer.matches) return;
			const { x, y } = (event as CustomEvent<CustomCursorMoveDetail>).detail;
			syncModeAt(x, y);
			moveCursor(x, y);
		}

		function handlePointerLeave(event: PointerEvent) {
			if (event.relatedTarget === null) {
				setMode("default");
				setVisible(false);
			}
		}

		function handleBlur() {
			setMode("default");
			setVisible(false);
		}

		function syncPointerMode() {
			root.classList.toggle("custom-cursor-active", finePointer.matches);
			if (!finePointer.matches) setVisible(false);
		}

		syncPointerMode();
		window.addEventListener("pointermove", handlePointerMove, {
			capture: true,
			passive: true,
		});
		window.addEventListener("pointerdown", handlePointerDown, true);
		window.addEventListener("pointerup", handlePointerEnd, true);
		window.addEventListener("pointercancel", handlePointerEnd, true);
		window.addEventListener("pointerout", handlePointerLeave);
		window.addEventListener("blur", handleBlur);
		window.addEventListener(CUSTOM_CURSOR_MOVE_EVENT, handleForcedMove);
		finePointer.addEventListener("change", syncPointerMode);

		return () => {
			root.classList.remove("custom-cursor-active");
			window.removeEventListener("pointermove", handlePointerMove, true);
			window.removeEventListener("pointerdown", handlePointerDown, true);
			window.removeEventListener("pointerup", handlePointerEnd, true);
			window.removeEventListener("pointercancel", handlePointerEnd, true);
			window.removeEventListener("pointerout", handlePointerLeave);
			window.removeEventListener("blur", handleBlur);
			window.removeEventListener(CUSTOM_CURSOR_MOVE_EVENT, handleForcedMove);
			finePointer.removeEventListener("change", syncPointerMode);
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			className="custom-cursor"
			data-visible="false"
			data-mode="default"
			aria-hidden="true"
		>
			<div className="custom-cursor__tool">
				<span className="custom-cursor__axis custom-cursor__axis--x" />
				<span className="custom-cursor__axis custom-cursor__axis--y" />
				<span className="custom-cursor__core" />
				<span className="custom-cursor__handle custom-cursor__handle--tl" />
				<span className="custom-cursor__handle custom-cursor__handle--tr" />
				<span className="custom-cursor__handle custom-cursor__handle--bl" />
				<span className="custom-cursor__handle custom-cursor__handle--br" />
				<svg
					className="custom-cursor__action-icon"
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
				>
					<path d="M4 12 12 4M7 4h5v5" />
				</svg>
			</div>

			<div className="custom-cursor__drag-hint">
				<span className="custom-cursor__grip" aria-hidden="true">
					<i />
					<i />
					<i />
					<i />
					<i />
					<i />
				</span>
				<span className="custom-cursor__hint-idle">HOLD + DRAG</span>
				<span className="custom-cursor__hint-active">MOVING</span>
				<span className="custom-cursor__hint-pan">DRAG CANVAS</span>
				<span className="custom-cursor__hint-panning">PANNING</span>
			</div>
		</div>
	);
}
