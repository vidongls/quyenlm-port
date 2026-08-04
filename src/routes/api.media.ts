import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/media")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const { getMediaObject } = await import("../lib/content/media.server");
				const object = await getMediaObject(request);
				if (!object) return new Response("Not found", { status: 404 });

				const headers = new Headers();
				object.writeHttpMetadata(headers);
				headers.set("etag", object.httpEtag);
				headers.set(
					"cache-control",
					headers.get("cache-control") ?? "public, max-age=31536000, immutable",
				);
				if (object.customMetadata?.purpose === "resume") {
					const fileName = (
						object.customMetadata.originalName || "Quyen-Le-Minh-Resume.pdf"
					).replace(/["\r\n]/g, "");
					headers.set(
						"content-disposition",
						`attachment; filename="${fileName}"`,
					);
				}
				return new Response(object.body, { headers });
			},
		},
	},
});
