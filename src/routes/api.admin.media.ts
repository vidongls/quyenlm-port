import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/media")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const { uploadMedia } = await import("../lib/content/media.server");
					const asset = await uploadMedia(request);
					return Response.json(asset, { status: 201 });
				} catch (error) {
					const message =
						error instanceof Error ? error.message : "Media upload failed.";
					return Response.json({ error: message }, { status: 400 });
				}
			},
		},
	},
});
