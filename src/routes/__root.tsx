import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import {
	CustomCursor,
	FloatingNav,
	SiteHeader,
	SitePreloader,
} from "../components/ui";
import { getPublishedSiteSettingsFn } from "../lib/content/functions";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	loader: () => getPublishedSiteSettingsFn(),
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
	const settings = Route.useLoaderData();
	const isAdmin = useRouterState({
		select: (state) => state.location.pathname.startsWith("/admin"),
	});

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-page text-ink font-sans antialiased [overflow-wrap:anywhere]">
				<div className="site-shell">
					{children}
					{!isAdmin && <SiteHeader resumeHref={settings.resumeUrl} />}
					{!isAdmin && <FloatingNav />}
				</div>
				{!isAdmin && <SitePreloader />}
				{!isAdmin && <CustomCursor />}
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
