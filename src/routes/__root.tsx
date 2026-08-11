import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import {
	CustomCursor,
	FloatingNav,
	SiteHeader,
	SitePreloader,
} from "../components/ui";
import { DEFAULT_SITE_SETTINGS } from "../lib/content/defaults";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Quyen Le Minh — Product Designer",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const settings = DEFAULT_SITE_SETTINGS;

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-page text-ink font-sans antialiased [overflow-wrap:anywhere]">
				<div className="site-shell">
					{children}
					<SiteHeader resumeHref={settings.resumeUrl} />
					<FloatingNav
						emailHref={`mailto:${settings.email}`}
						linkedinHref={settings.linkedinUrl}
					/>
				</div>
				<SitePreloader settings={settings} />
				<CustomCursor />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
