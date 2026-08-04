import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "../components/contact/ContactPage";
import { DEFAULT_SITE_SETTINGS } from "../lib/content/defaults";

export const Route = createFileRoute("/contact")({
	component: ContactRoute,
});

function ContactRoute() {
	return <ContactPage settings={DEFAULT_SITE_SETTINGS} />;
}
