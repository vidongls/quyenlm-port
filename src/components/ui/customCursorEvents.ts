export const CUSTOM_CURSOR_MOVE_EVENT = "custom-cursor:move";

export type CustomCursorMoveDetail = {
	x: number;
	y: number;
};

export function notifyCustomCursorMove(x: number, y: number) {
	window.dispatchEvent(
		new CustomEvent<CustomCursorMoveDetail>(CUSTOM_CURSOR_MOVE_EVENT, {
			detail: { x, y },
		}),
	);
}
