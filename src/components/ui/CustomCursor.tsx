import { useEffect, useRef } from "react";
import "./CustomCursor.css";
import {
	CUSTOM_CURSOR_MOVE_EVENT,
	type CustomCursorMoveDetail,
} from "./customCursorEvents";

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

		function moveCursor(x: number, y: number) {
			if (!cursor) return;
			cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
			setVisible(true);
		}

		function handlePointerMove(event: PointerEvent) {
			if (!finePointer.matches || event.pointerType === "touch") {
				setVisible(false);
				return;
			}

			const target = event.target as Element | null;
			const isInteractive = target?.closest(
				"a, button, input, select, textarea, [role='button']",
			);
			if (cursor) cursor.dataset.interactive = String(Boolean(isInteractive));
			moveCursor(event.clientX, event.clientY);
		}

		function handleForcedMove(event: Event) {
			if (!finePointer.matches) return;
			const { x, y } = (event as CustomEvent<CustomCursorMoveDetail>).detail;
			moveCursor(x, y);
		}

		function handlePointerLeave(event: PointerEvent) {
			if (event.relatedTarget === null) {
				if (cursor) cursor.dataset.interactive = "false";
				setVisible(false);
			}
		}

		function handleBlur() {
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
		window.addEventListener("pointerout", handlePointerLeave);
		window.addEventListener("blur", handleBlur);
		window.addEventListener(CUSTOM_CURSOR_MOVE_EVENT, handleForcedMove);
		finePointer.addEventListener("change", syncPointerMode);

		return () => {
			root.classList.remove("custom-cursor-active");
			window.removeEventListener("pointermove", handlePointerMove, true);
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
			data-node-id="309:7986"
			aria-hidden="true"
		>
			<div className="custom-cursor__content">
				<img
					src="/assets/home-pointer.svg"
					alt=""
					className="custom-cursor__pointer"
				/>
				<span className="custom-cursor__label">You (Wonderful guest)</span>
			</div>
		</div>
	);
}
