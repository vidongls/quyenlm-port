import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "../components/contact/ContactPage";
import { getPublishedSiteSettingsFn } from "../lib/content/functions";

export const Route = createFileRoute("/contact")({
	loader: () => getPublishedSiteSettingsFn(),
	component: ContactRoute,
});

function ContactRoute() {
	const settings = Route.useLoaderData();

	return <ContactPage settings={settings} />;
}
