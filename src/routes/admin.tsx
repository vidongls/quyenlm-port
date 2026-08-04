import { createFileRoute } from "@tanstack/react-router";
import AdminPage from "../components/admin/AdminPage";
import { getAdminContentFn } from "../lib/content/functions";

export const Route = createFileRoute("/admin")({
	loader: () => getAdminContentFn(),
	component: AdminRoute,
});

function AdminRoute() {
	return <AdminPage initialData={Route.useLoaderData()} />;
}
