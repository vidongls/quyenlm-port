import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./NavItem.css";

export type NavItemColor = "black" | "blue" | "purple" | "yellow";

export type NavItemProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"color"
> & {
	children: ReactNode;
	selected?: boolean;
	selectedColor?: NavItemColor;
};

export default function NavItem({
	children,
	className = "",
	selected = false,
	selectedColor = "black",
	type = "button",
	...props
}: NavItemProps) {
	return (
		<button
			{...props}
			type={type}
			className={`nav-item ${className}`.trim()}
			data-selected={selected || undefined}
			data-selected-color={selectedColor}
			aria-pressed={selected}
		>
			{children}
		</button>
	);
}
